import styled from "styled-components";

export const Wrapper = styled.div`
  border: 3px solid #39c639;
  border-radius: 10px;
  padding: 5px;
  margin: 20px;
  height: calc(100% - 60px);
`;

export const Logo = styled.div`
  background: url("https://hopers.io/others/hopeHeaderLogo.png");
  background-size: cover;
  background-position: center;
  width: 124px;
  height: 30px;
  cursor: pointer;
`;

export const Description = styled.div``;

export const SwapDirection = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const StyledSvg = styled.svg`
  width: 20px;
  height: 20px;
  margin: 0 10px;
`;

export const TokenSelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const TokenIcon = styled.img`
  width: 35px;
  height: 35px;
  margin: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const SwapDirectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
`;

export const SwapDirectionItem = styled.div<{ checked: boolean }>`
  font-weight: bold;
  cursor: pointer;
  color: ${({ checked }) => (checked ? "#39c639" : "black")};
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  margin: 30px 10px 20px;
`;

export const AmountInputer = styled.input`
  border: 2px solid #333;
  border-radius: 5px;
  color: #333;
  font-size: 32px;
  margin: 0 0 10px;
  padding: 0.5rem 1rem;
  width: 100%;
`;

export const ErrMsgContainer = styled.div`
  width: 100%;
  height: 34px;
  text-align: left;
  color: red;
`;

export const OperationButton = styled.div`
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  line-height: 1.75;
  text-transform: capitalize;
  min-width: 64px;
  padding: 6px 16px;
  color: #fff;
  font-size: 16px;
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
