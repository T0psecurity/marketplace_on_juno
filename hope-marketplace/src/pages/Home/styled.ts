import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
  padding: 10px 0;
  display: grid;
  grid-template-columns: ${({ isMobile }) => (isMobile ? "1fr" : "1fr 1fr")};
  width: 80%;
  height: 100%;
  justify-content: center;
  margin: auto;
  @media (max-width: 650px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;

export const SubWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-self: center;
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
`;

export const StatisticItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatisticContent = styled.div<{ bold?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ bold }) => (bold ? 700 : 500)};
  font-size: ${({ bold }) => (bold ? "2em" : "20px")};
  line-height: ${({ bold }) => (bold ? "39px" : "29px")};
`;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;
