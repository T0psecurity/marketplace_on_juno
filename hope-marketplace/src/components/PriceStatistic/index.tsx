import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../app/hooks";
import {
  fetchTokenPriceHistory,
  TokenHistoryPeriod,
} from "../../features/tokenPrices/tokenPricesSlice";
import { TokenFullName, TokenType } from "../../types/tokens";
// import { ThemeContext } from "../../context/ThemeContext";
import {
  AllButton,
  ChartArea,
  CoinImage,
  ContentContainer,
  PriceStatisticContainer,
  PriceStatisticContent,
  PriceStatisticItem,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchInputWrapper,
  Span,
  Title,
  TokenName,
  Wrapper,
  // StyledSelect as Select,
} from "./styled";

// type LineDisplay = {
//   [key in TokenType]: boolean;
// };

const LineColors = {
  [TokenType.JUNO]: "#ea5545",
  [TokenType.HOPE]: "#f46a9b",
  [TokenType.NETA]: "#ef9b20",
  [TokenType.RAW]: "#edbf33",
  [TokenType.ATOM]: "#ede15b", // "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"
};

// type PeriodOptionType = {
//   value: any;
//   label: string;
// };

// const SelectPeriodOptions: PeriodOptionType[] = [
//   // {
//   //   value: TokenHistoryPeriod.DAILY,
//   //   label: "Daily",
//   // },
//   {
//     value: TokenHistoryPeriod.WEEKLY,
//     label: "Weekly",
//   },
//   {
//     value: TokenHistoryPeriod.MONTHLY,
//     label: "Monthly",
//   },
//   {
//     value: TokenHistoryPeriod.YEARLY,
//     label: "Yearly",
//   },
// ];

