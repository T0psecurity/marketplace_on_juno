import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import Collections, { MarketplaceInfo } from "../../constants/Collections";

let initialState: { [key: string]: any } = {};

Collections.forEach((collection: MarketplaceInfo) => {
  initialState[collection.collectionId] = {};
});

export const nftSlice = createSlice({
  name: "collectionStates",
  initialState,
  reducers: {
    setCollectionState: (state, action: PayloadAction<[string, any]>) => {
      const [key, data] = action.payload;
      state[key] = data;
    },
  },
});

export const { setCollectionState } = nftSlice.actions;

export default nftSlice.reducer;
