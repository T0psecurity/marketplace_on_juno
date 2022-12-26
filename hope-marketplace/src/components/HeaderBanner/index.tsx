import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setBannersStatus } from "../../features/banners/bannersSlice";
import { AvailableBanners } from "./AvailableBanners";
import {
	CloseIcon,
	LeftImage,
	MainContent,
	RightImage,
	Wrapper,
} from "./styled";

const HeaderBanner: React.FC = () => {
	const [imageLoadedRight, setImageLoadedRight] = useState(false);
	const [imageLoadedLeft, setImageLoadedLeft] = useState(false);
	const [componentLoaded, setComponentLoaded] = useState(false);

	const dispatch = useAppDispatch();
	const bannersStatus = useAppSelector((state) => state.banners);

	const displayedBanner = useMemo(
		() => AvailableBanners.filter((banner) => !bannersStatus[banner.id])[0],
		[bannersStatus]
	);

	const handleClickHideBanner = () => {
		const hideBannerId = displayedBanner?.id;
		if (hideBannerId) {
			dispatch(setBannersStatus([hideBannerId, true]));
		}
	};

	if (!displayedBanner) return null;

	return (
		<Wrapper
			imageLoaded={imageLoadedLeft && imageLoadedRight && componentLoaded}
		>
			<LeftImage
				alt=""
				src="/banner-images/celebrating_icon_left.png"
				onLoad={() => setImageLoadedLeft(true)}
			/>
			<MainContent>
				<displayedBanner.component setReadyForDisplay={setComponentLoaded} />
			</MainContent>
			<RightImage
				alt=""
				src="/banner-images/celebrating_icon_right.png"
				onLoad={() => setImageLoadedRight(true)}
			/>
			<CloseIcon onClick={handleClickHideBanner} />
		</Wrapper>
	);
};

export default HeaderBanner;
