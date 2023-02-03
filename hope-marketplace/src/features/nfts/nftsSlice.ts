import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import Collections, {
	CollectionIds,
	MarketplaceInfo,
} from "../../constants/Collections";

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
type NFTsStateType = Record<
	| `${CollectionIds}`
	| `${CollectionIds}_listed`
	| `${CollectionIds}_marketplace`,
	any
>;

let initialState: NFTsStateType = {} as NFTsStateType;

Collections.forEach((collection: MarketplaceInfo) => {
	(initialState as any)[collection.collectionId] = [];
	(initialState as any)[`${collection.collectionId}_listed`] = [];
	(initialState as any)[`${collection.collectionId}_marketplace`] = [];
});

export const nftSlice = createSlice({
	name: "nfts",
	initialState,
	reducers: {
		setNFTs: (state, action: PayloadAction<[string, any]>) => {
			const [key, data] = action.payload;
			(state as any)[key] = data;
			return state;
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
