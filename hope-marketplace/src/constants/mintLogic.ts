import { MarketplaceInfo } from "./Collections";
import { CollectionStateType } from "../features/collections/collectionsSlice";

export interface LogicParamsInterface {
  collection: MarketplaceInfo;
  runQuery: any;
  account?: string;
}

export interface GetMintMessageInterface {
  collection: MarketplaceInfo;
}

export interface MintLogicItemInterface {
  fetchInfo: (params: LogicParamsInterface) => Promise<CollectionStateType>;
  getMintMessage?: (params: GetMintMessageInterface) => any;
}

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
    getMintMessage: (params: GetMintMessageInterface) => ({
      mint: { address: params.collection.nftContract },
    }),
  },
};
