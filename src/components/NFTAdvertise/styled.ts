import styled from "styled-components";

export const CreatorContainer = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const Creator = styled.div`
  margin-left: 5px;
  color: #0057ff;
`;

export const CollectionDetail = styled.div`
  font-size: 1em;
  color: #a4a5a6;
  padding: 0 20px;
  margin: 10px 0;
`;
