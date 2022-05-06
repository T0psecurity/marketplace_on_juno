import styled from "styled-components";

export const FooterWrapper = styled.div`
  color: white;
  /* position: absolute;
  bottom: 0; */
  background-color: #39c639;
  display: flex;
  padding: 30px 100px;
  /* position: fixed; */
  background: #39c639;
  justify-content: space-between;
  height: 160px;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
`;

export const SocialLinkIcon = styled.div<{ imageUrl: string }>`
  background: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  margin: 0 10px;
  cursor: pointer;
`;
