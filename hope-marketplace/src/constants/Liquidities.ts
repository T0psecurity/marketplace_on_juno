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
		stakingAddress:
			"juno19nnwh49lwsqy6c5wg9p943yt9txe5mw6kdztecl5j4q3rgyh0h0sekwl8c",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.ATOM,
		contractAddress:
			"juno17estllyc6qyq6tlxg9hv4xwcy069fuu0rmytvkw6xskchcq9czxsd5fd98",
		stakingAddress:
			"juno163upe9ymxtc5fsx0kvrfcyx9e5puu2zhqt82lexrlajzmx9sm79shac88f",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.AXELAR,
		contractAddress:
			"juno1pugg623zsg2xanvuumna6y4ca48t0la7pxgtt96ed55rctea47lsqxu36a",
		stakingAddress:
			"juno1vuygss25pehh3rqx0gra09tzfhc32q3clamhdnpq9ueh29dntfmsv9tgds",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.HOPE,
		contractAddress:
			"juno185jw0uh2v9zn8zfhulu2akxxplcd7fjnkvmp84tkjgtadyuxruzsjnexnw",
		stakingAddress:
			"juno1yp0a7e2y6cc2mtux92qzm24gyu85y8a2adf85k9w33hswfzs8e7qrlazqs",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.RAW,
		contractAddress:
			"juno1qm57tvmvnplv5xym9gu8xjrxmwzv2e85meyhvsax52e5s4phax4s03uvq5",
		stakingAddress:
			"juno1u7ty7jqqzxapkrxydd7jergetd0dpyfnr7mh240aq2dducxkymhsdd4w4d",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.NETA,
		contractAddress:
			"juno19kfk94nqz7ehdmkk5a9hcl8qxq9kksupqzurz9gsgs4tk5xlgqqqrr067a",
		stakingAddress:
			"juno1cltx5qnrjzsf2ynyl8wdea79zckj5mvvpv06qur7qjjq6yx5702q436qxe",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.PUNK,
		contractAddress:
			"juno1guya74r8qe3x8sds4p74jg38eunjnukwlqgz68hlkasn3ralwxpsgx08mv",
		stakingAddress:
			"juno1wquw22g0spap7qvesxagwdjmt6trmafztz8yyaau4v5nqkpsrqqs3sqk02",
	},
];
