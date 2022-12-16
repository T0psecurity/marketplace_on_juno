import styled, { css } from "styled-components";
import { TFlex } from "./type";

export const Wrapper = styled.div<TFlex>`
	display: flex;
	${({ justifyContent }) =>
		css`
			justify-content: ${justifyContent};
		`}
	${({ alignItems }) =>
		css`
			align-items: ${alignItems};
		`}
    ${({ gap }) =>
		css`
			gap: ${gap};
		`}
    ${({ flexDirection }) =>
		css`
			flex-direction: ${flexDirection};
		`}
    ${({ width }) =>
		css`
			width: ${width};
		`}
`;
