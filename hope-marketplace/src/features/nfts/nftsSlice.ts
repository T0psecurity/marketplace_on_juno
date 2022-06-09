import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import Collections, { MarketplaceInfo } from "../../constants/Collections";

// const initialState = {
//   unlistedNFTs: [],
//   listedNFTs: [],
//   marketplaceNFTs: [],
//   selectedNFT: {
//     token_id: "",
//     seller: "",
//     list_price: {
//       denom: "",
//       amount: "",
//     },
//     id:""
//   },
// };

let initialState: { [key: string]: any } = {};

Collections.forEach((collection: MarketplaceInfo) => {
  initialState[collection.collectionId] = [];
  initialState[`${collection.collectionId}_listed`] = [];
  initialState[`${collection.collectionId}_marketplace`] = [];
});

export const nftSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {
    setNFTs: (state, action: PayloadAction<[string, any]>) => {
      const [key, data] = action.payload;
      state[key] = data;
    },
    // setUnlistedNFTs: (state, action: PayloadAction<[]>) => {
    //   state.unlistedNFTs = action.payload;
    // },
    // setListedNFTs: (state, action: PayloadAction<[]>) => {
    //   state.listedNFTs = action.payload;
    // },
    // setMarketplaceNFTs: (state, action: PayloadAction<[]>) => {
    //   state.marketplaceNFTs = action.payload;
    // },
    // setSelectedNFT: (state, action: PayloadAction<any>) => {
    //   state.selectedNFT = action.payload;
    // },
  },
});

export const {
  setNFTs,
  // setUnlistedNFTs,
  // setListedNFTs,
  // setMarketplaceNFTs,
  // setSelectedNFT,
} = nftSlice.actions;

export default nftSlice.reducer;
