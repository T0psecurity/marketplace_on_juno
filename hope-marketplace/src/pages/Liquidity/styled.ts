import styled, { css } from "styled-components";
import Button from "../../components/Button";
import Flex from "../../components/Flex";
import { GearIcon } from "../../components/SvgIcons";
import Text from "../../components/Text";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
`;

export const LiquidityHeader = styled.div`
	width: 100%;
`;

export const LiquidityList = styled.div`
	background: white;
	border: 1px solid #02e296;
	border-radius: 15px;
	width: 420px;
	@media (max-width: 600px) {
		width: 380px;
	}
`;

export const ListHeader = styled.div`
	position: relative;
	padding: 20px;
	border-bottom: 1px solid #000;
	position: relative;
	.remove-button {
		position: absolute;
		right: 10px;
		top: 10px;
		color: #02e296;
		cursor: pointer;
	}
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
	width: 100%;
	margin: 50px 0 100px;
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

export const StyledText = styled(Text)`
	color: black;
`;

export const AddRemoveLiquidityWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 10px;
	box-sizing: border-box;
	position: relative;
	gap: 10px;
	& > svg {
		cursor: pointer;
		position: absolute;
		right: 5px;
		top: 5px;
	}
`;

export const AddRemoveLiquidityFooter = styled(Flex)`
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 10px;
`;

export const AddRemoveLiquidityActionButton = styled(Button)`
	width: 350px;
	background: rgba(2, 226, 150, 0.15);
	border: 1px solid black;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	color: black;
	font-weight: bold;
	font-size: 20px;
`;

export const SelectAddPoolItem = styled.div<{ checked?: boolean }>`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px;
	${({ checked }) =>
		checked &&
		css`
			background-color: rgba(2, 226, 150, 0.5);
		`}
	&:hover {
		background-color: rgba(2, 226, 150, 0.15);
	}
`;

export const SelectPoolContainer = styled.div`
	display: flex;
	${SelectAddPoolItem} {
		&:hover {
			background-color: unset;
		}
	}
`;

export const TokenAmountInputerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	padding: 10px;
`;

export const TokenAmountInput = styled(Flex)`
	width: 100%;
	height: 70px;
	align-items: center;
	justify-content: space-between;
	padding: 5px 10px;
	background-color: rgba(2, 226, 150, 0.15);
	border: 1px solid black;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	box-sizing: border-box;

	& > input {
		width: 50%;
		height: 100%;
		border: none;
		background: transparent;
		text-align: right;
	}
`;

export const TokenImage = styled(Flex)<{ horizontalName?: boolean }>`
	flex-direction: ${({ horizontalName }) =>
		horizontalName ? "row" : "column"};
	align-items: center;
	gap: 2px;
	font-weight: bold;
	font-size: 14px;
	width: max-content;

	& > img {
		width: 40px;
		height: 40px;
	}
`;

export const SelectRemovePoolContainer = styled.div`
	background-color: rgba(2, 226, 150, 0.15);
	border: 1px solid black;
	border-radius: 15px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	padding: 10px;
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const SelectRemovePoolItem = styled.div<{ checked?: boolean }>`
	display: flex;
	flex-direction: column;
	padding: 10px 0;
	${({ checked }) =>
		checked &&
		css`
			background-color: rgba(2, 226, 150, 0.5);
		`}
	&:hover {
		background-color: rgba(2, 226, 150, 0.15);
	}
`;

export const RemovePoolName = styled(Text)`
	font-size: 10px;
	color: black;
	font-weight: bold;
`;

export const RemovePoolTotalValueContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const RemoveAmountAutoInput = styled(Text)<{ checked: boolean }>`
	width: 60px;
	height: 30px;
	align-items: center;
	cursor: pointer;
	border: 0.3px solid #000000;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 4px;
	font-weight: bold;
	color: ${({ checked }) => (checked ? "white" : "#787878")};
	background-color: ${({ checked }) =>
		checked ? "#02e296" : "rgba(2, 226, 150, 0.15)"};
`;
