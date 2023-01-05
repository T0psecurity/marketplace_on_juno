import { TokenType } from "./tokens";

export type TPool = {
	id: number;
	token1: TokenType;
	token2: TokenType;
	token1Reserve: number;
	token2Reserve: number;
	isVerified: boolean;
	apr: string;
	contract: string;
	lpAddress: string;
	stakingAddress: string;
	pool: number;
	ratio: number;
	volume?: number;
	earned?: number;
	balance?: number;
	pendingReward?: number;
};

// export const TempLiquidities: TPool[] = [
// 	{
// 		id: 1,
// 		token1: TokenType.HOPE,
// 		token2: TokenType.JUNO,
// 		token1Reserve: 1000,
// 		token2Reserve: 1000,
// 		isVerified: true,
// 		apr: "180%",
// 		pool: 18000000,
// 		volume: 18000,
// 		ratio: 0.11,
// 	},
// 	{
// 		id: 2,
// 		token1: TokenType.ATOM,
// 		token2: TokenType.JUNO,
// 		token1Reserve: 1000,
// 		token2Reserve: 1000,
// 		isVerified: true,
// 		apr: "180%",
// 		pool: 18000000,
// 		ratio: 0.22,
// 	},
// ];
