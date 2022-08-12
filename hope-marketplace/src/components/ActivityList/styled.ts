import styled, { css } from "styled-components";

export const NoHistoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  gap: 20px;
`;

export const SaleHistoryWrapper = styled.div`
  overflow: auto;
`;

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
  textAlign?: string;
  color?: string;
  margin?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}>`
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
  font-size: ${({ fontSize }) => fontSize || "20px"};
  color: ${({ color, theme }) => color || theme.colors.fontColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: ${({ margin }) => margin || "0 10px"};
  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  min-width: ${({ minWidth }) => minWidth ?? "100px"};
  max-width: ${({ maxWidth }) => maxWidth ?? "200px"};
  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    opacity: 0.6;
  }
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

export const SaleHistoryItem = styled.div<{
  isMobile: boolean;
  forUser: boolean;
}>`
  display: grid;
  grid-template-columns: ${({ isMobile, forUser }) =>
    isMobile
      ? `${forUser ? "50px" : ""} 1fr 1fr 1fr 1fr`
      : `${forUser ? "50px" : ""} 60px 1fr 1fr 1fr 1fr`};
  align-items: center;
  /* justify-content: space-evenly;
  flex-wrap: wrap; */
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

export const LoadMoreButton = styled.div`
  margin: 10px auto;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.fontColor};
  border-radius: 10px;
  padding: 10px 30px;
  width: max-content;
  color: ${({ theme }) => theme.colors.fontColor};
`;
