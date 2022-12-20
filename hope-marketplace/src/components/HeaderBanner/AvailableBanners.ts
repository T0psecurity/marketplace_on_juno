import React, { Dispatch, SetStateAction } from "react";
import HopersPresaleBanner from "./HopersPresaleBanner";

export enum BANNERS {
	HOPPERS = "hoppers",
}

export interface IBannerComponent {
	setReadyForDisplay: Dispatch<SetStateAction<boolean>>;
}

export type TAvailableBanner = {
	id: BANNERS;
	component: React.FC<IBannerComponent>;
};
export const AvailableBanners: TAvailableBanner[] = [
	{
		id: BANNERS.HOPPERS,
		component: HopersPresaleBanner,
	},
];
