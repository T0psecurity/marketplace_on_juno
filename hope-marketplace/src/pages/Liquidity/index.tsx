import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
	// LiquidityHeader,
	LiquidityList,
	ListBody,
	ListHeader,
	MessageContainer,
	Wrapper,
} from "./styled";
// import TokenListModal from "../../components/TokenListModal";
import {
	getTokenName,
	//  TokenType
} from "../../types/tokens";
import {
	CancelIcon,
	PlusInGreenCircleIcon,
	VerifiedBadge,
} from "../../components/SvgIcons";
import { addSuffix } from "../../util/string";
import PoolImage from "../../components/PoolImage";
import { TPool, TPoolConfig } from "../../types/pools";
import Table, { ColumnTypes, TColumns } from "../../components/Table";
import PoolName from "../../components/PoolName";
import AddLiquidity from "./AddLiquidity";
import { ModalType, PoolType } from "./type";
import CreateLiquidity from "./CreateLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";
import LiquidityTableDetailRow from "./LiquidityTableDetailRow";
import Flex from "../../components/Flex";

const Liquidity: React.FC = () => {
	// const [showTokenListModal, setShowTokenListModal] = useState(false);
	const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(
		null
	);
	const [addingPool, setAddingPool] = useState<TPool | undefined>();

	const [modalType, setModalType] = useState<ModalType>(ModalType.ADD);
	const [selectedTab, setSelectedTab] = useState<string>(PoolType.ALL);
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	const liquidities = useAppSelector((state) => state.liquidities);
	// const { connect: connectWithCosmodal } = useCosmodal();
	const { connect: connectKeplr } = useWalletManager();
	const { connect: connectCosmostation } = useContext(
		CosmostationWalletContext
	);
	const { search } = useLocation();
	const type = new URLSearchParams(search).get("type");

	useEffect(() => {
		if (type === "add") setModalType(ModalType.ADD);
	}, [type]);

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
		{ name: "volume", title: "Volume", type: ColumnTypes.NUMBER, sort: true },
		{
			name: "apr",
			title: "APR Rewards",
			render: (value, data) => {
				const apr = data.apr;
				if (typeof apr === "string") {
					const rewardToken = (data.config as TPoolConfig)?.rewardToken;
					return (
						<Text gap="10px" color="black" alignItems="center">
							{rewardToken && (
								<img
									width={25}
									alt=""
									src={`/coin-images/${rewardToken.replace(/\//g, "")}.png`}
								/>
							)}
							{apr}
						</Text>
					);
				} else {
					return (
						<Flex alignItems="center" gap="20px">
							{apr.map((item, index) => {
								const rewardToken = (data.config as TPoolConfig[])?.[index]
									?.rewardToken;
								return (
									<Text
										key={index}
										gap="10px"
										color="black"
										alignItems="center"
									>
										{rewardToken && (
											<img
												width={25}
												alt=""
												src={`/coin-images/${rewardToken.replace(
													/\//g,
													""
												)}.png`}
											/>
										)}
										{item}
									</Text>
								);
							})}
						</Flex>
					);
				}
			},
		},
		{
			name: "pool",
			title: "Liquidity Pool",
			sort: true,
			format: (value) => addSuffix(value),
		},
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
		{
			name: "",
			title: "",
			render: (value: any, data: TPool) => (
				<PlusInGreenCircleIcon onClick={() => handleClickPlusButton(data)} />
			),
		},
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

	const handleClickPlusButton = (pool: TPool) => {
		setModalType(ModalType.ADD);
		setAddingPool(pool);
		if (wrapperElement) {
			const headerElement = document.getElementById("header");
			const headerHeight = headerElement?.clientHeight || 0;
			// wrapperElement.style.scrollMargin = `${headerHeight}px`;
			wrapperElement.style.cssText = `scroll-margin-top: ${headerHeight}px`;
			wrapperElement.scrollIntoView({ behavior: "smooth" });
			// window.scrollTo(0, 0);
		}
	};

	// const handleSelectToken = (token: TokenType) => {
	// 	console.log("debug selected token", token);
	// };

	return (
		<PageWrapper>
			<ExploreHeader
				title="Liquidity"
				tabs={[
					{ title: "Swap", url: "/swap" },
					{ title: "Liquidity", url: "/liquidity" },
				]}
			/>
			<Wrapper ref={(node) => setWrapperElement(node)}>
				{/* <LiquidityHeader>
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
				</LiquidityHeader> */}
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
					<AddLiquidity
						onChangeModalType={setModalType}
						selectedPool={addingPool}
					/>
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
						All Pools
					</Text>
					<Table<TPool>
						data={liquidities.filter(
							(liquidity) =>
								selectedTab === PoolType.ALL || !!liquidity.stakingAddress
						)}
						columns={Columns}
						defaultExpanded={(rowData) => rowData.id === 1}
						renderDetailRow={(rowData) => (
							<LiquidityTableDetailRow
								rowData={rowData}
								onClickAddLiquidity={handleClickPlusButton}
							/>
						)}
						option={{
							emptyString: "No Liquidities",
							tab: {
								defaultSelected: PoolType.ALL as string,
								tabs: (
									Object.keys(PoolType) as Array<keyof typeof PoolType>
								).map((key) => PoolType[key]),
								onClick: (tab) => setSelectedTab(tab),
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
				{/* <TokenListModal
					isOpen={showTokenListModal}
					onClose={() => setShowTokenListModal(false)}
					onSelectToken={handleSelectToken}
				/> */}
			</Wrapper>
		</PageWrapper>
	);
};

export default Liquidity;
