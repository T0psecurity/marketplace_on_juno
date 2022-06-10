import styled from "styled-components";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
  height: 100%;
  padding: 0 ${({ isMobile }) => (isMobile ? 10 : 100)}px;
`;

export const ProfileImage = styled.div`
  background: url("/others/user-hopers.jpg");
  background-size: cover;
  width: 50px;
  height: 50px;
  margin: 0 10px;
`;

export const HorizontalDivider = styled.div`
  height: 1px;
  background-color: #ccc;
`;
