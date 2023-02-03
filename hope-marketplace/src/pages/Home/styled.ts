import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
	padding: 10px 0;
	/* display: grid;
	grid-template-columns: ${({ isMobile }) => (isMobile ? "1fr" : "1fr 1fr")};
	justify-content: center; */
	/* width: 80%; */
	height: 100%;
	/* margin: auto; */
	@media (max-width: 650px) {
		width: 100%;
		grid-template-columns: 1fr;
	}
`;

export const HorizontalDivider = styled.div`
	width: 100vw;
	height: 10px;
	margin: 30px 0;
	margin-left: -10px;
	background-color: #02e296;
`;

export const Panel = styled.div<{ background?: string; fill?: boolean }>`
	position: relative;
	padding: 60px;
	width: 100%;
	box-sizing: border-box;
	margin-top: 50px;
	${({ background }) =>
		background &&
		css`
			background: url(${background}) no-repeat left top;
			background-size: 100% 100%;
		`}
	${({ fill }) =>
		fill &&
		css`
			&::after,
			&::before {
				content: "";
				clear: both;
				display: table;
			}
		`}
	@media(max-width: 650px) {
		padding: 20px;
	}
`;

export const ButtonContainer = styled.div<{ width?: string }>`
	padding: 10px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin: 20px 0;
	flex-wrap: wrap;
	${({ width }) =>
		width &&
		css`
			width: ${width};
		`}
	&>svg {
		width: 66px;
		height: 66px;
		fill: #02e296;
		cursor: pointer;
		path {
			fill: #02e296;
		}
		@media (max-width: 500px) {
			width: 40px;
			height: 40px;
		}
	}
`;

export const Button = styled.div<{ colored?: boolean; disabled?: boolean }>`
	min-width: 150px;
	background: ${({ colored }) =>
		colored
			? "linear-gradient(0deg, rgba(2, 226, 150, 0.26), rgba(2, 226, 150, 0.26)), #02E296;"
			: "white"};
	border: 1px solid ${({ colored }) => (colored ? "black" : "#02e296")};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	padding: 10px 20px;
	cursor: pointer;
	font-weight: bold;
	transition: all 0.5s;
	&:hover {
		opacity: 0.8;
	}
	@media (max-width: 500px) {
		min-width: 100px;
	}
	${({ disabled }) =>
		disabled &&
		css`
			color: #acacac;
			cursor: not-allowed;
		`}
`;

export const StatisticContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	/* display: flex; */
	justify-content: flex-start;
	align-items: center;
	gap: 20px;
	color: ${({ theme }) => theme.colors.fontColor};
	width: 100%;
	margin-top: 30px;
	padding: 10px;
	overflow: auto;
	box-sizing: border-box;
`;

export const StatisticItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid #02e296;
	border-radius: 15px;
	overflow: hidden;
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	min-width: 200px;
`;

export const CoinIcon = styled.img`
	width: 35px !important;
	height: 35px !important;
	margin-right: 5px;
`;

export const PartnersContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	padding: 10px;
	width: 100%;
	overflow: auto;
	box-sizing: border-box;
`;

export const DexStatusItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	color: ${({ theme }) => theme.colors.fontColor};
	span {
		font-weight: bold;
		font-size: 20px;
		&:last-child {
			font-size: 26px;
		}
	}
`;

export const StatisticContent = styled.div<{
	bold?: boolean;
	hasOneChild?: boolean;
}>`
	display: grid;
	/* display: flex; */
	justify-content: center;
	align-items: center;
	gap: 10px;
	width: 100%;
	padding: 20px;
	font-weight: ${({ bold }) => (bold ? 700 : 500)};
	font-size: ${({ bold }) => (bold ? "2em" : "20px")};
	line-height: ${({ bold }) => (bold ? "39px" : "29px")};
	&:first-child {
		grid-template-columns: 1fr;
		background: url("/others/home_background_04.png");
		background-size: 100% 100%;
		font-weight: bold;
		color: black;
	}
	&:last-child {
		grid-template-columns: ${({ hasOneChild }) =>
			hasOneChild ? "1fr" : "60% 40%"};
		box-sizing: border-box;
		font-size: 20px;
		${Button} {
			font-size: 0.8em;
			min-width: unset;
			padding: 10px;
			font-weight: normal;
			line-height: normal;
		}
	}
	& > img {
		width: 100%;
		cursor: pointer;
	}
`;

export const StyledImg = styled.img<{
	width?: string;
	height?: string;
	minWidth?: string;
	margin?: string;
	left?: string;
	top?: string;
	absolute?: boolean;
	float?: string;
}>`
	${({ float }) =>
		float &&
		css`
			float: ${float};
		`};
	${({ width }) =>
		width &&
		css`
			width: ${width};
		`};
	${({ minWidth }) =>
		minWidth &&
		css`
			min-width: ${minWidth};
		`};
	${({ height }) =>
		height &&
		css`
			height: ${height};
		`};
	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`};
	${({ absolute }) =>
		absolute &&
		css`
			position: absolute;
		`};
	${({ left }) =>
		left &&
		css`
			left: ${left};
		`};
	${({ top }) =>
		top &&
		css`
			top: ${top};
		`};
`;
