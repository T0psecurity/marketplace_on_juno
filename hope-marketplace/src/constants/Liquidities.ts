import { TokenType } from "../types/tokens";

export type TLiquidity = {
	tokenA: TokenType;
	tokenB: TokenType;
	contractAddress: string;
	stakingAddress?: string | string[];
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
		tokenB: TokenType.USDC,
		contractAddress:
			"juno1pugg623zsg2xanvuumna6y4ca48t0la7pxgtt96ed55rctea47lsqxu36a",
		stakingAddress:
			"juno1vuygss25pehh3rqx0gra09tzfhc32q3clamhdnpq9ueh29dntfmsv9tgds",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.OSMO,
		contractAddress:
			"juno1xw9a3zsrulhf2gvq9ed9zjjzl22hp2r5wqq3yp7s5vuleqmg7jrqtyq0ee",
		stakingAddress:
			"juno1tnhsnessug4hgsencuvf543njpr0hcs4welwj08fk4dxvfrdd0ssnxt8g6",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.KUJIRA,
		contractAddress:
			"juno17qgx8l84zzrdgydrnl9t2ucu8evuslaakpw8lz85fraryjylef7qgfm6sp",
		stakingAddress:
			"juno1p0350chclgpy26jzmf6eafmtre8kefaawss26mh622heqvjcwwrqfyny3z",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.HUAHUA,
		contractAddress:
			"juno162xnar9ndm7e66dzc2tzt2rx495v9ey0xw3zkjqur36dghqd600s0e3mzz",
		stakingAddress:
			"juno1g5na5yq4qj5wxprcrknhcww469v440658schln8s80l7gxl7f5pq9w2z5t",
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
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.RACOON,
		contractAddress:
			"juno1x4eck8gaphsk97cm78glc5jqarqe7492l4wwegqavlmzf5e3n4qqmjvtvq",
		stakingAddress: [
			"juno15myaq4rxwlg7pvm5e2fr598puj26945k3rpek6rj6ve5276fndxs7ctjg9",
			"juno1m7m283d60727qksd5g3zk5tkk4evgerucvcpylanw4plhahq8jasy0vc60",
		],
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.WYND,
		contractAddress:
			"juno1hmt7nw863s2alr5efnnj8tmxprdlvzcepna4htaujq74zgmm25ksyl9u4h",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.BLUE,
		contractAddress:
			"juno1pdal0fr38tfjuslpq3ne68242zsfs30t6rda2dnmfmjv2skk8z6qgmrrer",
		stakingAddress:
			"juno1r0ynalv602c3pf3pgx5sz30kk5peg6mmh5m78nldpmh3afh4vnrqn5w97q",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.RED,
		contractAddress:
			"juno1d7tz6q4ky06stcrquyuge6rujp9gsa6y4v7qzaa02rm0cj8gzznszc5ftj",
		stakingAddress:
			"juno12xsewspv2hcfsejq0en839ayvssqpsdd9yx87q5lutq3fpp7zsvqf4sf6s",
	},
	{
		tokenA: TokenType.BLUE,
		tokenB: TokenType.RED,
		contractAddress:
			"juno1u75a3r5ysfmtucngmy0s5t3j0vdl0n0qu5vhtc9sj5vclfpf96qsecp6sd",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.CANLAB,
		contractAddress:
			"juno1f6hyczl2yn6gwrh0yqwr0mjpzqywcy5p80ntn40cn7ha0etqtl3qs6xfv3",
		stakingAddress: [
			"juno1ll35ncyf6vmenh2yvsh3ut9lj7kkrcgssxza3jpr60l80qt7c26skawpeg",
			"juno1pf3h950yfhnsny5mf9ssha99ugjxqc2f45r0v4vtqpenv68dplwqcnn66n",
		],
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.SGNL,
		contractAddress:
			"juno1n620wt5rct3vaxd8ewxkuyrlyhh2wuwjj8cj2jmus2ea56wphfwsk4zytr",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.AQUA,
		contractAddress:
			"juno10r6qwpxjs4g0zmdxpmj0dqhj3dmj3pzm9wp8q3mm3utzlqzptagq4vf6l2",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.GLTO,
		contractAddress:
			"juno1y5adnxk64ggdhckdhc56gss6696qr2y30pzmjydyhh8r53pqerdsq6aky6",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.RAW,
		contractAddress:
			"juno1qm57tvmvnplv5xym9gu8xjrxmwzv2e85meyhvsax52e5s4phax4s03uvq5",
		// stakingAddress:
		// 	"juno1u7ty7jqqzxapkrxydd7jergetd0dpyfnr7mh240aq2dducxkymhsdd4w4d",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.DRGN,
		contractAddress:
			"juno1anhnfk68epxhj59s3qghv9duudkulkyjthqz8x08d0nm289y8y2svrcchc",
		stakingAddress:
			"juno1usurxj0urs7ja7mt34hjk9rf48gfp8akpuwlck4yad7t60nhpyls24kh9t",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.BANANA,
		contractAddress:
			"juno1slsy2j7u7hq2l02yasczamy40d6n7qv7n4mtpwddx9cmsrf0lv2sywpweh",
		stakingAddress:
			"juno1l5m5avwhml7n0sq9h5lpt9l3wzg6khmtr9c0pe9879ukupt5avaq6r4hhd",
	},
	{
		tokenA: TokenType.HOPERS,
		tokenB: TokenType.CZAR,
		contractAddress:
			"juno1qxajeku5f0qxyl2vcush475r62um20v7aqzhvr0sgv2m00ela9qsw5sn85",
	},
];

export const getLiquiditiesByTokens = (
	tokenA: TokenType,
	tokenB: TokenType
): TLiquidity | null =>
	Liquidities.find(
		(liquidity) =>
			liquidity.tokenA === tokenA && liquidity.tokenB === tokenB
	) || null;
