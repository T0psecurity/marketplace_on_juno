import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Advertise, { Advertise1 } from "../../components/Advertise";
import Text from "../../components/Text";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { getResponsiveSize } from "../../util/basic";
import {
	DiscordIcon,
	MediumIcon,
	TelegramIcon,
	TwitterIcon,
} from "../../components/SvgIcons";
import {
	DiscordLink,
	MediumLink,
	TelegramLink,
	TwitterLink,
} from "../../constants/SocialLinks";
// import Flex from "../../components/Flex";
// import { getCustomTokenId, getTokenIdNumber } from "../../hook/useFetch";
// import Collections, {
// 	MarketplaceInfo,
// 	getCollectionById,
// } from "../../constants/Collections";
// import { useAppSelector } from "../../app/hooks";
// import { TokenStatus, TokenType } from "../../types/tokens";
// import {
// 	CollectionStateType,
// 	TotalStateType,
// } from "../../features/collections/collectionsSlice";
// import { addSuffix } from "../../util/string";
// import useDexStatus from "../../hook/useDexStatus";

import {
	Button,
	ButtonContainer,
	// CoinIcon,
	// DexStatusItem,
	HorizontalDivider,
	Panel,
	PartnersContainer,
	// StatisticContainer,
	// StatisticContent,
	// StatisticItem,
	StyledImg,
	Wrapper,
} from "./styled";

