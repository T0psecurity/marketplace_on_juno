import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Collections, {
  MarketplaceContracts,
  MarketplaceInfo,
} from "../constants/Collections";
import {
  CollectionStateType,
  DEFAULT_COLLECTION_STATE,
  setCollectionState,
} from "../features/collections/collectionsSlice";
import { setNFTs } from "../features/nfts/nftsSlice";
import getQuery from "../util/useAxios";
import useContract from "./useContract";

const MAX_ITEMS = 300;

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

export const getTokenIdNumber = (id: string): string => {
  if (!id) return "";
  return id.split(".").pop() || "";
};

const useFetch = () => {
  const { runQuery } = useContract();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state?.accounts.keplrAccount);

  const contracts = useAppSelector((state) => state?.accounts.accountList);

  const fetchCollectionInfo = useCallback(() => {
    Collections.forEach(async (collection: MarketplaceInfo) => {
      // console.log("collection", collection.collectionId);
      let storeObject: CollectionStateType = {
        mintCheck: [],
        mintedNfts: 0,
        totalNfts: 0,
        maxNfts: 0,
        imageUrl: "",
        price: 0,
        myMintedNfts: null,
      };
      if (collection.mintContract) {
        const queryResult = await runQuery(collection.mintContract, {
          get_state_info: {},
        });

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
          storeObject.myMintedNfts = +(userInfo || "0");
        }
      }
      if (collection.isLaunched) {
        const tradingInfoResult = await runQuery(MarketplaceContracts[0], {
          get_trading_info: {
            address: collection.nftContract,
          },
        });
        storeObject.tradingInfo = {
          junoTotal: +(tradingInfoResult.total_juno || 0) / 1e6,
          hopeTotal: +(tradingInfoResult.total_hope || 0) / 1e6,
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
        } catch (e) {
        } finally {
          dispatch(setCollectionState([collection.collectionId, storeObject]));
        }
      }
    });
  }, [account, dispatch, runQuery]);

  const fetchMarketplaceNFTs = useCallback(() => {
    Collections.forEach(async (collection: MarketplaceInfo) => {
      if (
        collection.isLaunched &&
        collection.marketplaceContract &&
        collection.marketplaceContract.length
      ) {
        let queries: any = [];
        let contractAddresses: string[] = [];

        const tokenIds = await runQuery(MarketplaceContracts[0], {
          get_offering_id: {
            address: collection.nftContract,
          },
        });
        for (let i = 0; i < Math.ceil(tokenIds.length / MAX_ITEMS); i++) {
          queries.push(
            runQuery(MarketplaceContracts[0], {
              get_offering_page: {
                id: tokenIds.slice(
                  i * MAX_ITEMS,
                  Math.min(MAX_ITEMS * (i + 1), tokenIds.length)
                ),
                address: collection.nftContract,
              },
            })
          );
          contractAddresses.push(MarketplaceContracts[0]);
        }

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

        const metaData = collection.metaDataUrl
          ? await getQuery(collection.metaDataUrl)
          : null;

        await Promise.all(queries).then((queryResults: any) => {
          let listedNFTs: any = [],
            marketplaceNFTs: any = [];
          queryResults.forEach((queryResult: any, index: number) => {
            const fetchedResult =
              queryResult?.offerings ||
              (!!queryResult.length && queryResult) ||
              [];
            fetchedResult.forEach((item: any, itemIndex: number) => {
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
      }
    });
  }, [account, contracts, dispatch, runQuery]);

  const fetchMyNFTs = useCallback(() => {
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
  }, [account, dispatch, runQuery]);

  const fetchAllNFTs = useCallback(() => {
    fetchMarketplaceNFTs();
    fetchCollectionInfo();
    if (!account) return;
    fetchMyNFTs();
  }, [account, fetchCollectionInfo, fetchMarketplaceNFTs, fetchMyNFTs]);

  const clearAllNFTs = useCallback(() => {
    Collections.forEach(async (collection: MarketplaceInfo) => {
      dispatch(
        setCollectionState([collection.collectionId, DEFAULT_COLLECTION_STATE])
      );
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
