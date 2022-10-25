import Collections, { CollectionIds, MarketplaceInfo } from "./Collections";
import { CollectionStateType } from "../features/collections/collectionsSlice";
import { toast } from "react-toastify";
import { TokenStatus, TokenType } from "../types/tokens";
import axios from "axios";

export interface LogicParamsInterface {
  collection: MarketplaceInfo;
  runQuery: (contractAddress: string, queryMsg: any) => Promise<any>;
  account?: string;
}

export interface GetMintMessageInterface extends LogicParamsInterface {
  account: string;
  state: any;
  runExecute: (
    contractAddress: string,
    executeMsg: any,
    option?: { memo?: string; funds?: string; denom?: string }
  ) => Promise<any>;
}

export interface ExtraLogicInterface extends GetMintMessageInterface {}

export interface MintLogicItemInterface {
  fetchInfo?: (params: LogicParamsInterface) => Promise<CollectionStateType>;
  getMintMessage?: (
    params: GetMintMessageInterface
  ) => Promise<{ message: any; address?: string; funds?: any }>;
  extraLogic?: (params: ExtraLogicInterface) => void;
}

const getMintMessageFunc1 = async (params: GetMintMessageInterface) => ({
  message: { mint: { address: params.collection.nftContract } },
});

export const MintLogics: {
  [key: string]: MintLogicItemInterface;
} = {
  logic1: {
    fetchInfo: async (params: LogicParamsInterface) => {
      const { collection, runQuery, account } = params;
      let storeObject: CollectionStateType = {
        mintCheck: [],
        mintedNfts: 0,
        totalNfts: collection?.mintInfo?.totalNfts || 0,
        maxNfts: 0,
        imageUrl: "",
        price: 0,
        myMintedNfts: null,
      };
      try {
        const queryResult = await runQuery(collection.mintContract, {
          get_collection_info: {
            nft_address: collection.nftContract,
            address: account || "",
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
          mintInfo: {
            startMintTime: queryResult.start_mint_time || Number(new Date()),
            mintPeriod: queryResult.private_mint_period || 0,
          },
        };
      } catch (e) {}
      return storeObject;
    },
    getMintMessage: getMintMessageFunc1,
  },
  logic2: {
    fetchInfo: async (params: LogicParamsInterface) => {
      const { collection, runQuery, account } = params;
      let storeObject: CollectionStateType = {
        mintCheck: [],
        mintedNfts: 0,
        totalNfts: collection?.mintInfo?.totalNfts || 0,
        maxNfts: 0,
        imageUrl: "",
        price: 0,
        myMintedNfts: null,
      };
      try {
        const queryResult = await runQuery(collection.mintContract, {
          get_collection_info: {
            nft_address: collection.nftContract,
            address: account || "",
          },
        });
        storeObject = {
          mintCheck: queryResult.check_mint,
          mintedNfts: +(queryResult.mint_count || "0"),
          totalNfts: +(queryResult.total_nft || "0"),
          maxNfts: +(queryResult.max_nft || queryResult.total_nft || "0"),
          imageUrl: queryResult.image_url,
          price: +(queryResult.price || "0") / 1e6,
          tokenPrice: +(queryResult.token_public_price || "0") / 1e6,
          tokenAddress: queryResult.token_contract || "",
          myMintedNfts: null,
          mintInfo: {
            startMintTime: queryResult.start_mint_time || Number(new Date()),
            mintPeriod: queryResult.private_mint_period || 0,
          },
        };
      } catch (e) {}
      return storeObject;
    },
    getMintMessage: getMintMessageFunc1,
    extraLogic: async (params: ExtraLogicInterface) => {
      const { collection, runExecute, state } = params;
      const collectionState = state.collectionStates[collection.collectionId];
      if (!collectionState.tokenAddress) return;
      await runExecute(collectionState.tokenAddress, {
        increase_allowance: {
          spender: collection.mintContract,
          amount: `${(collectionState.tokenPrice || 0) * 1e6}`,
        },
      });
    },
  },
  mintpass2Logic: {
    getMintMessage: async (params: GetMintMessageInterface) => {
      const { collection, runQuery } = params;
      // const revealNftCollection = Collections.filter(
      //   (collection) => collection.collectionId === CollectionIds.HOPEGALAXYI
      // )[0];
      // const queryResult = await runQuery(revealNftCollection.nftContract, {
      //   tokens: {
      //     owner: account.address,
      //   },
      // });
      // if (!queryResult?.tokens?.length) {
      //   toast.error("You don't have any hopegalaxy nft!");
      //   return { message: null };
      // }
      const mintStateInfo = await runQuery(collection.mintContract, {
        get_state_info: {},
      });
      if (mintStateInfo?.private_mint) {
        toast.error("Can not mint!");
        return { message: null };
      }
      return {
        message: {
          send: {
            contract: collection.mintContract,
            amount: "1000000",
            msg: btoa(
              JSON.stringify({
                mint_pass: "mintpass",
              })
            ),
          },
        },
        address: TokenStatus[TokenType.HOPE].contractAddress,
      };
    },
  },
  hopeGalaxyLogic: {
    fetchInfo: async (params: LogicParamsInterface) => {
      const { collection, runQuery } = params;
      let storeObject: CollectionStateType = {
        mintCheck: [],
        mintedNfts: 0,
        totalNfts: collection?.mintInfo?.totalNfts || 0,
        maxNfts: 0,
        imageUrl: "",
        price: 0,
        myMintedNfts: null,
      };
      try {
        const queryResult = await runQuery(collection.mintContract, {
          get_state_info: {},
        });
        if (queryResult)
          storeObject = {
            mintCheck: queryResult.check_mint,
            mintedNfts: +(queryResult.total_nft || "0"),
            totalNfts: 2000,
            maxNfts: 2000,
            imageUrl:
              "https://hopegalaxy.mypinata.cloud/ipfs/QmRnRFS19fbs8Bo9VxSKxR3DAJfBqmYNiXPapQKhDTDku6/",
            price: 0,
            myMintedNfts: null,
          };
      } catch (e) {}
      return storeObject;
    },
    getMintMessage: async (params: GetMintMessageInterface) => {
      const { collection, runQuery, account, runExecute } = params;
      const mintpassCollection = Collections.filter(
        (collection) => collection.collectionId === CollectionIds.MINTPASSI
      )[0];
      try {
        const tokens = await runQuery(mintpassCollection.nftContract, {
          tokens: {
            owner: account,
            start_after: undefined,
            limit: 20,
          },
        });
        if (!tokens.tokens?.length) {
          toast.error("You don't have any mintpass.");
          return { message: null };
        }
        const isMint = await runQuery(collection.mintContract, {
          get_state_info: {},
        });
        if (isMint.can_mint === false) {
          toast.error("Mint is stopped for sometime");
          return { message: null };
        }
        const revealResult = await runQuery(mintpassCollection.nftContract, {
          approvals: {
            token_id: tokens.tokens[0],
            include_expired: undefined,
          },
        });
        let flag: boolean = false;
        if (revealResult.approvals.length > 0) {
          revealResult.approvals.forEach((data: any) => {
            if (data.spender === collection.mintContract) flag = true;
          });
        }
        if (revealResult.approvals.length === 0 || flag === false) {
          try {
            await runExecute(mintpassCollection.nftContract, {
              approve: {
                spender: collection.mintContract,
                token_id: tokens.tokens[0],
                expires: undefined,
              },
            });
            toast.success("Approved");
          } catch (err) {
            toast.error("Fail in approve!");
            return { message: null };
          }
        }

        let metadata: any;
        let check_mint = isMint.check_mint;
        let num = Math.floor(Math.random() * 2000);
        while (true) {
          if (num % 2000 < 16) {
            num++;
            continue;
          }
          if (check_mint[num % 2000] === false) {
            num++;
            continue;
          }
          check_mint[num % 2000] = false;
          break;
        }
        await axios
          .get(
            `https://hopegalaxy.mypinata.cloud/ipfs/QmRnRFS19fbs8Bo9VxSKxR3DAJfBqmYNiXPapQKhDTDku6/${
              (num % 2000) + 1
            }.json`
          )
          .then((res) => {
            metadata = res.data;
          });
        if (!metadata) {
          toast.error("Fail!");
          return { message: null };
        }
        return {
          message: {
            reveal_nft: {
              token_id: tokens.tokens[0],
              reveal_id: (num % 2000) + 1,
              mint_msg: {
                image: metadata.image,
                attributes: metadata.attributes,
              },
            },
          },
          funds: { funds: "2" },
        };
      } catch (e) {
        return { message: null };
      }
    },
  },
};
