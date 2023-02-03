import styled, { css } from "styled-components";
import Button from "../Button";
import Flex from "../Flex";
import Modal from "../Modal";
import Text from "../Text";

export const BondAmountInputer = styled.input<{ hasError: boolean }>`
	width: 50%;
	height: 25px;
	background-color: white;
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	margin: auto;
	text-align: right;
	padding: 10px;
	${({ hasError }) =>
		hasError &&
		css`
			border-color: #e20202;
			border-width: 2px;
		`}
`;

export const ManageBondModalWrapper = styled(Modal)`
	width: 40vw;
	max-width: 500px;
	height: max-content;
	max-height: 70vh;
	min-height: 200px;
	border: 1px solid #02e296;
	border-radius: 30px;
	padding: 20px 30px;
	overflow-y: auto;
	overflow-x: hidden;
	@media (max-width: 700px) {
		width: 60vw;
	}
	@media (max-width: 500px) {
		width: 70vw;
	}
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin-bottom: 20px;
`;

export const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ModalTabContainer = styled.div<{ isRight: boolean }>`
	display: flex;
	align-items: center;
	position: relative;
	margin: 20px 0;
	&:before {
		content: "";
		position: absolute;
		background: #02e296;
		height: 100%;
		width: 106px;
		border-radius: 15px;
		transition: all 0.5s;
		${({ isRight }) =>
			isRight
				? css`
						left: 86px;
						width: 128px;
				  `
				: css`
						left: 0;
				  `}
	}
`;

export const ModalTab = styled(Text)<{ checked: boolean }>`
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

export const UnbondingPeriodContainer = styled(Flex)`
	justify-content: center;
	align-items: center;
	gap: 5px;
	margin: 10px 0;
	position: relative;
	&::before {
		content: "Unbonding Period";
		position: absolute;
		top: 0;
		left: 50%;
		color: #aaa;
		width: max-content;
		font-size: 14px;
		transform: translate(-50%, -100%);
	}
`;

export const UnbondingPeriodItem = styled.div<{ disabled: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	background-color: ${({ disabled }) => (disabled ? "#d9d9d9" : "#64d797")};
	border-radius: 15px;
	color: ${({ disabled }) => (disabled ? "#aaa" : "white")};
	cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const UnbondHistoryContainer = styled.div``;

export const UnbondHistoryTable = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-height: 20vh;
	overflow: auto;
	gap: 10px;
	margin-bottom: 10px;
`;

export const UnbondItem = styled(Flex)`
	width: 100%;
	justify-content: space-between;
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	padding: 10px;
`;

export const StyledButton = styled(Button)<{
	colored?: boolean;
	margin?: string;
}>`
	width: max-content;
	min-width: 150px;
	height: 40px;
	background-color: ${({ colored }) =>
		colored ? "#02e296" : "rgba(2, 226, 150, 0.12)"};
	border: 1px solid #787878;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	color: ${({ colored }) => (colored ? "white" : "black")};
	margin: auto;
	/* margin-top: 30px; */
	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`}
	font-size: 16px;
	text-align: center;
`;
