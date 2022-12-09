import styled from "styled-components";
import Text from "../Text";
import Modal from "../Modal";

export const Wrapper = styled(Modal)`
	width: 50vw;
	max-width: 500px;
	height: max-content;
	max-height: 70vh;
	min-height: 200px;
	padding: 20px 30px;
	border: 1px solid #02e296;
	border-radius: 30px;
`;

export const StyledText = styled(Text)<{ color?: string }>`
	width: 100%;
	color: ${({ color }) => color || "#838383"};
	justify-content: flex-start;
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

export const TokensTableBalanceContainer = styled.div`
	display: flex;
	align-items: center;
	padding-left: 10px;
`;
