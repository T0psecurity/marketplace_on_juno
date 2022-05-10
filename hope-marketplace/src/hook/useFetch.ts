import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setUnlistedNFTs,
  setListedNFTs,
  setMarketplaceNFTs,
} from "../features/nfts/nftsSlice";
import useContract, { contractAddresses } from "./useContract";

const useFetch = () => {
  const { runQuery } = useContract();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const nftContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.NFT_CONTRACT]
  );
  const marketContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.MARKET_CONTRACT]
  );

  const fetchUnlistedNFTs = useCallback(async () => {
    const result = await runQuery(contractAddresses.NFT_CONTRACT, {
      tokens: {
        owner: account?.address,
        start_after: undefined,
        limit: undefined,
      },
    });
    let unlistedNFTs = [];
    if (result?.tokens?.length > 0) {
      unlistedNFTs = result.tokens.map((item: string) => ({
        token_id: item,
      }));
    }
    dispatch(setUnlistedNFTs(unlistedNFTs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, runQuery, dispatch, nftContract]);

  const fetchListedNFTs = useCallback(async () => {
    const result = await runQuery(contractAddresses.MARKET_CONTRACT, {
      get_offerings: {},
    });
    let listedNFTs: any = [],
      marketplaceNFTs: any = [];
    if (result?.offerings?.length > 0) {
      result.offerings.map((item: any) => {
        if (item.seller === account?.address) {
          listedNFTs.push(item);
        } else {
          marketplaceNFTs.push(item);
        }
        return null;
      });
    }
    dispatch(setListedNFTs(listedNFTs));
    dispatch(setMarketplaceNFTs(marketplaceNFTs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runQuery, account, dispatch, marketContract]);

  const fetchAllNFTs = useCallback(() => {
    fetchUnlistedNFTs();
    fetchListedNFTs();
  }, [fetchUnlistedNFTs, fetchListedNFTs]);

  return {
    fetchUnlistedNFTs,
    fetchListedNFTs,
    fetchAllNFTs,
  };
};

export default useFetch;
