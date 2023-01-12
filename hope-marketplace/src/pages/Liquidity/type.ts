import { BasicProps } from "../../constants/BasicTypes";
import { TPool } from "../../types/pools";
import { TokenType } from "../../types/tokens";

export interface IBasicModal extends BasicProps {
	selectedPool?: TPool;
	onChangeModalType: React.Dispatch<React.SetStateAction<ModalType>>;
}

export enum PoolType {
	INCENTIVIZED = "Incentivized",
	ALL = "All Pools",
}

export enum ModalType {
	ADD,
	CREATE,
	REMOVE,
}

export type TAddAmount = {
	token1: string | number;
	token2: string | number;
};

export type TCreateInfo = { [key in keyof TAddAmount]: TokenType };

export type TPoolInfo = {
	balance: number;
};
