import styled from "styled-components";

export const Wrapper = styled.div`
  .__react_component_tooltip {
    background: rgba(2, 226, 150, 0.12);
    backdrop-filter: blur(8px);
    border: 1px solid #02e296;
    border-radius: 10px;
  }
`;

export const TooltipContainer = styled.div`
  min-width: 300px;
  font-size: 20px;
`;

export const AcceptOfferButton = styled.div`
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
  height: 40px;
  border-radius: 10px;
  margin: 10px 0;
  padding: 5px 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  /* background-color: #2e7b31; */
  background-color: #02e296;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  svg {
    path {
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      fill: white;
    }
  }
  &:hover {
    text-decoration: none;
    /* background-color: #704343; */
    opacity: 0.6;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;

export const NftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 200px;
  overflow: auto;
`;

export const NftItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 15px;
`;

export const NftItemImage = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 10px;
  & > img {
    border-radius: 0;
  }
`;

export const CoinIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CoinIcon = styled.img<{ size?: string }>`
  width: ${({ size }) => size || "35px"};
  height: ${({ size }) => size || "35px"};
  margin-right: 5px;
  cursor: pointer;
`;

export const BalanceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
