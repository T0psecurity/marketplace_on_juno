import { useEffect, useState } from "react";
import { Liquidities } from "../../constants/Liquidities";
import { TokenType } from "../../types/tokens";
import { TValidPair } from "./type";

export const useValidPool = (token1: TokenType, token2: TokenType) => {
	const [validPool, setValidPool] = useState<TValidPair | null>(null);

	useEffect(() => {
		let validPair = null;
		for (let liquidity of Liquidities) {
			if (liquidity.tokenA === token1 && liquidity.tokenB === token2) {
				validPair = { pool: liquidity, reverse: false };
			}
			if (liquidity.tokenA === token2 && liquidity.tokenB === token1) {
				validPair = { pool: liquidity, reverse: true };
			}
		}
		setValidPool(validPair);
	}, [token1, token2]);
	return validPool;
};
