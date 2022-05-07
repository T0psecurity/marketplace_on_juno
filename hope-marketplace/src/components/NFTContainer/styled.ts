import styled from "styled-components";

export const Wrapper = styled.div<{ noGrid?: boolean }>`
  text-align: center;
  ${({ noGrid }) =>
    !noGrid &&
    `
    display: grid;
    grid-template-columns: repeat(auto-fill, 308px);
    grid-gap: 30px;
    justify-content: center;
  `}
  padding: 50px;
`;
