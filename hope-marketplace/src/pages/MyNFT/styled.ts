import styled from "styled-components";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
  height: 100%;
  padding: 0 ${({ isMobile }) => (isMobile ? 10 : 100)}px;
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

export const TokenBalanceItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 10px;
`;

export const CoinIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

export const TokenBalance = styled.div``;
