import styled, { css, keyframes } from "styled-components";
import { ChevronIcon } from "./Icons";

export const Wrapper = styled.div``;

export const CartTitle = styled.div`
  text-align: left;
  font-size: 1em;
  font-weight: bold;
  position: relative;
  cursor: pointer;
`;

export const Icon = styled(ChevronIcon)<{ expanded: boolean }>`
  position: absolute;
  width: 20px;
  transform: rotate(${({ expanded }) => (expanded ? "0deg" : "180deg")});
  transition: transform 0.5s;
  right: 0;
`;

export const ContentContainer = styled.div<{
  expanded: boolean;
  maxHeight?: string;
}>`
  transition: height 1s;
  animation: ${({ expanded, maxHeight }) =>
    expanded
      ? css`
          ${keyframes`
            from {
              max-height: 0px;
              opacity: 0;
            }
            to {
              max-height: ${maxHeight || "500px"};
              opacity: 1;
            }
          `} 500ms linear forwards;
        `
      : css`
          ${keyframes`
            from {
              max-height: ${maxHeight || "500px"};
              opacity: 1;
            }
            to {
              max-height: 0px;
              opacity: 0;
            }
          `} 500ms linear forwards
        `};
`;
