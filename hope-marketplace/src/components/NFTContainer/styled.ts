import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ noGrid?: boolean; isMobile?: boolean }>`
  text-align: center;
  ${({ noGrid }) =>
    !noGrid &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, 390px);
      grid-gap: 30px;
      justify-content: center;
    `}
  ${({ isMobile }) =>
    !isMobile
      ? css`
          padding: 50px;
        `
      : css`
          grid-template-columns: 1fr;
        `}
`;
