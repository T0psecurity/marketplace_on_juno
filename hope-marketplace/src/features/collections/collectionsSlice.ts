import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import Collections, {
  CollectionIds,
  MarketplaceInfo,
} from "../../constants/Collections";
import { NFTPriceType } from "../../types/nftPriceTypes";

export type CollectionStateType = {
  mintCheck: boolean[];
  mintedNfts: number;
  totalNfts: number;
  maxNfts: number;
  imageUrl: string;
  myMintedNfts: number | null;
  price: number;
  // tradingInfo?: {
  //   junoMax?: number;
  //   junoMin?: number;
  //   junoTotal: number;
  //   hopeMax?: number;
  //   hopeMin?: number;
  //   hopeTotal: number;
  //   rawMax?: number;
  //   rawMin?: number;
  //   rawTotal: number;
  //   netaMax?: number;
  //   netaMin?: number;
  //   netaTotal: number;
  // };
  tradingInfo?: Record<
    `${NFTPriceType}Max` | `${NFTPriceType}Min` | `${NFTPriceType}Total`,
    number
  >;
  saleHistory?: any[];
  mintInfo?: {
    startMintTime: number;
    mintPeriod: number;
  };
};

export type TotalStateType = { [key in CollectionIds]: CollectionStateType };

export const DEFAULT_COLLECTION_STATE = {
  mintCheck: [],
  mintedNfts: 0,
  totalNfts: 0,
  maxNfts: 0,
  imageUrl: "",
  myMintedNfts: null,
  price: 0,
  saleHistory: [],
};

let initialState: TotalStateType = {} as TotalStateType;

Collections.forEach((collection: MarketplaceInfo) => {
  initialState[collection.collectionId] = DEFAULT_COLLECTION_STATE;
});

export const collectionSlice = createSlice({
  name: "collectionStates",
  initialState,
  reducers: {
    setCollectionState: (state, action: PayloadAction<[string, any]>) => {
      const [key, data] = action.payload;
      state[key as CollectionIds] = data;
    },
  },
});

export const { setCollectionState } = collectionSlice.actions;

export default collectionSlice.reducer;
