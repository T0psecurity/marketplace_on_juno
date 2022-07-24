import React, { useEffect, useState, useRef, MouseEventHandler } from "react";
import ReactSelect, { components } from "react-select";

import {
  // DEFAULT_STATUS_FILTER,
  FilterPanelProps,
  MarketplaceTabs,
  MetaDataFilterOption,
  SortDirectionType,
  // StatusFilterButtonType,
  // StatusFilterType,
} from "./types";

import {
  FilterWrapper,
  FilterMainContent,
  StyledButton as Button,
  // SortByPriceButton,
  FilterContainer,
  FilterContainerTitle,
  // StatusFilterPanel,
  StyledCollapseCard as CollapseCard,
  StyledSvg,
  SearchSortPanel,
  SortContainer,
  SearchWrapper,
  CoinImage,
  CoinImageWrapper,
  FilterResultPanel,
  NftListTabs,
  NftListTab,
  SortIcon,
} from "./styled";
import { TokenType } from "../../types/tokens";
import SearchInputer from "../../components/SearchInputer";

type SortType =
  | {
      value: "price";
      label: "PRICE";
    }
  | { value: "rank"; label: "RANK" };

const SortOptions: SortType[] = [
  {
    value: "price",
    label: "PRICE",
  },
  { value: "rank", label: "RANK" },
];

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

const FilterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 45 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_321_8)">
      <path
        d="M0 11.5V1.4375C0 0.646875 0.632812 0 1.40625 0C2.17969 0 2.8125 0.646875 2.8125 1.4375V11.5C2.8125 12.2906 2.17969 12.9375 1.40625 12.9375C0.632812 12.9375 0 12.2906 0 11.5ZM5.625 11.5V1.4375C5.625 0.646875 6.25781 0 7.03125 0H14.0625C14.8359 0 15.4688 0.646875 15.4688 1.4375V11.5C15.4688 12.2906 14.8359 12.9375 14.0625 12.9375H7.03125C6.25781 12.9375 5.625 12.2906 5.625 11.5ZM8.4375 10.0625H12.6562V2.875H8.4375V10.0625ZM19.6875 12.9375C20.4609 12.9375 21.0938 12.2906 21.0938 11.5V1.4375C21.0938 0.646875 20.4609 0 19.6875 0C18.9141 0 18.2812 0.646875 18.2812 1.4375V11.5C18.2812 12.2906 18.9141 12.9375 19.6875 12.9375ZM37.9688 12.9375C38.7422 12.9375 39.375 12.2906 39.375 11.5V1.4375C39.375 0.646875 38.7422 0 37.9688 0C37.1953 0 36.5625 0.646875 36.5625 1.4375V11.5C36.5625 12.2906 37.1953 12.9375 37.9688 12.9375ZM23.9062 11.5V1.4375C23.9062 0.646875 24.5391 0 25.3125 0H32.3438C33.1172 0 33.75 0.646875 33.75 1.4375V11.5C33.75 12.2906 33.1172 12.9375 32.3438 12.9375H25.3125C24.5391 12.9375 23.9062 12.2906 23.9062 11.5ZM26.7188 10.0625H30.9375V2.875H26.7188V10.0625ZM1.40625 31.625C0.632812 31.625 0 32.2719 0 33.0625V43.125C0 43.9156 0.632812 44.5625 1.40625 44.5625C2.17969 44.5625 2.8125 43.9156 2.8125 43.125V33.0625C2.8125 32.2719 2.17969 31.625 1.40625 31.625ZM15.4688 33.0625V43.125C15.4688 43.9156 14.8359 44.5625 14.0625 44.5625H7.03125C6.25781 44.5625 5.625 43.9156 5.625 43.125V33.0625C5.625 32.2719 6.25781 31.625 7.03125 31.625H14.0625C14.8359 31.625 15.4688 32.2719 15.4688 33.0625ZM12.6562 34.5H8.4375V41.6875H12.6562V34.5ZM18.2812 40.25V43.125C18.2812 43.9156 18.9141 44.5625 19.6875 44.5625C20.4609 44.5625 21.0938 43.9156 21.0938 43.125V40.25H18.2812ZM14.0625 15.8125C13.2891 15.8125 12.6562 16.4594 12.6562 17.25V27.3125C12.6562 28.1031 13.2891 28.75 14.0625 28.75C14.8359 28.75 15.4688 28.1031 15.4688 27.3125V17.25C15.4688 16.4594 14.8359 15.8125 14.0625 15.8125ZM0 27.3125V17.25C0 16.4594 0.632812 15.8125 1.40625 15.8125H8.4375C9.21094 15.8125 9.84375 16.4594 9.84375 17.25V27.3125C9.84375 28.1031 9.21094 28.75 8.4375 28.75H1.40625C0.632812 28.75 0 28.1031 0 27.3125ZM2.8125 25.875H7.03125V18.6875H2.8125V25.875ZM21.0938 20.125V17.25C21.0938 16.4594 20.4609 15.8125 19.6875 15.8125C18.9141 15.8125 18.2812 16.4594 18.2812 17.25V20.125H21.0938ZM39.375 18.6875V17.25C39.375 16.4594 38.7422 15.8125 37.9688 15.8125C37.1953 15.8125 36.5625 16.4594 36.5625 17.25V18.6875H39.375ZM25.3125 30.1875C25.3125 27.8156 27.2109 25.875 29.5312 25.875C30.3047 25.875 30.9375 25.2281 30.9375 24.4375C30.9375 23.6469 30.3047 23 29.5312 23C25.65 23 22.5 26.22 22.5 30.1875C22.5 30.9781 23.1328 31.625 23.9062 31.625C24.6797 31.625 25.3125 30.9781 25.3125 30.1875ZM44.5922 43.5419C45.1406 44.1025 45.1406 45.0081 44.5922 45.5688C44.3109 45.8563 43.9594 46 43.5938 46C43.2281 46 42.8766 45.8562 42.5953 45.5831L36.4078 39.2581C34.5094 40.7819 32.1328 41.6875 29.5312 41.6875C23.3297 41.6875 18.2812 36.5269 18.2812 30.1875C18.2812 23.8481 23.3297 18.6875 29.5312 18.6875C35.7328 18.6875 40.7812 23.8481 40.7812 30.1875C40.7812 32.8469 39.8953 35.2762 38.4047 37.2312L44.5922 43.5419ZM37.9688 30.1875C37.9688 25.4294 34.1859 21.5625 29.5312 21.5625C24.8766 21.5625 21.0938 25.4294 21.0938 30.1875C21.0938 34.9456 24.8766 38.8125 29.5312 38.8125C34.1859 38.8125 37.9688 34.9456 37.9688 30.1875Z"
        fill="#3D6666"
      />
    </g>
    <defs>
      <clipPath id="clip0_321_8">
        <rect width="45" height="46" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// const STATUS_FILTER_BUTTONS: StatusFilterButtonType[] = [
