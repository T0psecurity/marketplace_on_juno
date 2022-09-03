import styled from "styled-components";

export const Wrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  /* display: flex; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  min-height: 95px;
`;

export const HorizontalDivider = styled.div<{ offset: number }>`
  background-color: #02e296;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100vw;
  height: 1px;
  margin: 5px 0 10px;
  margin-left: -${({ offset }) => offset}px;
`;
