import styled, { css } from "styled-components";
import { MoonIcon, SunIcon } from "../SvgIcons";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

export const StyledSunIcon = styled(SunIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  fill: white;
  ${({ theme }) =>
    !theme.isDark &&
    css`
      fill: #6baf33;
    `}
`;

export const StyledMoonIcon = styled(MoonIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${({ theme }) =>
    theme.isDark &&
    css`
      fill: #6baf33;
    `}
`;
