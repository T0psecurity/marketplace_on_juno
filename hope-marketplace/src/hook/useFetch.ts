import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Collections, {
  MarketplaceContracts,
  MarketplaceInfo,
} from "../constants/Collections";
import {
  CollectionStateType,
  // DEFAULT_COLLECTION_STATE,
  setCollectionState,
} from "../features/collections/collectionsSlice";
import { setNFTs } from "../features/nfts/nftsSlice";
import getQuery from "../util/useAxios";
import useContract from "./useContract";
import { MintContracts } from "../constants/Collections";
import { setCollectionTraitStates } from "../features/collectionTraits/collectionTraitsSlice";

type AttributeType = {
  trait_type: string;
  value: string;
};

type MetaDataItemType = {
  attributes: AttributeType[];
  [key: string]: any;
};

const MAX_ITEMS = 50;

const getMin = (number: number, max?: number): number => {
  const maxNumber = max || 1e5;
  return maxNumber === number ? 0 : number;
};

const getCustomTokenId = (origin: string, target: string): string =>
  `${target}.${origin.split(".").pop()}`;

const buildNFTItem = (
  item: any,
  contractAddress: string,
  collection: MarketplaceInfo,
  metaData: any
) => {
  const customTokenId = collection.customTokenId;

  const tokenNumberStr = Number(getTokenIdNumber(item.token_id));
  const tokenNumber: number = isNaN(tokenNumberStr) ? 0 : tokenNumberStr;
  const crrItem = {
    ...item,
    ...(customTokenId && {
      token_id_display: getCustomTokenId(item.token_id, customTokenId),
    }),
    contractAddress,
    collectionId: collection.collectionId,
    ...(metaData &&
      metaData[tokenNumber - 1] && {
        metaData: metaData[tokenNumber - 1],
      }),
  };
  return crrItem;
};

const getTraitsStatus = (
  metaData: MetaDataItemType[]
): { total: number; [key: string]: number } => {
  let result: { total: number; [key: string]: number } = { total: 0 };
  metaData.forEach((metaDataItem: MetaDataItemType) => {
    result.total += 1;
    const attributes: AttributeType[] = metaDataItem.attributes;
    attributes.forEach((attribute: AttributeType) => {
      result[attribute.value] = (result[attribute.value] || 0) + 1;
    });
  });
  return result;
};

export const getTokenIdNumber = (id: string): string => {
  if (!id) return "";
  return id.split(".").pop() || "";
};

