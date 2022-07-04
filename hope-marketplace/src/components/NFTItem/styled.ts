import styled, { css } from "styled-components";

export const NFTItemWrapper = styled.div`
  /* border: 1px solid black; */
  /* padding: 10px; */
  border-radius: 10px;
  box-shadow: 1px 4px 10px 1px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const NFTItemImageWrapper = styled.div<{ isMobile?: boolean }>`
  width: calc(100% - 20px);
  max-width: calc(100% - 20px);
  height: ${({ isMobile }) => (isMobile ? 200 : 250)}px;
  margin: 10px;
  position: relative;
`;

export const NFTItemInfoContainer = styled.div`
  display: flex;
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
`;

export const NFTItemPriceContainer = styled.div``;

export const NFTItemTokenPrice = styled.div``;

export const NFTItemUsdPrice = styled.div`
  font-weight: normal;
  font-size: 14px;
`;

export const NFTItemOperationButton = styled.div`
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
  margin: 0 10px;
`;

export const NFTItemPriceType = styled.form``;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;
