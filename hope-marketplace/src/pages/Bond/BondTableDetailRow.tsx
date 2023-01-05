import React, { useContext, useState } from "react";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppSelector } from "../../app/hooks";
import Flex from "../../components/Flex";
import { ExternalLinkIcon } from "../../components/SvgIcons";
import Text from "../../components/Text";
import { TPool } from "../../types/pools";
import { getTokenName } from "../../types/tokens";
import {
	BondAmountInputer,
	DetailRowBlock,
	StyledButton as Button,
} from "./styled";
import { CosmostationWalletContext } from "../../context/Wallet";
import {
	ConnectedWalletTypeLocalStorageKey,
	WalletType,
} from "../../constants/BasicTypes";
import { addSuffix } from "../../util/string";
import useContract from "../../hook/useContract";
import { toast } from "react-toastify";
import useRefresh from "../../hook/useRefresh";

const AutoBondAmounts = [0.25, 0.5, 0.75, 1];

const BondTableDetailRow: React.FC<{ rowData: TPool }> = ({ rowData }) => {
	const [bondAmount, setBondAmount] = useState<number | string>();
	const [isPendingBond, setIsPendingBond] = useState(false);
	const [isPendingClaim, setIsPendingClaim] = useState(false);
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	const { connect: connectKeplr } = useWalletManager();
	const { connect: connectCosmostation } = useContext(
		CosmostationWalletContext
	);
	const { runExecute } = useContract();
	const { refresh } = useRefresh();

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

	const handleChangeBondAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (!isNaN(Number(value))) setBondAmount(value);
	};

	const handleClickBond = async () => {
		if (isPendingBond || !bondAmount) return;
		setIsPendingBond(true);
		try {
			await runExecute(rowData.lpAddress, {
				send: {
					contract: rowData.stakingAddress,
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
			setIsPendingBond(false);
		}
	};

	// const handleClickUnBond = async () => {
	// 	if (isPendingBond || !bondAmount) return;
	// 	setIsPendingBond(true);
	// 	try {
	// 		await runExecute(rowData.stakingAddress, {
	// 			unbond: {
	// 				amount: "" + Math.floor(Number(bondAmount) * 1e6),
	// 			},
	// 		});
	// 		toast.success("Successfully unbonded!");
	// 		refresh();
	// 	} catch (err) {
	// 		console.log(err);
	// 		toast.error("Unbond Failed!");
	// 	} finally {
	// 		setIsPendingBond(false);
	// 	}
	// };

	const handleClickClaim = async () => {
		if (isPendingClaim || !rowData.pendingReward) return;
		setIsPendingClaim(true);
		try {
			await runExecute(rowData.stakingAddress, {
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

	return (
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
				<Text color="black" gap="30px" alignItems="center" cursor="pointer">
					{`Get ${getTokenName(rowData.token1)}-${getTokenName(
						rowData.token2
					)} LP`}{" "}
					<ExternalLinkIcon />
				</Text>
				<Text color="black" gap="30px" alignItems="center" cursor="pointer">
					View Contract <ExternalLinkIcon />
				</Text>
				<Text color="black" gap="30px" alignItems="center" cursor="pointer">
					See Pair Info <ExternalLinkIcon />
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
						TOKEN REWARDS
					</Text>
					<Flex alignItems="flex-start" gap="10px">
						<Text color="black" flexDirection="column">
							{account ? (
								<>
									<Text color="black" bold>
										{addSuffix(rowData.pendingReward || 0)}
									</Text>
									<Text color="black">365 USD</Text>
								</>
							) : (
								"0.0000"
							)}
						</Text>
						<Text color="black">HOPERS</Text>
						<Button onClick={handleClickClaim}>
							{isPendingClaim ? "Claiming" : "Claim"}
						</Button>
					</Flex>
				</Flex>
			</DetailRowBlock>
			<DetailRowBlock>
				{account ? (
					<Flex justifyContent="space-between" gap="20px">
						<Flex
							flexDirection="column"
							alignItems="flex-start"
							gap="10px"
							justifyContent="flex-start"
						>
							<Text color="black" justifyContent="flex-start" bold>
								Bond
							</Text>
							<Text flexDirection="column">
								<Text color="black">{`${addSuffix(
									rowData.balance || 0
								)} LP`}</Text>
								<Text color="black">30065 USD</Text>
							</Text>
						</Flex>
						<Flex
							flexDirection="column"
							alignItems="center"
							gap="10px"
							justifyContent="flex-start"
						>
							<Flex width="100%" justifyContent="space-between">
								{AutoBondAmounts.map((amount, index) => (
									<Text
										key={index}
										color="black"
										cursor="pointer"
										onClick={() =>
											setBondAmount((rowData.balance || 0) * amount)
										}
									>{`${amount * 100}%`}</Text>
								))}
							</Flex>
							<BondAmountInputer
								value={bondAmount}
								onChange={handleChangeBondAmount}
							/>
							<Button onClick={handleClickBond}>
								{isPendingBond ? "Bonding" : "Bond"}
							</Button>
							<Text color="black">{`Balance ${addSuffix(
								rowData.balance || 0
							)}LP ${getTokenName(rowData.token1)}/${getTokenName(
								rowData.token2
							)}`}</Text>
						</Flex>
					</Flex>
				) : (
					<Flex
						flexDirection="column"
						alignItems="flex-start"
						gap="10px"
						justifyContent="flex-start"
					>
						<Text color="black" justifyContent="flex-start" bold>
							Bond
						</Text>
						<Button colored onClick={handleClickConnectWalletButton}>
							Connect Wallet
						</Button>
					</Flex>
				)}
			</DetailRowBlock>
		</Flex>
	);
};

export default BondTableDetailRow;
