import React, { useEffect, useMemo, useState } from "react";
import { coins } from "@cosmjs/proto-signing";
import { useAppSelector } from "../../app/hooks";
import ExploreHeader from "../../components/ExploreHeader";
import PageWrapper from "../../components/PageWrapper";
import {
	DropDownIcon,
	GearIcon,
	SwapTokenIcon,
} from "../../components/SvgIcons";
import Text from "../../components/Text";
import TokenListModal from "../../components/TokenListModal";
import { TokenStatus, TokenType } from "../../types/tokens";
import {
	AmountInputer,
	// ChartArea,
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
import { toast } from "react-toastify";
import { useValidPool } from "./hook";
import useContract from "../../hook/useContract";
import { toMicroAmount } from "../../util/coins";
import { ChainConfigs } from "../../constants/ChainTypes";

type TSwapInfo = {
	from: {
		token: TokenType;
		amount: number | string;
	};
	to: {
		token: TokenType;
		amount: number;
	};
};

const AvailableSlippage = [2, 5, 10, 15] as const;

const Swap: React.FC = () => {
	const [isPending, setIsPending] = useState(false);
	const [showTokenListModal, setShowTokenListModal] = useState(false);
	const [showSlippageSelector, setShowSlippageSelector] = useState<
		boolean | null
	>(null);
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
	const validPair = useValidPool(swapInfo.from.token, swapInfo.to.token);

	const balances = useAppSelector((state) => state.balances);
	const tokenPrices = useAppSelector((state) => state.tokenPrices);
	const account = useAppSelector((state) => state.accounts.keplrAccount);

	const { runQuery, createExecuteMessage, getExecuteClient } = useContract();

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

	useEffect(() => {
		if (!swapInfo.from.amount || !validPair) {
			setSwapInfo((prev) => ({
				...prev,
				to: {
					...prev.to,
					amount: 0,
				},
			}));
			return;
		}
		if (!validPair.subPools) {
			setTimeout(async () => {
				const queryResult = await runQuery(validPair.pool.contractAddress, {
					[validPair.reverse
						? "token2_for_token1_price"
						: "token1_for_token2_price"]: {
						[validPair.reverse ? "token2_amount" : "token1_amount"]:
							"" + Math.ceil(Number(swapInfo.from.amount) * 1e6),
					},
				});
				let amount = Number(
					queryResult[validPair.reverse ? "token1_amount" : "token2_amount"]
				);
				amount = isNaN(amount) ? 0 : amount / 1e6;
				setSwapInfo((prev) => ({
					...prev,
					to: {
						...prev.to,
						amount,
					},
				}));
			}, 500);
		} else {
			setTimeout(async () => {
				const firstPool = validPair.subPools?.[0];
				const secondPool = validPair.subPools?.[1];
				if (!firstPool || !secondPool) return;
				const queryResult1 = await runQuery(firstPool.pool.contractAddress, {
					[firstPool.reverse
						? "token2_for_token1_price"
						: "token1_for_token2_price"]: {
						[firstPool.reverse ? "token2_amount" : "token1_amount"]:
							"" + Math.ceil(Number(swapInfo.from.amount) * 1e6),
					},
				});
				const middleAmount = Number(
					queryResult1[firstPool.reverse ? "token1_amount" : "token2_amount"]
				);
				if (isNaN(middleAmount) || !middleAmount) return;
				const queryResult2 = await runQuery(secondPool.pool.contractAddress, {
					[secondPool.reverse
						? "token2_for_token1_price"
						: "token1_for_token2_price"]: {
						[secondPool.reverse ? "token2_amount" : "token1_amount"]:
							"" + middleAmount,
					},
				});
				let amount = Number(
					queryResult2[secondPool.reverse ? "token1_amount" : "token2_amount"]
				);
				amount = isNaN(amount) ? 0 : amount / 1e6;
				setSwapInfo((prev) => ({
					...prev,
					to: {
						...prev.to,
						amount,
					},
				}));
			}, 500);
		}
	}, [swapInfo.from, validPair, runQuery]);

	const handleClickTokenSelect = (type: "from" | "to") => {
		setSelectedTokenType(type);
		setShowTokenListModal(true);
	};

	const changeSwapAmountLogic = async (value: string | number) => {
		if (!isNaN(Number(value))) {
			setSwapInfo((prev) => ({
				...prev,
				from: {
					...prev.from,
					amount: value,
				},
			}));
		}
	};

	const handleChangeSwapAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		changeSwapAmountLogic(value);
	};

	const handleConvertSwapInfo = () => {
		setSwapInfo((prev) => ({
			from: prev.to,
			to: { ...prev.from, amount: 0 },
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
			toAmount = (Number(swapInfo.from.amount) * fromTokenPrice) / toTokenPrice;
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

	const handleSwap = async () => {
		if (!swapInfo.from.amount || !account || isPending) return;
		const firstPool = validPair?.subPools?.[0];
		const secondPool = validPair?.subPools?.[1];
		if (!validPair || (validPair.subPools && (!firstPool || !secondPool))) {
			toast.error("Invalid Pair!");
			return;
		}
		setIsPending(true);
		let transactions = [],
			funds: any[] = [];
		if (!TokenStatus[swapInfo.from.token].isNativeCoin) {
			transactions.push(
				createExecuteMessage({
					senderAddress: account.address,
					contractAddress:
						TokenStatus[swapInfo.from.token].contractAddress || "",
					message: {
						increase_allowance: {
							spender: validPair.pool.contractAddress,
							amount: `${Math.ceil(Number(swapInfo.from.amount) * 1e6)}`,
						},
					},
				})
			);
		} else {
			funds = coins(
				toMicroAmount(
					"" + swapInfo.from.amount,
					ChainConfigs[TokenStatus[swapInfo.from.token].chain]["coinDecimals"]
				),
				ChainConfigs[TokenStatus[swapInfo.from.token].chain]["microDenom"]
			);
		}
		const finalMessage: any = validPair.subPools
			? {
					pass_through_swap: {
						output_amm_address: secondPool?.pool.contractAddress,
						input_token: firstPool?.reverse ? "Token2" : "Token1",
						input_token_amount:
							"" + Math.ceil(Number(swapInfo.from.amount) * 1e6),
						output_min_token:
							"" +
							Math.ceil(
								(Number(swapInfo.to.amount) * 1e6 * (100 - slippage)) / 1e2
							),
					},
			  }
			: {
					swap: {
						input_token: validPair.reverse ? "Token2" : "Token1",
						input_amount: "" + Math.ceil(Number(swapInfo.from.amount) * 1e6),
						min_output:
							"" +
							Math.ceil(
								(Number(swapInfo.to.amount) * 1e6 * (100 - slippage)) / 1e2
							),
					},
			  };
		console.log("debug", finalMessage);

		transactions.push(
			createExecuteMessage({
				senderAddress: account.address,
				contractAddress: validPair.pool.contractAddress,
				message: finalMessage,
				funds,
			})
		);

		try {
			const client = await getExecuteClient();
			await client.signAndBroadcast(account.address, transactions, "auto");
			toast.success("Swapped Successfully!");
		} catch (err) {
			console.log(err);
			toast.error("Swap Failed!");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<PageWrapper>
			<ExploreHeader
				title="Swap"
				tabs={[
					{ title: "Swap", url: "/swap" },
					{ title: "Liquidity", url: "/liquidity" },
				]}
			/>
			<Wrapper>
				<MainPart>
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
									<DropDownIcon
										onClick={() => handleClickTokenSelect("from")}
									/>
								</Text>
								<AmountInputer>
									<input
										value={displaySwapInfo.from.amount}
										onChange={handleChangeSwapAmount}
									/>
									<SelectMaxButton
										onClick={() =>
											changeSwapAmountLogic(displaySwapInfo.from.rawBalance)
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
									<input value={displaySwapInfo.to.amount} />
									{/* <SelectMaxButton
										onClick={() =>
											changeSwapAmountLogic(displaySwapInfo.to.rawBalance, "to")
										}
									>
										Select Max
									</SelectMaxButton> */}
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
							<SwapButton onClick={handleSwap}>{`${
								isPending ? "Swapping" : "Swap"
							}`}</SwapButton>
						</SwapAreaBody>
					</SwapArea>
				</MainPart>
				{/* <ChartArea /> */}
				<TokenListModal
					isOpen={showTokenListModal}
					onClose={() => setShowTokenListModal(false)}
					onSelectToken={handleSelectToken}
				/>
			</Wrapper>
		</PageWrapper>
	);
};

export default Swap;
