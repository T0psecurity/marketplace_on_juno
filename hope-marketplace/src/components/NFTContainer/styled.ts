import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ noGrid?: boolean; isMobile?: boolean }>`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.fontColor};
  ${({ noGrid }) =>
    !noGrid &&
    css`
      /* display: grid; */
      /* grid-template-columns: repeat(auto-fill, 250px); */
      grid-gap: 30px;
      justify-content: center;
    `}
  ${({ isMobile }) =>
    !isMobile
      ? css`
          padding: 50px;
        `
      : css`
          padding: 20px 0;
          /* grid-template-columns: 1fr 1fr; */
          /* grid-template-columns: repeat(auto-fill, 125px); */
        `}
`;
