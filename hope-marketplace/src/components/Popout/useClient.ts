import { useCallback, useEffect, useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { useWalletManager } from "@noahsaso/cosmodal";
import { ChainConfigs, ChainTypes } from "../../constants/ChainTypes";
import { AccountData } from "@cosmjs/proto-signing";
import { TokenStatus, TokenType } from "../../types/tokens";
// import { toast } from "react-toastify";

type TWasmChainClients = {
	[key in ChainTypes]: {
		client: SigningCosmWasmClient | null;
		account: AccountData | null;
	};
};

type TIbcNativeTokenBalance = {
	[key in TokenType]: any;
};

const useClient = (tokens?: TokenType[]) => {
	const { connectedWallet } = useWalletManager();
	const [wasmClients, setWasmClients] = useState<TWasmChainClients>(
		{} as TWasmChainClients
	);
	const [ibcNativeTokenBalance, setIBCNativeTokenBalance] =
		useState<TIbcNativeTokenBalance>({} as TIbcNativeTokenBalance);

	const getClient = useCallback(
		async (chainType: ChainTypes) => {
			if (connectedWallet) {
				const chainConfig = ChainConfigs[chainType];
				// const offlineSigner = await getOfflineSigner(chainConfig.chainId);
				const { wallet, walletClient } = connectedWallet;
				// toast.info(`getting offline signer ${chainType}`);
				const offlineSigner = await wallet.getOfflineSignerFunction(
					walletClient
				)(chainConfig.chainId);
				// toast.info(`getting account ${chainType}`);
				const account = await offlineSigner?.getAccounts();
				let wasmChainClient = null;
				if (offlineSigner) {
					try {
						// toast.info(`getting wasm client ${chainType}`);
						wasmChainClient =
							await SigningCosmWasmClient.connectWithSigner(
								chainConfig.rpcEndpoint,
								offlineSigner,
								{
									gasPrice: GasPrice.fromString(
										`${chainConfig.gasPrice}${chainConfig.microDenom}`
									),
								}
							);
						return {
							account: account?.[0],
							client: wasmChainClient,
						};
					} catch (e) {
						console.error("wallets", e);
						return { account: account?.[0], client: null };
					}
				}
			}
			return { account: null, client: null };
		},
		[connectedWallet]
	);

	useEffect(() => {
		(Object.keys(TokenType) as Array<keyof typeof TokenType>)
			.filter(
				(token) =>
					TokenType[token] === TokenType.JUNO ||
					TokenStatus[TokenType[token]].isIBCCoin
			)
			.forEach(async (key) => {
				const token = TokenType[key];
				const tokenStatus = TokenStatus[token];
				const chain = tokenStatus.chain;
				try {
					// toast.info(`getting client start ${key}`);
					const client = await getClient(chain);
					// toast.info(`getting client success ${key}`);
					setWasmClients((prev) => ({
						...prev,
						[chain]: client,
					}));
				} catch (e) {
					console.log(e);
					// toast.error(`getting client error ${key}`);
				}
			});
	}, [getClient]);

	const getBalance = useCallback(
		async (token: TokenType) => {
			if (ibcNativeTokenBalance[token]) return;
			const tokenStatus = TokenStatus[token];
			const chainConfig = ChainConfigs[tokenStatus.chain];
			const { client, account } = wasmClients[tokenStatus.chain];
			if (connectedWallet && client && account) {
				// setHasErrorOnMobileConnection(false);
				const balance = await client.getBalance(
					account.address,
					tokenStatus.isNativeCoin
						? chainConfig.microDenom
						: tokenStatus.denom || ""
				);
				setIBCNativeTokenBalance((prev) => ({
					...prev,
					[token]: balance,
				}));
				// else {
				// 	setHasErrorOnMobileConnection(true);
				// }
			}
		},
		[connectedWallet, ibcNativeTokenBalance, wasmClients]
	);

	useEffect(() => {
		if (!tokens) return;
		for (const token of tokens) {
			getBalance(token);
		}
	}, [getBalance, tokens]);

	return {
		clients: wasmClients,
		getClient,
		ibcBalance: ibcNativeTokenBalance,
	};
};

export default useClient;
