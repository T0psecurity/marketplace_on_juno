export interface BasicProps {
  onClick?: any;
  className?: string;
  children?: any;
}

export enum WalletType {
  KEPLR = "keplr",
  COSMOSTATION = "cosmostation",
}

export const ConnectedWalletTypeLocalStorageKey =
  "connected_wallet_localStorage_key";
