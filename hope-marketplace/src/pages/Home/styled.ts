import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
  padding: 10px 0;
  display: grid;
  grid-template-columns: ${({ isMobile }) => (isMobile ? "1fr" : "1fr 1fr")};
  width: 80%;
  justify-content: center;
  margin: 0 auto;
  @media (max-width: 650px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;

export const SubWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

export const ImgWrapper = styled.img<{ isMobile?: boolean }>`
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 100vw;
        `
      : css`
          height: 550px;
          max-height: 60vh;
        `};
  /* width: 550px; */
`;

export const StyledButton = styled.button``;

export const MainContent = styled.h1<{ isMobile?: boolean }>`
  text-align: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 5vmin;
    `}
`;

export const SubContent = styled.span<{ isMobile?: boolean }>`
  font-size: 24px;
  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 4vmin;
    `}
`;
