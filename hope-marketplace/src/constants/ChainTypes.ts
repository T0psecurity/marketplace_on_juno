export enum ChainTypes {
  JUNO = "juno-1",
}

export type ConfigType = {
  chainName: string;
  chainId: string;
  rpcEndpoint: string;
  restEndpoint: string;
  faucetEndpoint: string;
  addressPrefix: string;
  microDenom: string;
  coinDecimals: string;
  gasPrice: string;
};

export const ChainConfigs: { [key in ChainTypes]: ConfigType } = {
  [ChainTypes.JUNO]: {
    chainName: "Juno Mainnet",
    chainId: "juno-1",
    rpcEndpoint: "https://rpc-juno.itastakers.com/",
    restEndpoint: "https://lcd-juno.itastakers.com/",
    faucetEndpoint: "",
    addressPrefix: "juno",
    microDenom: "ujuno",
    coinDecimals: "6",
    gasPrice: "0.025",
  },
};
