import { TLiquidity } from "../../constants/Liquidities";

export type TValidPair = {
	pool: TLiquidity;
	reverse?: boolean;
	subPools?: {
		pool: TLiquidity;
		reverse: boolean;
	}[];
};
