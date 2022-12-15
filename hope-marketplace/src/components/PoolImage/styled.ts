import styled from "styled-components";

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
