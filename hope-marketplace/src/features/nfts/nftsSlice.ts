import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  unlistedNFTs: [],
  listedNFTs: [],
  marketplaceNFTs: [],
  selectedNFT: {
    token_id: "",
    seller: "",
    list_price: {
      denom: "",
      amount: "",
    },
  },
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
    setSelectedNFT: (state, action: PayloadAction<any>) => {
      state.selectedNFT = action.payload;
    },
  },
});

export const {
  setUnlistedNFTs,
  setListedNFTs,
  setMarketplaceNFTs,
  setSelectedNFT,
} = nftSlice.actions;

export default nftSlice.reducer;
