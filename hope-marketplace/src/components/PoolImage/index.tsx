import React from "react";
import { BasicProps } from "../../constants/BasicTypes";
import { TokenType } from "../../types/tokens";
import { LiquidityImage } from "./styled";

interface IPoolImage extends BasicProps {
	token1: TokenType;
	token2: TokenType;
	size?: string;
}

const PoolImage: React.FC<IPoolImage> = ({ token1, token2, size }) => {
	return (
		<LiquidityImage>
			<img alt="" src={`/coin-images/${token2.replace(/\//g, "")}.png`} />
			<img alt="" src={`/coin-images/${token1.replace(/\//g, "")}.png`} />
		</LiquidityImage>
	);
};

export default PoolImage;