const PriceStatistic: React.FC = () => {
  // const [historyPeriod, setHistoryPeriod] = useState<PeriodOptionType>(
  //   SelectPeriodOptions[1]
  // );
  // const [lineDisplay, setLineDisplay] = useState<LineDisplay>(
  //   {} as LineDisplay
  // );
  const [searchedToken, setSearchedToken] = useState("");
  const [tokenPriceHistory, setTokenPriceHistory] = useState<any[]>([]);

  // const { isDark } = useContext(ThemeContext);
  const tokenPrices = useAppSelector((state) => state.tokenPrices);

  // useEffect(() => {
  //   let lineDisplaySetting: LineDisplay = {} as LineDisplay;
  //   (Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach((key) => {
  //     lineDisplaySetting[TokenType[key]] = true;
  //   });
  //   setLineDisplay(lineDisplaySetting);
  // }, []);

  useEffect(() => {
    (async () => {
      let result: any[] = [];
      const tokenHistoryQueryResult = await fetchTokenPriceHistory(
        // historyPeriod.value
        TokenHistoryPeriod.MONTHLY
      );
      Object.keys(tokenHistoryQueryResult?.[TokenType.JUNO] || {}).forEach(
        (date: string) => {
          let resultItem: any = { date };
          (Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach(
            (tokenType) => {
              const denom = TokenType[tokenType];
              resultItem[tokenType] = tokenHistoryQueryResult[denom]?.[date];
            }
          );
          result.push(resultItem);
        }
      );
      setTokenPriceHistory(result);
    })();
  }, []);

  // const handleClickChartLegend = (e: any) => {
  //   const { dataKey } = e;
  //   const denom: TokenType = TokenType[dataKey as keyof typeof TokenType];
  //   setLineDisplay((prev) => ({
  //     ...prev,
  //     [denom]: !prev[denom],
  //   }));
  // };

  const handleChangeSearchToken = (e: any) => {
    const { value } = e.target;
    setSearchedToken(value);
  };

  const { legendPayload, lineDisplay } = useMemo(() => {
    if (!searchedToken) {
      return {
        legendPayload: [
          {
            dataKey: (
              Object.keys(TokenType) as Array<keyof typeof TokenType>
            ).filter((key) => TokenType[key] === TokenType.JUNO)[0],
            value: (
              Object.keys(TokenType) as Array<keyof typeof TokenType>
            ).filter((key) => TokenType[key] === TokenType.JUNO)[0],
            color: LineColors[TokenType.JUNO],
          },
        ],
        lineDisplay: { [TokenType.JUNO]: true },
      };
    }
    const legendPayloadResult: any = [];
    let lineDisplayResult: any = {};
    (Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach((key) => {
      const denom = TokenType[key];
      if (
        `${key} ${TokenFullName[denom]}`
          .toLowerCase()
          .indexOf(searchedToken.toLowerCase()) > -1
      ) {
        legendPayloadResult.push({
          dataKey: key,
          value: key,
          color: LineColors[TokenType[key]],
        });
        lineDisplayResult[denom] = true;
      }
    });
    return {
      legendPayload: legendPayloadResult,
      lineDisplay: lineDisplayResult,
    };
  }, [searchedToken]);

  // const handleChangePeriodOption = (option: any) => {
  //   setHistoryPeriod(option);
  // };

  return (
    <Wrapper>
      <Title>ECOSYSTEM PRICE CHARTS</Title>
      <ContentContainer>
        <PriceStatisticContainer>
          <SearchContainer>
            <AllButton onClick={() => setSearchedToken("")}>All</AllButton>
            <SearchInputWrapper>
              <SearchInput
                placeholder="Search Vault"
                value={searchedToken}
                onChange={handleChangeSearchToken}
              />
              <SearchIcon className="fa fa-search" />
            </SearchInputWrapper>
          </SearchContainer>
          <PriceStatisticItem first>
            <PriceStatisticContent>
              <Span>#</Span>
            </PriceStatisticContent>
            <PriceStatisticContent>
              <Span>Coin</Span>
            </PriceStatisticContent>
            <PriceStatisticContent>
              <Span>Price</Span>
            </PriceStatisticContent>
            <PriceStatisticContent>
              <Span>1h</Span>
            </PriceStatisticContent>
            <PriceStatisticContent>
              <Span>24h</Span>
            </PriceStatisticContent>
            <PriceStatisticContent>
              <Span>7d</Span>
            </PriceStatisticContent>
          </PriceStatisticItem>
          {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
            (key, index, arr) => {
              const denom = TokenType[key];
              const tokenPrice = tokenPrices[denom];
              if (
                !searchedToken ||
                `${key} ${TokenFullName[denom]}`
                  .toLowerCase()
                  .indexOf(searchedToken.toLowerCase()) > -1
              ) {
                const currentPrice =
                  tokenPrice?.market_data?.current_price?.usd || 0;
                const priceChange1h =
                  tokenPrice?.market_data?.price_change_percentage_1h_in_currency?.usd?.toFixed(
                    2
                  ) || 0;
                const priceChange24h =
                  tokenPrice?.market_data?.price_change_percentage_24h_in_currency?.usd?.toFixed(
                    2
                  ) || 0;
                const priceChange7d =
                  tokenPrice?.market_data?.price_change_percentage_7d_in_currency?.usd?.toFixed(
                    2
                  ) || 0;
                return (
                  <PriceStatisticItem
                    key={denom}
                    last={index === arr.length - 1}
                  >
                    <PriceStatisticContent>
                      <CoinImage
                        coinType={denom}
                        onClick={() => setSearchedToken(key)}
                      />
                    </PriceStatisticContent>
                    <PriceStatisticContent>
                      <TokenName>
                        <Span>{`(${key})`}</Span>
                        <Span>{TokenFullName[denom]}</Span>
                      </TokenName>
                    </PriceStatisticContent>
                    <PriceStatisticContent>
                      <Span>{`$${currentPrice}`}</Span>
                    </PriceStatisticContent>
                    <PriceStatisticContent>
                      <Span
                        color={priceChange1h < 0 ? "#FF4842" : "#35cb00"}
                      >{`${priceChange1h}%`}</Span>
                    </PriceStatisticContent>
                    <PriceStatisticContent>
                      <Span
                        color={priceChange24h < 0 ? "#FF4842" : "#35cb00"}
                      >{`${priceChange24h}%`}</Span>
                    </PriceStatisticContent>
                    <PriceStatisticContent>
                      <Span
                        color={priceChange7d < 0 ? "#FF4842" : "#35cb00"}
                      >{`${priceChange7d}%`}</Span>
                    </PriceStatisticContent>
                  </PriceStatisticItem>
                );
              } else {
                return null;
              }
            }
          )}
        </PriceStatisticContainer>
        <ChartArea>
          {/* <Select
            styles={{
              control: (provided, state) => ({
                ...provided,
                ...(isDark && {
                  backgroundColor: "#838383",
                }),
              }),
              menu: (provided, state) => ({
                ...provided,
                backgroundColor: isDark ? "#838383" : "white",
              }),
              singleValue: (provided, state) => ({
                ...provided,
                ...(isDark && {
                  color: "white",
                }),
              }),
            }}
            value={historyPeriod}
            options={SelectPeriodOptions}
            onChange={handleChangePeriodOption}
          /> */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={tokenPriceHistory}
              margin={{
                top: 50,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend
                // onClick={handleClickChartLegend}
                payload={legendPayload}
              />
              {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
                (key) =>
                  lineDisplay[TokenType[key]] && (
                    <Line
                      key={key}
                      type="monotone"
                      stroke={LineColors[TokenType[key]]}
                      dataKey={key}
                      dot={false}
                    />
                  )
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartArea>
      </ContentContainer>
    </Wrapper>
  );
};

export default PriceStatistic;
