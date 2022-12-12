import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import PriceTable from "../../components/PriceStatistic/PriceTable";
import {
	DropDownIcon,
	GearIcon,
	SwapTokenIcon,
} from "../../components/SvgIcons";
import Text from "../../components/Text";
import TokenListModal from "../../components/TokenListModal";
import { TokenType } from "../../types/tokens";
import {
	AmountInputer,
	ChartArea,
	MainPart,
	SelectMaxButton,
	SlippageItem,
	SlippageItemsContainer,
	SlippageSelector,
	SwapArea,
	SwapAreaBody,
	SwapAreaHeader,
	SwapButton,
	SwapItem,
	Wrapper,
} from "./styled";

type TSwapInfo = {
	from: {
		token: TokenType;
		amount: number;
	};
	to: {
		token: TokenType;
		amount: number;
	};
};

const AvailableSlippage = [2, 5, 10, 15] as const;

const Swap: React.FC = () => {
	const [showTokenListModal, setShowTokenListModal] = useState(false);
	const [showSlippageSelector, setShowSlippageSelector] = useState(false);
	const [selectedTokenType, setSelectedTokenType] = useState<"from" | "to">(
		"from"
	);
	const [swapInfo, setSwapInfo] = useState<TSwapInfo>({
		from: {
			token: TokenType.JUNO,
			amount: 0,
		},
		to: {
			token: TokenType.HOPE,
			amount: 0,
		},
	});
	const [slippage, setSlippage] = useState<typeof AvailableSlippage[number]>(2);

	const balances = useAppSelector((state) => state.balances);
	const tokenPrices = useAppSelector((state) => state.tokenPrices);

	const displaySwapInfo = useMemo(() => {
		const fromToken = swapInfo.from.token;
		const toToken = swapInfo.to.token;

		const fromTokenName = (
			Object.keys(TokenType) as Array<keyof typeof TokenType>
		).filter((key) => TokenType[key] === fromToken)[0];
		const toTokenName = (
			Object.keys(TokenType) as Array<keyof typeof TokenType>
		).filter((key) => TokenType[key] === toToken)[0];

		const fromBalance = (balances[fromToken]?.amount || 0) / 1e6;
		const fromTokenPrice =
			tokenPrices[fromToken]?.market_data?.current_price?.usd || 0;
		const fromPrice = (Number(fromBalance) * fromTokenPrice).toLocaleString(
			"en-US",
			{
				maximumFractionDigits: 2,
			}
		);

		const toBalance = (balances[toToken]?.amount || 0) / 1e6;
		const toTokenPrice =
			tokenPrices[toToken]?.market_data?.current_price?.usd || 0;
		const toPrice = (Number(toBalance) * toTokenPrice).toLocaleString("en-US", {
			maximumFractionDigits: 2,
		});

		return {
			from: {
				name: fromTokenName,
				amount: swapInfo.from.amount,
				icon: `/coin-images/${fromToken.replace(/\//g, "")}.png`,
				rawBalance: fromBalance,
				balance: fromBalance.toLocaleString("en-US", {
					maximumFractionDigits: 2,
				}),
				tokenPrice: fromTokenPrice,
				price: fromPrice,
			},
			to: {
				name: toTokenName,
				amount: swapInfo.to.amount,
				icon: `/coin-images/${toToken.replace(/\//g, "")}.png`,
				rawBalance: toBalance,
				balance: toBalance.toLocaleString("en-US", {
					maximumFractionDigits: 2,
				}),
				tokenPrice: toTokenPrice,
				price: toPrice,
			},
		};
	}, [balances, swapInfo, tokenPrices]);

	const handleClickTokenSelect = (type: "from" | "to") => {
		setSelectedTokenType(type);
		setShowTokenListModal(true);
	};

	const changeSwapAmountLogic = (
		value: string | number,
		type: "from" | "to"
	) => {
		if (!isNaN(Number(value))) {
			const oppositeField = type === "from" ? "to" : "from";
			let oppositeAmount = 0;
			if (displaySwapInfo[oppositeField].tokenPrice) {
				oppositeAmount =
					(Number(value) * displaySwapInfo[type].tokenPrice) /
					displaySwapInfo[oppositeField].tokenPrice;
			}
			setSwapInfo((prev) => ({
				...prev,
				[type]: {
					...prev[type],
					amount: value,
				},
				[oppositeField]: {
					...prev[oppositeField],
					amount: oppositeAmount,
				},
			}));
		}
	};

	const handleChangeSwapAmount = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: "from" | "to"
	) => {
		const { value } = e.target;
		changeSwapAmountLogic(value, type);
	};

	const handleConvertSwapInfo = () => {
		setSwapInfo((prev) => ({
			from: prev.to,
			to: prev.from,
		}));
	};

	const handleSelectToken = (token: TokenType) => {
		let toAmount = 0;
		const fromToken =
			selectedTokenType === "from" ? token : swapInfo.from.token;
		const fromTokenPrice =
			tokenPrices[fromToken]?.market_data?.current_price?.usd || 0;
		const toToken = selectedTokenType === "to" ? token : swapInfo.to.token;
		const toTokenPrice =
			tokenPrices[toToken]?.market_data?.current_price?.usd || 0;
		if (toTokenPrice) {
			toAmount = (swapInfo.from.amount * fromTokenPrice) / toTokenPrice;
		}
		let newSwapInfo = {
			...swapInfo,
			[selectedTokenType]: {
				...swapInfo[selectedTokenType],
				token,
			},
		};
		newSwapInfo.to.amount = toAmount;

		setSwapInfo(newSwapInfo);
	};

	return (
		<Wrapper>
			<MainPart>
				<ChartArea />
				<SwapArea>
					<SwapAreaHeader>
						<Text bold alignItems="center" cursor="pointer">
							Swap{" "}
							<GearIcon
								onClick={() => setShowSlippageSelector((prev) => !prev)}
							/>
						</Text>
						<Text>Trade tokens in an instant</Text>
					</SwapAreaHeader>
					<SwapAreaBody>
						<SlippageSelector expanded={showSlippageSelector}>
							<Text fontSize="18px" justifyContent="flex-start">
								Slippage tolerance
							</Text>
							<SlippageItemsContainer>
								{AvailableSlippage.map((slippage, index: number) => (
									<SlippageItem
										key={index}
										onClick={() => setSlippage(slippage)}
									>{`${slippage}%`}</SlippageItem>
								))}
							</SlippageItemsContainer>
						</SlippageSelector>
						<SwapItem>
							<Text
								bold
								alignItems="center"
								justifyContent="flex-start"
								cursor="pointer"
							>
								<img alt="" src={displaySwapInfo.from.icon} />
								{displaySwapInfo.from.name}
								<DropDownIcon onClick={() => handleClickTokenSelect("from")} />
							</Text>
							<AmountInputer>
								<input
									value={displaySwapInfo.from.amount}
									onChange={(e) => handleChangeSwapAmount(e, "from")}
								/>
								<SelectMaxButton
									onClick={() =>
										changeSwapAmountLogic(
											displaySwapInfo.from.rawBalance,
											"from"
										)
									}
								>
									Select Max
								</SelectMaxButton>
							</AmountInputer>
							<Text
								color="#787878"
								justifyContent="flex-end"
								margin="10px 0"
							>{`Balance ${displaySwapInfo.from.balance} (${displaySwapInfo.from.price}$)`}</Text>
						</SwapItem>
						<SwapTokenIcon onClick={handleConvertSwapInfo} />
						<SwapItem>
							<Text
								bold
								alignItems="center"
								justifyContent="flex-start"
								cursor="pointer"
							>
								<img alt="" src={displaySwapInfo.to.icon} />
								{displaySwapInfo.to.name}
								<DropDownIcon onClick={() => handleClickTokenSelect("to")} />
							</Text>
							<AmountInputer>
								<input
									value={displaySwapInfo.to.amount}
									onChange={(e) => handleChangeSwapAmount(e, "to")}
								/>
								<SelectMaxButton
									onClick={() =>
										changeSwapAmountLogic(displaySwapInfo.to.rawBalance, "to")
									}
								>
									Select Max
								</SelectMaxButton>
							</AmountInputer>
							<Text
								color="#787878"
								justifyContent="flex-end"
								margin="10px 0"
							>{`Balance ${displaySwapInfo.to.balance} (${displaySwapInfo.to.price}$)`}</Text>
						</SwapItem>
						<Text width="100%" justifyContent="space-between">
							<Text>Slippage Tolerance</Text>
							<Text>{`${slippage}%`}</Text>
						</Text>
						<SwapButton>Swap</SwapButton>
					</SwapAreaBody>
				</SwapArea>
			</MainPart>
			<PriceTable disableSearch />
			<TokenListModal
				isOpen={showTokenListModal}
				onClose={() => setShowTokenListModal(false)}
				onSelectToken={handleSelectToken}
			/>
		</Wrapper>
	);
};

export default Swap;
