import React, { useMemo } from "react";
import { BasicProps } from "../../constants/BasicTypes";
import { TokenType } from "../../types/tokens";
import { LiquidityImage } from "./styled";

interface IPoolImage extends BasicProps {
	token1: TokenType;
	token2: TokenType;
	size?: string | { token1: string; token2: string };
}

const PoolImage: React.FC<IPoolImage> = ({ token1, token2, size }) => {
	const imageSize = useMemo(() => {
		if (typeof size === "string") {
			return { token1: size, token2: size };
		}
		return size;
	}, [size]);

	return (
		<LiquidityImage size={imageSize}>
			<img alt="" src={`/coin-images/${token2.replace(/\//g, "")}.png`} />
			<img alt="" src={`/coin-images/${token1.replace(/\//g, "")}.png`} />
		</LiquidityImage>
	);
};

export default PoolImage;
