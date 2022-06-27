import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import Collections, { MarketplaceInfo } from "../../constants/Collections";

export type CollectionStateType = {
  mintCheck: boolean[];
  mintedNfts: number;
  totalNfts: number;
  maxNfts: number;
  imageUrl: string;
  myMintedNfts: number | null;
  price: number;
  tradingInfo?: {
    junoMax?: number;
    junoMin?: number;
    junoTotal: number;
    hopeMax?: number;
    hopeMin?: number;
    hopeTotal: number;
  };
};

export const DEFAULT_COLLECTION_STATE = {
  mintCheck: [],
  mintedNfts: 0,
  totalNfts: 0,
  maxNfts: 0,
  imageUrl: "",
  myMintedNfts: null,
  price: 0,
};

let initialState: { [key: string]: CollectionStateType } = {};

Collections.forEach((collection: MarketplaceInfo) => {
  initialState[collection.collectionId] = DEFAULT_COLLECTION_STATE;
});

export const collectionSlice = createSlice({
  name: "collectionStates",
  initialState,
  reducers: {
    setCollectionState: (state, action: PayloadAction<[string, any]>) => {
      const [key, data] = action.payload;
      state[key] = data;
    },
  },
});

export const { setCollectionState } = collectionSlice.actions;

export default collectionSlice.reducer;
