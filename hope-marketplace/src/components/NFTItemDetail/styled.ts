import styled, { css } from "styled-components";

export const MintVideoContainer = styled.div`
  /* width: 50vw; */
  /* max-width: 500px; */
  /* height: 300px; */
  /* margin-right: 30px; */
  position: relative;
`;

export const TokenImageWrapper = styled.div`
  max-width: 500px;
  position: relative;
`;

export const MintVideo = styled.video`
  width: 100%;
`;

export const NFTDetailContainer = styled.div`
  text-align: left;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.fontColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DetailTitle = styled.div`
  font-weight: bold;
`;

export const DetailContent = styled.div<{ color?: string }>`
  margin-bottom: 10px;
  overflow-wrap: anywhere;
  display: flex;
  align-items: center;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

export const MainPriceContainer = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

export const UsdPriceContainer = styled.div`
  margin-left: 20px;
`;

export const NFTItemImage = styled.img`
  cursor: pointer;
  height: 300px;
  border-radius: 30px;
`;

export const Wrapper = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  grid-gap: 20px;
  justify-content: center;
  /* align-items: center; */
  justify-items: start;
  ${({ isMobile }) =>
    isMobile &&
    css`
      grid-template-columns: auto;
      justify-items: center;
      ${MintVideoContainer} {
        margin: 0;
        width: 300px;
        margin-bottom: 10px;
      }
      ${NFTDetailContainer} {
        margin: 10px;
      }
    `}
`;

export const NFTItemImageDownloadIcon = styled.svg`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export const NFTItemOperationButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  height: 50px;
  border-radius: 10px;
  width: 200px;
  margin: 10px 0;
  padding: 6px 16px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #2e7b31;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    text-decoration: none;
    /* background-color: #704343; */
    opacity: 0.6;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;

export const NFTItemDescription = styled.div`
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-top: 20px;
`;

export const NFTItemDescriptionHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #cecece;
  padding: 10px;
  color: ${({ theme }) => theme.colors.fontColor};
  & > svg {
    path {
      fill: ${({ theme }) => theme.colors.fontColor};
    }
  }
`;

export const NFTItemDescriptionContent = styled.div`
  color: #a4a5a6;
  padding: 10px;
`;

export const NFTItemOperationContainer = styled.div<{
  justifyContent?: string;
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent ?? "flex-start"};
  align-items: center;
  @media (max-width: 650px) {
    flex-direction: column-reverse;
  }
`;

export const NFTItemPriceInputer = styled.input<{ width: string }>`
  width: ${({ width }) => width};
  height: 40px;
  margin: 0 10px;
  @media (max-width: 450px) {
    width: unset;
  }
`;

export const NFTItemPriceType = styled.form``;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

export const NFTItemPricePanel = styled.div`
  border: 1px solid #dadada;
  background: rgba(53, 203, 0, 0.1);
  border-radius: 10px;
  padding: 20px 40px;
  @media (max-width: 450px) {
    padding: 20px;
  }
`;

export const Text = styled.div<{
  fontSize?: string;
  bold?: boolean;
  color?: string;
  margin?: string;
  overflowWrap?: string;
}>`
  display: flex;
  align-items: center;
  overflow-wrap: ${({ overflowWrap }) => overflowWrap ?? "break-word"};
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize};
    `}
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}
`;

export const SelectItem = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  ${({ checked }) =>
    checked &&
    css`
      background-color: #6baf33;
    `}
  &: hover {
    background-color: rgba(107, 175, 51, 0.5);
  }
`;

export const StatisticIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

export const SelectItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const SelectItemContent = styled.div<{
  fontSize?: string;
  bold?: boolean;
}>`
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;

export const StatisticValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 37px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const CustomControl = styled.div`
  display: flex;
  align-items: center;
  ${SelectItem} {
    background-color: unset;
    &:hover {
      background-color: unset;
    }
  }
`;

export const FloorPriceContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
