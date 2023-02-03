import styled, { css, keyframes } from "styled-components";
import Button from "../../components/Button";
import Text from "../../components/Text";
import Flex from "../../components/Flex";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
`;

export const MainPart = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 10px;
	box-sizing: border-box;
	margin-bottom: 30px;
`;

export const ChartArea = styled.div`
	width: 100%;
	height: 100%;
	border: 1px solid red;
`;

export const SwapArea = styled.div`
	width: 430px;
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
`;

export const SwapAreaHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding: 20px 0;
	border-bottom: 1px solid ${({ theme }) => theme.colors.fontColor};
	svg {
		fill: ${({ theme }) => theme.colors.fontColor};
	}
`;

export const SwapAreaBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`;

export const SwapAreaFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 5px 20px;
	box-sizing: border-box;
	background-color: rgba(2, 226, 150, 0.12);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	font-weight: bold;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
`;

const collapseAnimation = keyframes`
    from {
        height: 81px;
    }
    to {
        height: 0px;
    }
`;

const expandAnimation = keyframes`
    from {
        height: 0px;
    }
    to {
        height: 81px;
    }
`;

export const SlippageSelector = styled.div<{ expanded: boolean | null }>`
	width: 100%;
	overflow: hidden;
	box-sizing: border-box;
	height: 0;
	animation: ${({ expanded }) =>
		expanded
			? css`
					${expandAnimation} 500ms linear forwards
			  `
			: expanded === null
			? null
			: css`
					${collapseAnimation} 500ms linear forwards
			  `};
`;

export const SlippageItemsContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 10px;
	margin-top: 10px;
	padding-bottom: 10px;
`;

export const SlippageItem = styled.div`
	width: 100%;
	height: 40px;
	background: rgba(2, 226, 150, 0.12);
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	color: #686868;
	font-size: 20px;
`;

export const SwapItem = styled.div`
	width: 100%;
	img {
		width: 30px;
	}
	svg {
		fill: ${({ theme }) => theme.colors.fontColor};
	}
`;

export const AmountInputer = styled.div<{ hasError?: boolean }>`
	position: relative;
	margin: 10px 0;

	& > input {
		width: 100%;
		height: 70px;
		background: rgba(2, 226, 150, 0.12);
		border: 1px solid #02e296;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 15px;
		color: ${({ theme }) => theme.colors.fontColor};
		text-align: right;
		font-weight: bold;
		font-size: 20px;
		padding: 10px 20px 40px 20px;
		box-sizing: border-box;
		${({ hasError }) =>
			hasError &&
			css`
				border-color: #e20202;
				border-width: 2px;
			`}
	}
`;

export const AutoInputButtonContainer = styled(Flex)`
	gap: 10px;
	align-items: center;
	position: absolute;
	right: 20px;
	top: -25px;
`;

export const SelectMaxButton = styled(Text)`
	text-decoration: underline;
	cursor: pointer;
	font-weight: bold;
`;

export const SwapButton = styled(Button)`
	width: 100%;
	height: 60px;
	background: #02e296;
	border: 1px solid #000;
	border-radius: 15px;
	color: white;
	font-size: 20px;
	font-weight: bold;
`;
