import styled, { css } from "styled-components";

export const NFTItemWrapper = styled.div`
  /* border: 1px solid black; */
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 4px 10px 1px rgba(0, 0, 0, 0.7);
`;
export const NFTItemImageWrapper = styled.div`
  width: 370px;
  height: 400px;
  margin-bottom: 10px;
`;

export const NFTItemImage = styled.img<{
  width?: number;
  height?: number;
  imageVisible?: boolean;
}>`
  cursor: pointer;
  ${({ width }) =>
    width &&
    width > 0 &&
    css`
      width: ${width}px;
    `}
  ${({ height }) =>
    height &&
    height > 0 &&
    css`
      height: ${height}px;
    `}
  opacity: ${({ imageVisible }) => (imageVisible ? 1 : 0)};
  /* width: 370px;
  height: 400px; */
  border-radius: 30px;
`;

export const NFTItemInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const NFTItemInfo = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: left;
`;

export const NFTItemOperationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: capitalize;
  min-width: 64px;
  height: 50px;
  width: 100%;
  margin: 10px 0;
  padding: 6px 16px;
  color: #fff;
  font-size: 20px;
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

export const NFTItemPriceInputer = styled.input`
  width: 50px;
  margin: 0 10px;
`;

export const NFTItemPriceType = styled.form``;
