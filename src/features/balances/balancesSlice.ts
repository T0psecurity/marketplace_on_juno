import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenType } from "../../types/tokens";

export type BalancesType = {
  [key in TokenType]: any;
};

let initialState: BalancesType = {} as BalancesType;

export const balancesSlice = createSlice({
  name: "balances",
  initialState,
  reducers: {
    clearBalances: (state, action: PayloadAction) => {
      (Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach(
        (key) => (state[TokenType[key]] = null)
      );
    },
    setTokenBalances: (state, action: PayloadAction<BalancesType>) => {
      const data: any = action.payload;
      Object.keys(data).forEach((key: string) => {
        state[key as TokenType] = data[key as TokenType];
      });
    },
  },
});

export const { clearBalances, setTokenBalances } = balancesSlice.actions;

export default balancesSlice.reducer;
