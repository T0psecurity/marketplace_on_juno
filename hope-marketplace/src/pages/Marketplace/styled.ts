import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const BackgroundWrapper = styled.div`
  background: url("/others/banner.png");
  background-size: 500px 227px;
  background-color: #030404;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;
`;

export const HorizontalDivider = styled.div`
  background-color: #39c639;
  height: 4px;
  margin: 0 200px;
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
