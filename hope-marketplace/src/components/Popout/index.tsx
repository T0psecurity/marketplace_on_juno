import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useContext,
} from "react";

// import { toast } from "react-toastify";
// import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import {
	// MsgTransferEncodeObject,
	// GasPrice,
	MsgTransferEncodeObject,
} from "@cosmjs/stargate";
// import {
// 	SigningCosmWasmClient,
// 	// CosmWasmClient,
// } from "@cosmjs/cosmwasm-stargate";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
// import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import Long from "long";

import { PopoutContext } from "../../context/PopoutContext";
import { TokenType, TokenStatus, getTokenName } from "../../types/tokens";
import {
	ChainConfigs,
	ChainTypes,
	IBCConfig,
} from "../../constants/ChainTypes";

import "./style.scss";
import { useAppSelector } from "../../app/hooks";
import useFetch from "../../hook/useFetch";
import { ThemeContext } from "../../context/ThemeContext";
// import { getOfflineSigner } from "../../hook/useContract";
import { useWalletManager } from "@noahsaso/cosmodal";
import ReactSelect, { ControlProps } from "react-select";
import { addSuffix, convertStringToNumber } from "../../util/string";
// import { AccountData } from "@cosmjs/proto-signing";
import useClient from "./useClient";

// import {
//   Wrapper,
//   Logo,
//   OperationButton,
//   Container,
//   AmountInputer,
//   ErrMsgContainer,
//   SwapDirection,
//   StyledSvg,
//   TokenSelectContainer,
//   TokenIcon,
//   SwapDirectionContainer,
//   SwapDirectionItem,
// } from "./styled";

export enum SwapType {
	DEPOSIT = "deposit",
	WITHDRAW = "withdraw",
}

type SwapInfo = {
	denom: TokenType;
	swapType: SwapType;
	swapChains: {
		origin: ChainTypes;
		foreign: ChainTypes;
	};
	minAmount?: number;
};

interface QuickSwapProps {
	swapInfo: SwapInfo;
	isFullControl: boolean;
	closeNewWindow: (params: any) => void;
}

// type TWasmChainClients = {
// 	[key in ChainTypes]: {
// 		client: SigningCosmWasmClient | null;
// 		account: AccountData | null;
// 	};
// };

// let wasmChainClients: TWasmChainClients = {} as TWasmChainClients;

// const getClient = async (chainType: ChainTypes) => {
// 	// if (connectedWallet) {
// 	const chainConfig = ChainConfigs[chainType];
// 	// toast.info(
// 	// 	`getting client. ${chainConfig.chainId} ${chainConfig.chainName}`
// 	// );
// 	if (
// 		wasmChainClients[chainType] &&
// 		wasmChainClients[chainType].client &&
// 		wasmChainClients[chainType].account
// 	) {
// 		// toast.info(`existed clients`);
// 		return wasmChainClients[chainType];
// 	}
// 	// toast.info("getting new client");
// 	if (!!window.keplr) {
// 		try {
// 			// const offlineSigner = await getOfflineSigner(chainConfig.chainId);
// 			// const { wallet, walletClient } = connectedWallet;
// 			// const offlineSigner = await wallet.getOfflineSignerFunction(
// 			// 	walletClient
// 			// )(chainConfig.chainId);
// 			// const account = await offlineSigner?.getAccounts();
// 			// console.log('debug start', chainConfig)
// 			await window.keplr.enable(chainConfig.chainId);
// 			let offlineSigner: any = null;
// 			if (!!window.getOfflineSigner) {
// 				offlineSigner = await window.getOfflineSigner(
// 					chainConfig.chainId
// 				);
// 			}
// 			if (!offlineSigner && !!window.getOfflineSignerAuto) {
// 				offlineSigner = await window.getOfflineSignerAuto(
// 					chainConfig.chainId
// 				);
// 			}
// 			if (!offlineSigner && !!window.getOfflineSignerOnlyAmino) {
// 				offlineSigner = await window.getOfflineSignerOnlyAmino(
// 					chainConfig.chainId
// 				);
// 			}
// 			const account = await offlineSigner.getAccounts();
// 			let wasmChainClient = null;
// 			if (offlineSigner) {
// 				try {
// 					wasmChainClient =
// 						await SigningCosmWasmClient.connectWithSigner(
// 							chainConfig.rpcEndpoint,
// 							offlineSigner,
// 							{
// 								gasPrice: GasPrice.fromString(
// 									`${chainConfig.gasPrice}${chainConfig.microDenom}`
// 								),
// 							}
// 						);
// 					// console.log('debug wasmChainClient', wasmChainClient)
// 					const result = {
// 						account: account?.[0],
// 						client: wasmChainClient,
// 					};
// 					wasmChainClients[chainType] = result;
// 					return result;
// 				} catch (e) {
// 					console.error("wallets", chainConfig, e);
// 					return { account: account?.[0], client: null };
// 				}
// 			}
// 		} catch (e) {
// 			console.log("debug", e);
// 			// toast.error(
// 			// 	`getting client error. ${chainConfig.chainId} ${
// 			// 		chainConfig.chainName
// 			// 	} ${JSON.stringify(e)}`
// 			// );
// 		}
// 	}
// 	// toast.info("no keplr in window");
// 	return { account: null, client: null };
// };

