import { ChainTypes } from "../constants/ChainTypes";

export enum TokenType {
	JUNO = "ujuno",
	HOPE = "hope",
	RAW = "raw",
	NETA = "neta",
	ATOM = "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
	AXELAR = "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
	HOPERS = "hopers",
	PUNK = "punk,",
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
	[TokenType.HOPERS]: "HOPERS",
	[TokenType.PUNK]: "PUNK",
};

export type TokenStatusType = {
	isNativeCoin: boolean;
	isIBCCoin: boolean;
	contractAddress?: string;
	originChain?: ChainTypes;
	chain: ChainTypes;
};

export const TokenStatus: { [key in TokenType]: TokenStatusType } = {
	[TokenType.JUNO]: {
		isNativeCoin: true,
		isIBCCoin: false,
		chain: ChainTypes.JUNO,
	},
	[TokenType.HOPE]: {
		isNativeCoin: false,
		isIBCCoin: false,
		chain: ChainTypes.JUNO,
		contractAddress:
			"juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z",
	},
	[TokenType.RAW]: {
		isNativeCoin: false,
		isIBCCoin: false,
		chain: ChainTypes.JUNO,
		contractAddress:
			// "juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g",
			"juno1sn67lmh4gzx8kcz9cpek4suyglvley2vnksj7tdadfeamfe4089ssvfkgx", // this is only for swap testing
	},
	[TokenType.NETA]: {
		isNativeCoin: false,
		isIBCCoin: false,
		chain: ChainTypes.JUNO,
		contractAddress:
			"juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",
	},
	[TokenType.ATOM]: {
		isNativeCoin: true,
		isIBCCoin: true,
		chain: ChainTypes.COSMOS,
		originChain: ChainTypes.COSMOS,
	},
	[TokenType.AXELAR]: {
		isNativeCoin: true,
		isIBCCoin: true,
		chain: ChainTypes.AXELAR,
		originChain: ChainTypes.AXELAR,
	},
	[TokenType.HOPERS]: {
		isNativeCoin: false,
		isIBCCoin: false,
		chain: ChainTypes.JUNO,
		contractAddress:
			"juno1e2hv5j7dphfgj0ytjw2vrt3g5kylrventqvns4su64jhrd4aq3xsy53snk",
	},
	[TokenType.PUNK]: {
		isNativeCoin: false,
		isIBCCoin: false,
		chain: ChainTypes.JUNO,
		contractAddress:
			"juno13926947pmrjly5p9hf5juey65c6rget0gqrnx3us3r6pvnpf4hwqm8mchy",
	},
};

export const OtherTokens: { [key: string]: string } = {
	juno13926947pmrjly5p9hf5juey65c6rget0gqrnx3us3r6pvnpf4hwqm8mchy: "PUNK",
};
