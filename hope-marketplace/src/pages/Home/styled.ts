import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  justify-content: center;
  margin: 0 auto;
  @media (max-width: 650px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;

export const SubWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

export const ImgWrapper = styled.img`
  height: 550px;
  /* width: 550px; */
  @media (max-width: 650px) {
    /* width: 100%; */
    height: 100%;
  }
`;

export const StyledButton = styled.button``;

export const MainContent = styled.h1`
  text-align: center;
`;

export const SubContent = styled.span`
  font-size: 24px;
  text-align: center;
`;
