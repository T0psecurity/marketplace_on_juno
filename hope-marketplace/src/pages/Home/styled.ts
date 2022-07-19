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

export const StyledButton = styled.button``;

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
