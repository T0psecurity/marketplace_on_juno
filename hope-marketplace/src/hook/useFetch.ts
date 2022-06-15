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

const useFetch = () => {
  const { runQuery } = useContract();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);

  const contracts = useAppSelector((state) => state.accounts.accountList);

  const fetchCollectionInfo = useCallback(() => {
    if (!account) return;
    Collections.forEach(async (collection: MarketplaceInfo) => {
      // console.log("collection", collection.collectionId);
      if (collection.mintContract) {
        const queryResult = await runQuery(collection.mintContract, {
          get_state_info: {},
        });

        let storeObject: CollectionStateType = {
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
        dispatch(setCollectionState([collection.collectionId, storeObject]));
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
                contractAddress: contractAddresses[index],
                collectionId: collection.collectionId,
              };
              if (item.seller === account?.address) {
                listedNFTs = [...listedNFTs, crrItem];
              } else {
                marketplaceNFTs = [...marketplaceNFTs, crrItem];
              }
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
            limit: undefined,
          },
        });
        const nftList = queryResult?.tokens?.length
          ? queryResult.tokens.map((item: string) => ({
              token_id: item,
              collectionId: collection.collectionId,
            }))
          : [];
        dispatch(setNFTs([collection.collectionId, nftList]));
      }
    });
  }, [account, dispatch, runQuery]);

  const fetchAllNFTs = useCallback(() => {
    // fetchMarketplaceNFTs();
    if (!account) return;
    fetchCollectionInfo();
    fetchMyNFTs();
  }, [account, fetchCollectionInfo, fetchMyNFTs]);

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
