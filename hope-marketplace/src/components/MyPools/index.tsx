import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { addSuffix } from "../../util/string";
import PoolImage from "../PoolImage";
import PoolName from "../PoolName";
import Text from "../Text";
import {
	LiquiditiesContainer,
	MyPoolContentItem,
	MyPoolItem,
	MyPoolItemRow,
	MyPoolsContainer,
	// Title,
} from "./styled";

const MyPools: React.FC = () => {
	const liquidities = useAppSelector((state) => state.liquidities);
	const myLiquidities = useMemo(
		() =>
			liquidities.filter((liquidity) => {
				// console.log("debug liquidity", liquidity);
				return !!liquidity.bonded;
			}),
		[liquidities]
	);
	return (
		<LiquiditiesContainer>
			{/* <Title>My Pools</Title> */}
			<MyPoolsContainer>
				{myLiquidities.map((liquidity, index: number) => (
					<MyPoolItem key={index}>
						<MyPoolItemRow>
							<PoolImage token1={liquidity.token1} token2={liquidity.token2} />
							<PoolName pool={liquidity} />
						</MyPoolItemRow>
						<MyPoolItemRow>
							<MyPoolContentItem>
								<Text bold color="#c5c5c5">
									APR
								</Text>
								<Text bold color="black">
									{liquidity.apr}
								</Text>
							</MyPoolContentItem>
							<MyPoolContentItem>
								<Text bold color="#c5c5c5">
									Pool Liquidity
								</Text>
								<Text bold color="black">
									{`${addSuffix(liquidity.pool)}`}
								</Text>
							</MyPoolContentItem>
							<MyPoolContentItem>
								<Text bold color="#c5c5c5">
									Bonded
								</Text>
								<Text bold color="black">
									{`${addSuffix(liquidity.bonded || 0)}`}
								</Text>
							</MyPoolContentItem>
						</MyPoolItemRow>
					</MyPoolItem>
				))}
			</MyPoolsContainer>
		</LiquiditiesContainer>
	);
};

export default MyPools;
