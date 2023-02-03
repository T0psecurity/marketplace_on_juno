import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Flex from "../Flex";
import { IModal } from "../Modal";
import PoolImage from "../PoolImage";
import PoolName from "../PoolName";
import Text from "../Text";
import useContract from "../../hook/useContract";
import useRefresh from "../../hook/useRefresh";
import { TPool, TPoolConfig } from "../../types/pools";
import { getTokenName } from "../../types/tokens";
import { addSuffix } from "../../util/string";
import {
	BondAmountInputer,
	ManageBondModalWrapper as Wrapper,
	ModalBody,
	ModalHeader,
	ModalTab,
	ModalTabContainer,
	StyledButton as Button,
	UnbondHistoryContainer,
	UnbondHistoryTable,
	UnbondingPeriodContainer,
	UnbondingPeriodItem,
	UnbondItem,
} from "./styled";
import { useAppSelector } from "../../app/hooks";
import moment from "moment";

interface IMangeBondModal extends IModal {
	liquidity: TPool;
}

enum ModalTabs {
	BOND = "Bond",
	UNBOND = "Unbond",
}

const UnbondingPeriods = [
	{ day: 1, available: false },
	{ day: 7, available: false },
	{ day: 14, available: true },
];

const AutoBondAmounts = [0.25, 0.5, 0.75, 1];

const fetchingLimit = 20;

