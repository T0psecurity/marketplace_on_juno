import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import { TPool } from "../../types/pools";

const initialState: TPool[] = [] as TPool[];

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
