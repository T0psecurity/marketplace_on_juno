import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getQuery from "../../util/useAxios";

export type TokenPriceType = {
  hope: any;
  juno: any;
  raw: any;
};

export const DEFAULT_COLLECTION_STATE = {
  total: 0,
};

let initialState: TokenPriceType = {
  hope: null,
  juno: null,
  raw: null,
};

export const fetchTokenPrices = createAsyncThunk("tokenPrices", async () => {
  const hopePrice = await getQuery(
    "https://api.coingecko.com/api/v3/coins/hope-galaxy"
  );
  const junoPrice = await getQuery(
    "https://api.coingecko.com/api/v3/coins/juno-network"
  );
  const rawPrice = await getQuery(
    "https://api.coingecko.com/api/v3/coins/junoswap-raw-dao"
  );
  return { hope: hopePrice, juno: junoPrice, raw: rawPrice };
});

export const tokenPricesSlice = createSlice({
  name: "tokenPrices",
  initialState,
  reducers: {
    clearTokenPrice: (state, action: PayloadAction) => {
      state.juno = null;
      state.hope = null;
      state.raw = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokenPrices.fulfilled, (state, action) => {
      state.juno = action.payload.juno || null;
      state.hope = action.payload.hope || null;
      state.raw = action.payload.raw || null;
    });
  },
});

export const { clearTokenPrice } = tokenPricesSlice.actions;

export default tokenPricesSlice.reducer;
