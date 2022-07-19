import styled, { css } from "styled-components";

const CardWidth = "350px";

export const Wrapper = styled.div`
  margin: 0 150px;
  @media (max-width: 650px) {
    margin: 0 10px;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const FilterItem = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  margin: 10px;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  & > svg {
    margin-left: 5px;
  }
  ${({ checked }) =>
    checked &&
    css`
      color: #6baf33;
      & > svg {
        path {
          fill: #6baf33;
        }
      }
    `}
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 20px auto 40px;
`;

export const Card = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  width: ${CardWidth};
  height: 220px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 650px) {
    width: 100%;
    margin: 10px;
  }
`;

export const Flex = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, ${CardWidth});
  grid-gap: 20px;
  justify-content: space-around;

  margin-bottom: 50px;

  /* display: flex;
  justify-content: space-around;
  @media (max-width: 650px) {
    flex-direction: column;
  } */
`;

export const StyledImg = styled.div<{ imageUrl: string }>`
  background: url(${({ imageUrl }) => imageUrl});
  width: 100%;
  height: 170px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
`;

export const LogoImage = styled.div<{ imageUrl: string }>`
  background: url(${({ imageUrl }) => imageUrl});
  background-color: white;
  background-size: cover;
  border-radius: 10px;
  border: 1px solid black;
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const CollectionTitle = styled.div<{ hasLogo: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${({ hasLogo }) => (hasLogo ? "calc(100% - 80px)" : "100%")};
  height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div<{
  marginTop?: string;
  fontSize?: string;
  fontWeight?: string;
  height?: string;
}>`
  padding: 0 20px;
  margin-top: ${({ marginTop }) => marginTop || ""};
  font-size: ${({ fontSize }) => fontSize || "20px"};
  font-weight: ${({ fontWeight }) => fontWeight || ""};
  height: ${({ height }) => height || ""};
`;

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin: 10px 0;
  margin-bottom: 20px;
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
  text-transform: capitalize;
  height: 50px;
  width: 300px;
  border-radius: 10px;
  padding: 6px 16px;

  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #39c639;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    text-decoration: none;
    background-color: #1b5e20;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;
