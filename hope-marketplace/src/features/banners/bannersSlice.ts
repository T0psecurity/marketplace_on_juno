import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BANNERS } from "../../components/HeaderBanner/AvailableBanners";

export type BannerStatusType = {
	[key in BANNERS]: boolean;
};

let initialState: BannerStatusType = {} as BannerStatusType;

export const bannersSlice = createSlice({
	name: "bannersStatus",
	initialState,
	reducers: {
		clearBannersStatus: (state, action: PayloadAction) => {
			(Object.keys(BANNERS) as Array<keyof typeof BANNERS>).forEach(
				(key) => (state[BANNERS[key]] = false)
			);
		},
		setBannersStatus: (state, action: PayloadAction<[BANNERS, boolean]>) => {
			const data = action.payload;
			state[data[0]] = data[1];
		},
	},
});

export const { clearBannersStatus, setBannersStatus } = bannersSlice.actions;

export default bannersSlice.reducer;
