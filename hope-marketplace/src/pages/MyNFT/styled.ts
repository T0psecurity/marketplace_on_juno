import styled, { css } from "styled-components";
import ExploreHeader from "../../components/ExploreHeader";

import { Tabs as OriginTabs, Tab as OriginTab } from "../../components/Tab";
import ToggleButton from "../../components/ToggleButton";
import Button from "../../components/Button";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
	height: 100%;
	/* width: calc(100% - ${({ isMobile }) => (isMobile ? 10 : 100)}px); */
	padding: 0 ${({ isMobile }) => (isMobile ? 10 : 100)}px;
	color: ${({ theme }) => theme.colors.fontColor};
`;

export const MyAssetsArea = styled.div`
	min-height: 450px;
`;

export const TokenTypeString = styled.div`
	position: relative;
	font-size: 20px;
	padding: 20px;
	text-align: left;

	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 20px;
	& > span {
		font-size: 16px;
		margin-left: 20px;
	}
`;

export const IBCDepositWithdrawButtons = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const IBCDepositWithdrawButton = styled(Button)`
	margin: 0;
	padding: 0;
	width: 110px;
	height: max-content;
	font-size: 18px;
	background: rgba(2, 226, 150, 0.2);
	border: 2px solid #02e296;
	border-radius: 10px;
	color: ${({ theme }) => theme.colors.fontColor};
`;

export const ProfileImage = styled.div`
	background: url("/others/user-hopers.jpg");
	background-size: cover;
	width: 50px;
	height: 50px;
	margin: 0 10px;
`;

export const HorizontalDivider = styled.div`
	height: 1px;
	background-color: #ccc;
`;

export const TokenBalancesWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 20px;
	margin-bottom: 20px;
	margin-left: 20px;
	min-height: 30px;
`;

export const Balances = styled.div`
	display: contents;
	&:empty {
		&:before {
			content: "No Assets";
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 18px;
		}
	}
`;

export const TokenBalanceItem = styled.div<{ marginBottom?: string }>`
	width: max-content;
	min-width: 180px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	cursor: pointer;
	margin: 10px;
	border: 1px solid rgba(0, 0, 0, 0.6);
	border-radius: 10px;
	padding: 10px;
	position: relative;
	background-color: ${({ theme }) => theme.colors.panelBackgroundColor};
	${({ marginBottom }) =>
		marginBottom &&
		css`
			margin-bottom: ${marginBottom};
		`};
`;

export const WithdrawButton = styled.div`
	position: absolute;
	cursor: pointer;
	bottom: -25px;
	width: max-content;
	left: 50%;
	transform: translateX(-50%);
`;

export const CoinIconWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const CoinIcon = styled.img<{ size?: string }>`
	width: ${({ size }) => size || "35px"};
	height: ${({ size }) => size || "35px"};
	margin-right: 5px;
	cursor: pointer;
`;

export const TokenBalance = styled.div<{ color?: string; chainName?: string }>`
	font-weight: bold;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	position: relative;
	${({ color }) =>
		color &&
		css`
			color: ${color};
		`};
	${({ chainName }) =>
		chainName &&
		css`
			&::after {
				content: "${chainName}";
				/* position: absolute;
				top: 100%;
				left: 0; */
				width: max-content;
				font-size: 15px;
				color: #ccc;
			}
		`}
`;

export const MyNftsHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 20px;
`;

export const Tabs = styled(OriginTabs)<{ margin?: string }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 10px;
	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`}/* width: 100%; */
`;

export const Tab = styled(OriginTab)<{ selected: boolean; fontSize?: string }>`
	cursor: pointer;
	margin-right: 20px;
	${({ selected, theme }) =>
		selected &&
		css`
			font-weight: bold;
			border-bottom: 2px solid ${theme.colors.fontColor};
		`}

	${({ fontSize }) =>
		fontSize &&
		css`
			font-size: ${fontSize};
		`}
  &:last-child {
		margin-right: 0;
	}
`;

export const SearchWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 350px;
`;

export const ActivityHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
`;

export const TokenContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 20px;
`;

export const ChartArea = styled.div`
	background: url(${({ theme }) =>
		`/others/chartLogo${theme.isDark ? "_dark" : ""}.png`});
	background-repeat: no-repeat;
	background-position: center bottom;
	display: flex;
	justify-content: center;
	.recharts-responsive-container {
		min-height: 300px;
	}
	svg {
		overflow: visible;
	}
	@media (min-width: 600px) {
		float: right;
		width: 80vw;
		height: 80vw;
		max-width: 400px;
		max-height: 400px;
	}
	@media (max-width: 600px) {
		margin-bottom: 20px;
	}
`;

export const StyledExploreHeader = styled(ExploreHeader)`
	/* grid-template-columns: auto 1fr auto;
  @media (max-width: 800px) {
    grid-template-columns: auto 1fr;
  } */
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 20px;
`;

export const ReceivedOfferBanner = styled.div`
	position: relative;
	background: url("/others/offer_background.png");
	width: 800px;
	height: 73px;
	max-width: 100%;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	@media (max-width: 1450px) {
		width: 600px;
	}
	@media (max-width: 1350px) {
		width: 450px;
		background-image: url("/others/offer_background_mobile.png");
	}
	@media (max-width: 1190px) {
		width: 100%;
		background-image: url("/others/offer_background.png");
	}
	@media (max-width: 575px) {
		background-image: url("/others/offer_background_mobile.png");
	}
`;

export const MyOfferButton = styled.div`
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	padding: 5px;
	background-color: white;
	border: 1px solid rgba(0, 0, 0, 0.6);
	border-radius: 10px;
	cursor: pointer;
`;

export const OffersContainer = styled.div`
	margin-bottom: 50px;
	table {
		width: 100%;
		table-layout: fixed;
		tr {
			th,
			td {
				color: ${({ theme }) => theme.colors.fontColor};
				min-width: 85px;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
`;

export const ItemTd = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	& > img {
		height: 100px;
	}
`;

export const TokenNameContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const AcceptWithdrawBidButton = styled.div`
	outline: 0;
	border: 0;
	cursor: pointer;
	user-select: none;
	background-color: #02e296;
	color: white;
	border-radius: 10px;
	padding: 5px 10px;
	font-size: 20px;
	font-weight: bold;
	transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	&:hover {
		opacity: 0.6;
		box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
			0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
	}
`;

export const StyledToggleButton = styled(ToggleButton)`
	position: absolute;
	right: 0;
	top: 0;
	transform: translateY(-100%);
`;
