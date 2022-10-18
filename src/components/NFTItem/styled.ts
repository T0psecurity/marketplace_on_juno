import styled, { css } from "styled-components";

export const NFTItemImageWrapper = styled.div<{ isMobile?: boolean }>`
  width: calc(100% - 20px);
  max-width: calc(100% - 20px);
  height: ${({ isMobile }) => (isMobile ? 140 : 250)}px;
  margin: 10px;
  position: relative;
`;

export const NFTItemInfoContainer = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMobile }) => (isMobile ? "auto" : "50% 50%")};
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const NFTItemInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin: 10px 0 10px 10px;
  display: flex;
  align-items: center;
  overflow-wrap: anywhere;
`;

export const NFTItemTokenPrice = styled.div``;

export const NFTItemUsdPrice = styled.div`
  font-weight: normal;
  font-size: 14px;
`;

export const NFTItemPriceContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile &&
    css`
      display: flex;
      align-items: center;
      ${NFTItemUsdPrice} {
        margin-left: 10px;
      }
    `}
`;

export const NFTItemOperationButton = styled.button`
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  line-height: 1.75;
  text-transform: capitalize;
  min-width: 64px;
  height: 50px;
  width: 100%;
  padding: 6px 16px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  /* background-color: #39c639; */
  background-color: #02e296;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    text-decoration: none;
    /* background-color: #1b5e20; */
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    opacity: 0.8;
  }
`;

export const NFTItemOperationContainer = styled.div<{ isSellItem?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isSellItem }) =>
    isSellItem &&
    css`
      margin: 10px;
      ${NFTItemOperationButton} {
        border-radius: 0;
      }
    `}
`;

export const NFTItemPriceInputer = styled.input`
  width: 50px;
  max-height: 32px !important;
  margin: 0 10px;
`;

export const NFTItemPriceType = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

export const RarityRankContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const RarityRankContent = styled.div<{ bold?: boolean }>`
  font-size: 20px;
  line-height: 36px;
  padding: 0 10px;
  font-weight: normal;

  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;

export const NFTItemWrapper = styled.div<{ isMobile: boolean }>`
  /* border: 1px solid black; */
  /* padding: 10px; */
  width: 250px;
  border-radius: 10px;
  box-shadow: 1px 4px 10px 1px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scroll-snap-align: start;
  background-color: ${({ theme }) => theme.colors.panelBackgroundColor};
  ${({ isMobile }) =>
    isMobile &&
    css`
      width: 140px;
      ${NFTItemInfo} {
        font-size: 14px;
        margin: 5px;
      }
    `}
`;

export const SellInfoContainer = styled.div`
  background: rgba(2, 226, 150, 0.1);
  border: 1px solid #02e296;
  border-radius: 10px;
  width: 100%;
  padding: 5px;
`;

export const SellTypeButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const SellTypeButton = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ checked }) => (checked ? "white" : "#02e296")};
  background: ${({ checked }) =>
    checked ? "#02e296" : "rgba(255, 255, 255, 0.6)"};
  border: 0.5px solid #02e296;
  border-radius: 10px;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
  transition: all 0.5s;
  svg {
    path {
      transition: all 0.5s;
      fill: ${({ checked }) => (checked ? "white" : "#02e296")};
    }
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const SellButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  & > button {
    width: max-content;
    height: 26px;
    padding: 5px;
    border-radius: 20px !important;
    border: 1px solid #02e296;
  }
`;
