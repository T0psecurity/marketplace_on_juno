import styled, { css, keyframes } from "styled-components";
import Button from "../../components/Button";
import CollapseCard from "../../components/CollapseCard";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Creator = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
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

const MIN_FILTER_CONTAINER_WIDTH = "50px";
const MAX_FILTER_CONTAINER_WIDTH = "25%";

const filterAnimation = {
  expand: keyframes`
    from {
      width: ${MIN_FILTER_CONTAINER_WIDTH};
    }
    to {
      width: ${MAX_FILTER_CONTAINER_WIDTH};
    }
  `,
  collapse: keyframes`
    from {
      width: ${MAX_FILTER_CONTAINER_WIDTH};
    }
    to {
      width: ${MIN_FILTER_CONTAINER_WIDTH};
    }
  `,
};

const nftListAnimation = {
  expand: keyframes`
    from {
      width: calc(100% - ${MAX_FILTER_CONTAINER_WIDTH});
    }
    to {
      width: calc(100% - ${MIN_FILTER_CONTAINER_WIDTH});
    }
  `,
  collapse: keyframes`
    from {
      width: calc(100% - ${MIN_FILTER_CONTAINER_WIDTH});
    }
    to {
      width: calc(100% - ${MAX_FILTER_CONTAINER_WIDTH});
    }
  `,
};

export const FilterContainer = styled.div`
  & > div {
    padding: 10px;
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
  width: 100%;
  text-align: left;
  font-weight: bold;
  transition: opacity 0.5s;
`;

export const NftList = styled.div`
  padding-top: 20px;
  font-size: 1em;
  font-weight: bold;
`;

export const StyledCollapseCard = styled(CollapseCard)`
  transition: opacity 0.5s;
`;

export const MainContentContainer = styled.div<{ expanded?: boolean }>`
  display: flex;
  width: 100%;
  ${FilterContainer} {
    animation: ${({ expanded }) =>
      expanded
        ? css`
            ${filterAnimation.expand} 500ms linear forwards;
          `
        : css`
            ${filterAnimation.collapse} 500ms linear forwards;
          `};
  }
  ${NftList} {
    animation: ${({ expanded }) =>
      !expanded
        ? css`
            ${nftListAnimation.expand} 500ms linear forwards;
          `
        : css`
            ${nftListAnimation.collapse} 500ms linear forwards
          `};
  }
  ${StyledSvg} {
    transform: rotate(${({ expanded }) => (expanded ? "0deg" : "180deg")});
  }
  ${FilterContainerTitle} {
    ${({ expanded }) =>
      expanded
        ? css`
            color: black;
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

export const StatusFilterPanel = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-evenly;
`;

export const StyledButton = styled(Button)<{ selected?: boolean }>`
  width: 150px;
  font-size: 1em;
  height: 30px;
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

export const StatisticItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  border-collapse: collapse;
  width: 100px;
  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  &:not(:last-child) {
    border-right: none;
  }
`;

export const StatisticValue = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

export const StatisticName = styled.div`
  font-size: 1em;
  text-align: center;
`;
