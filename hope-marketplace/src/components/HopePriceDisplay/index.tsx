import React from "react";
import { IDOIds } from "../../constants/IDOs";
import useIDOStatus from "../../pages/IDO/useIDOStatus";
import { useAppSelector } from "../../app/hooks";
import { TokenType } from "../../types/tokens";
import { addSuffix } from "../../util/string";
import { PresaleState } from "../../pages/IDO/type";
import {
	HopeName,
	HopePrice,
	// PercentageChange,
	Wrapper,
} from "./styled";
import { HopersIcon } from "../SvgIcons";

// const ArrowIcon = () => (
//   <svg
//     width="20"
//     height="17"
//     viewBox="0 0 20 17"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M11.885 0.627668C11.9817 0.723724 12.395 1.08641 12.735 1.42426C14.8733 3.40497 18.3733 8.57204 19.4417 11.2765C19.6133 11.6872 19.9767 12.7256 20 13.2804C20 13.812 19.88 14.3188 19.6367 14.8023C19.2967 15.4052 18.7617 15.8887 18.13 16.1537C17.6917 16.3243 16.38 16.5893 16.3567 16.5893C14.9217 16.8543 12.59 17 10.0133 17C7.55833 17 5.32167 16.8543 3.865 16.6373C3.84167 16.6125 2.21166 16.3475 1.65333 16.0577C0.633331 15.5261 -1.68771e-06 14.4877 -1.59057e-06 13.3764L-1.58217e-06 13.2804C0.0249981 12.5566 0.658331 11.0347 0.681666 11.0347C1.75167 8.47599 5.08 3.42815 7.29167 1.39942C7.29167 1.39942 7.86 0.828057 8.215 0.57964C8.725 0.192109 9.35667 9.76879e-07 9.98833 1.0321e-06C10.6933 1.09373e-06 11.35 0.216953 11.885 0.627668Z"
//       fill="#02E296"
//     />
//   </svg>
// );

const HopePriceDisplay: React.FC = () => {
	const { idoStatus } = useIDOStatus(IDOIds.HOPERS);
	// const liquidities = useAppSelector((state) => state.liquidities);
	const hopersPriceState = useAppSelector(
		(state) => state.tokenPrices[TokenType.HOPERS]
	);

	const hopersPrice = hopersPriceState?.market_data?.current_price?.usd || 0;

	// const junoPrice = useAppSelector(
	// 	(state) => state.tokenPrices[TokenType.JUNO]
	// );

	// const hopersJunoLiquidity = liquidities.find(
	// 	(liquidity) =>
	// 		liquidity.token1 === TokenType.HOPERS &&
	// 		liquidity.token2 === TokenType.JUNO
	// );

	// const hopersPrice = useMemo(() => {
	// 	if (!hopersJunoLiquidity) return 0;
	// 	const junoPriceInUsd =
	// 		Number(junoPrice?.market_data?.current_price?.usd) || 0;
	// 	const ratio = hopersJunoLiquidity.ratio || 0;

	// 	return junoPriceInUsd * ratio;
	// }, [hopersJunoLiquidity, junoPrice?.market_data?.current_price?.usd]);

	// const hopePrice = useAppSelector(
	//   (state) => state.tokenPrices[TokenType.HOPE]
	// );
	// const priceInfo = useMemo(() => {
	//   const marketData = hopePrice?.market_data;
	//   return {
	//     price: marketData?.current_price?.usd || 0,
	//     percentage: (marketData?.price_change_percentage_24h || 0).toLocaleString(
	//       "en-US",
	//       {
	//         maximumFractionDigits: 2,
	//       }
	//     ),
	//   };
	// }, [hopePrice]);

	return (
		<Wrapper>
			<HopersIcon />
			<HopeName>$HOPERS</HopeName>
			<HopePrice
				status={
					idoStatus.crrState === PresaleState.BEFORE ? "IDO SCHEDULED" : ""
				}
			>{`${addSuffix(hopersPrice, 3)}$`}</HopePrice>
			{/* <HopePrice>{`${priceInfo.price}$`}</HopePrice>
      <PercentageChange isNegative={priceInfo.percentage < 0}>
        {`(${priceInfo.percentage}%)`}
        <ArrowIcon />
      </PercentageChange> */}
		</Wrapper>
	);
};

export default HopePriceDisplay;
