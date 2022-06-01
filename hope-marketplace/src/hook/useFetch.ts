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
  const revealNftContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.REVEAL_NFT_CONTRACT]
  );
  const revealMarketContract = useAppSelector(
    (state) =>
      state.accounts.accountList[contractAddresses.MARKET_REVEAL_CONTRACT]
  );

  const fetchUnlistedNFTs = useCallback(async () => {
    if (!account || !nftContract) return;
    // const result = await runQuery(contractAddresses.NFT_CONTRACT, {
    //   tokens: {
    //     owner: account?.address,
    //     start_after: undefined,
    //     limit: undefined,
    //   },
    // });
    const result = await runQuery(nftContract, {
      tokens: {
        owner: account?.address,
        start_after: undefined,
        limit: undefined,
      },
    });
    const revealResult = await runQuery(revealNftContract, {
      tokens: {
        owner: account?.address,
        start_after: undefined,
        limit: undefined,
      },
    });
    let totalResult: any = [...result.tokens, ...revealResult.tokens];
    let unlistedNFTs = [];
    if (totalResult?.length > 0) {
      unlistedNFTs = totalResult.map((item: string) => ({
        token_id: item,
      }));
    }
    dispatch(setUnlistedNFTs(unlistedNFTs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, runQuery, dispatch]);

  const fetchListedNFTs = useCallback(async () => {
    if (!account || !marketContract) return;
    // const result = await runQuery(contractAddresses.MARKET_CONTRACT, {
    //   get_offerings: {},
    // });
    const result = await runQuery(marketContract, {
      get_offerings: {},
    });
    const revealResult = await runQuery(revealMarketContract, {
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
    if (revealResult?.offerings?.length > 0) {
      revealResult.offerings.map((item: any) => {
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
  }, [runQuery, account, dispatch]);

  const fetchAllNFTs = useCallback(() => {
    // console.log(
    //   "nftContract",
    //   !!nftContract,
    //   "marketContract",
    //   !!marketContract
    // );
    fetchUnlistedNFTs();
    fetchListedNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fetchUnlistedNFTs, fetchListedNFTs]);

  return {
    fetchUnlistedNFTs,
    fetchListedNFTs,
    fetchAllNFTs,
  };
};

export default useFetch;
