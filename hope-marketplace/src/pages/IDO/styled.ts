import styled, { css } from "styled-components";
import Text from "../../components/Text";

export const Wrapper = styled.div`
  height: 100%;
  padding: 0 5%;
`;

export const IDOItemWrapper = styled.div`
  padding: 10px 20px;
  @media (max-width: 400px) {
    padding: 10px 0;
  }
`;

export const IDOItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const IDOItemSocialLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  svg {
    cursor: pointer;
    path {
      fill: ${({ theme }) => theme.colors.fontColor};
    }
  }
`;

export const IDOItemContent = styled.div`
  position: relative;
  margin-top: 10px;
`;

export const TokenLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  /* min-width: 350px; */
  @media (min-width: 600px) {
    width: 35%;
    margin-left: 20px;
    /* min-width: unset; */
    float: right;
    right: 0;
    top: 0;
  }
`;

export const TokenLogo = styled.img`
  width: 100%;
`;

export const Button = styled.div<{ color?: string }>`
  min-width: 150px;
  background: linear-gradient(
      0deg,
      rgba(2, 226, 150, 0.26),
      rgba(2, 226, 150, 0.26)
    ),
    #02e296;
  color: ${({ color }) => color || "black"};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.5s;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 500px) {
    min-width: 100px;
  }
`;

export const TokenOperationPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const TokenSoldStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const TokenSoldStatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const TokenPercentageSoldValue = styled(Text)<{ percentage: number }>`
  width: 100%;
  ${({ percentage }) =>
    percentage > 0 &&
    css`
      &:before {
        content: "";
        background: rgba(2, 226, 150, 0.3);
        width: ${percentage}%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    `}
`;

export const TokenSwapAmountItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TokenSwapAmountInputer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  & > input {
    width: 180px;
    height: 50px;
    outline: none;
    border: 1px solid #02e296;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-size: 24px;
    text-align: right;
    padding: 0 10px;
  }
`;

export const TokenAmountAutoInputer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const TokenAmountAutoInputItem = styled(Text)`
  cursor: pointer;
`;

export const TokenImage = styled.img`
  width: 50px;
`;

export const TokenSwapAmountPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 400px) {
    gap: 5px;
    ${TokenImage} {
      width: 30px;
    }
    ${TokenSwapAmountInputer} {
      & > input {
        width: 130px;
        height: 30px;
      }
    }
    ${TokenAmountAutoInputer} {
      gap: 5px;
    }
    & > svg {
      width: 20px;
    }
  }
`;

export const ClearDiv = styled.div`
  clear: both;
`;

export const OtherInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
