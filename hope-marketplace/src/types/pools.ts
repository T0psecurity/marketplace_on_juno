import { TokenType } from "./tokens";

export type TPool = {
	id: number;
	token1: TokenType;
	token2: TokenType;
	isVerified: boolean;
	apr: string;
	pool: number;
	ratio: number;
	volume?: number;
	earned?: number;
};

export const TempLiquidities: TPool[] = [
	{
		id: 1,
		token1: TokenType.HOPE,
		token2: TokenType.JUNO,
		isVerified: true,
		apr: "180%",
		pool: 18000000,
		volume: 18000,
		ratio: 0.11,
	},
	{
		id: 2,
		token1: TokenType.ATOM,
		token2: TokenType.JUNO,
		isVerified: true,
		apr: "180%",
		pool: 18000000,
		ratio: 0.22,
	},
];
