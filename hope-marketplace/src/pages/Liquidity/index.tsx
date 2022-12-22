import React, { useContext, useState } from "react";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppSelector } from "../../app/hooks";
import ExploreHeader from "../../components/ExploreHeader";
import PageWrapper from "../../components/PageWrapper";
import Text from "../../components/Text";
import {
	ConnectedWalletTypeLocalStorageKey,
	WalletType as ConnectedWalletType,
} from "../../constants/BasicTypes";
import { CosmostationWalletContext } from "../../context/Wallet";
import {
	ConnectWalletButton,
	LiquiditiesContainer,
	LiquidityHeader,
	LiquidityList,
	LiquidityTableControlPanel,
	LiquidityTableSearchInputer,
	LiquidityTableTab,
	LiquidityTableTabContainer,
	ListBody,
	ListHeader,
	MessageContainer,
	MyPoolContentItem,
	MyPoolItem,
	MyPoolItemRow,
	MyPoolsContainer,
	Wrapper,
} from "./styled";
import TokenListModal from "../../components/TokenListModal";
import { TokenType } from "../../types/tokens";
import { CancelIcon, VerifiedBadge } from "../../components/SvgIcons";
import { addSuffix } from "../../util/string";
import PoolImage from "../../components/PoolImage";
import { TempLiquidities, TPool } from "../../types/pools";
import Table, { ColumnTypes, TColumns } from "../../components/Table";
import PoolName from "../../components/PoolName";
import AddLiquidity from "./AddLiquidity";
import { ModalType, PoolType } from "./type";
import CreateLiquidity from "./CreateLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";

