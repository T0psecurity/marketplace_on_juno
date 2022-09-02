import styled, { css } from "styled-components";

export const SocialLinkContainer = styled.div<{ isMobile?: boolean }>`
  ${({ isMobile }) =>
    !isMobile &&
    css`
      /* position: absolute; */
      right: 40px;
      bottom: 10px;
    `}
  float:right;
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

export const MainImage = styled.div<{ backgroundImage: string }>`
  background: ${({ backgroundImage }) => `url(${backgroundImage})`};
  height: 100%;
  width: 50%;
  background-size: auto 100%;
  background-position-x: center;
  background-repeat: no-repeat;
`;

export const DescriptionWrapper = styled.div`
  margin: 0 30px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.fontColor};
  width: calc(50% - 80px);
  height: calc(100% - 20px);
  font-size: 18px;
  overflow: auto;
  @media (max-width: 450px) {
    font-size: 14px;
  }
`;

export const Wrapper = styled.div<{
  isMobile?: boolean;
}>`
  /* --image-height: ${({ isMobile }) => (isMobile ? "200px" : "400px")}; */
  --image-height: ${({ isMobile }) => (isMobile ? "300px" : "200px")};
  /* background: url("/others/hopeBackground.png"); */
  /* background-size: auto var(--image-height);
  background-position-x: center; */
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  background-repeat: no-repeat;
  width: 100%;
  height: var(--image-height);
  margin: 50px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      justify-content: end;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      ${DescriptionWrapper} {
        width: calc(100% - 40px);
        height: calc(100% - 100px - 20px);
      }
      ${MainImage} {
        width: 100%;
        height: 100px;
      }
    `}
`;

export const HopeLogoIcon = styled.div<{
  logoUrl?: string | null | undefined;
  isMobile?: boolean;
}>`
  background: url(${({ logoUrl }) => logoUrl ?? "/logos/HOPE-image.png"});
  background-size: cover;
  width: ${({ isMobile }) => (isMobile ? "50px" : "100px")};
  height: ${({ isMobile }) => (isMobile ? "50px" : "100px")};
  border-radius: 100px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`;
