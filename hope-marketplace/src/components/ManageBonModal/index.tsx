import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Flex from "../Flex";
import { IModal } from "../Modal";
import PoolImage from "../PoolImage";
import PoolName from "../PoolName";
import Text from "../Text";
import useContract from "../../hook/useContract";
import useRefresh from "../../hook/useRefresh";
import { TPool } from "../../types/pools";
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
	const [bondAmount, setBondAmount] = useState<number | string>();
	const [unbondAmount, setUnbondAmount] = useState<number | string>();
	const [isPendingAction, setIsPendingAction] = useState(false);
	const [isPendingRedeem, setIsPendingRedeem] = useState(false);

	const account = useAppSelector((state) => state?.accounts?.keplrAccount);
	const { runExecute, runQuery } = useContract();
	const { refresh } = useRefresh();

	useEffect(() => {
		if (!account) return;
		const now = new Date();

		(async () => {
			let fetchedUnbondHistory: any[] = [],
				redeemAvailability = false;
			const fetchUnbondHistory = async (startAfter = 0) => {
				const result = await runQuery(liquidity.stakingAddress, {
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
							(resultItem.time + liquidity.config?.lockDuration || 0) * 1e3
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
						fetchedResult[fetchedResult.length - 1].time
					);
				}
			};
			await fetchUnbondHistory();
			setUnbondHistory(fetchedUnbondHistory);
			setIsAvailableRedeem(redeemAvailability);
		})();
	}, [account, liquidity, runQuery]);

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

	const handleClickBond = async () => {
		if (isPendingAction || !bondAmount) return;
		setIsPendingAction(true);
		try {
			await runExecute(liquidity.lpAddress, {
				send: {
					contract: liquidity.stakingAddress,
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
		if (isPendingAction || !unbondAmount) return;
		setIsPendingAction(true);
		try {
			await runExecute(liquidity.stakingAddress, {
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
		if (isPendingRedeem || !isAvailableRedeem) return;
		setIsPendingRedeem(true);
		try {
			await runExecute(liquidity.stakingAddress, {
				redeem: {},
			});
			toast.success("Successfully Redeem!");
			refresh();
		} catch (err) {
			console.log(err);
			toast.error("Redeem Failed!");
		} finally {
			setIsPendingRedeem(false);
		}
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
					justifyContent="space-evenly"
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
					<UnbondingPeriodContainer>
						{UnbondingPeriods.map((period, index) => (
							<UnbondingPeriodItem key={index} disabled={!period.available}>{`${
								period.day
							} ${period.day > 1 ? "days" : "day"}`}</UnbondingPeriodItem>
						))}
					</UnbondingPeriodContainer>
				</Flex>
				<Text color="black" bold fontSize="18px" justifyContent="flex-start">
					{selectedTab === ModalTabs.BOND
						? `Available LP: ${addSuffix(
								liquidity.balance || 0
						  )} ${getTokenName(liquidity.token1)}-${getTokenName(
								liquidity.token2
						  )}`
						: `${addSuffix(liquidity.bonded || 0)} LP Bonded`}
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
									: setUnbondAmount((liquidity.bonded || 0) * amount)
							}
						>{`${amount * 100}%`}</Text>
					))}
				</Flex>
				<BondAmountInputer
					value={selectedTab === ModalTabs.BOND ? bondAmount : unbondAmount}
					onChange={handleChangeBondAmount}
				/>
				<Button
					onClick={
						selectedTab === ModalTabs.BOND ? handleClickBond : handleClickUnBond
					}
				>
					{isPendingAction
						? selectedTab === ModalTabs.BOND
							? "Bonding"
							: "Unbonding"
						: selectedTab === ModalTabs.BOND
						? "Bond"
						: "Unbond"}
				</Button>
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
