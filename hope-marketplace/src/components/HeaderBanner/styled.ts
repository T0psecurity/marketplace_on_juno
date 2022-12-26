import styled from "styled-components";
import Text from "../Text";

export const Wrapper = styled.div<{ imageLoaded: boolean }>`
	position: relative;
	width: 100%;
	height: ${({ imageLoaded }) => (imageLoaded ? "max-content" : "0px")};
	min-height: ${({ imageLoaded }) => (imageLoaded ? "35px" : "0px")};
	max-height: 80px;
	overflow: hidden;
	display: grid;
	align-items: center;
	grid-template-columns: 15% 70% 15%;
	background-color: #02e296;
`;

export const CloseIcon = styled.div`
	position: absolute;
	width: 10px;
	height: 10px;
	cursor: pointer;
	right: 20px;
	top: 50%;
	transform: translate(0, -50%);
	&:before {
		content: "X";
		width: 100%;
		height: 100%;
		font-weight: bold;
		color: black;
	}
`;

const Image = styled.img`
	width: 60%;
	margin: 10px 0;
	max-width: 110px;
`;

export const RightImage = styled(Image)`
	justify-self: flex-start;
`;

export const LeftImage = styled(Image)`
	justify-self: flex-end;
`;

export const MainContent = styled.div`
	width: 100%;
	height: 100%;
	max-height: 80px;
`;

export const HopersBannerWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: wrap;
	column-gap: 20px;
	row-gap: 5px;
`;

export const StyledText = styled(Text)`
	color: black;
	font-weight: bold;
	font-size: clamp(18px, 2vw, 35px);
`;