const Liquidity: React.FC = () => {
	const [showTokenListModal, setShowTokenListModal] = useState(false);
	const [selectedPoolType, setSelectedPoolType] = useState<PoolType>(
		PoolType.INCENTIVIZED
	);
	const [modalType, setModalType] = useState<ModalType>(ModalType.ADD);
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	// const { connect: connectWithCosmodal } = useCosmodal();
	const { connect: connectKeplr } = useWalletManager();
	const { connect: connectCosmostation } = useContext(
		CosmostationWalletContext
	);

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
			render: (value: any, data: TPool) => <PoolName pool={data} />,
		},
		{
			name: "isVerified",
			title: "Verified",
			render: (value, data) => (value ? <VerifiedBadge /> : <CancelIcon />),
		},
		{ name: "volume", title: "Volume", type: ColumnTypes.NUMBER },
		{ name: "apr", title: "APR Rewards" },
		{ name: "pool", title: "Liquidity Pool" },
		{ name: "ratio", title: "Value" },
	];

	const handleClickConnectWalletButton = () => {
		const connectedWalletType = localStorage.getItem(
			ConnectedWalletTypeLocalStorageKey
		);
		if (connectedWalletType === ConnectedWalletType.COSMOSTATION) {
			connectCosmostation();
		} else {
			connectKeplr();
		}
	};

	const handleSelectToken = (token: TokenType) => {
		console.log("selected token", token);
	};

	return (
		<PageWrapper>
			<ExploreHeader
				title="Liquidity"
				tabs={[
					{ title: "Swap", url: "/swap" },
					{ title: "Liquidity", url: "/liquidity" },
				]}
			/>
			<Wrapper>
				<LiquidityHeader>
					<Text bold fontSize="35px" justifyContent="flex-start">
						Liquidity
					</Text>
					<Text
						bold
						fontSize="20px"
						justifyContent="flex-start"
						margin="10px 0"
					>
						Add your liquidity
					</Text>
				</LiquidityHeader>
				{!account && (
					<LiquidityList>
						<ListHeader>
							<Text
								justifyContent="flex-start"
								color="black"
								bold
								fontSize="20px"
							>
								Your Liquidity
							</Text>
							<Text justifyContent="flex-start" color="black">
								Remove liquidity to receive tokens back
							</Text>
						</ListHeader>
						<ListBody>
							<MessageContainer>
								Connect to a wallet to view your liquidity
							</MessageContainer>
						</ListBody>
						<ConnectWalletButton onClick={handleClickConnectWalletButton}>
							Connect Wallet
						</ConnectWalletButton>
					</LiquidityList>
				)}
				{account && modalType === ModalType.ADD && (
					<AddLiquidity onChangeModalType={setModalType} />
				)}
				{account && modalType === ModalType.CREATE && (
					<CreateLiquidity onChangeModalType={setModalType} />
				)}
				{account && modalType === ModalType.REMOVE && (
					<RemoveLiquidity onChangeModalType={setModalType} />
				)}
				<LiquiditiesContainer>
					<Text
						bold
						fontSize="20px"
						justifyContent="flex-start"
						margin="20px 0"
					>
						My Pools
					</Text>
					<MyPoolsContainer>
						{TempLiquidities.map((liquidity, index: number) => (
							<MyPoolItem key={index}>
								<MyPoolItemRow>
									<PoolImage
										token1={liquidity.token1}
										token2={liquidity.token2}
									/>
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
											{`$${addSuffix(liquidity.pool)}`}
										</Text>
									</MyPoolContentItem>
									<MyPoolContentItem>
										<Text bold color="#c5c5c5">
											Bonded
										</Text>
										<Text bold color="black">
											{`$${addSuffix(0)}`}
										</Text>
									</MyPoolContentItem>
								</MyPoolItemRow>
							</MyPoolItem>
						))}
					</MyPoolsContainer>
				</LiquiditiesContainer>
				<LiquiditiesContainer>
					<Text
						bold
						fontSize="20px"
						justifyContent="flex-start"
						margin="20px 0"
					>
						All Pools
					</Text>
					<LiquidityTableControlPanel>
						<LiquidityTableTabContainer
							isRight={selectedPoolType === PoolType.ALL}
						>
							{(Object.keys(PoolType) as Array<keyof typeof PoolType>).map(
								(key, index) => (
									<LiquidityTableTab
										key={index}
										checked={selectedPoolType === PoolType[key]}
										onClick={() => setSelectedPoolType(PoolType[key])}
									>
										{PoolType[key]}
									</LiquidityTableTab>
								)
							)}
						</LiquidityTableTabContainer>
						<LiquidityTableSearchInputer placeholder="Search" />
					</LiquidityTableControlPanel>
					<Table<TPool> data={TempLiquidities} columns={Columns} />
					{/* <LiquiditiesTable>
						<LiquiditiesTableHeaderRow>
							<LiquidityTableHeader />
							<LiquidityTableHeader>Pool Name</LiquidityTableHeader>
							<LiquidityTableHeader>Verified</LiquidityTableHeader>
							<LiquidityTableHeader>Volume</LiquidityTableHeader>
							<LiquidityTableHeader>APR Rewards</LiquidityTableHeader>
							<LiquidityTableHeader>Liquidity Pool</LiquidityTableHeader>
							<LiquidityTableHeader>Value</LiquidityTableHeader>
							<LiquidityTableHeader>Add</LiquidityTableHeader>
						</LiquiditiesTableHeaderRow>
						<LiquiditiesTableBody>
							{TempLiquidities.map((liquidity, index: number) => (
								<LiquiditiesTableRow key={index}>
									<LiquidityTableContent>
										<PoolImage
											token1={liquidity.token1}
											token2={liquidity.token2}
										/>
									</LiquidityTableContent>
									<LiquidityTableContent>
										<PoolName pool={liquidity} />
									</LiquidityTableContent>
									<LiquidityTableContent>
										{liquidity.isVerified ? <VerifiedBadge /> : <CancelIcon />}
									</LiquidityTableContent>
									<LiquidityTableContent>
										<StyledText>Volume 7D</StyledText>
									</LiquidityTableContent>
									<LiquidityTableContent>
										<StyledText>{liquidity.apr}</StyledText>
									</LiquidityTableContent>
									<LiquidityTableContent>
										<StyledText>{liquidity.pool}</StyledText>
									</LiquidityTableContent>
									<LiquidityTableContent>
										<StyledText>{`1${getTokenName(liquidity.token1)} = ${
											liquidity.ratio
										}${getTokenName(liquidity.token2)}`}</StyledText>
									</LiquidityTableContent>
									<LiquidityTableContent />
								</LiquiditiesTableRow>
							))}
						</LiquiditiesTableBody>
					</LiquiditiesTable> */}
				</LiquiditiesContainer>
				<TokenListModal
					isOpen={showTokenListModal}
					onClose={() => setShowTokenListModal(false)}
					onSelectToken={handleSelectToken}
				/>
			</Wrapper>
		</PageWrapper>
	);
};

export default Liquidity;