const OutLinkIcon = ({ ...props }) => (
	<svg
		version="1.0"
		xmlns="http://www.w3.org/2000/svg"
		width="30.000000pt"
		height="30.000000pt"
		viewBox="0 0 30.000000 30.000000"
		preserveAspectRatio="xMidYMid meet"
		{...props}
	>
		<g
			transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
			// fill="#000000"
			stroke="none"
		>
			<path
				d="M110 238 c0 -38 -4 -45 -32 -58 -43 -20 -68 -58 -75 -111 l-6 -44 35
38 c19 20 45 37 57 37 18 0 21 -6 21 -40 0 -22 4 -40 8 -40 4 0 37 29 72 65
l64 65 -64 65 c-35 36 -68 65 -72 65 -4 0 -8 -19 -8 -42z m72 -140 l-52 -53 0
33 c0 42 -20 49 -70 24 -45 -22 -50 -14 -20 35 12 21 31 35 52 41 28 7 33 13
36 42 l4 33 51 -51 52 -52 -53 -52z"
			/>
			<path
				d="M220 215 l64 -65 -64 -65 c-35 -36 -60 -65 -54 -65 5 0 39 29 74 65
l64 65 -64 65 c-35 36 -69 65 -74 65 -6 0 19 -29 54 -65z"
			/>
		</g>
	</svg>
);

const SelectOptions = (Object.keys(TokenType) as Array<keyof typeof TokenType>)
	.filter((token) => TokenStatus[TokenType[token]].isIBCCoin)
	.map((key) => {
		return {
			value: TokenType[key],
		};
	});

