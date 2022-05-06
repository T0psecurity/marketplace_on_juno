import styled from "styled-components";

export const FooterWrapper = styled.div`
  color: white;
  background-color: #39c639;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  padding: 30px 100px;
  background: #39c639;
  justify-content: space-between;
  height: 160px;
`;

export const FooterInfo = styled.div`
  text-align: left;
`;

export const FooterInfoTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const FooterInfoContent = styled.p``;

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
