import styled, { css } from "styled-components";

type TLiquidityImage = {
	size?: {
		token1: string;
		token2: string;
	};
};

export const LiquidityImage = styled.div<TLiquidityImage>`
	display: flex;
	align-items: center;
	width: ${({ size }) =>
		size
			? css`calc(${size.token1} + ${size.token2} - ${size.token2} * 0.3)`
			: "100px"};
	img {
		&:nth-child(1) {
			width: ${({ size }) => (size ? size.token1 : "40px")};
			height: ${({ size }) => (size ? size.token1 : "40px")};
		}
		&:nth-child(2) {
			width: ${({ size }) => (size ? size.token2 : "60px")};
			height: ${({ size }) => (size ? size.token2 : "60px")};
			transform: translate(-30%, 0);
		}
	}
`;
