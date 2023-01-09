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
	LiquidityHeader,
	LiquidityList,
	ListBody,
	ListHeader,
	MessageContainer,
	Wrapper,
} from "./styled";
import TokenListModal from "../../components/TokenListModal";
import { getTokenName, TokenType } from "../../types/tokens";
import { CancelIcon, VerifiedBadge } from "../../components/SvgIcons";
import { addSuffix } from "../../util/string";
import PoolImage from "../../components/PoolImage";
import { TPool } from "../../types/pools";
import Table, { ColumnTypes, TColumns } from "../../components/Table";
import PoolName from "../../components/PoolName";
import AddLiquidity from "./AddLiquidity";
import { ModalType, PoolType } from "./type";
import CreateLiquidity from "./CreateLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";

const Liquidity: React.FC = () => {
	const [showTokenListModal, setShowTokenListModal] = useState(false);

	const [modalType, setModalType] = useState<ModalType>(ModalType.ADD);
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
		{ name: "apr", title: "APR Rewards", sort: true },
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
						All Pools
					</Text>
					<Table<TPool>
						data={liquidities}
						columns={Columns}
						option={{
							emptyString: "No Liquidities",
							tab: {
								tabs: (
									Object.keys(PoolType) as Array<keyof typeof PoolType>
								).map((key) => PoolType[key]),
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
