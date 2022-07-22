export enum ChainTypes {
  JUNO = "juno-1",
  COSMOS = "cosmoshub-4",
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

export const IBCConfig: {
  [key in ChainTypes]: {
    channel: string;
    juno_channel: string;
  };
} = {
  [ChainTypes.JUNO]: { channel: "", juno_channel: "" },
  [ChainTypes.COSMOS]: { channel: "channel-207", juno_channel: "channel-1" },
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
  [ChainTypes.COSMOS]: {
    chainName: "Cosmos Hub",
    chainId: "cosmoshub-4",
    rpcEndpoint: "https://rpc.cosmos.network/",
    restEndpoint: "",
    faucetEndpoint: "",
    addressPrefix: "cosmos",
    microDenom: "uatom",
    coinDecimals: "6",
    gasPrice: "0.025",
  },
};
