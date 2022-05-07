import styled from "styled-components";

export const FooterWrapper = styled.div`
  color: white;
  background-color: #39c639;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
  padding: 30px 100px;
  background: #39c639;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  @media only screen and (max-width: 550px) {
    display: flex;
    flex-direction: column;
    padding: 30px 10px;
    height: 300px;
  }
`;

export const FooterInfo = styled.div`
  text-align: left;
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
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e7d32;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

export const FooterImage = styled.img`
  width: 40%;
`;

export const FooterDocIcon = styled.span`
  background-color: #2e7d32;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
`;
