import styled, { css } from "styled-components";
import { TabsProps } from "./types";

export const TabsWrapper = styled.div<TabsProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems ?? "center"};
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
  ${({ flexWrap }) =>
    flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `}
  gap: 20px;
`;

export const TabWrapper = styled.div<{ selected: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.fontColor};
  padding: 5px 10px;
  ${({ selected }) =>
    selected &&
    css`
      background: rgba(2, 226, 150, 0.2);
      border: 0.5px solid #02e296;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-decoration: underline #02e296 4px;
      text-underline-offset: 6px;
    `}
`;
