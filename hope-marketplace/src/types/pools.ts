import { TokenType } from "./tokens";

export type TPool = {
	id: number;
	token1: TokenType;
	token2: TokenType;
	isVerified: boolean;
	apr: string;
	pool: number;
	ratio: number;
	earned?: number;
};
