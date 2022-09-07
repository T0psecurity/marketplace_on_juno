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
  border: 1px solid #02e296;
  border-radius: 10px;
  width: 150px;
  /* background-color: rgba(97, 179, 87, 0.15); */
  background: rgba(2, 226, 150, 0.15);
  color: ${({ theme }) => theme.colors.fontColor};
  & > span {
    align-self: center;
  }
`;

export const NFTItemAttributeType = styled.div`
  font-weight: bold;
  color: #02e296;
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
  grid-template-columns: 40% 60%;
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

  table {
    width: 100%;
    table-layout: fixed;
    tr {
      th,
      td {
        color: ${({ theme }) => theme.colors.fontColor};
        min-width: 85px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const ViewCollectionButton = styled.span`
  font-size: 14px;
  text-decoration: underline;
  color: #0057ff;
  cursor: pointer;
`;

export const CoinIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CoinIcon = styled.img<{ size?: string }>`
  width: ${({ size }) => size || "35px"};
  height: ${({ size }) => size || "35px"};
  margin-right: 5px;
  cursor: pointer;
`;

export const AcceptButton = styled.div`
  outline: 0;
  border: 0;
  cursor: pointer;
  user-select: none;
  background-color: #02e296;
  color: white;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: bold;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    opacity: 0.6;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;