const Home: React.FC = () => {
	// const dexStatus = useDexStatus();
	const history = useHistory();
	const breakpoints = useMatchBreakpoints();
	const isMobile = breakpoints.isXs || breakpoints.isSm || breakpoints.isMd;

	// const tokenPrices = useAppSelector((state) => state.tokenPrices);
	// const totalMarketplaceNFTs: any = useAppSelector((state) => state.nfts);
	// const collectionStates: TotalStateType = useAppSelector(
	// 	(state) => state.collectionStates
	// );
	// const liquidities = useAppSelector((state) => state.liquidities);

	// const totalLiquidity = useMemo(
	// 	() =>
	// 		liquidities.reduce(
	// 			(result: number, liquidity) => result + (liquidity.pool || 0),
	// 			0
	// 		),
	// 	[liquidities]
	// );

	const fontSizes = useMemo(() => {
		const { isXs, isSm } = breakpoints;
		if (isXs || isSm) {
			return {
				size1: "34px",
				size2: "23px",
				size3: "17px",
			};
		}
		let matchedKey = "";
		Object.keys(breakpoints).forEach((key) => {
			if (breakpoints[key]) matchedKey = key;
		});
		matchedKey = matchedKey.replace(/is/g, "").toLowerCase();
		const responsiveSize = getResponsiveSize("xxxxl", {
			size1: 100,
			size2: 45,
			size3: 25,
		});
		return {
			size1: `${Math.floor(responsiveSize[matchedKey]?.size1)}px`,
			size2: `${Math.floor(responsiveSize[matchedKey]?.size2)}px`,
			size3: `${Math.floor(responsiveSize[matchedKey]?.size3)}px`,
		};
	}, [breakpoints]);

	// const {
	// 	tradesVolume,
	// 	totalItemsOnSale,
	// 	// highestTradesCollection,
	// 	highestSaleNft,
	// 	// lastCollection,
	// 	mintLiveCollection,
	// 	// mintSoldOutCollection,
	// } = useMemo(() => {
	// 	const junoUsd =
	// 		tokenPrices[TokenType.JUNO]?.market_data.current_price?.usd || 0;
	// 	let tradesVolumeResult = 0,
	// 		highestTradeCollectionResult: {
	// 			collection: MarketplaceInfo;
	// 			volume: number;
	// 		} = {} as { collection: MarketplaceInfo; volume: number },
	// 		totalItemsOnSaleResult = 0,
	// 		tradesByNftResult: any = {},
	// 		mintSoldOutResult: any[] = [],
	// 		mintLiveResult: any[] = [];
	// 	Collections.forEach((collection: MarketplaceInfo) => {
	// 		const crrMarketplaceItems =
	// 			totalMarketplaceNFTs[`${collection.collectionId}_marketplace`] || [];
	// 		totalItemsOnSaleResult += crrMarketplaceItems.length;

	// 		const crrCollectionState: CollectionStateType =
	// 			collectionStates[collection.collectionId];
	// 		const saleHistory = crrCollectionState?.saleHistory || [];
	// 		let crrCollectionTradesVolume = 0;
	// 		const now = Number(new Date()) / 1000;

	// 		saleHistory.forEach((history) => {
	// 			const crrUsd =
	// 				tokenPrices[history.denom as TokenType]?.market_data.current_price
	// 					?.usd || 0;
	// 			const crrValue = Number.isNaN(Number(history.amount))
	// 				? 0
	// 				: (Number(history.amount) * crrUsd) /
	// 				  (TokenStatus[history.denom as TokenType].decimal || 6);
	// 			// tradesVolumeResult += crrValue;
	// 			if (now - (history.time || now) <= 60 * 60 * 24 * 30) {
	// 				// if the sale is hold in the last 30 days
	// 				crrCollectionTradesVolume += crrValue; // calculate collection trades in the last 30 days
	// 				tradesByNftResult[history.token_id] = {
	// 					trades:
	// 						(tradesByNftResult[history.token_id]?.trades || 0) + crrValue,
	// 					imageUrl: crrCollectionState?.imageUrl,
	// 					collectionId: collection.collectionId,
	// 				}; // calculate the trades of nft in the last 30 days
	// 			}
	// 		});

	// 		(Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach(
	// 			(key) => {
	// 				const crrVolume =
	// 					(crrCollectionState?.tradingInfo as any)?.[
	// 						`${TokenType[key]}Total`
	// 					] || 0;
	// 				const crrUsd =
	// 					tokenPrices[TokenType[key]]?.market_data.current_price?.usd || 0;
	// 				const crrValue = crrUsd ? crrVolume * (junoUsd / crrUsd) : 0;
	// 				tradesVolumeResult += crrValue;
	// 			}
	// 		);
	// 		if (
	// 			crrCollectionTradesVolume >= (highestTradeCollectionResult.volume || 0)
	// 		) {
	// 			highestTradeCollectionResult = {
	// 				collection: collection,
	// 				volume: crrCollectionTradesVolume,
	// 			};
	// 		}

	// 		// determine the mint sold out collection
	// 		const mintInfo = collection.mintInfo;
	// 		if (
	// 			!mintInfo ||
	// 			(crrCollectionState?.totalNfts !== 0 &&
	// 				crrCollectionState?.mintedNfts >= crrCollectionState?.totalNfts)
	// 		) {
	// 			mintSoldOutResult.push(collection);
	// 		} else if (
	// 			crrCollectionState?.mintedNfts < crrCollectionState?.totalNfts &&
	// 			crrCollectionState?.mintedNfts > 0
	// 		) {
	// 			mintLiveResult.push(collection);
	// 		}
	// 	});

	// 	const highestSaleNftResult = Object.keys(tradesByNftResult).reduce(
	// 		(result, tokenId) => {
	// 			const crrTrade = tradesByNftResult[tokenId];
	// 			if (crrTrade.trades > result.trades) {
	// 				return { tokenId, ...crrTrade };
	// 			} else {
	// 				return result;
	// 			}
	// 		},
	// 		{ tokenId: "", trades: 0, collectionId: "", imageUrl: "" }
	// 	);
	// 	let imageUrl = "";
	// 	if (highestSaleNftResult.collectionId === "mintpass1") {
	// 		imageUrl = "/others/mint_pass.png";
	// 	} else if (highestSaleNftResult.collectionId === "mintpass2") {
	// 		imageUrl = "/others/mint_pass2.png";
	// 	} else if (highestSaleNftResult.collectionId === "hopegalaxy1") {
	// 		imageUrl = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
	// 			highestSaleNftResult.tokenId
	// 		)}.png`;
	// 	} else if (highestSaleNftResult.imageUrl) {
	// 		imageUrl = `${highestSaleNftResult.imageUrl}${getTokenIdNumber(
	// 			highestSaleNftResult.tokenId
	// 		)}.png`;
	// 	}
	// 	const targetCollection = getCollectionById(
	// 		highestSaleNftResult.collectionId
	// 	);
	// 	const tokenId = targetCollection.customTokenId
	// 		? getCustomTokenId(
	// 				highestSaleNftResult.tokenId,
	// 				targetCollection.customTokenId
	// 		  )
	// 		: highestSaleNftResult.tokenId;
	// 	const randMintResult =
	// 		mintLiveResult[Math.floor(Math.random() * mintLiveResult.length)];
	// 	const randSoldOutResult =
	// 		mintSoldOutResult[Math.floor(Math.random() * mintSoldOutResult.length)];
	// 	return {
	// 		tradesVolume: tradesVolumeResult,
	// 		highestTradesCollection: highestTradeCollectionResult,
	// 		totalItemsOnSale: totalItemsOnSaleResult,
	// 		// lastCollection: mintSoldOutResult[mintSoldOutResult.length - 1],
	// 		mintSoldOutCollection: randSoldOutResult,
	// 		mintLiveCollection: randMintResult,
	// 		highestSaleNft: {
	// 			imageUrl,
	// 			tokenId,
	// 			trades: highestSaleNftResult.trades,
	// 		},
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<Wrapper>
			<Advertise images={Advertise1} />
			<HorizontalDivider />
			<Panel fill>
				<StyledImg
					src="/characters/character_003.png"
					alt=""
					width="35%"
					left="0px"
					top="0px"
					float={isMobile ? "" : "left"}
					margin="0 20px"
				/>
				<Text fontSize={fontSizes.size2} margin="30px 0 0 0">
					<Text bold fontSize={fontSizes.size1} color="#02e296">
						Hopers.io
					</Text>
					<Text>,</Text>
					<Text>an</Text>
					<Text>avenue</Text>
					<Text>for the evolution of</Text>
					<Text bold color="#02e296" margin="0 0 0 10px">
						DeFi
					</Text>
					<Text margin="0 10px">&</Text>
					<Text bold color="#02e296">
						NFTs
					</Text>
					<Text>on</Text>
					<Text bold>Juno</Text>
				</Text>
				<Text fontSize={fontSizes.size3}>
					<Text>The first fully-permissionless</Text>
					<Text margin="0 5px" bold>
						DEX
					</Text>
					<Text>living in the</Text>
					<Text margin="0 5px" bold>
						Cosmos.
					</Text>
					<Text margin="0 5px 0 0">Friction-less</Text>
					<Text bold>yield.</Text>
				</Text>
				<ButtonContainer>
					<TwitterIcon onClick={() => window.open(TwitterLink)} />
					<DiscordIcon onClick={() => window.open(DiscordLink)} />
					<MediumIcon onClick={() => window.open(MediumLink)} />
					<TelegramIcon onClick={() => window.open(TelegramLink)} />
				</ButtonContainer>
			</Panel>
			{/* <Flex width="100%" justifyContent="space-evenly" gap="10px">
				<DexStatusItem>
					<span>Executed transaction</span>
					<span>{addSuffix(dexStatus.txNumber)}</span>
				</DexStatusItem>
				<DexStatusItem>
					<span>TVL</span>
					<span>{addSuffix(dexStatus.tradingVolume)}</span>
				</DexStatusItem>
				<DexStatusItem>
					<span>Total Liquidity</span>
					<span>{addSuffix(totalLiquidity)}</span>
				</DexStatusItem>
			</Flex> */}
			<Panel fill background="/others/home_background_01.png">
				<StyledImg
					src="/others/home_background_05.png"
					alt=""
					width="35%"
					float="right"
					margin="0 20px"
				/>
				<Text
					fontSize={fontSizes.size2}
					justifyContent="flex-start"
					margin="30px 0 0 0"
				>
					<Text fontSize={fontSizes.size1} bold color="#02e296">
						Swap
					</Text>
					<Text bold margin="0 10px">
						anything.
					</Text>
				</Text>
				<Text fontSize={fontSizes.size2} textAlign="left" bold>
					No registration, no hassle.
				</Text>
				<Text fontSize={fontSizes.size3} textAlign="left">
					Swap any token on Juno Chain in seconds, just by connecting your
					wallet.
				</Text>
				<ButtonContainer>
					<Button colored onClick={() => history.push("/swap")}>
						Swap Now
					</Button>
					<Button onClick={() => history.push("/liquidity")}>Liquidity</Button>
				</ButtonContainer>
			</Panel>
			<Panel fill>
				<StyledImg
					src="/characters/character_004.png"
					alt=""
					width="35%"
					float="left"
					margin="0 20px"
				/>
				<Text
					fontSize={fontSizes.size2}
					justifyContent="flex-start"
					margin="30px 0 0 0"
				>
					<Text fontSize={fontSizes.size1} bold color="#02e296">
						Earn
					</Text>
					<Text bold>passive</Text>
					<Text bold>income</Text>
					<Text bold>with</Text>
					<Text bold>your</Text>
					<Text bold>favorite</Text>
					<Text bold>crypto</Text>
					<Text bold>assets.</Text>
				</Text>
				<Text fontSize={fontSizes.size3} justifyContent="flex-start">
					Explore all the collections launched exclusively on hopers.io
				</Text>
				<ButtonContainer>
					<Button colored onClick={() => history.push(`/bond`)}>
						Bond
					</Button>
					<Button onClick={() => history.push(`/bond`)} disabled>
						Stake
					</Button>
				</ButtonContainer>
			</Panel>
			<Panel fill background="/others/home_background_02.png">
				<StyledImg
					src="/characters/character_005.png"
					alt=""
					width="35%"
					float="right"
					margin="0 20px"
				/>
				<Text fontSize={fontSizes.size2} margin="30px 0 0 0">
					<Text fontSize={fontSizes.size1} bold color="#02e296">
						IDO
					</Text>
					<Text bold margin="0 10px">
						own the future
					</Text>
				</Text>
				<Text fontSize={fontSizes.size3}>
					Raise Capital In a Community-Driven Way to empower projects on Cosmos
					with the ability to distribute tokens and raise liquidity.
				</Text>
				<ButtonContainer>
					<Button colored onClick={() => history.push("/ido")}>
						Explore
					</Button>
					<Button
						disabled
						onClick={() => window.open("https://launchpad.hopers.io/")}
					>
						New Listing
					</Button>
				</ButtonContainer>
			</Panel>
			<HorizontalDivider />
			{/* <StatisticContainer>
				<StatisticItem>
					<StatisticContent>Top Volume 30D</StatisticContent>
					<StatisticContent
						bold
						// content={highestTradesCollection.collection?.title || ""}
					>
						<img
							src={highestTradesCollection.collection?.logoUrl || ""}
							alt=""
							onClick={() =>
								history.push(
									`/collections/marketplace?id=${highestTradesCollection.collection.collectionId}`
								)
							}
						/>
						<Flex flexDirection="column" alignItems="center">
							<CoinIcon alt="" src="/coin-images/ujuno.png" />
							<Text fontSize="18px">
								{addSuffix(highestTradesCollection.volume)}
							</Text>
						</Flex>
					</StatisticContent>
				</StatisticItem>
				<StatisticItem>
					<StatisticContent>New Mint</StatisticContent>
					<StatisticContent
						bold
						// content={mintLiveCollection?.title || ""}
					>
						<img src={mintLiveCollection?.logoUrl || ""} alt="" />
						<Button colored onClick={() => history.push(`/collections/mint`)}>
							Mint Now
						</Button>
					</StatisticContent>
				</StatisticItem>
				<StatisticItem>
					<StatisticContent>Highest Sale 30D</StatisticContent>
					<StatisticContent
						bold
						// content={highestSaleNft.tokenId || ""}
					>
						<img src={highestSaleNft.imageUrl || ""} alt="" />
						{addSuffix(highestSaleNft.trades)}
					</StatisticContent>
				</StatisticItem>
				<StatisticItem>
					<StatisticContent>Trades Volume</StatisticContent>
					<StatisticContent bold>
						<img alt="" src="/coin-images/ujuno.png" />
						{addSuffix(tradesVolume)}
					</StatisticContent>
				</StatisticItem>
				<StatisticItem>
					<StatisticContent>Items on Sale</StatisticContent>
					<StatisticContent bold hasOneChild>
						{addSuffix(totalItemsOnSale)}
					</StatisticContent>
				</StatisticItem>
			</StatisticContainer> */}
			<Panel fill>
				<StyledImg
					src="/characters/character_006.png"
					alt=""
					width="35%"
					float={isMobile ? "" : "left"}
					margin="0 20px"
				/>
				<Text fontSize={fontSizes.size2}>
					<Text fontSize={fontSizes.size1} bold color="#02e296">
						NFT
					</Text>
					<Text bold margin="0 10px">
						Marketplace.
					</Text>
				</Text>
				<Text fontSize={fontSizes.size3}>
					Explore all the collections launched exclusively on hopers.io
				</Text>
				<ButtonContainer>
					<Button colored onClick={() => history.push("/collections/explore")}>
						Explore
					</Button>
					<Button onClick={() => window.open("http://launchpad.hopers.io/")}>
						Launchpad
					</Button>
					<Button colored onClick={() => history.push("/collections/mint")}>
						Mint
					</Button>
				</ButtonContainer>
			</Panel>
			<HorizontalDivider />
			<PartnersContainer>
				{[1, 2, 3, 4, 5].map((number, index) => (
					<img
						key={index}
						alt=""
						src={`/partners/partners_00${number}.png`}
						height={50}
					/>
				))}
			</PartnersContainer>
		</Wrapper>
	);
};

export default Home;
