import styled, { css } from "styled-components";

export const FooterInfo = styled.div<{ flexDirection?: string }>`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ flexDirection }) => flexDirection ?? "row"};
`;

export const FooterSocialLinkItemContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

export const FooterSocialLinkItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #2e7d32; */
  /* background-color: green; */
  margin: 10px;
  /* border-radius: 10px; */
  cursor: pointer;
  & > svg {
    width: 30px;
    path {
      fill: black;
    }
  }
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const FooterLinksPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const FooterLinkItem = styled.div`
  color: black;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const LaunchpadButton = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 10px;
  padding: 10px;
  color: black;
  margin: 20px 0;
`;

export const FooterAdvertiseWrapper = styled.div`
  width: calc((100vw - 50px) * 2 / 3);
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
  /* background-color: #39c639; */
  background: linear-gradient(90deg, #2effc7 0%, #ffffff 96.69%);
  display: grid;
  grid-template-columns: ${({ isMobile }) => (isMobile ? "1fr" : "1fr 2fr")};
  grid-gap: ${({ isMobile }) => (isMobile ? "10px" : "50px")};
  padding: 30px 0;
  /* background: #39c639; */
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  min-height: 100px;
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
      ${FooterSocialLinkItem} {
        width: 30px;
        height: 30px;
        margin: 0 5px;
        & > svg {
          transform: scale(0.8);
        }
      }
      ${FooterAdvertiseWrapper} {
        width: 90vw;
      }
    `}
`;
