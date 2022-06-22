import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Collections, { MarketplaceInfo } from "../constants/Collections";
import {
  CollectionStateType,
  DEFAULT_COLLECTION_STATE,
  setCollectionState,
} from "../features/collections/collectionsSlice";
import { setNFTs } from "../features/nfts/nftsSlice";
import useContract from "./useContract";

const getMin = (number: number, max?: number): number => {
  const maxNumber = max || 1e5;
  return maxNumber === number ? 0 : number;
};

const getCustomTokenId = (origin: string, target: string): string =>
  `${target}.${origin.split(".").pop()}`;

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
          storeObject.tradingInfo = {
            junoMax: +(tradingInfoResult.max_juno || "0") / 1e6,
            junoMin: getMin(+(tradingInfoResult.min_juno || "0") / 1e6),
            junoTotal: +(tradingInfoResult.total_juno || "0") / 1e6,
            hopeMax: +(tradingInfoResult.max_hope || "0") / 1e6,
            hopeMin: getMin(+(tradingInfoResult.min_hope || "0") / 1e6),
            hopeTotal: +(tradingInfoResult.total_hope || "0") / 1e6,
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
        collection.marketplaceContract &&
        collection.marketplaceContract.length
      ) {
        let queries: any = [];
        let contractAddresses: string[] = [];
        const customTokenId = collection.customTokenId;
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
        await Promise.all(queries).then((queryResults: any) => {
          let listedNFTs: any = [],
            marketplaceNFTs: any = [];
          queryResults.forEach((queryResult: any, index: number) => {
            queryResult?.offerings?.forEach((item: any) => {
              const crrItem = {
                ...item,
                ...(customTokenId && {
                  token_id: getCustomTokenId(item.token_id, customTokenId),
                }),
                contractAddress: contractAddresses[index],
                collectionId: collection.collectionId,
              };
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
              token_id: customTokenId
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
