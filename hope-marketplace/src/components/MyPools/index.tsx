import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { addSuffix } from "../../util/string";
import PoolImage from "../PoolImage";
import PoolName from "../PoolName";
import Text from "../Text";
import {
	LiquiditiesContainer,
	MyPoolContentItem,
	MyPoolContentRow,
	MyPoolItem,
	MyPoolItemRow,
	MyPoolsContainer,
	// Title,
} from "./styled";
import { TPool, TPoolConfig } from "../../types/pools";

const MyPools: React.FC = () => {
	const liquidities = useAppSelector((state) => state.liquidities);
	const myLiquidities = useMemo(
		() =>
			liquidities.filter((liquidity) => {
				if (!liquidity.bonded) return false;
				const bonded =
					typeof liquidity.bonded === "number"
						? [liquidity.bonded as number]
						: (liquidity.bonded as number[]);
				const isBonded = bonded.reduce(
					(result, crrBonded) => result || (crrBonded || 0) > 0,
					false
				);
				return isBonded;
			}),
		[liquidities]
	);

	const poolContents = [
		{ title: "APR", value: (liquidity: TPool) => liquidity.apr },
		{
			title: "Pool Liquidity",
			value: (liquidity: TPool) => addSuffix(liquidity.pool),
		},
		{
			title: "Bonded",
			value: (liquidity: TPool) => {
				const bonded = liquidity.bonded;
				if (!bonded) return null;
				let renderInfo = [];
				if (typeof bonded === "number") {
					const config = liquidity.config as TPoolConfig;
					renderInfo = [
						{
							bonded: addSuffix(bonded),
							rewardToken: config.rewardToken || "",
						},
					];
				} else {
					const config = liquidity.config as TPoolConfig[];
					renderInfo = config.map((item, index) => ({
						bonded: addSuffix(bonded[index]),
						rewardToken: item.rewardToken || "",
					}));
				}
				return (
					<>
						{renderInfo.map((info, index) => (
							<Text key={index} alignItems="center" bold>
								<img
									width={25}
									alt=""
									src={`/coin-images/${info.rewardToken.replace(
										/\//g,
										""
									)}.png`}
								/>
								{info.bonded}
							</Text>
						))}
					</>
				);
			},
		},
		{
			title: "Pending Rewards",
			value: (liquidity: TPool) => {
				const pendingReward = liquidity.pendingReward;
				if (!pendingReward) return null;
				let renderInfo = [];
				if (typeof pendingReward === "number") {
					const config = liquidity.config as TPoolConfig;
					renderInfo = [
						{
							pendingReward: addSuffix(pendingReward),
							rewardToken: config.rewardToken || "",
						},
					];
				} else {
					const config = liquidity.config as TPoolConfig[];
					renderInfo = config.map((item, index) => ({
						pendingReward: addSuffix(pendingReward[index]),
						rewardToken: item.rewardToken || "",
					}));
				}
				return (
					<>
						{renderInfo.map((info, index) => (
							<Text key={index} alignItems="center" bold>
								<img
									width={25}
									alt=""
									src={`/coin-images/${info.rewardToken.replace(
										/\//g,
										""
									)}.png`}
								/>
								{info.pendingReward}
							</Text>
						))}
					</>
				);
			},
		},
	];

	return (
		<LiquiditiesContainer>
			{/* <Title>My Pools</Title> */}
			<MyPoolsContainer>
				{myLiquidities.map((liquidity, index: number) => (
					<MyPoolItem key={index}>
						<MyPoolItemRow>
							<PoolImage
								token1={liquidity.token1}
								token2={liquidity.token2}
							/>
							<PoolName pool={liquidity} />
						</MyPoolItemRow>
						<MyPoolContentRow>
							{poolContents.map((content, index) => (
								<MyPoolContentItem key={index}>
									<Text bold color="#c5c5c5">
										{content.title}
									</Text>
									<Text
										bold
										color="black"
										alignItems="center"
									>
										{content.value(liquidity)}
									</Text>
								</MyPoolContentItem>
							))}
						</MyPoolContentRow>
					</MyPoolItem>
				))}
			</MyPoolsContainer>
		</LiquiditiesContainer>
	);
};

export default MyPools;
