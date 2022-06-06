import styled from "styled-components";

export const Wrapper = styled.div<{ backgroundImage: string }>`
  --image-height: 400px;
  background: ${({ backgroundImage }) => `url(${backgroundImage})`};
  /* background: url("/others/hopeBackground.png"); */
  background-size: 100% var(--image-height);
  background-color: white;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(var(--image-height) + 100px);
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;
`;

export const HopeLogoIcon = styled.div`
  background: url("/others/HOPE-image.png");
  background-size: cover;
  width: 200px;
  height: 200px;
`;

export const SocialLinkContainer = styled.div`
  position: absolute;
  right: 50px;
  bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
