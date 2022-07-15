import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getQuery from "../../util/useAxios";
import { NFTPriceType } from "../../types/nftPriceTypes";
import { customPromiseAll } from "../../util/promiseAll";

const TokenCoingeckoIds: { [key in NFTPriceType]: string } = {
  [NFTPriceType.HOPE]: "hope-galaxy",
  [NFTPriceType.JUNO]: "juno-network",
  [NFTPriceType.RAW]: "junoswap-raw-dao",
  [NFTPriceType.NETA]: "neta",
};

export type TokenPriceType = {
  [key in NFTPriceType]: any;
};

export const DEFAULT_COLLECTION_STATE = {
  total: 0,
};

let initialState: TokenPriceType = {
  hope: null,
  ujuno: null,
  raw: null,
  neta: null,
};

export const fetchTokenPrices = createAsyncThunk("tokenPrices", async () => {
  // const hopePrice = await getQuery(
  //   "https://api.coingecko.com/api/v3/coins/hope-galaxy"
  // );
  // const junoPrice = await getQuery(
  //   "https://api.coingecko.com/api/v3/coins/juno-network"
  // );
  // const rawPrice = await getQuery(
  //   "https://api.coingecko.com/api/v3/coins/junoswap-raw-dao"
  // );

  let keys: any = [];
  const fetchQueries = Object.keys(TokenCoingeckoIds).map((key: string) => {
    keys.push(key as NFTPriceType);
    return getQuery(
      `https://api.coingecko.com/api/v3/coins/${
        TokenCoingeckoIds[key as NFTPriceType]
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
        state[key as NFTPriceType] = data[key as NFTPriceType];
      });
    });
  },
});

export const { clearTokenPrice } = tokenPricesSlice.actions;

export default tokenPricesSlice.reducer;
