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

export const SubWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-self: center;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const ImgWrapper = styled.img<{ isMobile?: boolean }>`
  width: 100%;
  /* ${({ isMobile }) =>
    isMobile
      ? css`
          width: 100vw;
        `
      : css`
          height: 550px;
          max-height: 60vh;
        `}; */
  /* width: 550px; */
`;

export const StyledButton = styled.div`
  margin: 20px auto;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  line-height: 1.75;
  text-transform: capitalize;
  height: 50px;
  width: 200px;
  padding: 6px 16px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background-color: #39c639;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    text-decoration: none;
    background-color: #1b5e20;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;

export const MainContent = styled.h1<{ isMobile?: boolean }>`
  text-align: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 5vmin;
    `}
`;

export const SubContent = styled.span<{ isMobile?: boolean }>`
  font-size: 24px;
  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 4vmin;
    `}
`;

export const TokensContainer = styled.div`
  width: 100%;
  text-align: space-between;
  font-weight: 600;
  font-size: 30px;
  line-height: 52px;
  color: #61b942;
`;

export const StatisticContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.colors.fontColor};
  width: 100%;
  margin-top: 30px;
`;

export const StatisticItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #02e296;
  border-radius: 15px;
  overflow: hidden;
`;

export const StatisticContent = styled.div<{ bold?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  font-weight: ${({ bold }) => (bold ? 700 : 500)};
  font-size: ${({ bold }) => (bold ? "2em" : "20px")};
  line-height: ${({ bold }) => (bold ? "39px" : "29px")};
  &:first-child {
    background: url("/others/home_background_04.png");
    background-size: 100% 100%;
    color: black;
  }
`;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

const Panel = styled.div<{ background?: string }>`
  position: relative;
  padding: 10px;
  width: calc(100% - 20px);
  margin-top: 50px;
  ${({ background }) =>
    background &&
    css`
      background: url(${background}) no-repeat left bottom;
    `}
  &:first-child {
    margin: 0;
  }
  & > div {
    margin: 20px 0;
  }
`;

export const FirstPanel = styled(Panel)`
  background-size: 100% 55%;
  min-height: 45vw;
  padding-bottom: 50px;
`;

export const SecondPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 20px 0 85px;
  @media (max-width: 500px) {
    margin-top: -60px;
    padding: 0 20px;
  }
`;

export const ThirdPanel = styled(Panel)`
  background-size: 100% 100%;
  background-position: left top;
  margin-top: -70px;
  & > div {
    &:first-child {
      margin-top: 14vw;
    }
  }
`;

export const FourthPanel = styled(Panel)`
  display: table;
`;

export const ButtonContainer = styled.div<{ width?: string }>`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
`;

export const Button = styled.div<{ colored?: boolean }>`
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
`;

export const NFTStatsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 25%;
  min-width: 210px;
  font-size: 20px;
  border-top: 1px solid #02e296;
  border-right: 1px solid #02e296;
  border-bottom: 1px solid #02e296;
  padding-bottom: 10px;
  overflow: hidden;
  &:first-child {
    border-left: 1px solid #02e296;
    border-top-left-radius: 15px;
  }
  &:last-child {
    border-top-right-radius: 15px;
  }
  & > div {
    &:first-child {
      background-color: #02e296;
      width: 100%;
      padding: 5px 0;
    }
  }
  & > img {
    width: 80%;
  }
`;

export const PanelContent = styled.div<{
  width?: string;
  margin?: string;
  alignItems?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems ?? "center"};
  gap: ${({ gap }) => gap ?? "20px"};
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}
  margin-top: 50px;
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
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

export const Flex = styled.div<{
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
  gap?: string;
  width?: string;
}>`
  display: flex;
  gap: ${({ gap }) => gap ?? "10px"};
  overflow: auto;
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
    `}
  ${({ flexWrap }) =>
    flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `}
`;
