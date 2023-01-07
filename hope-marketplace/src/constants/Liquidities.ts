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
			"juno1u9g9saqe6nq803keqja4c6quknp04uc5zge6yu5j8gg45gdfn5jq0ahd05",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.RAW,
		contractAddress:
			"juno1kqphjk9n0es92y09p4urtvpc3saqhfwwau72t84ggyqcz5s5ujyq9ydz2x",
		stakingAddress:
			"juno1w9pqw9ej9snm9nxhlk6ekrhstl39c2xvp3r82m93u2zws8h0qyysnqvccv",
	},
];
