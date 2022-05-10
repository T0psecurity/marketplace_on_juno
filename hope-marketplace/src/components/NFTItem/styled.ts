import styled from "styled-components";

export const NFTItemWrapper = styled.div`
  /* border: 1px solid black; */
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 4px 10px 1px rgba(0, 0, 0, 0.7);
`;

export const NFTItemImage = styled.img`
  /* background: url("others/mint_pass.png");
  background-size: cover; */
  cursor: pointer;
  width: 288px;
  height: 443px;
`;

export const NFTItemInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NFTItemInfo = styled.div`
  font-size: 20px;
  font-weight: bold;
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
  text-transform: uppercase;
  min-width: 64px;
  padding: 6px 16px;
  color: #fff;
  background-color: #2e7d32;
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
