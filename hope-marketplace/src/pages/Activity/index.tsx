import React, { useContext, useMemo, useState } from "react";
import ReactSelect from "react-select";
import { useAppSelector } from "../../app/hooks";
import ActivityList from "../../components/ActivityList";
import SearchInputer from "../../components/SearchInputer";
import Collections from "../../constants/Collections";
import { ThemeContext } from "../../context/ThemeContext";
import { TotalStateType } from "../../features/collections/collectionsSlice";
import { getCustomTokenId } from "../../hook/useFetch";
import { TokenType } from "../../types/tokens";
import { SortDirectionType } from "../Marketplace/types";
import {
  CoinIcon,
  FilterContainer,
  HistoryContainer,
  LoadMoreButton,
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

const INITIAL_RENDER_COUNT = 50;

const Activity: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<
    SortDirectionType | undefined
  >(SortDirectionSelectOptions[0].value);
  const [selectedTokenType, setSelectedTokenType] = useState<
    TokenType | undefined
  >();
  const [renderCount, setRenderCount] = useState<number>(INITIAL_RENDER_COUNT);
  const { isDark } = useContext(ThemeContext);

  const collectionStates: TotalStateType = useAppSelector(
    (state) => state.collectionStates
  );
  const tokenPrices = useAppSelector((state) => state.tokenPrices);

  const filteredSaleHistory = useMemo(() => {
    let filteredResult: any = [];
    Collections.forEach((collection) => {
      const saleHistory =
        collectionStates[collection.collectionId]?.saleHistory;
      if (saleHistory?.length) {
        if (searchValue || selectedTokenType) {
          saleHistory.forEach((historyItem: any) => {
            let filtered = true;
            if (searchValue) {
              const tokenId = collection.customTokenId
                ? getCustomTokenId(
                    historyItem.token_id,
                    collection.customTokenId
                  )
                : historyItem.token_id;
              filtered =
                filtered &&
                tokenId.toLowerCase().includes(searchValue.toLowerCase());
            }
            if (selectedTokenType) {
              filtered =
                filtered && historyItem.denom === (selectedTokenType as string);
            }
            if (filtered) {
              filteredResult = [...filteredResult, historyItem];
            }
          });
        } else {
          filteredResult = [...filteredResult, ...saleHistory];
        }
      }
    });
    return filteredResult.sort((history1: any, history2: any) => {
      if (
        sortDirection === SortDirectionType.asc ||
        sortDirection === SortDirectionType.desc
      ) {
        const tokenPrice1 =
          tokenPrices[history1.denom as TokenType]?.market_data.current_price
            ?.usd || 0;
        const tokenPrice2 =
          tokenPrices[history2.denom as TokenType]?.market_data.current_price
            ?.usd || 0;

        const price1 = tokenPrice1 * Number(history1.amount);
        const price2 = tokenPrice2 * Number(history2.amount);
        if (sortDirection === SortDirectionType.asc) {
          return price1 < price2 ? -1 : 1;
        } else {
          return price1 < price2 ? 1 : -1;
        }
      }
      return history1?.time < history2.time ? 1 : -1;
    });
  }, [
    collectionStates,
    searchValue,
    selectedTokenType,
    sortDirection,
    tokenPrices,
  ]);

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
                  setRenderCount(INITIAL_RENDER_COUNT);
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
        <ActivityList history={filteredSaleHistory.slice(0, renderCount)} />
      </HistoryContainer>
      <LoadMoreButton
        onClick={() => setRenderCount((prev) => Math.min(prev + 15))}
      >
        Load More Activities...
      </LoadMoreButton>
    </Wrapper>
  );
};

export default Activity;
