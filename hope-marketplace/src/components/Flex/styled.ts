import styled, { css } from "styled-components";
import { TFlex } from "./type";

export const Wrapper = styled.div<TFlex>`
	display: flex;
	box-sizing: border-box;
	${({ justifyContent }) =>
		justifyContent &&
		css`
			justify-content: ${justifyContent};
		`}
	${({ alignItems }) =>
		alignItems &&
		css`
			align-items: ${alignItems};
		`}
    ${({ gap }) =>
		gap &&
		css`
			gap: ${gap};
		`}
    ${({ flexDirection }) =>
		flexDirection &&
		css`
			flex-direction: ${flexDirection};
		`}
    ${({ width }) =>
		width &&
		css`
			width: ${width};
		`}
	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`}
	${({ padding }) =>
		padding &&
		css`
			padding: ${padding};
		`}
	${({ backgroundColor }) =>
		backgroundColor &&
		css`
			background-color: ${backgroundColor};
		`}
	${({ flexWrap }) =>
		flexWrap &&
		css`
			flex-wrap: ${flexWrap};
		`}
`;