const useFetch = () => {
  const { runQuery } = useContract();
  const dispatch = useAppDispatch();

  const contracts = useAppSelector((state) => state?.accounts.accountList);

  const fetchCollectionInfo = useCallback(
    (account) => {
      Collections.forEach(async (collection: MarketplaceInfo) => {
        let storeObject: CollectionStateType = {
          mintCheck: [],
          mintedNfts: 0,
          totalNfts: collection?.mintInfo?.totalNfts || 0,
          maxNfts: 0,
          imageUrl: "",
          price: 0,
          myMintedNfts: null,
        };
        if (collection.mintContract) {
          const queryResult = await runQuery(collection.mintContract, {
            get_state_info: {},
          });
          if (queryResult)
            storeObject = {
              mintCheck: queryResult.check_mint,
              mintedNfts: +(queryResult.count || "0"),
              totalNfts: +(queryResult.total_nft || "0"),
              maxNfts: +(queryResult.max_nft || queryResult.total_nft || "0"),
              imageUrl: queryResult.image_url,
              price: +(queryResult.price || "0") / 1e6,
              myMintedNfts: null,
            };
          if (account && account.address) {
            const userInfo = await runQuery(collection.mintContract, {
              get_user_info: { address: account.address },
            });
            storeObject.myMintedNfts =
              (storeObject.myMintedNfts || 0) + (userInfo || "0");
          }
        } else if (collection.isLaunched) {
          try {
            const queryResult = await runQuery(MintContracts[0], {
              get_collection_info: {
                nft_address: collection.nftContract,
              },
            });
            storeObject = {
              mintCheck: queryResult.check_mint,
              mintedNfts: +(queryResult.mint_count || "0"),
              totalNfts: +(queryResult.total_nft || "0"),
              maxNfts: +(queryResult.max_nft || queryResult.total_nft || "0"),
              imageUrl: queryResult.image_url,
              price: +(queryResult.price || "0") / 1e6,
              myMintedNfts: null,
            };
          } catch (e) {}
        }

        if (collection.isLaunched) {
          const tradingInfoResult = await runQuery(MarketplaceContracts[0], {
            get_tvl_all: {
              address: collection.nftContract,
              symbols: ["ujuno", "hope"],
            },
          });
          let totalJuno = 0,
            totalHope = 0;
          tradingInfoResult?.forEach((item: any) => {
            if (item.denom === "ujuno") {
              totalJuno = +item.amount / 1e6;
            } else if (item.denom === "hope") {
              totalHope = +item.amount / 1e6;
            }
          });
          storeObject.tradingInfo = {
            junoTotal: totalJuno,
            hopeTotal: totalHope,
          };
        }
        if (
          collection.marketplaceContract &&
          collection.marketplaceContract.length
        ) {
          try {
            const tradingInfoResult = await runQuery(
              collection.marketplaceContract[0],
              {
                get_trading_info: {},
              }
            );
            const newJunoTotal =
              (storeObject.tradingInfo?.junoTotal || 0) +
              +(tradingInfoResult.total_juno || "0") / 1e6;
            const newHopeTotal =
              (storeObject.tradingInfo?.hopeTotal || 0) +
              +(tradingInfoResult.total_hope || "0") / 1e6;
            storeObject.tradingInfo = {
              junoMax: +(tradingInfoResult.max_juno || "0") / 1e6,
              junoMin: getMin(+(tradingInfoResult.min_juno || "0") / 1e6),
              junoTotal: newJunoTotal,
              hopeMax: +(tradingInfoResult.max_hope || "0") / 1e6,
              hopeMin: getMin(+(tradingInfoResult.min_hope || "0") / 1e6),
              hopeTotal: newHopeTotal,
            };
          } catch (e) {}
        }
        dispatch(setCollectionState([collection.collectionId, storeObject]));
      });
    },
    [dispatch, runQuery]
  );

  const fetchMarketplaceNFTs = useCallback(
    (account) => {
      Collections.forEach(async (collection: MarketplaceInfo) => {
        let queries: any = [];
        let contractAddresses: string[] = [];

        const collectionInfo = await runQuery(MarketplaceContracts[0], {
          get_collection_info: {
            address: collection.nftContract,
          },
        });
        for (
          let i = 0;
          i < Math.ceil((collectionInfo?.offering_id || 0) / MAX_ITEMS);
          i++
        ) {
          let tokenIds = [];
          for (let j = 0; j < MAX_ITEMS; j++) {
            tokenIds.push("" + (MAX_ITEMS * i + j + 1));
          }
          queries.push(
            runQuery(MarketplaceContracts[0], {
              get_offering_page: {
                id: tokenIds,
                address: collection.nftContract,
              },
            })
          );
          contractAddresses.push(MarketplaceContracts[0]);
        }
        if (
          collection.isLaunched &&
          collection.marketplaceContract &&
          collection.marketplaceContract.length
        ) {
          collection.marketplaceContract.forEach(
            (contract: string, index: number) => {
              if (contracts[contract]) {
                queries.push(
                  runQuery(contract, {
                    get_offerings: {},
                  })
                );
                contractAddresses.push(contract);
              }
            }
          );
        }
        const metaData = collection.metaDataUrl
          ? await getQuery(collection.metaDataUrl)
          : null;
        if (metaData) {
          dispatch(
            setCollectionTraitStates([
              collection.collectionId,
              getTraitsStatus(metaData),
            ])
          );
        }

        await Promise.all(queries).then((queryResults: any) => {
          let listedNFTs: any = [],
            marketplaceNFTs: any = [];
          queryResults.forEach((queryResult: any, index: number) => {
            const fetchedResult =
              queryResult?.offerings ||
              (!!queryResult?.length && queryResult) ||
              [];
            fetchedResult?.forEach((item: any, itemIndex: number) => {
              const crrItem = buildNFTItem(
                item,
                contractAddresses[index],
                collection,
                metaData
              );
              if (item.seller === account?.address) {
                listedNFTs = [...listedNFTs, crrItem];
              }
              marketplaceNFTs = [...marketplaceNFTs, crrItem];
            });
          });
          dispatch(setNFTs([`${collection.collectionId}_listed`, listedNFTs]));
          dispatch(
            setNFTs([`${collection.collectionId}_marketplace`, marketplaceNFTs])
          );
        });
      });
    },
    [contracts, dispatch, runQuery]
  );

  const fetchMyNFTs = useCallback(
    (account) => {
      if (!account) return;
      Collections.forEach(async (collection: MarketplaceInfo) => {
        if (collection.nftContract) {
          const queryResult: any = await runQuery(collection.nftContract, {
            tokens: {
              owner: account?.address,
              start_after: undefined,
              limit: 100,
            },
          });
          const customTokenId = collection.customTokenId;
          const nftList = queryResult?.tokens?.length
            ? queryResult.tokens.map((item: string) => ({
                token_id: item,
                token_id_display: customTokenId
                  ? getCustomTokenId(item, customTokenId)
                  : item,
                collectionId: collection.collectionId,
              }))
            : [];
          dispatch(setNFTs([collection.collectionId, nftList]));
        }
      });
    },
    [dispatch, runQuery]
  );

  const fetchAllNFTs = useCallback(
    (account) => {
      fetchMarketplaceNFTs(account);
      fetchCollectionInfo(account);
      if (!account) return;
      fetchMyNFTs(account);
    },
    [fetchCollectionInfo, fetchMarketplaceNFTs, fetchMyNFTs]
  );

  const clearAllNFTs = useCallback(() => {
    Collections.forEach(async (collection: MarketplaceInfo) => {
      // dispatch(
      //   setCollectionState([collection.collectionId, DEFAULT_COLLECTION_STATE])
      // );
      dispatch(setNFTs([collection.collectionId, []]));
      dispatch(setNFTs([`${collection.collectionId}_listed`, []]));
      // dispatch(setNFTs([`${collection.collectionId}_marketplace`, []]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    fetchAllNFTs,
    fetchCollectionInfo,
    fetchMarketplaceNFTs,
    fetchMyNFTs,
    clearAllNFTs,
  };
};

export default useFetch;
