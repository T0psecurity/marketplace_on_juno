import { TokenType } from "../types/tokens";

export type TLiquidity = {
	tokenA: TokenType;
	tokenB: TokenType;
	contractAddress: string;
	stakingAddress: string;
};

export const Liquidities: TLiquidity[] = [
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.JUNO,
		contractAddress:
			"juno150vc84tmw794wa7hx79qmqaray8fkc5zl8se7zfl8pen5ww9mktslgv6gj",
		stakingAddress:
			"juno1mu647nqtn4u5d8dych9t7uhr5xfar79lccwwffh9lksh6wd336qq35qv08",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.RAW,
		contractAddress:
			"juno1kqphjk9n0es92y09p4urtvpc3saqhfwwau72t84ggyqcz5s5ujyq9ydz2x",
		stakingAddress:
			"juno1rwzvkvtkk92fwzj5e5dral5jz9qnqmwd9uktu23cwz8qfdn2k74swhdu4p",
	},
];
