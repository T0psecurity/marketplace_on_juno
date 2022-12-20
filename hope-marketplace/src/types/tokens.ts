import { ChainTypes } from "../constants/ChainTypes";

export enum TokenType {
	JUNO = "ujuno",
	HOPE = "hope",
	RAW = "raw",
	NETA = "neta",
	ATOM = "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
	AXELAR = "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
}

export const getTokenName = (tokenType: TokenType): string =>
	(Object.keys(TokenType) as Array<keyof typeof TokenType>).filter(
		(key) => TokenType[key] === tokenType
	)[0];

export const TokenFullName: { [key in TokenType]: string } = {
	[TokenType.JUNO]: "JUNO",
	[TokenType.HOPE]: "HOPE GALAXY",
	[TokenType.RAW]: "JunoSwap Raw Dao",
	[TokenType.NETA]: "NETA",
	[TokenType.ATOM]: "COSMOS HUB",
	[TokenType.AXELAR]: "Axelar",
};

export type TokenStatusType = {
	isNativeCoin: boolean;
	isIBCCOin: boolean;
	contractAddress?: string;
	originChain?: ChainTypes;
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
		originChain: ChainTypes.COSMOS,
	},
	[TokenType.AXELAR]: {
		isNativeCoin: true,
		isIBCCOin: true,
		chain: ChainTypes.AXELAR,
		originChain: ChainTypes.AXELAR,
	},
};

export const OtherTokens: { [key: string]: string } = {
	juno13926947pmrjly5p9hf5juey65c6rget0gqrnx3us3r6pvnpf4hwqm8mchy: "PUNK",
};
