import styled from "styled-components";
import Text from "../../components/Text";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
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
