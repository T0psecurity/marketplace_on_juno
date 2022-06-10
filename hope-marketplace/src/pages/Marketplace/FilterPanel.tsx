import React, { useState } from "react";

import {
  DEFAULT_STATUS_FILTER,
  FilterPanelProps,
  StatusFilterButtonType,
  StatusFilterType,
  PriceSortDirectionType,
} from "./types";

import {
  StyledButton as Button,
  SortByPriceButton,
  FilterContainer,
  FilterContainerTitle,
  StatusFilterPanel,
  StyledCollapseCard as CollapseCard,
  StyledSvg,
} from "./styled";

const ArrowIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: any;
}) => (
  <StyledSvg
    className={className}
    viewBox="0 0 1128 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M1097.855149 473.209109h-929.064612L568.332002 76.916503a44.938006 44.938006 0 1 0-63.543869-63.55752L0 518.147115l493.403474 492.993954a43.90465 43.90465 0 0 0 62.110549-62.069598L168.544825 563.071471h929.310324a29.94957 29.94957 0 0 0 30.031475-30.031475v-29.881317a29.93592 29.93592 0 0 0-30.031475-29.94957z"
      fill=""
    />
  </StyledSvg>
);

const STATUS_FILTER_BUTTONS: StatusFilterButtonType[] = [
  { title: "Buy Now", key: "buyNow" },
  { title: "On Auction", key: "onAuction" },
  { title: "New", key: "new" },
  { title: "Has Offers", key: "hasOffers" },
];

const FilterPanel: React.FC<FilterPanelProps> = ({
  expanded,
  onChangeExpanded,
  priceFilterOption,
}) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>(
    DEFAULT_STATUS_FILTER
  );

  const handleChangeStatusFilter = (buttonItem: StatusFilterButtonType) => {
    setStatusFilter({
      ...statusFilter,
      [buttonItem.key]: !statusFilter[buttonItem.key],
    });
  };

  return (
    <FilterContainer>
      <FilterContainerTitle>
        Filter
        <ArrowIcon onClick={() => onChangeExpanded(!expanded)} />
      </FilterContainerTitle>
      <CollapseCard title="Status">
        <StatusFilterPanel>
          {STATUS_FILTER_BUTTONS.map(
            (buttonItem: StatusFilterButtonType, index: number) => (
              <Button
                key={index}
                onClick={() => handleChangeStatusFilter(buttonItem)}
                selected={statusFilter[buttonItem.key]}
              >
                {buttonItem.title}
              </Button>
            )
          )}
        </StatusFilterPanel>
      </CollapseCard>
      <CollapseCard title="Price">
        <SortByPriceButton
          onClick={priceFilterOption.onChangePriceSortDirection}
        >{`Sort By ${
          priceFilterOption.priceSortDirection === PriceSortDirectionType.asc
            ? "Descending"
            : "Ascending"
        }`}</SortByPriceButton>
      </CollapseCard>
      <CollapseCard title="Chains" />
      <CollapseCard title="On Sale In" />
    </FilterContainer>
  );
};

export default FilterPanel;
