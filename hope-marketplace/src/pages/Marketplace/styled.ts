import styled, { css, keyframes } from "styled-components";
import Button from "../../components/Button";
import CollapseCard from "../../components/CollapseCard";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  align-items: center;
`;

export const NftListTabs = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const NftListTab = styled.div<{ selected: boolean }>`
  margin: 0 10px;
  cursor: pointer;
  font-size: 18px;
  ${({ selected }) =>
    selected &&
    css`
      border-bottom: 2px solid ${({ theme }) => theme.colors.fontColor};
      font-weight: bold;
    `}
`;

export const FilterResultPanel = styled.div<{ siblingHeight: number }>`
  height: calc(100% - ${({ siblingHeight }) => siblingHeight}px);
`;

export const SortContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export const SortIcon = styled.svg<{ desc: boolean }>`
  cursor: pointer;
  transition: 0.3s;
  transform: rotate(${({ desc }) => (desc ? "180" : "0")}deg);
  width: 20px;
  margin: 10px;
  z-index: 1;
  path {
    fill: ${({ theme }) => theme.colors.fontColor};
    transition: fill 0.5s;
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

export const FilterIconSvg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.fontColor};
    transition: fill 0.5s;
  }
`;

export const FilterContainerTitle = styled.div`
  position: relative;
  width: calc(100% - 20px);
  text-align: left;
  font-weight: bold;
  transition: opacity 0.5s;
  user-select: none;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const NftList = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  height: calc(100% - 20px);
  /* overflow-x: hidden;
  overflow-y: auto; */
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

export const NftListTitle = styled.span`
  scroll-snap-align: start;
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
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const CoinImage = styled.div<{ coinType: string }>`
  width: 50px;
  height: 50px;
  margin: 10px;
  background: url(${({ coinType }) =>
    `/coin-images/${coinType.replace(/\//g, "")}.png`});
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
  overflow-wrap: break-word;
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
  flex-wrap: wrap;
  margin: 10px 0;
`;

export const SelectItem = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  ${({ checked }) =>
    checked &&
    css`
      background-color: #6baf33;
    `}
  &: hover {
    background-color: rgba(107, 175, 51, 0.5);
  }
`;

export const SelectItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const SelectItemContent = styled.div<{
  fontSize?: string;
  bold?: boolean;
}>`
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;

export const CustomControl = styled.div`
  display: flex;
  align-items: center;
  ${SelectItem} {
    background-color: unset;
    &:hover {
      background-color: unset;
    }
  }
`;

export const StatisticItem = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 90px;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const StatisticValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 37px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.fontColor};
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
  max-width: 100%;
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
