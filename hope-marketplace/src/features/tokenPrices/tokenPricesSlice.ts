import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getQuery from "../../util/useAxios";
import { TokenType } from "../../types/tokens";
import { customPromiseAll } from "../../util/promiseAll";

const TokenCoingeckoIds: { [key in TokenType]: string } = {
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
      tokenPrices[keys[index]] = result;
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
