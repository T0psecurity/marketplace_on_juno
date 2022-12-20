import React, { useEffect } from "react";
import Countdown from "react-countdown";
import { IDOIds } from "../../constants/IDOs";
import { PresaleState } from "../../pages/IDO/type";
import useIDOStatus from "../../pages/IDO/useIDOStatus";
import { IBannerComponent } from "./AvailableBanners";
import { HopersBannerWrapper, StyledText as Text } from "./styled";

const HopersPresaleBanner: React.FC<IBannerComponent> = ({
	setReadyForDisplay,
}) => {
	const { idoStatus } = useIDOStatus(IDOIds.HOPERS);

	useEffect(() => {
		if (idoStatus.crrState === PresaleState.BEFORE) setReadyForDisplay(true);
		else setReadyForDisplay(false);
	}, [idoStatus, setReadyForDisplay]);

	if (idoStatus.crrState !== PresaleState.BEFORE) return null;

	return (
		<HopersBannerWrapper>
			<Text>Hopers Token launching countdown</Text>
			<Countdown
				key="hopers-presale-countdown"
				daysInHours
				date={new Date(idoStatus.startTime)}
				renderer={({ days, hours, minutes, seconds, completed }) => {
					if (completed) return null;
					const totalHours = days * 24 + hours;
					return <Text>{`${totalHours} : ${minutes} : ${seconds}`}</Text>;
				}}
			/>
		</HopersBannerWrapper>
	);
};

export default HopersPresaleBanner;
