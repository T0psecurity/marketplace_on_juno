import styled, { css } from "styled-components";
import Text from "../../components/Text";

export const Wrapper = styled.div`
  height: 100%;
`;
export const BackgroundWrapper = styled.div`
  padding: 10px 5%;

  background: linear-gradient(
    180deg,
    rgba(2, 226, 150, 0.12) 0%,
    rgba(2, 226, 150, 0) 100%
  );
`;
export const HorizontalDivider = styled.div`
  height: 1px;
  background: #02e296;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 15px 0;
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
  margin: 40px 0;

  /* min-width: 350px; */
  @media (min-width: 600px) {
    width: 20%;
    margin-left: 100px;
    /* min-width: unset; */
    float: right;
    right: 0;
    top: 0;
  }
`;

export const TokenLogo = styled.img`
  width: 100%;
`;

export const TokenOperationPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
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
    width: 140px;
    height: 50px;
    outline: none;
    border: 1px solid #02e296;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-size: 24px;
    text-align: right;
    padding: 0 10px;
    @media (max-width: 480px) {
      height: 40px;
      width: 100px;
    }
  }
`;

export const TokenAmountAutoInputer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const TokenAmountAutoInputItem = styled(Text)`
  cursor: pointer;
`;

export const TokenImage = styled.img`
  width: 30px;
`;

export const SwapAmountInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 30px;
`;

export const TokenSwapAmountPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  @media (max-width: 400px) {
    gap: 5px;
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

export const RememberMe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  & > input {
    border: 1px solid #02e296;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 50px;
  }
`;

export const SelectItem = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
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

export const PresaleStatus = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => `${backgroundColor}40`};
  position: relative;
  height: 25px;
  padding-left: 24px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  &:before {
    content: "";
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translate(0, -50%);
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 100%;
    width: 16px;
    height: 16px;
  }
`;

export const IDODetailWrapper = styled.div`
  height: 100%;
  padding: 0 5%;
  background: linear-gradient(
    180deg,
    rgba(2, 226, 150, 0.12) 0%,
    rgba(2, 226, 150, 0) 100%
  );
  @media (max-width: 480px) {
    padding-bottom: 40px;
  }
`;

export const DetailTitle = styled(Text)`
  padding-top: 50px;
  font-size: 30px;
  font-weight: bold;
  justify-content: flex-start;
  cursor: pointer;
`;

export const DetailHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  align-items: flex-start;
  justify-content: space-between;
  margin: 10px 0;
  padding: 20px 0;
  border-top: 1px solid #02e296;
  gap: 30px;
  grid-gap: 50px;

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

export const StatusContent = styled.div`
  border-radius: 20px;
  background: rgba(2, 226, 150, 0.3);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const ProgressBar = styled.div<{ value: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #d2faec;
  border: 1px solid #02e296;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ value }) => `${value}%`};
    background: #02e297;
  }
`;

export const ProjectDetail = styled.div``;

export const ProjectDetailHeader = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
`;

export const ProjectDetailTitle = styled(Text)`
  font-weight: bold;
  border-bottom: 2px solid #02e296;
  padding-bottom: 5px;
`;

export const ProjectDetailContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 100px;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
  }
`;

export const ProjectDetailContentTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProjectDetailContentTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #02e296;
  border-left: 1px solid #02e296;
  border-right: 1px solid #02e296;
  &:first-child {
    border-top: 1px solid #02e296;
    background: rgba(2, 226, 150, 0.12);
  }
`;

export const VestingPeriodItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #02e296;
  padding: 5px;
  width: 50px;
  height: 100%;
`;

export const VestingDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #02e296;
`;

export const VestingDetailItem = styled(Text)<{ border?: boolean }>`
  padding: 10px;
  font-size: 14px;
  ${({ border }) =>
    border &&
    css`
      border-bottom: 1px solid #02e296;
    `}
`;

export const VestingDetailClaimed = styled(Text)<{ percent: string }>`
  border-left: 1px solid #02e296;
  background: #d2faec;
  width: 100%;
  height: 100%;
  align-items: center;
  & > span {
    z-index: 1;
  }
  &:before {
    content: "";
    height: 100%;
    width: ${({ percent }) => percent};
    position: absolute;
    left: 0;
    top: 0;
    background: #02e296;
  }
`;

export const Flex = styled.div<{
  flexDirection?: string;
  gap?: string;
  alignItems?: string;
  justifyContent?: string;
  width?: string;
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  gap: ${({ gap }) => gap || "5px"};
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
`;

export const Grid = styled.div<{
  gridTemplateColumns?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
}>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) =>
    gridTemplateColumns || "auto"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  ${({ gap }) =>
    gap &&
    css`
      grid-gap: ${gap};
    `}
`;

export const Button = styled.div<{
  color?: string | null;
  background?: string | null;
}>`
  min-width: 150px;
  background: ${({ background }) =>
    background ??
    "linear-gradient(0deg, rgba(2, 226, 150, 0.26), rgba(2, 226, 150, 0.26)), #02e296"};
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
