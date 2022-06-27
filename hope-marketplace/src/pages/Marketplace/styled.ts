import styled, { css, keyframes } from "styled-components";
import Button from "../../components/Button";
import CollapseCard from "../../components/CollapseCard";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const CreatorContainer = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const HorizontalDivider = styled.div`
  background-color: #39c639;
  height: 4px;
  margin: 0 5vw;
`;

export const SortButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 5vw;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const FilterContainer = styled.div`
  max-height: calc(100vh - 50px);
  overflow-y: auto;
  & > div {
    padding: 10px;
  }
`;

export const FilterMainContent = styled.div`
  padding-top: 20px;
  height: calc(100vh - 50px);
`;

export const SearchSortPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  align-items: center;
`;

export const SortContainer = styled.div`
  width: 50%;
`;

export const SearchContainer = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

export const SearchWrapper = styled.div`
  width: 50%;
`;

export const SearchInput = styled.input`
  height: 50px;
  width: 50px;
  border-style: none;
  /* padding: 10px; */
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: #22a6b3;
  /* padding-right: 40px; */
  color: transparent;
  &::placeholder {
    /* color: rgba(255, 255, 255, 0.5); */
    color: transparent;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 100;
  }
  &:focus {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    /* border-bottom: 1px solid rgba(255, 255, 255, 0.5); */
    border-bottom: 1px solid #ccc;
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
    color: black;
    &::placeholder {
      color: #ccc;
    }
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
  position: absolute;
  right: 0px;
  color: #ccc;
  background-color: transparent;
  pointer-events: painted;
  &:focus {
    & ~ ${SearchInput} {
      width: 300px;
      border-radius: 0px;
      background-color: transparent;
      /* border-bottom: 1px solid rgba(255, 255, 255, 0.5); */
      border-bottom: 1px solid #ccc;
      transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
      color: black;
      &::placeholder {
        color: #ccc;
      }
    }
  }
`;

export const StyledSvg = styled.svg`
  width: 1.1015625em;
  height: 1em;
  vertical-align: middle;
  fill: black;
  overflow: hidden;
  position: absolute;
  right: 0;
  cursor: pointer;
  transition: transform 0.5s;
  opacity: 1 !important;
`;

export const FilterContainerTitle = styled.div`
  position: relative;
  width: calc(100% - 20px);
  text-align: left;
  font-weight: bold;
  transition: opacity 0.5s;
  user-select: none;
`;

export const NftList = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  height: calc(100% - 75px);
  overflow-x: hidden;
  overflow-y: auto;
`;

export const StyledCollapseCard = styled(CollapseCard)`
  transition: opacity 0.5s;
`;

export const StatusFilterPanel = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-evenly;
`;

export const CoinImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CoinImage = styled.div<{ coinType: string }>`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  background: url(${({ coinType }) => `/coin-images/${coinType}.png`});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const StyledButton = styled(Button)<{ selected?: boolean }>`
  /* width: 150px; */
  width: max-content;
  height: max-content;
  font-size: 1em;
  min-height: 30px;
  padding: 6px 5px;
  ${({ selected }) =>
    !selected &&
    css`
      background: white;
      color: black;
    `}
`;

export const StatisticWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-collapse: collapse;
  margin: 10px 0;
`;

export const StatisticItem = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 90px;
`;

export const StatisticValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 37px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

export const StatisticIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 5px;
`;

export const StatisticName = styled.div`
  font-size: 1em;
  text-align: center;
`;

export const SortByPriceButton = styled(Button)`
  width: 300px;
  margin: auto;
`;

const MIN_FILTER_CONTAINER_WIDTH = "50px";
const MAX_FILTER_CONTAINER_WIDTH = "25%";

export const MainContentContainer = styled.div<{
  expanded?: boolean;
  isMobile?: boolean;
}>`
  display: flex;
  width: 100%;
  ${FilterContainer} {
    animation: ${({ expanded, isMobile }) =>
      expanded
        ? css`
            ${keyframes`
              from {
                width: ${MIN_FILTER_CONTAINER_WIDTH};
              }
              to {
                width: ${isMobile ? "100%" : MAX_FILTER_CONTAINER_WIDTH};
              }
            `} 500ms linear forwards;
          `
        : css`
            ${keyframes`
              from {
                width: ${isMobile ? "100%" : MAX_FILTER_CONTAINER_WIDTH};
              }
              to {
                width: ${MIN_FILTER_CONTAINER_WIDTH};
              }
            `} 500ms linear forwards;
          `};
  }
  ${FilterMainContent} {
    animation: ${({ expanded, isMobile }) =>
      !expanded
        ? css`
            ${keyframes`
              from {
                width: ${
                  isMobile
                    ? "0px"
                    : `calc(100% - ${MAX_FILTER_CONTAINER_WIDTH})`
                };
              }
              to {
                width: calc(100% - ${MIN_FILTER_CONTAINER_WIDTH});
              }
            `} 500ms linear forwards;
          `
        : css`
            ${keyframes`
              from {
                width: calc(100% - ${MIN_FILTER_CONTAINER_WIDTH});
              }
              to {
                width: ${
                  isMobile
                    ? "0px"
                    : `calc(100% - ${MAX_FILTER_CONTAINER_WIDTH})`
                };
              }
            `} 500ms linear forwards
          `};
  }
  ${StyledSvg} {
    transform: rotate(${({ expanded }) => (expanded ? "0deg" : "180deg")});
  }
  ${FilterContainerTitle} {
    ${({ expanded }) =>
      expanded
        ? css`
            display: black;
          `
        : css`
            color: transparent;
          `};
  }
  ${StyledCollapseCard} {
    ${({ expanded }) =>
      expanded
        ? css`
            opacity: 1;
          `
        : css`
            opacity: 0;
          `};
  }
`;
