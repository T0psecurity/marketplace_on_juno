import styled, { css } from "styled-components";
import Text from "../Text";
import Modal from "../Modal";
import Button from "../Button";

export const Wrapper = styled(Modal)`
	width: 40vw;
	max-width: 500px;
	height: max-content;
	max-height: 70vh;
	min-height: 200px;
	border: 1px solid #02e296;
	border-radius: 30px;
	padding: 20px 30px;
`;

export const SearchInputBox = styled.input`
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	border: 1px solid #02e296;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	border-radius: 20px;
	margin: 30px 0;
	padding: 0 10px;
	&::placeholder {
		color: #838383;
	}
`;

export const CommonTokensContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const CommonTokenItem = styled.div`
	padding: 5px;
	border: 1px solid #02e296;
	border-radius: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	cursor: pointer;
	&:hover {
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}
	transition: all 0.5s;
	& > img {
		width: 30px;
	}
`;

export const TokenImage = styled.img`
	width: 30px;
`;

export const TokensTable = styled.div`
	width: calc(100% + 60px);
	margin: 30px 0;
	margin-left: -30px;
	border-collapse: collapse;
	cursor: pointer;
	display: grid;
	grid-template-columns: 1fr 1fr;
	& > div {
		border-bottom: 1px solid #02e296;
	}
`;

export const TokensTableTokenNameContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export const TokensTableBalanceContainer = styled.div`
	display: flex;
	align-items: center;
	padding-left: 10px;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const StyledButton = styled(Button)`
	background-color: #02e296;
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 20px;
	height: 40px;
	width: 200px;
	font-size: 14px;
	margin-bottom: 50px;
`;

export const AddedTokenStatusPanel = styled.div``;

export const AddedTokenStatusItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
`;

export const AddTokenButton = styled(Button)`
	width: 190px;
	height: 30px;
	background: rgba(2, 226, 150, 0.100208);
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 20px;
	font-size: 14px;
	color: black;
	text-transform: none;
`;

export const StyledText = styled(Text)<{
	color?: string;
	justifyContent?: string;
	cursor?: string;
	alignItems?: string;
	gap?: string;
}>`
	width: 100%;
	color: ${({ color }) => color || "#838383"};
	justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
	align-items: ${({ alignItems }) => alignItems || "baseline"};
	${({ gap }) =>
		gap &&
		css`
			gap: ${gap};
		`}
	${({ cursor }) =>
		cursor &&
		css`
			cursor: ${cursor};
		`};
`;

export const TokensTableTokenName = styled(StyledText)<{ imgUrl: string }>`
	align-items: center;
	height: 40px;
	position: relative;
	width: 100px;
	&:before {
		content: "";
		width: 30px;
		height: 30px;
		background: url(${({ imgUrl }) => imgUrl});
		background-size: cover;
		position: absolute;
		left: 0;
		top: 0;
		transform: translate(calc(-100% - 20px), 5px);
	}
`;
