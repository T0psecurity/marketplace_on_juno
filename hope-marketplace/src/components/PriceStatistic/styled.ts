import styled, { css } from "styled-components";
import Select from "react-select";

export const Wrapper = styled.div`
	width: 100%;
	margin: 150px 0 50px;
`;

export const ContentContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-wrap: wrap;
	overflow: auto;
`;

export const ChartArea = styled.div`
	width: 50%;
	min-width: 350px;
	height: 500px;
	position: relative;
	overflow: hidden;
`;

export const Title = styled.div`
	font-size: 30px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.fontColor};
	margin: 20px 0;
	text-align: center;
`;

export const PriceStatisticContainer = styled.div`
	margin: auto;
	/* border: 1px solid #02e296; */
	border-radius: 15px;
	overflow: hidden;
	/* display: table; */
`;

export const SearchContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 20px;
	margin-bottom: 10px;
`;

export const AllButton = styled.div`
	background: linear-gradient(
			0deg,
			rgba(2, 226, 150, 0.26),
			rgba(2, 226, 150, 0.26)
		),
		#02e296;
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	padding: 10px 20px;
	cursor: pointer;
	font-weight: bold;
	transition: all 0.5s;
	&:hover {
		opacity: 0.8;
	}
`;

export const SearchInputWrapper = styled.div`
	position: relative;
	height: 40px;
`;

export const SearchInput = styled.input`
	width: 100%;
	height: 100%;
	border: 1px solid #02e296;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	padding-left: 10px;
	outline: none;
`;

export const SearchIcon = styled.i`
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	font-size: 14px;
	cursor: pointer;
`;

export const PriceStatisticItem = styled.div<{
	first?: boolean;
	last?: boolean;
}>`
	/* display: table-row; */
	display: grid;
	grid-template-columns: 70px auto 50px 50px 50px 50px;
	grid-gap: 20px;
	align-items: center;
	border-bottom: 1px solid #02e296;
	border-left: 1px solid #02e296;
	border-right: 1px solid #02e296;
	padding: 10px;
	${({ first }) =>
		first &&
		css`
			background-color: #02e296;
			border-top: 1px solid #02e296;
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
		`}
	${({ last }) =>
		last &&
		css`
			border-bottom-left-radius: 15px;
			border-bottom-right-radius: 15px;
		`}
  /* &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.fontColor};
  } */
  @media (max-width: 450px) {
		grid-template-columns: 60px auto 50px 50px 50px 50px;
		grid-gap: 5px;
	}
`;

export const PriceStatisticContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.fontColor};
	width: 100%;
`;

export const TokenName = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;
	& > span {
		&:first-child {
			color: #9d9d9d;
		}
	}
`;

export const CoinImage = styled.div<{ coinType: string }>`
	width: 50px;
	height: 50px;
	margin: 10px;
	background: url(${({ coinType }) =>
		`/coin-images/${coinType.replace(/\//g, "")}.png`});
	background-size: contain;
	background-repeat: no-repeat;
	cursor: pointer;
	@media (max-width: 450px) {
		width: 40px;
		height: 40px;
	}
`;

export const Span = styled.span<{
	color?: string;
	fontSize?: string;
	fontWeight?: string;
}>`
	display: inline-block;
	color: ${({ color }) => color ?? ""};
	font-size: ${({ fontSize }) => fontSize ?? ""};
	font-weight: ${({ fontWeight }) => fontWeight ?? ""};
`;

export const StyledSelect = styled(Select)`
	width: max-content;
	position: absolute !important;
	z-index: 1;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
`;
