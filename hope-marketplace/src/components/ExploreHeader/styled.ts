import styled from "styled-components";

export const Wrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  /* display: flex; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  min-height: 95px;
`;

export const HorizontalDivider = styled.div`
  background-color: #02e296;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100vw;
  height: 1px;
  margin: 5px 0 10px;
  margin-left: -150px;
  @media (max-width: 650px) {
    margin-left: -10px;
  }
`;
