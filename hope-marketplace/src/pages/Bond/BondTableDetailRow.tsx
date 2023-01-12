import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppSelector } from "../../app/hooks";
import Flex from "../../components/Flex";
import { ExternalLinkIcon } from "../../components/SvgIcons";
import Text from "../../components/Text";
import { TPool } from "../../types/pools";
import { getTokenName } from "../../types/tokens";
import { DetailRowBlock, StyledButton as Button } from "./styled";
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

const BondTableDetailRow: React.FC<{ rowData: TPool }> = ({ rowData }) => {
	const [isPendingClaim, setIsPendingClaim] = useState(false);
	const [isOpenManageBondModal, setIsOpenManageBondModal] = useState(false);
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	const { connect: connectKeplr } = useWalletManager();
	const { connect: connectCosmostation } = useContext(
		CosmostationWalletContext
	);
	const { runExecute } = useContract();
	const { refresh } = useRefresh();
	const history = useHistory();

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
							history.push(`/liquidity?type=add&poolId=${rowData.id}`)
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
							history.push(`/liquidity?type=add&poolId=${rowData.id}`)
						}
					>
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
						<Flex
							flexDirection="column"
							alignItems="flex-start"
							gap="10px"
							justifyContent="flex-start"
						>
							<Text color="black" justifyContent="flex-start" bold>
								Bond
							</Text>
							<Flex gap="30px">
								<Text flexDirection="column">
									<Text color="black">{`${addSuffix(
										rowData.balance || 0
									)} LP Available`}</Text>
									<Text color="black">30065 USD</Text>
								</Text>
								<Text flexDirection="column">
									<Text color="black">{`${addSuffix(
										rowData.bonded || 0
									)} LP Bonded`}</Text>
									<Text color="black">30065 USD</Text>
								</Text>
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
			<ManageBondModal
				isOpen={isOpenManageBondModal}
				onClose={() => setIsOpenManageBondModal(false)}
				liquidity={rowData}
			/>
		</>
	);
};

export default BondTableDetailRow;
