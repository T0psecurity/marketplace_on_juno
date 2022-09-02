import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  // height: fit-content;
  height: 50px;
  position: relative;
`;

export const SearchInput = styled.input`
  height: 100%;
  width: calc(100% - 50px);
  border-style: none;
  /* padding: 10px; */
  padding: 0;
  padding-left: 25px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: ${({ theme }) => (theme.isDark ? "#838383" : "#eceeef")};
  /* padding-right: 40px; */

  border-radius: 25px;
  /* border-bottom: 1px solid #ccc; */
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  color: ${({ theme }) => theme.colors.fontColor};
  margin-right: 25px;
  &::placeholder {
    /* color: rgba(255, 255, 255, 0.5); */
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 100;
    color: ${({ theme }) => (theme.isDark ? "white" : "#ccc")};
  }
`;

export const SearchIcon = styled.button`
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  position: absolute;
  right: 0px;
  color: white;
  background-color: #6baf33;
  pointer-events: painted;
  /* &:focus {
    & ~ ${SearchInput} {
      width: 300px;
      border-radius: 0px;
      background-color: transparent;
      border-bottom: 1px solid #ccc;
      transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
      color: black;
      &::placeholder {
        color: #ccc;
      }
    }
  } */
`;