const ManageBondModal: React.FC<IMangeBondModal> = ({
	isOpen,
	onClose,
	liquidity,
}) => {
	const [isAvailableRedeem, setIsAvailableRedeem] = useState(false);
	const [unbondHistory, setUnbondHistory] = useState<any[]>([]);
	const [selectedTab, setSelectedTab] = useState(ModalTabs.BOND);
	const [selectedUnbondLP, setSelectedUnbondLP] = useState<number>(0);
	const [bondAmount, setBondAmount] = useState<number | string>();
	const [unbondAmount, setUnbondAmount] = useState<number | string>();
	const [isPendingAction, setIsPendingAction] = useState(false);
	const [isPendingRedeem, setIsPendingRedeem] = useState(false);

	const account = useAppSelector((state) => state?.accounts?.keplrAccount);
	const { runExecute, runQuery } = useContract();
	const { refresh } = useRefresh();

	useEffect(() => {
		const stakingAddress = liquidity.stakingAddress;
		if (!account || !stakingAddress) return;
		const now = new Date();

		(async () => {
			let fetchedUnbondHistory: any[] = [],
				redeemAvailability = false;
			const fetchUnbondHistory = async (
				address: string,
				config: TPoolConfig,
				startAfter = 0
			) => {
				if (!liquidity.stakingAddress) return;
				const result = await runQuery(address, {
					unbonding_info: {
						staker: account?.address,
						start_after: startAfter,
						limit: fetchingLimit,
					},
				});
				const fetchedResult = result?.unbonding_info || [];
				fetchedUnbondHistory = fetchedUnbondHistory.concat(
					fetchedResult.map((resultItem: any) => {
						const unlockTime = new Date(
							resultItem.time * 1e3 + (config?.lockDuration || 0)
						);
						redeemAvailability =
							redeemAvailability || Number(unlockTime) < Number(now);

						let remainTimeString = "Ready for Redeem";
						if (Number(unlockTime) > Number(now)) {
							const duration = moment.duration(moment(unlockTime).diff(now));
							const days = duration.days();
							const hours = duration.hours();
							if (!days && !hours) {
								remainTimeString = "Less than an hour";
							} else {
								remainTimeString = `${hours ? `${hours} hours` : ""} ${
									days ? `${hours ? " and " : ""}${days} days` : ""
								}`;
							}
						}
						return {
							...resultItem,
							remainTimeString,
						};
					})
				);
				if (fetchedResult.length === fetchingLimit) {
					await fetchUnbondHistory(
						address,
						config,
						fetchedResult[fetchedResult.length - 1].time
					);
				}
			};
			if (typeof stakingAddress === "string") {
				await fetchUnbondHistory(
					stakingAddress,
					liquidity.config as TPoolConfig
				);
			} else {
				stakingAddress.forEach(async (address, index) => {
					await fetchUnbondHistory(
						address,
						((liquidity.config || []) as TPoolConfig[])[index]
					);
				});
			}
			setUnbondHistory(fetchedUnbondHistory);
			setIsAvailableRedeem(redeemAvailability);
		})();
	}, [account, liquidity, runQuery]);

	useEffect(() => {
		setBondAmount("");
		setUnbondAmount("");
	}, [selectedTab]);

	const stakingContracts = useMemo(() => {
		const stakingAddress = liquidity.stakingAddress;
		if (!stakingAddress) return [];
		if (typeof stakingAddress === "string") {
			const config = liquidity.config as TPoolConfig;
			const bonded = (liquidity.bonded || 0) as number;
			return [
				{
					address: stakingAddress,
					bonded,
					rewardToken: config.rewardToken || "",
				},
			];
		} else {
			const config = liquidity.config as TPoolConfig[];
			const bonded = (liquidity.bonded || []) as number[];
			return stakingAddress.map((address, index) => ({
				address,
				bonded: bonded[index] || 0,
				rewardToken: config[index]?.rewardToken || "",
			}));
		}
	}, [liquidity.bonded, liquidity.config, liquidity.stakingAddress]);

	const handleCloseModal = () => {
		if (isPendingAction || isPendingRedeem) return;
		setTimeout(() => {
			setBondAmount("");
			setUnbondAmount("");
		}, 300);
		onClose();
	};

	const handleChangeBondAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (isNaN(Number(value))) return;
		if (selectedTab === ModalTabs.BOND) {
			setBondAmount(value);
		} else {
			setUnbondAmount(value);
		}
	};

	const handleClickBond = async (address: string) => {
		if (isPendingAction || !bondAmount || !address) return;
		if (Number(bondAmount) > (liquidity.balance || 0)) {
			toast.error("Invalid Amount");
			return;
		}
		setIsPendingAction(true);
		try {
			await runExecute(liquidity.lpAddress, {
				send: {
					contract: address,
					amount: "" + Math.floor(Number(bondAmount) * 1e6),
					msg: btoa(
						JSON.stringify({
							bond: {},
						})
					),
				},
			});
			toast.success("Successfully bonded!");
			refresh();
		} catch (err) {
			console.log(err);
			toast.error("Bond Failed!");
		} finally {
			setIsPendingAction(false);
		}
	};

	const handleClickUnBond = async () => {
		const address = stakingContracts[selectedUnbondLP].address;
		if (isPendingAction || !unbondAmount || !address) return;
		if (Number(unbondAmount) > (liquidity.bonded || 0)) {
			toast.error("Invalid Amount");
			return;
		}
		setIsPendingAction(true);
		try {
			await runExecute(address, {
				unbond: {
					amount: "" + Math.floor(Number(unbondAmount) * 1e6),
				},
			});
			toast.success("Successfully unbonded!");
			refresh();
		} catch (err) {
			console.log(err);
			toast.error("Unbond Failed!");
		} finally {
			setIsPendingAction(false);
		}
	};

	const handleClickRedeem = async () => {
		const stakingAddress = liquidity.stakingAddress;
		if (isPendingRedeem || !isAvailableRedeem || !stakingAddress) return;
		const stakingAddressArray =
			typeof stakingAddress === "string" ? [stakingAddress] : stakingAddress;
		const queries = stakingAddressArray.map((address) =>
			runExecute(address, {
				redeem: {},
			})
		);
		setIsPendingRedeem(true);
		Promise.all(queries)
			.then(() => {
				toast.success("Successfully Redeem!");
			})
			.catch((err) => {
				console.log(err);
				toast.error("Redeem Failed!");
			})
			.finally(() => {
				refresh();
				setIsPendingRedeem(false);
			});
	};

	return (
		<Wrapper isOpen={isOpen} onClose={handleCloseModal}>
			<ModalHeader>
				<PoolImage token1={liquidity.token1} token2={liquidity.token2} />
				<PoolName pool={liquidity} />
				<Text bold fontSize="22px" color="black">
					Manage Bonding
				</Text>
			</ModalHeader>
			<ModalBody>
				<Flex
					width="100%"
					flexWrap="wrap"
					gap="10px"
					justifyContent="space-between"
					alignItems="center"
				>
					<ModalTabContainer isRight={selectedTab !== ModalTabs.BOND}>
						{(Object.keys(ModalTabs) as Array<keyof typeof ModalTabs>).map(
							(key, index) => (
								<ModalTab
									key={index}
									checked={selectedTab === ModalTabs[key]}
									onClick={() =>
										!isPendingAction &&
										!isPendingRedeem &&
										setSelectedTab(ModalTabs[key])
									}
								>
									{ModalTabs[key]}
								</ModalTab>
							)
						)}
					</ModalTabContainer>
					{selectedTab === ModalTabs.UNBOND ? (
						<UnbondingPeriodContainer>
							{UnbondingPeriods.map((period, index) => (
								<UnbondingPeriodItem
									key={index}
									disabled={!period.available}
								>{`${period.day} ${
									period.day > 1 ? "days" : "day"
								}`}</UnbondingPeriodItem>
							))}
						</UnbondingPeriodContainer>
					) : (
						<div />
					)}
				</Flex>
				<Text color="black" bold fontSize="18px" justifyContent="flex-start">
					{selectedTab === ModalTabs.BOND ? (
						`Available LP: ${addSuffix(liquidity.balance || 0)} ${getTokenName(
							liquidity.token1
						)}-${getTokenName(liquidity.token2)}`
					) : (
						<Flex alignItems="center" gap="10px">
							<Text color="black">LP Bonded</Text>
							{stakingContracts.map((contract, index) => (
								<Text key={index} color="black" alignItems="center">
									{addSuffix(contract.bonded || 0)} in{" "}
									<img
										width={25}
										alt=""
										src={`/coin-images/${contract.rewardToken.replace(
											/\//g,
											""
										)}.png`}
									/>
								</Text>
							))}
						</Flex>
					)}
				</Text>
				<Flex width="100%" justifyContent="space-evenly" margin="20px 0">
					{AutoBondAmounts.map((amount, index) => (
						<Text
							key={index}
							color="black"
							cursor="pointer"
							onClick={() =>
								selectedTab === ModalTabs.BOND
									? setBondAmount((liquidity.balance || 0) * amount)
									: setUnbondAmount(
											(stakingContracts[selectedUnbondLP].bonded || 0) * amount
									  )
							}
						>{`${amount * 100}%`}</Text>
					))}
				</Flex>
				<BondAmountInputer
					hasError={
						Number(
							(selectedTab === ModalTabs.BOND ? bondAmount : unbondAmount) || 0
						) >
						((selectedTab === ModalTabs.BOND
							? liquidity.balance
							: stakingContracts[selectedUnbondLP].bonded) || 0)
					}
					value={selectedTab === ModalTabs.BOND ? bondAmount : unbondAmount}
					onChange={handleChangeBondAmount}
				/>
				<Flex
					alignItems="center"
					justifyContent="center"
					gap="20px"
					margin="10px 0 0 0"
				>
					{selectedTab === ModalTabs.BOND ? (
						<>
							{stakingContracts.map((contract, index) => (
								<Button
									key={index}
									onClick={() => {
										handleClickBond(contract.address);
									}}
								>
									<img
										width={25}
										alt=""
										src={`/coin-images/${contract.rewardToken.replace(
											/\//g,
											""
										)}.png`}
									/>
									{isPendingAction ? "Bonding" : "Bond"}
								</Button>
							))}
						</>
					) : (
						<Flex alignItems="center" gap="30px">
							<Flex alignItems="center" gap="10px">
								{stakingContracts.map((contract, index) => (
									<img
										style={{
											cursor: "pointer",
											filter:
												selectedUnbondLP === index ? "none" : "grayscale(1)",
										}}
										width={25}
										alt=""
										src={`/coin-images/${contract.rewardToken.replace(
											/\//g,
											""
										)}.png`}
										onClick={() => setSelectedUnbondLP(index)}
									/>
								))}
							</Flex>
							<Button onClick={handleClickUnBond}>
								{isPendingAction ? "Unbonding" : "Unbond"}
							</Button>
						</Flex>
					)}
				</Flex>
				{selectedTab === ModalTabs.UNBOND && unbondHistory.length > 0 && (
					<UnbondHistoryContainer>
						<Flex justifyContent="flex-end">
							<Button margin="20px 0" onClick={handleClickRedeem}>
								{isPendingRedeem ? "Redeeming" : "Redeem"}
							</Button>
						</Flex>
						<UnbondHistoryTable>
							{unbondHistory.map((history, index) => {
								return (
									<UnbondItem key={index}>
										<Text color="black">
											{addSuffix((history.amount || 0) / 1e6)}
										</Text>
										<Text color="black">{history.remainTimeString}</Text>
									</UnbondItem>
								);
							})}
						</UnbondHistoryTable>
					</UnbondHistoryContainer>
				)}
			</ModalBody>
		</Wrapper>
	);
};

export default ManageBondModal;