//   { title: "Buy Now", key: "buyNow" },
//   { title: "On Auction", key: "onAuction" },
//   { title: "New", key: "new" },
//   { title: "Has Offers", key: "hasOffers" },
// ];

const FilterPanel: React.FC<FilterPanelProps> = ({
  expanded,
  onChangeExpanded,
  onChangeFilterOption,
  metaDataOptions,
  onChangeNftListTab,
  children,
}) => {
  // const [statusFilter, setStatusFilter] = useState<StatusFilterType>(
  //   DEFAULT_STATUS_FILTER
  // );
  const [selectedTab, setSelectedTab] = useState(MarketplaceTabs.ITEMS);
  const [metaDataFilter, setMetaDataFilter] = useState<MetaDataFilterOption>(
    {}
  );
  const [isAscending, setIsAscending] = useState(true);
  const [sortKey, setSortKey] = useState<SortType>({
    value: "price",
    label: "PRICE",
  });
  const [searchWord, setSearchWord] = useState<string>("");
  const [priceType, setPriceType] = useState<string>("");

  const searchSortContainer = useRef(null);

  const searchSortHeight =
    (searchSortContainer?.current as any)?.offsetHeight || 0;

  useEffect(() => {
    onChangeFilterOption({
      sortOption: {
        field: sortKey.value,
        direction: isAscending ? SortDirectionType.asc : SortDirectionType.desc,
      },
      searchWord,
      priceType,
      metaDataFilterOption: metaDataFilter,
    });
  }, [
    sortKey,
    isAscending,
    searchWord,
    onChangeFilterOption,
    priceType,
    metaDataFilter,
  ]);

  const handleSortByPrice: MouseEventHandler<any> = (e) => {
    console.log("clicked sort button");
    e.preventDefault();
    e.stopPropagation();
    setIsAscending(!isAscending);
  };

  const handleChangeSearchWord = (e: any) => {
    const {
      target: { value },
    } = e;
    setSearchWord(value);
  };

  const handleClickPriceType = (selectedPriceType: string) => {
    setPriceType(selectedPriceType === priceType ? "" : selectedPriceType);
  };

  // const handleChangeStatusFilter = (buttonItem: StatusFilterButtonType) => {
  //   setStatusFilter({
  //     ...statusFilter,
  //     [buttonItem.key]: !statusFilter[buttonItem.key],
  //   });
  // };

  const handleChangeMetaDataFilter = (field: string, value: string) => {
    const currentValue =
      !!metaDataFilter[field] && metaDataFilter[field][value];
    setMetaDataFilter({
      ...metaDataFilter,
      [field]: {
        ...metaDataFilter[field],
        [value]: !currentValue,
      },
    });
  };

  const handleChangeNftListTab = (selected: MarketplaceTabs) => {
    setSelectedTab(selected);
    onChangeNftListTab(selected);
  };

  const CustomSortIcon = ({ desc, ...props }: any) => (
    <SortIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      desc={desc}
      {...props}
    >
      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224z" />
    </SortIcon>
  );

  const Control = ({ children, ...props }: any) => {
    return (
      <components.Control {...props}>
        <CustomSortIcon onMouseDown={handleSortByPrice} desc={!isAscending} />
        {children}
      </components.Control>
    );
  };

  return (
    <FilterWrapper>
      <FilterContainer>
        <FilterContainerTitle>
          <FilterIcon /> Filter
          <ArrowIcon onClick={() => onChangeExpanded(!expanded)} />
        </FilterContainerTitle>
        {expanded && (
          <>
            <CollapseCard title="On Sale in" expanded>
              <CoinImageWrapper>
                {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
                  (key, index) => {
                    const denom = TokenType[key];
                    return (
                      <CoinImage
                        key={index}
                        coinType={denom}
                        onClick={() => handleClickPriceType(denom)}
                      />
                    );
                  }
                )}
                {/* <CoinImage
                  coinType="hope"
                  onClick={() => handleClickPriceType("hope")}
                />
                <CoinImage
                  coinType="juno"
                  onClick={() => handleClickPriceType("ujuno")}
                /> */}
              </CoinImageWrapper>
            </CollapseCard>
            {!!metaDataOptions &&
              Object.keys(metaDataOptions)
                .sort((metaDataOption1: string, metaDataOption2: string) =>
                  metaDataOption1 > metaDataOption2 ? 1 : -1
                )
                .map((optionKey: string, keyIndex: number) => {
                  const options = metaDataOptions[optionKey];
                  if (!options || !options.length) return null;
                  const sortedOptions = options.sort(
                    (option1: string, option2: string) =>
                      option1 > option2 ? 1 : -1
                  );
                  return (
                    <CollapseCard
                      title={optionKey}
                      key={`${optionKey}-${keyIndex}`}
                    >
                      {sortedOptions.map((option: string, index: number) => (
                        <Button
                          key={index}
                          onClick={() =>
                            handleChangeMetaDataFilter(optionKey, option)
                          }
                          selected={
                            !!metaDataFilter[optionKey] &&
                            metaDataFilter[optionKey][option]
                          }
                        >
                          {option.replace(/_/g, " ")}
                        </Button>
                      ))}
                    </CollapseCard>
                  );
                })}
          </>
        )}
      </FilterContainer>
      <FilterMainContent>
        <SearchSortPanel ref={searchSortContainer}>
          <NftListTabs>
            <NftListTab
              selected={selectedTab === MarketplaceTabs.ITEMS}
              onClick={() => handleChangeNftListTab(MarketplaceTabs.ITEMS)}
            >
              Items
            </NftListTab>
            <NftListTab
              selected={selectedTab === MarketplaceTabs.ACTIVITY}
              onClick={() => handleChangeNftListTab(MarketplaceTabs.ACTIVITY)}
            >
              Activity
            </NftListTab>
          </NftListTabs>
          {selectedTab === MarketplaceTabs.ITEMS && (
            <SortContainer>
              {/* <SortByPriceButton onClick={handleSortByPrice}>{`Sort By ${
                isAscending ? "Descending" : "Ascending"
              }`}</SortByPriceButton> */}
              <ReactSelect
                value={sortKey}
                onChange={(item: any) => {
                  setSortKey(item);
                }}
                // @ts-ignore
                onClickSortButton={handleSortByPrice}
                isSearchable={false}
                options={SortOptions}
                components={{ Control }}
              />
            </SortContainer>
          )}
          <SearchWrapper>
            <SearchInputer
              onChange={handleChangeSearchWord}
              placeholder="Search by ID number..."
            />
          </SearchWrapper>
        </SearchSortPanel>
        <FilterResultPanel siblingHeight={searchSortHeight}>
          {children}
        </FilterResultPanel>
      </FilterMainContent>
    </FilterWrapper>
  );
};

export default FilterPanel;
