import styled, { css } from "styled-components";
import Text from "../Text";

export const Wrapper = styled.div`
  .__react_component_tooltip {
    background: rgba(2, 226, 150, 0.9);
    /* background: #02e296; */
    opacity: 0.8;
    backdrop-filter: blur(3px);
    border: 1px solid #02e296;
    border-radius: 10px;
  }
`;

export const TooltipContainer = styled.div`
  min-width: 300px;
  font-size: 20px;
`;

export const HoperLogo = styled.div`
  width: 137px;
  height: 34px;
  background: url("/others/logoHopers.png");
  background-size: cover;
  margin-bottom: 20px;
`;

export const TokenTypeContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const SelectedTokenItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #02e296;
  border-radius: 10px;
  padding: 10px;
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

export const TokenTypesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 101%);
  min-width: 250px;
  background: white;
  border: 1px solid #02e296;
  border-radius: 10px;
  z-index: 20;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TokenTypeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #02e296;
  border-radius: 10px;
  padding: 10px;
  width: 80%;
  cursor: pointer;
  font-size: 18px;
`;

export const BalanceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PriceInputerWrapper = styled.div`
  position: relative;
`;

export const PriceInputer = styled.input<{ hasError: boolean }>`
  height: 40px;
  margin: 0 10px;
  border: 1px solid #02e296;
  border-radius: 10px;
  outline: none;
  font-size: 16px;
  padding-left: 10px;
  ${({ hasError }) =>
    hasError &&
    css`
      color: red;
    `}
`;

export const ExpirationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
`;

export const CustomExpirationControl = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #02e296;
  border-radius: 10px;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const MakeOfferButton = styled.div`
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

export const StyledText = styled(Text)`
  color: black;
`;
