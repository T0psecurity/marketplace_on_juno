import styled, { css } from "styled-components";

export const SaleHistoryWrapper = styled.div``;

export const HistoryItemBlock = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
    `}
`;

export const HistoryItemImage = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 10px;
  & > img {
    border-radius: 0;
  }
`;

export const HistoryItemTokenName = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HistoryItemToken = styled.div`
  display: flex;
  align-items: center;
`;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

export const StyledSvg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.fontColor};
    transition: fill 0.5s;
  }
`;

export const HistoryItemText = styled.div<{
  fontWeight?: string;
  fontSize?: string;
  color?: string;
  margin?: string;
  width?: string;
}>`
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
  font-size: ${({ fontSize }) => fontSize || "20px"};
  color: ${({ color, theme }) => color || theme.colors.fontColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: ${({ margin }) => margin || "0 10px"};
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  min-width: 100px;
  max-width: 200px;
`;

export const HistoryItemAddress = styled(HistoryItemText)`
  width: 200px;
  @media (max-width: 1600px) {
    width: 150px;
  }
  @media (max-width: 1366px) {
    width: 100px;
  }
`;

export const SaleHistoryItem = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMobile }) =>
    isMobile ? "1fr 1fr 1fr 1fr" : "60px 1fr 1fr 1fr 1fr"};
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  min-width: 460px;
  margin: ${({ isMobile }) => (isMobile ? "5px" : "10px")} 0;
  scroll-snap-align: start;
  ${({ isMobile }) =>
    isMobile &&
    css`
      ${HistoryItemText} {
        font-size: 16px;
        margin: 0 5px;
      }
    `}
`;
