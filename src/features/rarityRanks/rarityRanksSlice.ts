import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import Collections, {
  CollectionIds,
  MarketplaceInfo,
} from "../../constants/Collections";

export type RarityRankStateType = {
  [key: number]: {
    weight: number;
    rank: number;
  };
};

export type TotalStateType = { [key in CollectionIds]: RarityRankStateType };

export const DEFAULT_COLLECTION_STATE = {};

let initialState: TotalStateType = {} as TotalStateType;

Collections.forEach((collection: MarketplaceInfo) => {
  initialState[collection.collectionId] = DEFAULT_COLLECTION_STATE;
});

export const RarityRankSlice = createSlice({
  name: "rarityRank",
  initialState,
  reducers: {
    setRarityRankState: (state, action: PayloadAction<[string, any]>) => {
      const [key, data] = action.payload;
      state[key as CollectionIds] = data;
    },
  },
});

export const { setRarityRankState } = RarityRankSlice.actions;

export default RarityRankSlice.reducer;
