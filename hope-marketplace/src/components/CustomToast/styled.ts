import styled from "styled-components";

export const Wrapper = styled.div`
  border: 3px solid #39c639;
  border-radius: 10px;
  padding: 5px;
`;

export const Logo = styled.div`
  background: url("/others/hopeHeaderLogo.png");
  background-size: cover;
  background-position: center;
  width: 124px;
  height: 30px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 30px;
`;

export const Content = styled.div<{ bold?: boolean }>`
  color: black;
  margin: 5px 0;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export const NFTItemImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  position: relative;
`;

export const NFTItemOperationButton = styled.div`
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
