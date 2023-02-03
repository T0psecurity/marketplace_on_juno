import styled, { css } from "styled-components";
import { TextProps } from "./type";

export const Wrapper = styled.div<TextProps>`
	position: relative;
	display: flex;
	align-items: ${({ alignItems }) => alignItems ?? "baseline"};
	justify-content: ${({ justifyContent }) => justifyContent ?? "center"};
	gap: ${({ gap }) => gap ?? "0.5ex"};
	overflow-wrap: ${({ overflowWrap }) => overflowWrap ?? "break-word"};
	font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
	color: ${({ color, theme }) => color ?? theme.colors.fontColor};
	flex-wrap: ${({ flexWrap }) => flexWrap ?? "wrap"};
	${({ flexDirection }) =>
		flexDirection &&
		css`
			flex-direction: ${flexDirection};
		`}
	${({ fontSize }) =>
		fontSize &&
		css`
			font-size: max(${fontSize}, 18px);
		`}
	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`};
	${({ width }) =>
		width &&
		css`
			width: ${width};
		`}
	${({ cursor }) =>
		cursor &&
		css`
			cursor: ${cursor};
		`}
  ${({ textAlign }) =>
		textAlign &&
		css`
			text-align: ${textAlign};
		`}
  ${({ letterSpacing }) =>
		letterSpacing &&
		css`
			letter-spacing: ${letterSpacing};
		`}
`;
