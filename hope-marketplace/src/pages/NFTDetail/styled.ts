import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NFTItemAttributesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 30px;
`;

export const NFTItemAttributeItem = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.2fr;
  font-size: 20px;
  padding: 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  margin: 10px 20px;
  width: 200px;
  & > span {
    align-self: center;
  }
`;
