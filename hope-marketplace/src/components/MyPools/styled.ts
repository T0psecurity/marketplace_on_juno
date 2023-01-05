import styled from "styled-components";
import Text from "../Text";

export const LiquiditiesContainer = styled.div`
	width: 100%;
	margin: 50px 0 100px;
`;

export const Title = styled(Text)`
	font-weight: bold;
	font-size: 20px;
	justify-content: flex-start;
	margin: 20px 0;
	border-top: 1px solid #02e296;
	border-bottom: 1px solid #02e296;
`;

export const MyPoolContentItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
`;

export const MyPoolItem = styled.div`
	background: rgba(2, 226, 150, 0.1);
	border: 1px solid #02e296;
	border-radius: 45px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	gap: 20px;
`;

export const MyPoolItemRow = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
`;

export const MyPoolsContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px;
`;
