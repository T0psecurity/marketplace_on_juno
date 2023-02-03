import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Flex from "../../components/Flex";
import Text from "../../components/Text";
import { ExternalLinkIcon } from "../../components/SvgIcons";
import { TPool, TPoolConfig } from "../../types/pools";

import { DetailRowBlock, StyledButton as Button } from "./styled";
import { useKeplr } from "../../features/accounts/useKeplr";
import { TokenStatus } from "../../types/tokens";
import { ChainConfigs, ChainTypes } from "../../constants/ChainTypes";

const LiquidityTableDetailRow: React.FC<{
	rowData: TPool;
	onClickAddLiquidity: (pool: TPool) => void;
}> = ({ rowData, onClickAddLiquidity }) => {
	const history = useHistory();
	const { suggestToken } = useKeplr();

	const rowDataDetailInfo = useMemo(() => {
		let result: {
			apr: string;
			distributionEnd: number;
			rewardToken?: string;
		}[] = [];
		const now = Number(new Date());
		const config = rowData.config;
		const apr = rowData.apr;
		if (typeof apr === "string") {
			const distributionEnd = Math.max(
				0,
				Math.floor(
					(((config as TPoolConfig)?.distributionEnd || 0) - now) /
						(1000 * 60 * 60 * 24)
				)
			);
			result = [
				{
					apr,
					distributionEnd,
					rewardToken: (config as TPoolConfig)?.rewardToken,
				},
			];
		} else {
			apr.forEach((item, index) => {
				const crrConfig = (config as TPoolConfig[])[index];
				const distributionEnd = Math.max(
					0,
					Math.floor(
						((crrConfig.distributionEnd || 0) - now) / (1000 * 60 * 60 * 24)
					)
				);
				result.push({
					apr: item,
					distributionEnd,
					rewardToken: crrConfig.rewardToken,
				});
			});
		}
		return result;
	}, [rowData.apr, rowData.config]);

	const token2Address = TokenStatus[rowData.token2]?.contractAddress;

	return (
		<>
			<Flex
				key={rowData.id}
				alignItems="center"
				justifyContent="space-between"
				gap="10px"
				width="100%"
				padding="20px"
				backgroundColor="white"
			>
				<Flex alignItems="flex-start" flexDirection="column" gap="10px">
					<Text
						color="black"
						gap="5px 30px"
						alignItems="center"
						cursor="pointer"
						onClick={() =>
							window.open(
								`https://mintscan.io/juno/account/${rowData.contract}`
							)
						}
					>
						View Contract <ExternalLinkIcon />
					</Text>
					<Text
						color="black"
						gap="5px 30px"
						alignItems="center"
						cursor="pointer"
						onClick={async () => {
							if (token2Address)
								await suggestToken(
									ChainConfigs[ChainTypes.JUNO],
									token2Address
								);
							if (rowData.lpAddress)
								await suggestToken(
									ChainConfigs[ChainTypes.JUNO],
									rowData.lpAddress
								);
						}}
					>
						Add Token <img alt="" src="/others/keplr.png" />
					</Text>
				</Flex>
				<DetailRowBlock>
					<Flex
						flexDirection="column"
						alignItems="flex-start"
						gap="10px"
						justifyContent="flex-start"
					>
						<Text color="black" justifyContent="flex-start" bold>
							Bonding Rewards
						</Text>
						<Flex flexDirection="column" alignItems="center" gap="10px">
							{rowDataDetailInfo.length > 0 ? (
								rowDataDetailInfo.map(
									(detailInfo, index) =>
										detailInfo.rewardToken && (
											<Flex key={index} gap="10px" alignItems="center">
												<Text bold color="#02e296">
													Reward Asset
												</Text>
												<img
													width={25}
													alt=""
													src={`/coin-images/${detailInfo.rewardToken.replace(
														/\//g,
														""
													)}.png`}
												/>
												<Text color="black">{detailInfo.apr}</Text>
												<Text color="black">{`end in ${detailInfo.distributionEnd} Days`}</Text>
											</Flex>
										)
								)
							) : (
								<Text color="black" bold>
									No Reward
								</Text>
							)}
						</Flex>
					</Flex>
				</DetailRowBlock>
				<Flex flexDirection="column" gap="10px">
					<Button order={1} onClick={() => onClickAddLiquidity(rowData)}>
						Add Liquidity
					</Button>
					<Button
						order={2}
						onClick={() =>
							rowData.stakingAddress &&
							history.push(`/bond?poolId=${rowData.id}`)
						}
					>
						Bond
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default LiquidityTableDetailRow;
