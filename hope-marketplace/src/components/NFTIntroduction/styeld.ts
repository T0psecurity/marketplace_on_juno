import styled, { css } from "styled-components";

export const SocialLinkContainer = styled.div<{ isMobile?: boolean }>`
  ${({ isMobile }) =>
    !isMobile &&
    css`
      position: absolute;
      right: 50px;
      bottom: 30px;
    `}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ isMobile }) => (isMobile ? 10 : 0)}px;
`;

export const SocialLinkItem = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor ?? "white"};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: 0 10px;
  cursor: pointer;
`;

export const Wrapper = styled.div<{
  backgroundImage: string;
  isMobile?: boolean;
}>`
  --image-height: ${({ isMobile }) => (isMobile ? "200px" : "400px")};
  background: ${({ backgroundImage }) => `url(${backgroundImage})`};
  /* background: url("/others/hopeBackground.png"); */
  background-size: auto var(--image-height);
  background-position-x: center;
  background-color: white;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(var(--image-height) + 100px);
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      justify-content: end;
      align-items: center;
    `}
`;

export const HopeLogoIcon = styled.div<{
  logoUrl?: string | null | undefined;
  isMobile?: boolean;
}>`
  background: url(${({ logoUrl }) => logoUrl ?? "/logos/HOPE-image.png"});
  background-size: cover;
  width: ${({ isMobile }) => (isMobile ? "100px" : "200px")};
  height: ${({ isMobile }) => (isMobile ? "100px" : "200px")};
  border-radius: 100px;
`;
