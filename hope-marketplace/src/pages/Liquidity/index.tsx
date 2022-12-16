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
	LiquiditiesTable,
	LiquiditiesTableBody,
	LiquiditiesTableHeaderRow,
	LiquiditiesTableRow,
	LiquidityHeader,
	LiquidityList,
	LiquidityPoolName,
	LiquidityTableContent,
	LiquidityTableControlPanel,
	LiquidityTableHeader,
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
	StyledGearIcon as GearIcon,
	StyledText,
	Wrapper,
} from "./styled";
import TokenListModal from "../../components/TokenListModal";
import { getTokenName, TokenType } from "../../types/tokens";
import { CancelIcon, VerifiedBadge } from "../../components/SvgIcons";
import { addSuffix } from "../../util/string";
import PoolImage from "../../components/PoolImage";
import { TPool } from "../../types/pools";

const TempLiquidities: TPool[] = [
	{
		id: 1,
		token1: TokenType.HOPE,
		token2: TokenType.JUNO,
		isVerified: true,
		apr: "180%",
		pool: 18000000,
		ratio: 0.11,
	},
	{
		id: 2,
		token1: TokenType.ATOM,
		token2: TokenType.JUNO,
		isVerified: true,
		apr: "180%",
		pool: 18000000,
		ratio: 0.11,
	},
];

enum PoolType {
	"INCENTIVIZED" = "Incentivized",
	"ALL" = "All Pools",
}

const Liquidity: React.FC = () => {
	const [showTokenListModal, setShowTokenListModal] = useState(false);
	const [selectedPoolType, setSelectedPoolType] = useState<PoolType>(
		PoolType.INCENTIVIZED
	);
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	// const { connect: connectWithCosmodal } = useCosmodal();
	const { connect: connectKeplr } = useWalletManager();
	const { connect: connectCosmostation } = useContext(
		CosmostationWalletContext
	);

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
						<GearIcon />
					</ListHeader>
					<ListBody>
						{!account && (
							<MessageContainer>
								Connect to a wallet to view your liquidity
							</MessageContainer>
						)}
					</ListBody>
					{!account && (
						<ConnectWalletButton onClick={handleClickConnectWalletButton}>
							Connect Wallet
						</ConnectWalletButton>
					)}
				</LiquidityList>
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
									<LiquidityPoolName poolId={liquidity.id}>{`${getTokenName(
										liquidity.token1
									)}-${getTokenName(liquidity.token2)}`}</LiquidityPoolName>
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
					<LiquiditiesTable>
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
										<LiquidityPoolName poolId={liquidity.id}>{`${getTokenName(
											liquidity.token1
										)}-${getTokenName(liquidity.token2)}`}</LiquidityPoolName>
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
					</LiquiditiesTable>
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
