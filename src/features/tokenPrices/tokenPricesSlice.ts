import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getQuery from "../../util/useAxios";
import { TokenType } from "../../types/tokens";
import { customPromiseAll } from "../../util/promiseAll";
import { getUnixTimeStamp } from "../../util/date";
import moment from "moment";

export const TokenCoingeckoIds: { [key in TokenType]: string } = {
  [TokenType.HOPE]: "hope-galaxy",
  [TokenType.JUNO]: "juno-network",
  [TokenType.RAW]: "junoswap-raw-dao",
  [TokenType.NETA]: "neta",
  [TokenType.ATOM]: "cosmos",
};

export type TokenPriceType = {
  [key in TokenType]: any;
};

export const DEFAULT_COLLECTION_STATE = {
  total: 0,
};

let initialState: TokenPriceType = {
  [TokenType.HOPE]: null,
  [TokenType.JUNO]: null,
  [TokenType.RAW]: null,
  [TokenType.NETA]: null,
  [TokenType.ATOM]: null,
};

export enum TokenHistoryPeriod {
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY",
}

type TokenPriceHistoryType = {
  [key in TokenType]: { [key: string]: number };
};

const TimeFormats = {
  [TokenHistoryPeriod.DAILY]: "hh:mm",
  [TokenHistoryPeriod.WEEKLY]: "MM-DD",
  [TokenHistoryPeriod.MONTHLY]: "MM-DD",
  [TokenHistoryPeriod.YEARLY]: "YYYY-MM",
};

const getFromFunctions: { [key: number]: () => number } = {
  [TokenHistoryPeriod.DAILY]: () =>
    new Date().setDate(new Date().getDate() - 1),
  [TokenHistoryPeriod.WEEKLY]: () =>
    new Date().setDate(new Date().getDate() - 7),
  [TokenHistoryPeriod.MONTHLY]: () =>
    new Date().setMonth(new Date().getMonth() - 1),
  [TokenHistoryPeriod.YEARLY]: () =>
    new Date().setFullYear(new Date().getFullYear() - 1),
};

export const fetchTokenPriceHistory = async (
  period: TokenHistoryPeriod
): Promise<TokenPriceHistoryType> => {
  let keys: any = [];
  const from = getUnixTimeStamp(getFromFunctions[period]());
  const to = getUnixTimeStamp(new Date());

  const fetchQueries = Object.keys(TokenCoingeckoIds).map((key: string) => {
    keys.push(key as TokenType);
    return getQuery(
      `https://api.coingecko.com/api/v3/coins/${
        TokenCoingeckoIds[key as TokenType]
      }/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
    );
  });
  try {
    let returnResult: any = {};
    const queryResults = await customPromiseAll(fetchQueries);
    queryResults.forEach((result: any, index: number) => {
      if (result) {
        const priceHistories: any = {};
        let previousHistoryOption: {
          label: string;
          totalValue: number;
          count: number;
        } = {
          label: "",
          totalValue: 0,
          count: 0,
        };
        result.prices.forEach((historyItem: any) => {
          const crrHistory = {
            label: moment(new Date(historyItem[0])).format(TimeFormats[period]),
            value: historyItem[1],
          };
          if (
            !previousHistoryOption.label ||
            previousHistoryOption.label === crrHistory.label
          ) {
            previousHistoryOption.label = crrHistory.label;
            previousHistoryOption.totalValue += crrHistory.value;
            previousHistoryOption.count++;
          } else {
            // priceHistories.push({
            //   label: previousHistoryOption.label,
            //   value:
            //     previousHistoryOption.totalValue / previousHistoryOption.count,
            // });
            priceHistories[previousHistoryOption.label] =
              previousHistoryOption.totalValue / previousHistoryOption.count;
            previousHistoryOption = {
              label: crrHistory.label,
              totalValue: crrHistory.value,
              count: 1,
            };
          }
        });

        returnResult[keys[index]] = priceHistories;
      }
    });
    return returnResult;
  } catch (e) {
    console.error("query results", e);
    return {} as TokenPriceHistoryType;
  }
};

export const fetchTokenPrices = createAsyncThunk("tokenPrices", async () => {
  let keys: any = [];
  const fetchQueries = Object.keys(TokenCoingeckoIds).map((key: string) => {
    keys.push(key as TokenType);
    return getQuery(
      `https://api.coingecko.com/api/v3/coins/${
        TokenCoingeckoIds[key as TokenType]
      }`
    );
  });
  try {
    let tokenPrices: any = {};
    const queryResults = await customPromiseAll(fetchQueries);
    queryResults.forEach((result: any, index: number) => {
      tokenPrices[keys[index]] = { market_data: result.market_data };
    });
    return tokenPrices;
  } catch (err) {
    return initialState;
  }
});

export const tokenPricesSlice = createSlice({
  name: "tokenPrices",
  initialState,
  reducers: {
    clearTokenPrice: (state, action: PayloadAction) => {
      state.ujuno = null;
      state.hope = null;
      state.raw = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokenPrices.fulfilled, (state, action) => {
      const data: any = action.payload;
      Object.keys(data).forEach((key: string) => {
        state[key as TokenType] = data[key as TokenType];
      });
    });
  },
});

export const { clearTokenPrice } = tokenPricesSlice.actions;

export default tokenPricesSlice.reducer;
