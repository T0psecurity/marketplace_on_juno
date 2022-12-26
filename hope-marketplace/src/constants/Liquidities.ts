import { TokenType } from "../types/tokens";

export type TLiquidity = {
	tokenA: TokenType;
	tokenB: TokenType;
	contractAddress: string;
};

export const Liquidities: TLiquidity[] = [
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.JUNO,
		contractAddress:
			"juno150vc84tmw794wa7hx79qmqaray8fkc5zl8se7zfl8pen5ww9mktslgv6gj",
	},
];
