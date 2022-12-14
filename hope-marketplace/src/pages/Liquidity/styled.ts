import styled, { css } from "styled-components";
import Button from "../../components/Button";
import { GearIcon } from "../../components/SvgIcons";
import Text from "../../components/Text";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const LiquidityHeader = styled.div`
	width: 100%;
`;

export const LiquidityList = styled.div`
	background: white;
	border: 1px solid #02e296;
	border-radius: 15px;
	width: 430px;
`;

export const ListHeader = styled.div`
	position: relative;
	padding: 20px;
	border-bottom: 1px solid #000;
	position: relative;
`;

export const StyledGearIcon = styled(GearIcon)`
	position: absolute;
	right: 20px;
	top: 20px;
	fill: black;
	cursor: pointer;
`;

export const ListBody = styled.div`
	min-height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const MessageContainer = styled.div`
	width: 100%;
	padding: 30px 0 40px;
	margin: auto;
	color: #787878;
	background-color: rgba(217, 217, 217, 35);
`;

export const ConnectWalletButton = styled(Button)`
	width: 350px;
	background: #02e296;
	border: 1px solid black;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	color: white;
	font-weight: bold;
	font-size: 20px;
`;

export const LiquiditiesContainer = styled.div`
	margin: 100px 0;
`;

export const LiquiditiesTable = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	align-items: center;
`;

export const LiquiditiesTableHeaderRow = styled.div`
	display: contents;
`;

export const LiquidityTableContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 95px;
	background: white;
`;

const tableBodyBorderColor = "#02e296";
const tableBorderRadius = "15px";

export const LiquidityTableHeader = styled(Text)`
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50px;
	margin-bottom: 10px;
	font-weight: bold;
	background: rgba(15, 206, 137, 0.4);
	&:first-child {
		border-bottom-left-radius: ${tableBorderRadius};
		border-top-left-radius: ${tableBorderRadius};
	}
	&:last-child {
		border-bottom-right-radius: ${tableBorderRadius};
		border-top-right-radius: ${tableBorderRadius};
	}
`;

export const LiquiditiesTableBody = styled.div`
	display: contents;
	color: black;
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	margin-top: 20px;
`;

export const LiquiditiesTableRow = styled.div`
	display: contents;
	${LiquidityTableContent} {
		border-bottom: 1px solid #d9d9d9;
		&:first-child {
			border-left: 1px solid ${tableBodyBorderColor};
		}
		&:last-child {
			border-right: 1px solid ${tableBodyBorderColor};
		}
	}
	&:first-child {
		${LiquidityTableContent} {
			border-top: 1px solid ${tableBodyBorderColor};
			&:first-child {
				border-top-left-radius: ${tableBorderRadius};
			}
			&:last-child {
				border-top-right-radius: ${tableBorderRadius};
			}
		}
	}
	&:last-child {
		${LiquidityTableContent} {
			border-bottom: 1px solid ${tableBodyBorderColor};
			&:first-child {
				border-bottom-left-radius: ${tableBorderRadius};
			}
			&:last-child {
				border-bottom-right-radius: ${tableBorderRadius};
			}
		}
	}
`;

export const LiquidityPoolName = styled(Text)<{ poolId: number }>`
	position: relative;
	color: black;
	font-size: 18px;
	font-weight: bold;
	height: max-content;
	justify-content: flex-start;
	&::after {
		content: ${({ poolId }) =>
			`"Pool #${poolId > 99 ? "" : poolId > 9 ? "0" : "00"}${poolId}"`};
		position: absolute;
		left: 0;
		top: 100%;
		width: max-content;
		color: #c5c5c5;
	}
`;

export const StyledText = styled(Text)`
	color: black;
`;

export const LiquidityImage = styled.div`
	display: flex;
	align-items: center;
	img {
		&:nth-child(1) {
			width: 40px;
			height: 40px;
		}
		&:nth-child(2) {
			width: 60px;
			height: 60px;
			transform: translate(-30%, 0);
		}
	}
`;

export const LiquidityTableControlPanel = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
`;

export const LiquidityTableTabContainer = styled.div<{ isRight: boolean }>`
	display: flex;
	align-items: center;
	position: relative;
	&:before {
		content: "";
		position: absolute;
		background: #02e296;
		height: 100%;
		width: 165px;
		border-radius: 15px;
		transition: all 0.5s;
		${({ isRight }) =>
			isRight
				? css`
						left: 143px;
						width: 138px;
				  `
				: css`
						left: 0;
				  `}
	}
`;

export const LiquidityTableTab = styled(Text)<{ checked: boolean }>`
	cursor: pointer;
	border-radius: 15px;
	position: relative;
	font-size: 18px;
	font-weight: bold;
	padding: 10px 30px;
	text-align: center;
	color: ${({ checked }) => (checked ? "white" : "#7e7e7e")};
	background: rgba(15, 206, 137, 0.4);
	/* width: 165px; */
	&:last-child {
		left: -20px;
		/* width: 140px; */
	}
`;

export const LiquidityTableSearchInputer = styled.input`
	height: 40px;
	width: 80px;
	background: rgba(15, 206, 137, 0.4);
	opacity: 0.3;
	transition: all 0.5s;
	text-align: right;
	border-radius: 15px;
	border: none;
	font-size: 16px;
	padding: 0 20px;
	color: white;
	&:focus {
		width: 200px;
		opacity: 1;
	}
	&::placeholder {
		color: #cbcaca;
	}
`;
