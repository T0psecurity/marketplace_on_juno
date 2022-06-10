import styled, { css } from "styled-components";

export const StyledImage = styled.img<{
  width?: string;
  height?: string;
  imageVisible?: boolean;
}>`
  cursor: pointer;
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
  opacity: ${({ imageVisible }) => (imageVisible ? 1 : 0)};
  /* width: 370px;
  height: 400px; */
  border-radius: 30px;
`;
