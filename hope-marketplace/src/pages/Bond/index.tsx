import React, { useContext } from "react";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppSelector } from "../../app/hooks";
import ExploreHeader from "../../components/ExploreHeader";
import Flex from "../../components/Flex";
import PageWrapper from "../../components/PageWrapper";
import PoolImage from "../../components/PoolImage";
import PoolName from "../../components/PoolName";
import {
	CancelIcon,
	ExternalLinkIcon,
	VerifiedBadge,
} from "../../components/SvgIcons";
import Table, { ColumnTypes, TColumns } from "../../components/Table";
import Text from "../../components/Text";
import { TPool } from "../../types/pools";
import { getTokenName } from "../../types/tokens";
import {
	BondAmountInputer,
	DetailRowBlock,
	StyledButton as Button,
	Wrapper,
} from "./styled";
import { CosmostationWalletContext } from "../../context/Wallet";
import {
	ConnectedWalletTypeLocalStorageKey,
	WalletType,
} from "../../constants/BasicTypes";
import { addSuffix } from "../../util/string";
import { PoolType } from "../Liquidity/type";

const AutoBondAmounts = [0.25, 0.5, 0.75, 1];

const Bond: React.FC = () => {
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	const liquidities = useAppSelector((state) => state.liquidities);
	const Columns: TColumns<TPool>[] = [
		{
			name: "",
			title: "",
			render: (value: any, data: TPool) => (
				<PoolImage token1={data.token1} token2={data.token2} />
			),
		},
		{
			name: "",
			title: "Pool Name",
			sort: (data1, data2, direction) => {
				const name1 = `${getTokenName(data1.token1)}-${getTokenName(
					data1.token2
				)}`;
				const name2 = `${getTokenName(data2.token1)}-${getTokenName(
					data2.token2
				)}`;

				return direction === "up"
					? name1 > name2
						? 1
						: -1
					: name2 > name1
					? 1
					: -1;
			},
			render: (value: any, data: TPool) => <PoolName pool={data} />,
		},
		{
			name: "isVerified",
			title: "Verified",
			render: (value, data) => (value ? <VerifiedBadge /> : <CancelIcon />),
		},
		{ name: "earned", title: "Earned", type: ColumnTypes.NUMBER, sort: true },
		{ name: "apr", title: "APR Rewards", sort: true },
		{ name: "pool", title: "Liquidity Pool", sort: true },
		{
			name: "ratio",
			title: "Value",
			sort: true,
			render: (value, data) => (
				<Text bold color="black">{`1${getTokenName(data.token1)} = ${addSuffix(
					value || 0
				)}${getTokenName(data.token2)}`}</Text>
			),
		},
	];
	const { connect: connectKeplr } = useWalletManager();
	const { connect: connectCosmostation } = useContext(
		CosmostationWalletContext
	);

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

	return (
		<PageWrapper>
			<ExploreHeader
				title="Bond"
				tabs={[
					{ title: "Bond", url: "/bond" },
					{ title: "Stake", url: "/stake" },
					{ title: "Airdrop", url: "/airdrop" },
				]}
			/>
			<Wrapper>
				<Text
					width="100%"
					flexDirection="column"
					margin="30px 0 0 0"
					gap="10px"
				>
					<Text bold fontSize="35px">
						Bond
					</Text>
					<Text bold fontSize="20px">
						Bond LP Token to earn
					</Text>
				</Text>
				<Table<TPool>
					data={liquidities}
					columns={Columns}
					renderDetailRow={(rowData) => (
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
									gap="30px"
									alignItems="center"
									cursor="pointer"
								>
									{`Get ${getTokenName(rowData.token1)}-${getTokenName(
										rowData.token2
									)} LP`}{" "}
									<ExternalLinkIcon />
								</Text>
								<Text
									color="black"
									gap="30px"
									alignItems="center"
									cursor="pointer"
								>
									View Contract <ExternalLinkIcon />
								</Text>
								<Text
									color="black"
									gap="30px"
									alignItems="center"
									cursor="pointer"
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
														0.1002
													</Text>
													<Text color="black">365 USD</Text>
												</>
											) : (
												"0.0000"
											)}
										</Text>
										<Text color="black">HOPERS</Text>
										<Button>Claim</Button>
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
												<Text color="black">24.43 LP</Text>
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
													<Text key={index} color="black" cursor="pointer">{`${
														amount * 100
													}%`}</Text>
												))}
											</Flex>
											<BondAmountInputer />
											<Button>Bond</Button>
											<Text color="black">Balance 24.43LP HOPERS/JUNO</Text>
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
					)}
					option={{
						emptyString: "No Liquidities",
						tab: {
							tabs: (Object.keys(PoolType) as Array<keyof typeof PoolType>).map(
								(key) => PoolType[key]
							),
						},
						search: {
							onChange: (searchValue, liquidities) =>
								liquidities.filter(
									(liquidity) =>
										!searchValue ||
										liquidity.token1
											.toLowerCase()
											.includes(searchValue.toLowerCase()) ||
										liquidity.token2
											.toLowerCase()
											.includes(searchValue.toLowerCase())
								),
						},
					}}
				/>
			</Wrapper>
		</PageWrapper>
	);
};

export default Bond;
