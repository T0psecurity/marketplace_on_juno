import styled, { css } from "styled-components";

const CardWidth = "350px";

export const Wrapper = styled.div`
  margin: 0 150px;
  @media (max-width: 650px) {
    margin: 0 10px;
  }
`;

export const OperationPanel = styled.div`
  justify-content: space-between;
  align-items: center;
  /* display: flex;*/
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  color: ${({ theme }) => theme.colors.fontColor};
  gap: 20px;
`;

export const FilterItem = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  & > svg {
    margin-left: 5px;
    path {
      fill: ${({ theme }) => theme.colors.fontColor};
      transition: fill 0.5s;
    }
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 550px;
  min-width: 250px;
  /* margin: 20px auto 40px; */
`;

export const ActivityButton = styled.div`
  position: absolute;
  cursor: pointer;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.fontColor};
  & > svg {
    width: 30px;
    height: 30px;
    path {
      fill: ${({ theme }) => theme.colors.fontColor};
      transition: fill 0.5s;
    }
  }
  @media (max-width: 650px) {
    position: relative;
    right: unset;
    top: unset;
    transform: unset;
  }
`;

export const Card = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  width: ${CardWidth};
  max-width: 95%;
  height: 220px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: white;

  transition: 0.3s;
  @media (max-width: 650px) {
    width: 100%;
    margin: 10px;
  }

  &:hover {
    box-shadow: 0 8px 16px 3px rgba(#000, 0.6);
    transform: translateY(-3px) scale(1.05) rotateX(15deg);
    &::after {
      transform: translateY(0%);
    }
  }
  /* &::before {
    content: "";
    position: absolute;
    top: 90%;
    left: 5%;
    right: 5%;
    bottom: 0;
    border-radius: 5px;
    background: #6baf33;
    transform: translate(0, -15%) rotate(-4deg);
    transform-origin: center center;
    box-shadow: 0 0 10px 15px #6baf33;
    z-index: -1;
  } */

  &::after {
    display: block;
    content: "";
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background: linear-gradient(
      226deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.4) 35%,
      rgba(255, 255, 255, 0.2) 42%,
      rgba(255, 255, 255, 0) 60%
    );
    transform: translateY(-20%);
    will-change: transform;
    transition: transform 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
  }
`;

export const Flex = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, ${CardWidth});
  grid-column-gap: 20px;
  grid-row-gap: 40px;
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
  /* border: 1px solid black; */
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
