import React, { useCallback, useState, useEffect } from "react";
import { getOfflineSigner } from "@cosmostation/cosmos-client";
import {
	WalletManagerProvider,
	WalletType,
	getChainInfo,
} from "@noahsaso/cosmodal";
import { cosmos } from "@cosmostation/extension-client";
import {
	CosmWasmClient,
	SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { coin, OfflineSigner } from "@cosmjs/proto-signing";
import { ChainConfigs, ChainTypes } from "../constants/ChainTypes";
import {
	AccountType,
	setKeplrAccount,
} from "../features/accounts/accountsSlice";
import { useAppDispatch } from "../app/hooks";
import {
	ConnectedWalletTypeLocalStorageKey,
	WalletType as ConnectedWalletType,
} from "../constants/BasicTypes";

interface CosmostationWalletContextInterface {
	connect: () => void;
	disconnect: () => void;
	getJunoQueryClient: () => Promise<CosmWasmClient>;
	provider: any;
	offlineSigner: OfflineSigner | null;
	client: SigningCosmWasmClient | null;
}

export const CosmostationWalletContext =
	React.createContext<CosmostationWalletContextInterface>({
		connect: () => {},
		disconnect: () => {},
		getJunoQueryClient: () =>
			new Promise((resolve) => resolve({} as CosmWasmClient)),
		provider: null,
		offlineSigner: null,
		client: null,
	});

const EXPIRATION_TIME = 3600;

export const WalletProvider = ({ children }: { children: any }) => {
	const [offlineSigner, setOfflineSigner] = useState<OfflineSigner | null>(
		null
	);
	const [client, setClient] = useState<SigningCosmWasmClient | null>(null);
	const [provider, setProvider] = useState<any>(null);
	const [junoQueryClient, setJunoQueryClient] =
		useState<CosmWasmClient | null>(null);
	const dispatch = useAppDispatch();

	const config = ChainConfigs[ChainTypes.JUNO];

	useEffect(() => {
		const connectedWalletType = localStorage.getItem(
			ConnectedWalletTypeLocalStorageKey
		);
		if (connectedWalletType === ConnectedWalletType.COSMOSTATION) {
			connect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getJunoQueryClient = useCallback(async () => {
		if (junoQueryClient) return junoQueryClient;
		const rpcEndpoint: string = config["rpcEndpoint"];
		const client = await CosmWasmClient.connect(rpcEndpoint);
		setJunoQueryClient(client);
		return client;
	}, [config, junoQueryClient]);

	const connect = async () => {
		const provider = await cosmos();
		const mainLogic = async () => {
			const offlineSigner = await getOfflineSigner(config.chainId);
			const client = await SigningCosmWasmClient.connectWithSigner(
				config.rpcEndpoint,
				offlineSigner
			);
			const account = await provider.getAccount(config.chainId);
			const { name: label, address } = account;
			dispatch(
				setKeplrAccount({
					label,
					address,
					type: AccountType.Cosmostation,
					balance: coin(0, config["microDenom"]),
				})
			);
			setProvider(provider);
			setOfflineSigner(offlineSigner);
			setClient(client);
			localStorage.setItem(
				ConnectedWalletTypeLocalStorageKey,
				ConnectedWalletType.COSMOSTATION
			);
		};

		try {
			await mainLogic();
		} catch (e: any) {
			if (e?.code === 4100) {
				// when the first connecting...
				provider.autoSign
					.set(config.chainId, EXPIRATION_TIME)
					.then(async (result) => {
						await mainLogic();
						setTimeout(() => {
							disconnect();
						}, EXPIRATION_TIME * 1000);
					})
					.catch((err) => {
						console.error("cosmostation connect error", err);
					});
			}
		}
	};

	const disconnect = () => {
		localStorage.setItem(ConnectedWalletTypeLocalStorageKey, "");
		dispatch(setKeplrAccount());
		setProvider(null);
		setOfflineSigner(null);
		setClient(client);
	};

	return (
		<CosmostationWalletContext.Provider
			value={{
				connect,
				disconnect,
				client,
				provider,
				offlineSigner,
				getJunoQueryClient,
			}}
		>
			<WalletManagerProvider
				defaultChainId={config.chainId}
				enabledWalletTypes={[
					WalletType.Keplr,
					WalletType.WalletConnectKeplr,
				]}
				localStorageKey="keplr-wallet"
				walletConnectClientMeta={{
					name: "Hopers | Protocol",
					description:
						"The DAO governs the marketplace and earns rewards through the staking system of the token $HOPE.",
					url: "https://hopers.io",
					icons: ["https://hopers.io/logo.png"],
				}}
				chainInfoOverrides={async () => {
					const existChainInfo = await getChainInfo(config.chainId);
					const result = {
						...existChainInfo,
						rpc: config.rpcEndpoint,
						rest: config.restEndpoint,
					};
					return [result];
				}}
				// chainInfoOverrides={[
				// 	{
				// 		...ChainInfoList[12], // juno config
				// 		rpc: config.rpcEndpoint,
				// 		rest: config.restEndpoint,
				// 	},
				// ]}
			>
				{children}
			</WalletManagerProvider>
		</CosmostationWalletContext.Provider>
	);
};
