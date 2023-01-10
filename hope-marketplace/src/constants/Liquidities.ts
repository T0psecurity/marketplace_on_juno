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
			"juno1g5j9vd76cqt7fsq22ne7jqfkz4v9ptkvh4jknsvwchpj753atwfs942a25",
		stakingAddress: "",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.ATOM,
		contractAddress:
			"juno17estllyc6qyq6tlxg9hv4xwcy069fuu0rmytvkw6xskchcq9czxsd5fd98",
		stakingAddress: "",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.AXELAR,
		contractAddress:
			"juno1pugg623zsg2xanvuumna6y4ca48t0la7pxgtt96ed55rctea47lsqxu36a",
		stakingAddress: "",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.HOPE,
		contractAddress:
			"juno185jw0uh2v9zn8zfhulu2akxxplcd7fjnkvmp84tkjgtadyuxruzsjnexnw",
		stakingAddress: "",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.RAW,
		contractAddress:
			"juno1qm57tvmvnplv5xym9gu8xjrxmwzv2e85meyhvsax52e5s4phax4s03uvq5",
		stakingAddress: "",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.NETA,
		contractAddress:
			"juno19kfk94nqz7ehdmkk5a9hcl8qxq9kksupqzurz9gsgs4tk5xlgqqqrr067a",
		stakingAddress: "",
	},
];
