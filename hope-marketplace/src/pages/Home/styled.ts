import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10px 0;
  display: flex;
  width: 80%;
  justify-content: center;
  margin: 0 auto;
  @media (max-width: 650px) {
    width: 100%;
    flex-direction: column;
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
