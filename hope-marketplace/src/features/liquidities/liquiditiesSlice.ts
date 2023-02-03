import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import { TPool } from "../../types/pools";
import { Liquidities } from "../../constants/Liquidities";

const initialState: TPool[] = Liquidities.map((liquidity, index) => ({
	id: index + 1,
	token1: liquidity.tokenA,
	token2: liquidity.tokenB,
	token1Reserve: 0,
	token2Reserve: 0,
	isVerified: true,
	apr: "",
	contract: "",
	lpAddress: "",
	pool: 0,
	ratio: 1,
}));

export const liquiditiesSlice = createSlice({
	name: "liquidities",
	initialState,
	reducers: {
		setLiquidityInfo: (state, action: PayloadAction<TPool[]>) => {
			return action.payload;
		},
	},
});

export const { setLiquidityInfo } = liquiditiesSlice.actions;

export default liquiditiesSlice.reducer;