const QuickSwap: React.FC<QuickSwapProps> = ({
	closeNewWindow,
	isFullControl,
	swapInfo: swapInfoProps,
}) => {
	const [sendingTx, setSendingTx] = useState(false);
	const [swapAmount, setSwapAmount] = useState("");
	const [swapInfo, setSwapInfo] = useState<SwapInfo>({
		denom: TokenType.ATOM,
		swapType: SwapType.WITHDRAW,
		swapChains: {
			origin: ChainTypes.COSMOS,
			foreign: ChainTypes.JUNO,
		},
	});
	const [logoHeight, setLogoHeight] = useState(0);
	const [selectedTokenType, setSelectedTokenType] = useState<TokenType>(
		SelectOptions[0].value
	);
	const [errMsg, setErrorMsg] = useState("");
	const [statusMsg, setStatusMsg] = useState("");
	// const [hasErrorOnMobileConnection, setHasErrorOnMobileConnection] =
	// 	useState(false);
	// const [ibcNativeTokenBalance, setIBCNativeTokenBalance] = useState<{
	// 	[key in TokenType]: any;
	// }>({} as { [key in TokenType]: any });
	const { isDark } = useContext(ThemeContext);
	const balances = useAppSelector((state) => state.balances);
	const tokenPrices = useAppSelector((state) => state.tokenPrices);
	const { getTokenBalances } = useFetch();
	const { connectedWallet } = useWalletManager();

	const { clients, ibcBalance: ibcNativeTokenBalance } = useClient(
		SelectOptions.map((option) => option.value)
	);

	// const getWallets = useCallback(
	// 	async ({
	// 		origin,
	// 		foreign,
	// 	}: {
	// 		origin: ChainTypes;
	// 		foreign: ChainTypes;
	// 	}) => {
	// 		const originResult = await getClient(origin);
	// 		const foreignResult = await getClient(foreign);

	// 		return { origin: originResult, foreign: foreignResult };
	// 	},
	// 	[]
	// );

	useEffect(() => {
		setSelectedTokenType(swapInfoProps.denom);
		setSwapInfo(swapInfoProps);
	}, [swapInfoProps]);

	// const getTokenBalanceOnIBCChain = async (token: TokenType) => {
	// 	const tokenStatus = TokenStatus[token];
	// 	const chainConfig = ChainConfigs[tokenStatus.chain];
	// 	if (connectedWallet) {
	// 		const { client, account } = await getClient(tokenStatus.chain);
	// 		if (client && account) {
	// 			// setHasErrorOnMobileConnection(false);
	// 			const balance = await client.getBalance(
	// 				account.address,
	// 				tokenStatus.isNativeCoin
	// 					? chainConfig.microDenom
	// 					: tokenStatus.denom || ""
	// 			);
	// 			setIBCNativeTokenBalance((prev) => ({
	// 				...prev,
	// 				[token]: balance,
	// 			}));
	// 		}
	// 		// else {
	// 		// 	setHasErrorOnMobileConnection(true);
	// 		// }
	// 	}
	// };

	// useEffect(() => {
	// 	for (const option of SelectOptions) {
	// 		getTokenBalanceOnIBCChain(option.value);
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	const { direction } = useMemo(() => {
		return {
			direction:
				swapInfo.swapType === SwapType.DEPOSIT ? "DEPOSIT" : "WITHDRAW",
		};
	}, [swapInfo]);

	const setErrMsg = (msg: string) => {
		setErrorMsg(msg);
		setTimeout(() => setErrorMsg(""), 2000);
	};

	const handleAccept = useCallback(async () => {
		if (sendingTx) return;
		if (!swapAmount) {
			setErrMsg("Please input amount.");
			return;
		}
		const amount = Number(swapAmount);
		if (isNaN(amount)) {
			setErrMsg("Invalid amount.");
			return;
		}
		if (
			swapInfo.swapType === SwapType.DEPOSIT &&
			swapInfo.minAmount &&
			amount < swapInfo.minAmount
		) {
			setErrMsg(`Amount should be greater than ${swapInfo.minAmount}.`);
			return;
		}
		if (
			swapInfo.swapType === SwapType.WITHDRAW &&
			amount * Math.pow(10, TokenStatus[swapInfo.denom].decimal || 6) >
				balances[swapInfo.denom].amount
		) {
			setErrMsg(
				`Amount should be smaller than ${
					balances[swapInfo.denom].amount /
					Math.pow(10, TokenStatus[swapInfo.denom].decimal || 6)
				}`
			);
			return;
		}
		setSendingTx(true);
		setStatusMsg("starting transfer. getting clients...");
		// toast.info("starting transfer. getting clients...");
		// const wallets = await getWallets(swapInfo.swapChains);
		const wallets = {
			origin: clients[swapInfo.swapChains.origin],
			foreign: clients[swapInfo.swapChains.foreign],
		};

		const originChainConfig = ChainConfigs[swapInfo.swapChains.origin];

		const timeout = Math.floor(new Date().getTime() / 1000) + 600;
		const timeoutTimestampNanoseconds = timeout
			? Long.fromNumber(timeout).multiply(1_000_000_000)
			: undefined;

		if (!wallets.origin || !wallets.foreign) {
			setErrMsg("getting clients failed.");
			setStatusMsg("");
			setSendingTx(false);
			return;
		}

		const tokenStatus = TokenStatus[swapInfo.denom];
		console.log(
			"debug token status",
			tokenStatus,
			originChainConfig,
			swapInfo
		);

		const senderAddress = wallets.origin.account?.address;
		const receiverAddress = wallets.foreign.account?.address;

		const client = wallets.origin.client;
		if (swapInfo.swapType === SwapType.DEPOSIT && senderAddress && client) {
			setStatusMsg("balance checking...");
			// toast.info("balance checking...");
			try {
				let balanceWithoutFee = Number(
					ibcNativeTokenBalance[swapInfo.denom].amount
				);
				if (
					isNaN(Number(ibcNativeTokenBalance[swapInfo.denom]?.amount))
				) {
					setErrMsg("Can't fetch balance.");
					setStatusMsg("");
					setSendingTx(false);
					return;
				}
				balanceWithoutFee = balanceWithoutFee / 1e6 - 0.025;
				if (balanceWithoutFee < amount) {
					setErrMsg("Not enough balance!");
					setStatusMsg("");
					setSendingTx(false);
					return;
				}
			} catch (e) {
				console.log("debug balance check error", e);
				setErrMsg("error occured during balance checking.");
				setStatusMsg("");
				setSendingTx(false);
			}
		}

		const transferMsg: MsgTransferEncodeObject = {
			typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
			value: MsgTransfer.fromPartial({
				sourcePort: "transfer",
				sourceChannel:
					swapInfo.swapType === SwapType.DEPOSIT
						? IBCConfig[tokenStatus.chain].channel
						: IBCConfig[tokenStatus.chain].juno_channel,
				sender: senderAddress,
				receiver: receiverAddress,
				token: {
					denom:
						swapInfo.swapType === SwapType.DEPOSIT
							? tokenStatus.denom || originChainConfig.microDenom
							: swapInfo.denom,
					amount: String(
						Math.floor(
							Number(swapAmount) *
								Math.pow(
									10,
									swapInfo.swapType === SwapType.DEPOSIT
										? 6
										: TokenStatus[swapInfo.denom].decimal ||
												6
								)
						)
					),
				},
				timeoutHeight: undefined,
				timeoutTimestamp: timeoutTimestampNanoseconds,
			}),
		};
		console.log("debug transfer message", transferMsg);
		if (senderAddress && client) {
			setStatusMsg("executing transaction...");
			// toast.info("executing transaction...");
			try {
				const tx = await client.signAndBroadcast(
					senderAddress,
					[transferMsg],
					"auto",
					"memo"
				);
				await getTokenBalances();
				closeNewWindow(true);
				setStatusMsg("");
				console.log("popout transaction successfully", tx);
			} catch (e) {
				console.error("debug popout transaction error", e);
				setErrorMsg("error occured during transaction");
				setStatusMsg("");
				setSendingTx(false);
			}
		} else {
			setStatusMsg("");
			setSendingTx(false);
		}
	}, [
		balances,
		clients,
		closeNewWindow,
		getTokenBalances,
		ibcNativeTokenBalance,
		sendingTx,
		swapAmount,
		swapInfo,
	]);

	// const handleCancel = () => {
	// 	if (sendingTx) return;
	// 	closeNewWindow(false);
	// };

	const handleChangeSwapAmount = (e: any) => {
		if (sendingTx) return;
		const { value } = e.target;
		setSwapAmount(value);
	};

	const handleClickAutoAmount = (ratio: 0.5 | 1) => {
		if (sendingTx) return;
		if (swapInfo.swapType === SwapType.DEPOSIT) {
			setSwapAmount(
				"" +
					(convertStringToNumber(
						ibcNativeTokenBalance[swapInfo.denom]?.amount
					) *
						ratio) /
						1e6
			);
		} else {
			const tokenBalance =
				(balances?.[selectedTokenType]?.amount || 0) /
				Math.pow(10, TokenStatus[selectedTokenType].decimal || 6);
			setSwapAmount("" + tokenBalance * ratio);
		}
	};

	const handleChangeSwapType = (type: SwapType) => {
		if (sendingTx) return;
		setSwapInfo((prev) => ({
			...prev,
			swapType: type,
			swapChains: {
				origin: prev.swapChains.foreign,
				foreign: prev.swapChains.origin,
			},
		}));
	};

	const handleChangeSwapToken = (denom: TokenType) => {
		setSelectedTokenType(denom);
		setSwapInfo((prev) => ({
			...prev,
			denom,
			swapChains:
				prev.swapType === SwapType.DEPOSIT
					? {
							origin: TokenStatus[denom].chain,
							foreign: ChainTypes.JUNO,
					  }
					: {
							origin: ChainTypes.JUNO,
							foreign: TokenStatus[denom].chain,
					  },
		}));
	};

	// const foreignTokenSymbol = (
	// 	Object.keys(TokenType) as Array<keyof typeof TokenType>
	// ).filter((key) => TokenType[key] === swapInfo.denom)[0];

	const CustomMenuItem = ({ ...props }) => {
		const { selectOption, option } = props;
		const token = option.value as TokenType;
		const checked = token === selectedTokenType;
		const tokenStatus = TokenStatus[token];
		const chain = tokenStatus.chain;
		const chainName = ChainConfigs[chain].chainName;
		const tokenBalance =
			(balances?.[token]?.amount || 0) /
			Math.pow(10, TokenStatus[token].decimal || 6);
		const ibcTokenBalance =
			convertStringToNumber(ibcNativeTokenBalance[token]?.amount) / 1e6;
		const tokenPrice =
			tokenPrices[token]?.market_data.current_price?.usd || 0;
		return (
			<div
				className={`custom-menu-item ${
					checked ? "custom-menu-item-checked" : ""
				}`}
				onClick={() => {
					if (selectOption) selectOption(option);
				}}
			>
				<div className="token-name-container">
					<img
						className="token-image"
						alt=""
						src={`https://hopers.io/coin-images/${token.replace(
							/\//g,
							""
						)}.png`}
					/>
					<div className="token-name">
						<span>{getTokenName(token)}</span>
						<span>{chainName}</span>
					</div>
				</div>
				<div className="token-balance">
					<span>
						{swapInfo.swapType === SwapType.DEPOSIT
							? addSuffix(ibcTokenBalance)
							: addSuffix(tokenBalance)}
					</span>
					<span>{`$${addSuffix(
						(swapInfo.swapType === SwapType.DEPOSIT
							? ibcTokenBalance
							: tokenBalance) * tokenPrice
					)}`}</span>
				</div>
			</div>
		);
	};

	const CustomMenuList = (props: any) => {
		const { options, selectOption } = props;
		return options.map((option: any, index: number) => (
			<CustomMenuItem
				key={index}
				selectOption={selectOption}
				option={option}
			/>
		));
	};

	const CustomControl = ({ ...props }) => {
		const { option } = props;
		const token = option.value as TokenType;
		const tokenBalance =
			(balances?.[token]?.amount || 0) /
			Math.pow(10, TokenStatus[token].decimal || 6);
		const ibcTokenBalance =
			convertStringToNumber(ibcNativeTokenBalance[token]?.amount) / 1e6;
		const tokenPrice =
			tokenPrices[token]?.market_data.current_price?.usd || 0;
		return (
			<div className="custom-control">
				<div className="token-name-container">
					<img
						className="token-image"
						alt=""
						src={`https://hopers.io/coin-images/${token.replace(
							/\//g,
							""
						)}.png`}
					/>
					<div className="token-name">
						<span>IBC ASSET</span>
						<span style={isDark ? {} : { color: "black" }}>
							{getTokenName(token)}
						</span>
					</div>
				</div>
				<div className="token-balance">
					<span style={isDark ? {} : { color: "black" }}>
						{addSuffix(
							swapInfo.swapType === SwapType.DEPOSIT
								? ibcTokenBalance
								: tokenBalance
						)}
					</span>
					<span>{`$${addSuffix(
						(swapInfo.swapType === SwapType.DEPOSIT
							? ibcTokenBalance
							: tokenBalance) * tokenPrice
					)}`}</span>
				</div>
			</div>
		);
	};

	const CustomControlItem = ({
		children,
		...props
	}: ControlProps<any, false>) => {
		const {
			innerProps: { onMouseDown, onTouchEnd },
		} = props;
		return (
			<div
				className="custom-control-item"
				onMouseDown={onMouseDown}
				onTouchEnd={onTouchEnd}
			>
				<CustomControl option={{ value: selectedTokenType }} />
				{children}
			</div>
		);
	};

	return (
		<div
			className="wrapper"
			style={{
				...(isDark && {
					color: "white",
				}),
			}}
		>
			<div>
				<img
					alt=""
					className="logo"
					src={`https://hopers.io/others/hopeHeaderLogo${
						isDark ? "_dark" : ""
					}.png`}
					onLoad={(e: React.SyntheticEvent<HTMLImageElement>) =>
						setLogoHeight((e.target as any).clientHeight || 0)
					}
				/>
				<div
					style={{ height: `calc(100% - ${logoHeight}px - 50px)` }}
					className="container"
				>
					<div className="transfer-title">{`${direction} IBC Asset`}</div>

					{isFullControl && (
						<div className="select-wrapper">
							<ReactSelect
								value={{ value: selectedTokenType }}
								onChange={(value) => {
									if (value)
										handleChangeSwapToken(value.value);
								}}
								options={SelectOptions}
								styles={{
									container: (provided, state) => ({
										...provided,
										// margin: "5px 10px",
										border: "1px solid #02e296",
										borderRadius: "5px",
										width: "100%",
									}),
									dropdownIndicator: (provided, state) => ({
										...provided,
										padding: 0,
										color: "black",
									}),
									menu: (provided, state) => ({
										...provided,
										// backgroundColor: isDark ? "#838383" : "white",
										zIndex: 10,
									}),
								}}
								components={{
									MenuList: CustomMenuList,
									Control: CustomControlItem,
									ValueContainer: () => null,
									IndicatorSeparator: () => null,
								}}
							/>
						</div>
					)}
					{
						swapInfo.swapType === SwapType.DEPOSIT &&
							(!connectedWallet ? (
								<span>Please connect the wallet.</span>
							) : null)
						// hasErrorOnMobileConnection ? (
						// 	<span>
						// 		Please switch to your Keplr Wallet App and approve the action.
						// 	</span>
						// ) : null
					}
					<div className="amount-inputer-wrapper">
						<div className="auto-amount-container">
							<span>SELECT AMOUNT</span>
							<div className="button-container">
								<span
									onClick={() => handleClickAutoAmount(0.5)}
								>
									HALF
								</span>
								<span onClick={() => handleClickAutoAmount(1)}>
									MAX
								</span>
							</div>
						</div>
						<input
							className="amount-inputer"
							onChange={handleChangeSwapAmount}
							value={swapAmount}
						/>
					</div>
					<div
						className="err-msg-container"
						style={{ color: statusMsg ? "black" : "red" }}
					>
						{statusMsg || errMsg}
					</div>
					<div className="operation-button-container">
						<div
							className="operation-button"
							onClick={handleAccept}
						>
							{sendingTx
								? "..."
								: swapInfo.swapType === SwapType.DEPOSIT
								? "Deposit"
								: "Withdraw"}
						</div>
						{/* <div
							className="operation-button cancel-button"
							onClick={handleCancel}
						>
							Cancel
						</div> */}
					</div>
					<span>ESTIMATED TIME 20 SECONDS</span>
					{isFullControl && (
						<div className="swap-direction-container">
							<div
								style={{
									fontWeight: "bold",
									cursor: "pointer",
									color: isDark ? "white" : "black",
									display: "flex",
									alignItems: "center",
									gap: 5,
								}}
								onClick={() =>
									handleChangeSwapType(
										swapInfo.swapType === SwapType.DEPOSIT
											? SwapType.WITHDRAW
											: SwapType.DEPOSIT
									)
								}
							>
								{swapInfo.swapType === SwapType.DEPOSIT
									? "WITHDRAW"
									: "DEPOSIT"}
								<OutLinkIcon
									width={20}
									fill={isDark ? "white" : "black"}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const usePopoutQuickSwap = () => {
	const { showNewWindow, closeNewWindow } = useContext(PopoutContext);

	const popoutQuickSwap = useCallback(
		(swapInfo: SwapInfo, isFullControl?: boolean, callback?: any) => {
			showNewWindow(
				<QuickSwap
					swapInfo={swapInfo}
					isFullControl={isFullControl || false}
					closeNewWindow={(params: any) => closeNewWindow(params)}
				/>,
				{
					title: "Quick Swap",
					onClose: callback,
				}
			);
		},
		[closeNewWindow, showNewWindow]
	);
	return popoutQuickSwap;
};

export default usePopoutQuickSwap;
