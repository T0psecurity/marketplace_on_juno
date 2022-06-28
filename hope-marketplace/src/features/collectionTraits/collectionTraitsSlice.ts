import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import Collections, { MarketplaceInfo } from "../../constants/Collections";

export type CollectionTraitsStateType = {
  total: number;
  [key: string]: number;
};

export const DEFAULT_COLLECTION_STATE = {
  total: 0,
};

let initialState: { [key: string]: CollectionTraitsStateType } = {};

Collections.forEach((collection: MarketplaceInfo) => {
  initialState[collection.collectionId] = DEFAULT_COLLECTION_STATE;
});

export const collectionTraitsSlice = createSlice({
  name: "collectionTraitStates",
  initialState,
  reducers: {
    setCollectionTraitStates: (state, action: PayloadAction<[string, any]>) => {
      const [key, data] = action.payload;
      state[key] = data;
    },
  },
});

export const { setCollectionTraitStates } = collectionTraitsSlice.actions;

export default collectionTraitsSlice.reducer;
