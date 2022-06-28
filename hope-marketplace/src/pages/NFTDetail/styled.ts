import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NFTItemOperationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 650px) {
    flex-direction: column-reverse;
  }
`;

export const NFTItemOperationButton = styled.div`
  display: inline-flex;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  height: 50px;
  border-radius: 10px;
  width: 200px;
  margin: 10px 0;
  padding: 6px 16px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #b30000;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    text-decoration: none;
    background-color: #704343;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;

export const NFTItemPriceInputer = styled.input<{ width: string }>`
  width: ${({ width }) => width};
  height: 40px;
  margin: 0 10px;
`;

export const NFTItemPriceType = styled.form``;

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
