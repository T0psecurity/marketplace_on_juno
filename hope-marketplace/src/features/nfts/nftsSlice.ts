import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  unlistedNFTs: [],
  listedNFTs: [],
  marketplaceNFTs: [],
};

export const nftSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {
    setUnlistedNFTs: (state, action: PayloadAction<[]>) => {
      state.unlistedNFTs = action.payload;
    },
    setListedNFTs: (state, action: PayloadAction<[]>) => {
      state.listedNFTs = action.payload;
    },
    setMarketplaceNFTs: (state, action: PayloadAction<[]>) => {
      state.marketplaceNFTs = action.payload;
    },
  },
});

export const { setUnlistedNFTs, setListedNFTs, setMarketplaceNFTs } =
  nftSlice.actions;

export default nftSlice.reducer;
