import styled, { css } from "styled-components";

export const FooterInfo = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterLinkItemContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

export const FooterLinkItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #2e7d32; */
  background-color: green;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

export const FooterImage = styled.img`
  width: min(80%, 200px);
`;

export const FooterDocIcon = styled.span`
  /* background-color: #2e7d32; */
  background-color: green;
  height: 40px;
  color: white;
  padding: 0 20px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const MainContent = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

export const SubContent = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 15px;
  font-weight: 700;
  font-weight: 400;
`;

export const FooterWrapper = styled.div<{ isMobile?: boolean }>`
  color: white;
  background-color: #39c639;
  display: grid;
  grid-template-columns: ${({ isMobile }) =>
    isMobile ? "1fr" : "1fr 2fr auto"};
  grid-gap: ${({ isMobile }) => (isMobile ? "10px" : "50px")};
  padding: 30px 0;
  background: #39c639;
  justify-content: space-between;
  align-items: center;
  min-height: 160px;
  /* @media only screen and (max-width: 550px) {
    display: flex;
    flex-direction: column;
    padding: 30px 10px;
    height: 100%;
  } */

  ${({ isMobile }) =>
    isMobile &&
    css`
      padding: 0;
      ${MainContent} {
        font-size: 3vmin;
      }
      ${FooterDocIcon} {
        font-size: 3vmin;
        padding: 0 2vmin;
        height: 30px;
        margin: 0 5px;
      }
      ${FooterLinkItem} {
        width: 30px;
        height: 30px;
        margin: 0 5px;
        & > svg {
          transform: scale(0.8);
        }
      }
    `}
`;
