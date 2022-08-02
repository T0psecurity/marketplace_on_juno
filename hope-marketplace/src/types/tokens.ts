import { ChainTypes } from "../constants/ChainTypes";

export enum TokenType {
  JUNO = "ujuno",
  HOPE = "hope",
  RAW = "raw",
  NETA = "neta",
  ATOM = "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
}

export type TokenStatusType = {
  isNativeCoin: boolean;
  isIBCCOin: boolean;
  contractAddress?: string;
  chain: ChainTypes;
};

export const TokenStatus: { [key in TokenType]: TokenStatusType } = {
  [TokenType.JUNO]: {
    isNativeCoin: true,
    isIBCCOin: false,
    chain: ChainTypes.JUNO,
  },
  [TokenType.HOPE]: {
    isNativeCoin: false,
    isIBCCOin: false,
    chain: ChainTypes.JUNO,
    contractAddress:
      "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z",
  },
  [TokenType.RAW]: {
    isNativeCoin: false,
    isIBCCOin: false,
    chain: ChainTypes.JUNO,
    contractAddress:
      "juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g",
  },
  [TokenType.NETA]: {
    isNativeCoin: false,
    isIBCCOin: false,
    chain: ChainTypes.JUNO,
    contractAddress:
      "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",
  },
  [TokenType.ATOM]: {
    isNativeCoin: true,
    isIBCCOin: true,
    chain: ChainTypes.COSMOS,
  },
};
