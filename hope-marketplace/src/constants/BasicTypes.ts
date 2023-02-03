export interface BasicProps {
	onClick?: any;
	className?: string;
	children?: any;
	title?: string;
}

export enum WalletType {
	KEPLR = "keplr",
	COSMOSTATION = "cosmostation",
}

export const ConnectedWalletTypeLocalStorageKey =
	"connected_wallet_localStorage_key";

// axios types

export type urlType = string;

export type methodType = "post" | "get";

export type headersType = {
	apiKey: string;
};
