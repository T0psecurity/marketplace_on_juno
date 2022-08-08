import React, { useContext, useState, useCallback } from "react";
import ReactSelect from "react-select";
import { useAppSelector } from "../../app/hooks";
import ActivityList from "../../components/ActivityList";
import SearchInputer from "../../components/SearchInputer";
import { ThemeContext } from "../../context/ThemeContext";
import { getCustomTokenId } from "../../hook/useFetch";
import { TokenType } from "../../types/tokens";
import { SortDirectionType } from "../Marketplace/types";
import { getCollectionById, CollectionIds } from "../../constants/Collections";
import {
  CoinIcon,
  FilterContainer,
  HistoryContainer,
  Logo,
  SearchContainer,
  SearchWrapper,
  Title,
  TokenContainer,
  Wrapper,
} from "./styled";

const SortDirectionSelectOptions = [
  {
    label: "No Sort",
    value: undefined,
  },
  {
    label: "Price low to high",
    value: SortDirectionType.asc,
  },
  {
    label: "Price high to low",
    value: SortDirectionType.desc,
  },
];

const Activity: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<
    SortDirectionType | undefined
  >(SortDirectionSelectOptions[0].value);
  const [selectedTokenType, setSelectedTokenType] = useState<
    TokenType | undefined
  >();
  const { isDark } = useContext(ThemeContext);

  const tokenPrices = useAppSelector((state) => state.tokenPrices);

  const filterActivitiesFunc = useCallback(
    (activities: any[]) => {
      let result: any[] = [];
      if (searchValue || selectedTokenType) {
        activities.forEach((activityItem: any) => {
          let filtered = true;
          if (searchValue) {
            const targetCollection = getCollectionById(
              activityItem.collectionId as CollectionIds
            );
            const tokenId = targetCollection.customTokenId
              ? getCustomTokenId(
                  activityItem.token_id,
                  targetCollection.customTokenId
                )
              : activityItem.token_id;
            filtered =
              filtered &&
              tokenId.toLowerCase().includes(searchValue.toLowerCase());
          }
          if (selectedTokenType) {
            filtered =
              filtered && activityItem.denom === (selectedTokenType as string);
          }
          if (filtered) {
            result = [...result, activityItem];
          }
        });
      } else {
        result = activities;
      }
      return result.sort((item1: any, item2: any) => {
        if (
          sortDirection === SortDirectionType.asc ||
          sortDirection === SortDirectionType.desc
        ) {
          const tokenPrice1 =
            tokenPrices[item1.denom as TokenType]?.market_data.current_price
              ?.usd || 0;
          const tokenPrice2 =
            tokenPrices[item2.denom as TokenType]?.market_data.current_price
              ?.usd || 0;

          const price1 = tokenPrice1 * Number(item1.amount);
          const price2 = tokenPrice2 * Number(item2.amount);
          if (sortDirection === SortDirectionType.asc) {
            return price1 < price2 ? -1 : 1;
          } else {
            return price1 < price2 ? 1 : -1;
          }
        }
        return item1?.time < item2.time ? 1 : -1;
      });
    },
    [searchValue, selectedTokenType, sortDirection, tokenPrices]
  );

  const handleChangeSearchValue = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleChangeSortDirection = (item: any) => {
    setSortDirection(item.value);
  };

  return (
    <Wrapper>
      <Logo />
      <Title>Activity Page</Title>
      <SearchWrapper>
        <SearchInputer onChange={handleChangeSearchValue} />
      </SearchWrapper>
      <FilterContainer>
        <TokenContainer>
          {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
            (key) => (
              <CoinIcon
                alt=""
                src={`/coin-images/${TokenType[key].replace(/\//g, "")}.png`}
                onClick={() => {
                  setSelectedTokenType((prev) =>
                    prev === TokenType[key] ? undefined : TokenType[key]
                  );
                }}
              />
            )
          )}
        </TokenContainer>
        <SearchContainer>
          <ReactSelect
            defaultValue={SortDirectionSelectOptions[0]}
            onChange={handleChangeSortDirection}
            options={SortDirectionSelectOptions}
            styles={{
              menu: (provided, state) => ({
                ...provided,
                backgroundColor: isDark ? "#838383" : "white",
              }),
              control: (provided, state) => ({
                ...provided,
                ...(isDark && {
                  backgroundColor: "#838383",
                }),
              }),
              singleValue: (provided, state) => ({
                ...provided,
                ...(isDark && {
                  color: "white",
                }),
              }),
            }}
          />
        </SearchContainer>
      </FilterContainer>
      <HistoryContainer>
        <ActivityList filterFunc={filterActivitiesFunc} />
      </HistoryContainer>
    </Wrapper>
  );
};

export default Activity;
