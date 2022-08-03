import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
  height: 100%;
  padding: 0 ${({ isMobile }) => (isMobile ? 10 : 100)}px;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const TokenTypeString = styled.div`
  font-size: 20px;
  padding: 20px;
  text-align: left;
  & > span {
    font-size: 16px;
    margin-left: 20px;
  }
`;

export const ProfileImage = styled.div`
  background: url("/others/user-hopers.jpg");
  background-size: cover;
  width: 50px;
  height: 50px;
  margin: 0 10px;
`;

export const HorizontalDivider = styled.div`
  height: 1px;
  background-color: #ccc;
`;

export const TokenBalancesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-left: 20px;
`;

export const TokenBalanceItem = styled.div<{ marginBottom?: string }>`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 5px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.panelBackgroundColor};
  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${marginBottom};
    `};
`;

export const WithdrawButton = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
`;

export const CoinIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

export const TokenBalance = styled.div`
  font-weight: bold;
`;

export const MyNftsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const MyNftsTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  /* width: 100%; */
`;

export const MyNftsTab = styled.div<{ selected: boolean }>`
  cursor: pointer;
  margin-right: 20px;
  ${({ selected }) =>
    selected &&
    css`
      font-weight: bold;
    `}

  &:last-child {
    margin-right: 0;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 550px;
`;
