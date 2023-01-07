import styled from "styled-components";
import Button from "../../components/Button";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	svg {
		cursor: pointer;
	}
`;

export const DetailRowBlock = styled.div`
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	padding: 20px;
	height: 100%;
`;

export const StyledButton = styled(Button)<{ colored?: boolean }>`
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
	font-size: 16px;
	text-align: center;
`;
