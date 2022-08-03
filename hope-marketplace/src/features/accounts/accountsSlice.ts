import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coin } from "@cosmjs/proto-signing";
import { Contract as CosmWasmContract } from "@cosmjs/cosmwasm-stargate";

export enum AccountType {
  Basic,
  Keplr,
  Contract,
}

export interface BaseAccount {
  type: AccountType;
  label: string;
  address: string;
  balance: Coin;
}

export interface KeplrAccount extends BaseAccount {
  type: AccountType.Keplr;
}

export interface BasicAccount extends BaseAccount {
  type: AccountType.Basic;
  mnemonic: string;
}

export interface Contract extends BaseAccount {
  type: AccountType.Contract;
  contract: CosmWasmContract;
  exists: boolean;
}

export type Account = KeplrAccount | BasicAccount | Contract;

export interface AccountsState {
  accountList: { [key: string]: Account };
  keplrAccount?: Account;
  currentAccount?: string;
  currentContract?: string;
  sendCoinsOpen: boolean;
  donationOpen: boolean;
  importContractOpen: boolean;
}

const initialState: AccountsState = {
  accountList: {},
  sendCoinsOpen: false,
  donationOpen: false,
  importContractOpen: false,
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setKeplrAccount: (
      state,
      action: PayloadAction<KeplrAccount | undefined>
    ) => {
      const account = action.payload;

      if (account) {
        if (!state.accountList) state.accountList = {};
        state.accountList[account.address] = account;
        state.currentAccount = account.address;
      } else {
        // if (
        //   state.currentAccount &&
        //   state.accountList[state.currentAccount]?.type === AccountType.Keplr
        // ) {
        //   state.currentAccount = undefined;
        // }
        // delete state.accountList[state.keplrAccount!.address];
        state.currentAccount = undefined;
        // state.accountList = {};
      }

      state.keplrAccount = account || undefined;
    },
  },
});

export const { setKeplrAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
