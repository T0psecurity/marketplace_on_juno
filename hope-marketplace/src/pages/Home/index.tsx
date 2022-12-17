import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import PriceStatistic from "../../components/PriceStatistic";

import Collections, {
	getCollectionById,
	MarketplaceInfo,
} from "../../constants/Collections";
import {
	CollectionStateType,
	TotalStateType,
} from "../../features/collections/collectionsSlice";
import { getCustomTokenId, getTokenIdNumber } from "../../hook/useFetch";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { TokenType } from "../../types/tokens";
import { addSuffix } from "../../util/string";
import Advertise, { Advertise1 } from "../../components/Advertise";
import Text from "../../components/Text";

import {
	Wrapper,
	// SubWrapper,
	// ImgWrapper,
	// MainContent,
	// SubContent,
	// TokensContainer,
	StatisticContainer,
	StatisticItem,
	StatisticContent,
	CoinIcon,
	// StyledButton,
	HorizontalDivider,
	StyledImg,
	ButtonContainer,
	Button,
	FirstPanel,
	SecondPanel,
	PanelContent,
	ThirdPanel,
	Flex,
	NFTStatsItem,
	FourthPanel,
} from "./styled";
import { getResponsiveSize } from "../../util/basic";

const Home: React.FC = () => {
	const history = useHistory();
	const breakpoints = useMatchBreakpoints();
	const isMobile = breakpoints.isXs || breakpoints.isSm || breakpoints.isMd;

	const tokenPrices = useAppSelector((state) => state.tokenPrices);
	const totalMarketplaceNFTs: any = useAppSelector((state) => state.nfts);
	const collectionStates: TotalStateType = useAppSelector(
		(state) => state.collectionStates
	);

	const {
		tradesVolume,
		totalItemsOnSale,
		highestTradesCollection,
		highestSaleNft,
		// lastCollection,
		mintLiveCollection,
		mintSoldOutCollection,
	} = useMemo(() => {
		const junoUsd =
			tokenPrices[TokenType.JUNO]?.market_data.current_price?.usd || 0;
		let tradesVolumeResult = 0,
			highestTradeCollectionResult: {
				collection: MarketplaceInfo;
				volume: number;
			} = {} as { collection: MarketplaceInfo; volume: number },
			totalItemsOnSaleResult = 0,
			tradesByNftResult: any = {},
			mintSoldOutResult: any[] = [],
			mintLiveResult: any[] = [];
		Collections.forEach((collection: MarketplaceInfo) => {
			const crrMarketplaceItems =
				totalMarketplaceNFTs[`${collection.collectionId}_marketplace`] || [];
			totalItemsOnSaleResult += crrMarketplaceItems.length;

			const crrCollectionState: CollectionStateType =
				collectionStates[collection.collectionId];
			const saleHistory = crrCollectionState?.saleHistory || [];
			let crrCollectionTradesVolume = 0;
			const now = Number(new Date()) / 1000;

			saleHistory.forEach((history) => {
				const crrUsd =
					tokenPrices[history.denom as TokenType]?.market_data.current_price
						?.usd || 0;
				const crrValue = Number.isNaN(Number(history.amount))
					? 0
					: (Number(history.amount) * crrUsd) / 1e6;
				// tradesVolumeResult += crrValue;
				if (now - (history.time || now) <= 60 * 60 * 24 * 30) {
					// if the sale is hold in the last 30 days
					crrCollectionTradesVolume += crrValue; // calculate collection trades in the last 30 days
					tradesByNftResult[history.token_id] = {
						trades:
							(tradesByNftResult[history.token_id]?.trades || 0) + crrValue,
						imageUrl: crrCollectionState?.imageUrl,
						collectionId: collection.collectionId,
					}; // calculate the trades of nft in the last 30 days
				}
			});

			(Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach(
				(key) => {
					const crrVolume =
						(crrCollectionState?.tradingInfo as any)?.[
							`${TokenType[key]}Total`
						] || 0;
					const crrUsd =
						tokenPrices[TokenType[key]]?.market_data.current_price?.usd || 0;
					const crrValue = crrUsd ? crrVolume * (junoUsd / crrUsd) : 0;
					tradesVolumeResult += crrValue;
				}
			);
			if (
				crrCollectionTradesVolume >= (highestTradeCollectionResult.volume || 0)
			) {
				highestTradeCollectionResult = {
					collection: collection,
					volume: crrCollectionTradesVolume,
				};
			}

			// determine the mint sold out collection
			const mintInfo = collection.mintInfo;
			if (
				!mintInfo ||
				(crrCollectionState?.totalNfts !== 0 &&
					crrCollectionState?.mintedNfts >= crrCollectionState?.totalNfts)
			) {
				mintSoldOutResult.push(collection);
			} else if (
				crrCollectionState?.mintedNfts < crrCollectionState?.totalNfts &&
				crrCollectionState?.mintedNfts > 0
			) {
				mintLiveResult.push(collection);
			}
		});

		const highestSaleNftResult = Object.keys(tradesByNftResult).reduce(
			(result, tokenId) => {
				const crrTrade = tradesByNftResult[tokenId];
				if (crrTrade.trades > result.trades) {
					return { tokenId, ...crrTrade };
				} else {
					return result;
				}
			},
			{ tokenId: "", trades: 0, collectionId: "", imageUrl: "" }
		);
		let imageUrl = "";
		if (highestSaleNftResult.collectionId === "mintpass1") {
			imageUrl = "/others/mint_pass.png";
		} else if (highestSaleNftResult.collectionId === "mintpass2") {
			imageUrl = "/others/mint_pass2.png";
		} else if (highestSaleNftResult.collectionId === "hopegalaxy1") {
			imageUrl = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
				highestSaleNftResult.tokenId
			)}.png`;
		} else if (highestSaleNftResult.imageUrl) {
			imageUrl = `${highestSaleNftResult.imageUrl}${getTokenIdNumber(
				highestSaleNftResult.tokenId
			)}.png`;
		}
		const targetCollection = getCollectionById(
			highestSaleNftResult.collectionId
		);
		const tokenId = targetCollection.customTokenId
			? getCustomTokenId(
					highestSaleNftResult.tokenId,
					targetCollection.customTokenId
			  )
			: highestSaleNftResult.tokenId;
		const randMintResult =
			mintLiveResult[Math.floor(Math.random() * mintLiveResult.length)];
		const randSoldOutResult =
			mintSoldOutResult[Math.floor(Math.random() * mintSoldOutResult.length)];
		return {
			tradesVolume: tradesVolumeResult,
			highestTradesCollection: highestTradeCollectionResult,
			totalItemsOnSale: totalItemsOnSaleResult,
			// lastCollection: mintSoldOutResult[mintSoldOutResult.length - 1],
			mintSoldOutCollection: randSoldOutResult,
			mintLiveCollection: randMintResult,
			highestSaleNft: {
				imageUrl,
				tokenId,
				trades: highestSaleNftResult.trades,
			},
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// }, [collectionStates, tokenPrices, totalMarketplaceNFTs]);
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

	// const NotifyComingSoon = () => toast.info("Coming Soon!");

	// const HomeImage = () =>
	//   // <ImgWrapper src="/others/home.png" alt="home" isMobile={isMobile} />
	//   null;

	// const Tokens = () => {
	//   const tokens = (
	//     Object.keys(TokenType) as Array<keyof typeof TokenType>
	//   ).map((key) => `$${key}`);
	//   return <TokensContainer>{tokens.join(" - ")}</TokensContainer>;
	// };

	return (
		<>
			<Wrapper isMobile={isMobile}>
				<Advertise images={Advertise1} />
				<HorizontalDivider />
				<FirstPanel background="/others/home_background_01.png">
					<StyledImg
						src="/characters/character_003.gif"
						alt=""
						width="45%"
						left="0px"
						top="0px"
						float="left"
					/>
					<Text fontSize={fontSizes.size2}>
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
						<Button
							style={{ minWidth: isMobile ? "60px" : "" }}
							// onClick={NotifyComingSoon}
							disabled
						>
							Swap
						</Button>
						{/* <Button
              style={{ minWidth: isMobile ? "60px" : "" }}
              colored
              onClick={() => history.push("/ido")}
            >
              IDO
            </Button> */}
						<Button
							style={{ minWidth: isMobile ? "60px" : "" }}
							onClick={() => history.push("/collections/explore")}
						>
							NFT
						</Button>
					</ButtonContainer>
					<Text style={{ marginTop: "10vw" }} fontSize={fontSizes.size2}>
						<Text fontSize={fontSizes.size1} bold color="#02e296">
							IDO
						</Text>
						<Text bold margin="0 10px">
							own the future
						</Text>
					</Text>
					<Text fontSize={fontSizes.size3}>
						Raise Capital In a Community-Driven Way to empower projects on
						Cosmos with the ability to distribute tokens and raise liquidity.
					</Text>
					<ButtonContainer>
						<Button
							colored
							disabled
							// onClick={NotifyComingSoon}
						>
							Explore
						</Button>
						<Button
							disabled
							onClick={() => window.open("https://launchpad.hopers.io/")}
						>
							Launchpad
						</Button>
					</ButtonContainer>
				</FirstPanel>
				<SecondPanel>
					<PanelContent alignItems="flex-start">
						<Text fontSize={fontSizes.size2}>
							<Text fontSize={fontSizes.size1} bold color="#02e296">
								Swap
							</Text>
							<Text bold margin="0 10px">
								anything.
							</Text>
						</Text>
						<Text fontSize={fontSizes.size2} bold>
							No registration, no hassle.
						</Text>
						<Text fontSize={fontSizes.size3}>
							Swap any token on Juno Chain in seconds, just by connecting your
							wallet.
						</Text>
						<ButtonContainer width="100%">
							<Button
								colored
								// onClick={NotifyComingSoon}
								disabled
							>
								Swap Now
							</Button>
							<Button onClick={() => history.push("/ido")}>IDO</Button>
						</ButtonContainer>
					</PanelContent>
					<StyledImg
						src="/others/home_background_03.gif"
						alt=""
						width="45%"
						minWidth="250px"
					/>
				</SecondPanel>
				<ThirdPanel background="/others/home_background_02.png">
					<Flex justifyContent="center" alignItems="center" flexWrap="wrap">
						<StyledImg
							src="/characters/character_004.gif"
							alt=""
							width="45%"
							minWidth="250px"
						/>
						<PanelContent>
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
								<Button
									colored
									onClick={() => history.push("/collections/explore")}
								>
									Explore
								</Button>
								<Button
									onClick={() => window.open("http://launchpad.hopers.io/")}
								>
									Launchpad
								</Button>
							</ButtonContainer>
						</PanelContent>
					</Flex>
					<PanelContent alignItems="flex-start" width="100%">
						<Text bold fontSize="30px">
							NFT STATS
						</Text>
						<Flex gap="" width="100%">
							<NFTStatsItem>
								<Text>Top Volume 30D</Text>
								<Text>{highestTradesCollection.collection?.title || ""}</Text>
								<img
									src={highestTradesCollection.collection?.logoUrl || ""}
									alt=""
								/>
								<Flex alignItems="center">
									<CoinIcon alt="" src="/coin-images/ujuno.png" />
									<Text>{addSuffix(highestTradesCollection.volume)}</Text>
								</Flex>
							</NFTStatsItem>
							<NFTStatsItem>
								<Text>Highest Sale 30D</Text>
								<Text>{highestSaleNft.tokenId || ""}</Text>
								<img src={highestSaleNft.imageUrl || ""} alt="" />
								<Text>{`$${addSuffix(highestSaleNft.trades)}`}</Text>
							</NFTStatsItem>
							<NFTStatsItem>
								<Text>Mint Live Now</Text>
								<Text>{mintLiveCollection?.title || ""}</Text>
								<img src={mintLiveCollection?.logoUrl || ""} alt="" />
								<Button
									colored
									onClick={() => history.push(`/collections/mint`)}
								>
									Mint Now
								</Button>
							</NFTStatsItem>
							<NFTStatsItem>
								<Text>Mint Sold Out</Text>
								<Text>{mintSoldOutCollection?.title || ""}</Text>
								<img src={mintSoldOutCollection?.logoUrl || ""} alt="" />
								<Button
									colored
									onClick={() =>
										history.push(
											`/collections/marketplace?id=${mintSoldOutCollection.collectionId}`
										)
									}
								>
									View Collection
								</Button>
							</NFTStatsItem>
						</Flex>
						<StatisticContainer>
							<StatisticItem>
								<StatisticContent>Trades Volume</StatisticContent>
								<StatisticContent bold>
									<CoinIcon alt="" src="/coin-images/ujuno.png" />
									{addSuffix(tradesVolume)}
								</StatisticContent>
							</StatisticItem>
							<StatisticItem>
								<StatisticContent>Items on Sale</StatisticContent>
								<StatisticContent bold>
									{addSuffix(totalItemsOnSale)}
								</StatisticContent>
							</StatisticItem>
							{/* <StatisticItem>
                <StatisticContent>Transaction</StatisticContent>
                <StatisticContent bold>2,95K</StatisticContent>
              </StatisticItem> */}
						</StatisticContainer>
					</PanelContent>
				</ThirdPanel>
				<FourthPanel>
					<StyledImg
						src="/characters/character_002.gif"
						alt=""
						width="25%"
						left="0px"
						top="0px"
						float="right"
						margin="0 20px 0 0"
					/>
					<Text fontSize={fontSizes.size2}>
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
					<Text fontSize={fontSizes.size3}>
						Explore all the collections launched exclusively on hopers.io
					</Text>
					<ButtonContainer>
						<Button
							colored
							// onClick={NotifyComingSoon}
							disabled
						>
							Liquidity
						</Button>
						<Button
							// onClick={NotifyComingSoon}
							disabled
						>
							Stake
						</Button>
					</ButtonContainer>
				</FourthPanel>
				<HorizontalDivider />

				{/* {isMobile && (
          <>
            <HomeImage />
            <Tokens />
          </>
        )}
        <SubWrapper>
          <MainContent isMobile={isMobile}>
            Hopers.io NFT marketplace $JUNO
          </MainContent>
          <SubContent isMobile={isMobile}>
            The DAO governs the marketplace and earns rewards through the
            staking system of the token $HOPE.
          </SubContent>
          <StyledButton onClick={() => history.push("/collections/explore")}>
            Explore
          </StyledButton>
        </SubWrapper>
        {!isMobile && <HomeImage />}
        {!isMobile && <Tokens />} */}
			</Wrapper>
			<PriceStatistic />
		</>
	);
};

export default Home;
