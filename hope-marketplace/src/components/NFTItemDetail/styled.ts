import styled, { css } from "styled-components";

export const MintVideoContainer = styled.div`
  width: 50vw;
  /* height: 300px; */
  margin-right: 30px;
  position: relative;
`;

export const MintVideo = styled.video`
  width: 100%;
`;

export const NFTDetailContainer = styled.div`
  text-align: left;
  font-size: 20px;
`;

export const DetailTitle = styled.div`
  font-weight: bold;
`;

export const DetailContent = styled.div`
  margin-bottom: 10px;
  overflow-wrap: anywhere;
  display: flex;
  align-items: center;
`;

export const MainPriceContainer = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

export const UsdPriceContainer = styled.div``;

export const NFTItemImage = styled.img`
  cursor: pointer;
  height: 300px;
  border-radius: 30px;
`;

export const Wrapper = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: 50vw auto;
  grid-gap: 20px;
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
  right: 7px;
  top: 10px;
  cursor: pointer;
`;

export const NFTItemOperationButton = styled.div`
  display: inline-flex;
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
  background-color: #b30000;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    text-decoration: none;
    background-color: #704343;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;

export const NFTItemOperationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 650px) {
    flex-direction: column-reverse;
  }
`;

export const NFTItemPriceInputer = styled.input<{ width: string }>`
  width: ${({ width }) => width};
  height: 40px;
  margin: 0 10px;
`;

export const NFTItemPriceType = styled.form``;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;
