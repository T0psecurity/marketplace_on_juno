import styled from "styled-components";

export const Title = styled.div<{ justifyContent?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent ?? "center"};
  padding: 30px 0;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const SubTitle = styled.div<{ textAlign?: string }>`
  padding: 20px 0;
  text-align: ${({ textAlign }) => textAlign ?? "center"};
  font-size: 1.17em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.fontColor};
`;
