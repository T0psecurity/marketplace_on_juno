import styled, { css, keyframes } from "styled-components";
import { ChevronIcon } from "./Icons";

export const Wrapper = styled.div``;

export const CartTitle = styled.div`
  border: 1px solid
    ${({ theme }) => (theme.isDark ? "transparent" : "rgba(0, 0, 0, 0.6)")};
  border-radius: 10px;
  text-align: left;
  font-size: 1em;
  font-weight: bold;
  position: relative;
  cursor: pointer;
  padding: 15px 5px;
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: ${({ theme }) => theme.colors.panelBackgroundColor};
  /* ${({ theme }) =>
    theme.isDark &&
    css`
      background-color: #838383;
    `} */
`;

export const Icon = styled(ChevronIcon)<{ expanded: boolean }>`
  position: absolute;
  width: 20px;
  transform: rotate(${({ expanded }) => (expanded ? "0deg" : "180deg")});
  transition: transform 0.5s;
  right: 0;
  path {
    fill ${({ theme }) => theme.colors.fontColor};
    transition: fill 0.5s;
  }
`;

export const ContentContainer = styled.div<{
  expanded: boolean;
  maxHeight?: string;
}>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  transition: height 1s;
  overflow-y: auto;
  ${({ expanded, maxHeight }) =>
    expanded
      ? css`
          animation: ${keyframes`
            from {
              max-height: 0px;
              opacity: 0;
            }
            to {
              max-height: ${maxHeight || "500px"};
              opacity: 1;
            }
          `} 500ms linear forwards;
          padding: 10px 5px;
        `
      : css`
          animation: ${keyframes`
            from {
              max-height: ${maxHeight || "500px"};
              opacity: 1;
            }
            to {
              max-height: 0px;
              opacity: 0;
            }
          `} 500ms linear forwards;
        `};
`;
