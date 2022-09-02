import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  @media (max-width: 450px) {
    padding: 10px;
  }
`;

export const NFTItemAttributesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  /* margin: 0 30px; */
  gap: 10px;
`;

export const NFTItemAttributeItem = styled.div`
  font-size: 14px;
  padding: 5px;
  border: 1px solid #61b357;
  border-radius: 10px;
  width: 150px;
  background-color: rgba(97, 179, 87, 0.15);
  color: ${({ theme }) => theme.colors.fontColor};
  & > span {
    align-self: center;
  }
`;

export const NFTItemAttributeType = styled.div`
  font-weight: bold;
  color: #2e7b31;
  margin-bottom: 10px;
`;

export const NFTItemAttributeValue = styled.div`
  /* display: grid;
  grid-template-columns: 0.8fr 0.2fr; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  & > span {
    overflow-wrap: anywhere;
  }
`;

export const HorizontalDivider = styled.div`
  background-color: #39c639;
  height: 4px;
  margin: 20px 5vw;
  width: 100%;
`;

export const AttributeOfferPanel = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  grid-gap: 20px;
  justify-content: center;
  justify-items: start;
  ${({ isMobile }) =>
    isMobile &&
    css`
      grid-template-columns: 1fr;
      justify-items: center;
    `}
`;

export const NFTItemDescription = styled.div`
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
`;

export const NFTItemDescriptionHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #cecece;
  padding: 10px;
  color: ${({ theme }) => theme.colors.fontColor};
  & > svg {
    path {
      fill: ${({ theme }) => theme.colors.fontColor};
    }
  }
`;

export const NFTItemDescriptionContent = styled.div<{ maxHeight?: string }>`
  color: #a4a5a6;
  padding: 10px;
  max-height: ${({ maxHeight }) => maxHeight ?? "300px"};
  overflow: auto;
  min-height: 50px;
`;

export const ViewCollectionButton = styled.span`
  font-size: 14px;
  text-decoration: underline;
  color: #0057ff;
  cursor: pointer;
`;
