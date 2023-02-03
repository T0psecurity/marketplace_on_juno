import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppSelector } from "../../app/hooks";
import Flex from "../../components/Flex";
import { ExternalLinkIcon } from "../../components/SvgIcons";
import Text from "../../components/Text";
import { TPool } from "../../types/pools";
import { TokenStatus, TokenType, getTokenName } from "../../types/tokens";
import { DetailRowBlock, StyledButton as Button, SmallText } from "./styled";
import { CosmostationWalletContext } from "../../context/Wallet";
import {
	ConnectedWalletTypeLocalStorageKey,
	WalletType,
} from "../../constants/BasicTypes";
import { addSuffix } from "../../util/string";
import useContract from "../../hook/useContract";
import { toast } from "react-toastify";
import useRefresh from "../../hook/useRefresh";
import ManageBondModal from "../../components/ManageBonModal";
import { useKeplr } from "../../features/accounts/useKeplr";
import { ChainConfigs, ChainTypes } from "../../constants/ChainTypes";

type TRowDataDetailInfo = {
	rewardToken?: TokenType;
	pendingReward: number;
	bonded: number;
	stakingAddress: string;
	priceInUsd: number;
};

const BondTableDetailRow: React.FC<{ rowData: TPool; focus: boolean }> = ({
	rowData,
	focus,
}) => {
	const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(
		null
	);
	const [isPendingClaim, setIsPendingClaim] = useState(false);
	const [isOpenManageBondModal, setIsOpenManageBondModal] = useState(false);
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	const tokenPrices = useAppSelector((state) => state.tokenPrices);
	const { connect: connectKeplr } = useWalletManager();
	const { connect: connectCosmostation } = useContext(
		CosmostationWalletContext
	);
	const { runExecute } = useContract();
	const { refresh } = useRefresh();
	const history = useHistory();
	const { suggestToken } = useKeplr();

	useEffect(() => {
		if (wrapperElement && focus) {
			const headerElement = document.getElementById("header");
			const headerHeight = headerElement?.clientHeight || 0;
			// wrapperElement.style.scrollMargin = `${headerHeight}px`;
			wrapperElement.style.cssText = `scroll-margin-top: ${headerHeight}px`;
			wrapperElement.scrollIntoView({ behavior: "smooth" });
			// window.scrollTo(0, 0);
		}
	}, [focus, wrapperElement]);

	const rowDataDetailInfo = useMemo(() => {
		const config = rowData.config;
		let result: TRowDataDetailInfo[] = [];
		if (Array.isArray(config)) {
			result = config.map((item, index) => {
				const pendingReward =
					((rowData.pendingReward || []) as number[])[index] || 0;
				const tokenPriceInUsd = item.rewardToken
					? tokenPrices[item.rewardToken]?.market_data.current_price
							?.usd || 0
					: 0;
				return {
					rewardToken: item.rewardToken,
					pendingReward,
					bonded: ((rowData.bonded || []) as number[])[index],
					stakingAddress: (
						(rowData.stakingAddress || []) as string[]
					)[index],
					priceInUsd: pendingReward * tokenPriceInUsd,
				};
			});
		} else {
			const pendingReward = (rowData.pendingReward || 0) as number;
			const tokenPriceInUsd = config?.rewardToken
				? tokenPrices[config.rewardToken]?.market_data.current_price
						?.usd || 0
				: 0;
			result = [
				{
					rewardToken: config?.rewardToken,
					pendingReward,
					bonded: (rowData.bonded || 0) as number,
					stakingAddress: (rowData.stakingAddress || "") as string,
					priceInUsd: pendingReward * tokenPriceInUsd,
				},
			];
		}
		return result;
	}, [
		rowData.bonded,
		rowData.config,
		rowData.pendingReward,
		rowData.stakingAddress,
		tokenPrices,
	]);

	const handleClickConnectWalletButton = () => {
		const ConnectedWalletType = localStorage.getItem(
			ConnectedWalletTypeLocalStorageKey
		);
		if (ConnectedWalletType === (WalletType.COSMOSTATION as string)) {
			connectCosmostation();
		} else {
			localStorage.setItem(
				ConnectedWalletTypeLocalStorageKey,
				WalletType.COSMOSTATION
			);
			connectKeplr();
		}
	};

	const handleClickBondManageModal = async () => {
		setIsOpenManageBondModal(true);
	};

	const handleClickClaim = async (data: TRowDataDetailInfo) => {
		if (isPendingClaim || !data.pendingReward || !data.stakingAddress)
			return;
		setIsPendingClaim(true);
		try {
			await runExecute(data.stakingAddress, {
				withdraw: {},
			});
			toast.success("Successfully claimed!");
			refresh();
		} catch (err) {
			console.log(err);
			toast.error("Claim Failed!");
		} finally {
			setIsPendingClaim(false);
		}
	};

	const token2Address = TokenStatus[rowData.token2]?.contractAddress;

	return (
		<div ref={(node) => setWrapperElement(node)} key={rowData.id}>
			<Flex
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
							history.push(
								`/liquidity?type=add&poolId=${rowData.id}`
							)
						}
					>
						{`Get ${getTokenName(rowData.token1)}-${getTokenName(
							rowData.token2
						)} LP`}{" "}
						<ExternalLinkIcon />
					</Text>
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
						onClick={() =>
							history.push(
								`/liquidity?type=add&poolId=${rowData.id}`
							)
						}
					>
						See Pair Info <ExternalLinkIcon />
					</Text>
					{(token2Address || rowData.lpAddress) && (
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
					)}
				</Flex>
				<DetailRowBlock>
					<Flex
						flexDirection="column"
						alignItems="flex-start"
						gap="10px"
						justifyContent="flex-start"
					>
						<Text color="black" justifyContent="flex-start" bold>
							TOKEN REWARDS
						</Text>
						{rowDataDetailInfo.length > 0 ? (
							<Flex
								flexDirection="column"
								gap="20px"
								width="100%"
							>
								{rowDataDetailInfo.map(
									(detailInfo, index) =>
										detailInfo.rewardToken && (
											<Flex
												key={index}
												alignItems="center"
												justifyContent="space-between"
												gap="10px"
												width="100%"
											>
												<Text
													flexDirection="column"
													alignItems="flex-end"
													gap="2px"
												>
													<Text
														color="black"
														bold
														title={
															"" +
															(detailInfo.pendingReward ||
																0)
														}
													>
														{addSuffix(
															detailInfo.pendingReward ||
																0
														)}
													</Text>
													<SmallText
														color="black"
														letterSpacing="-1px"
														title={
															"" +
															detailInfo.priceInUsd
														}
													>
														{`(${addSuffix(
															detailInfo.priceInUsd
														)} USD)`}
													</SmallText>
												</Text>
												<Flex
													gap="5px"
													alignItems="center"
												>
													<img
														width={25}
														alt=""
														src={`/coin-images/${detailInfo.rewardToken.replace(
															/\//g,
															""
														)}.png`}
													/>
													<SmallText
														color="black"
														bold
														letterSpacing="-2px"
													>
														{getTokenName(
															detailInfo.rewardToken
														)}
													</SmallText>
												</Flex>
												<Button
													onClick={() =>
														handleClickClaim(
															detailInfo
														)
													}
												>
													{isPendingClaim
														? "Claiming"
														: "Claim"}
												</Button>
											</Flex>
										)
								)}
							</Flex>
						) : (
							<Text color="black" justifyContent="flex-start">
								No Reward
							</Text>
						)}
					</Flex>
				</DetailRowBlock>
				<DetailRowBlock>
					{account ? (
						<Flex
							flexDirection="column"
							alignItems="flex-start"
							gap="10px"
							justifyContent="flex-start"
						>
							<Text
								color="black"
								justifyContent="flex-start"
								bold
							>
								Bond
							</Text>
							<Flex gap="30px">
								<Text color="black">{`${addSuffix(
									rowData.balance || 0
								)} LP Available`}</Text>
								<Text color="black">{`${addSuffix(
									rowDataDetailInfo.reduce(
										(result, crrValue) => ({
											...crrValue,
											bonded:
												(result.bonded || 0) +
												crrValue.bonded,
										}),
										{ bonded: 0 }
									).bonded
								)} LP Bonded`}</Text>
							</Flex>
							<Button onClick={handleClickBondManageModal}>
								Manage Bonding
							</Button>
						</Flex>
					) : (
						<Flex
							flexDirection="column"
							alignItems="flex-start"
							gap="10px"
							justifyContent="flex-start"
						>
							<Text
								color="black"
								justifyContent="flex-start"
								bold
							>
								Bond
							</Text>
							<Button
								colored
								onClick={handleClickConnectWalletButton}
							>
								Connect Wallet
							</Button>
						</Flex>
					)}
				</DetailRowBlock>
			</Flex>
			<ManageBondModal
				isOpen={isOpenManageBondModal}
				onClose={() => setIsOpenManageBondModal(false)}
				liquidity={rowData}
			/>
		</div>
	);
};

export default BondTableDetailRow;
