import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import NFTAdvertise from "../../components/NFTAdvertise";
// import CollapseCard from "../../components/CollapseCard";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
import { getCollectionById, CollectionIds } from "../../constants/Collections";
import { getCustomTokenId } from "../../hook/useFetch";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import ActivityList from "../../components/ActivityList";
// import ExploreHeader from "../../components/ExploreHeader";
import FilterPanel from "./FilterPanel";
import useFilter from "./hook/useFilter";
import Statistic from "./Statistic";
import {
	Wrapper,
	HorizontalDivider,
	// SortButtonContainer,
	MainContentContainer,
	NftList,
	BidsWrapper,
	CoinIconWrapper,
	CoinIcon,
	AcceptWithdrawButton,
	// NftListTitle,
} from "./styled";
import { FilterOptions, MarketplaceTabs } from "./types";
import moment from "moment";
import { TokenStatus, TokenType } from "../../types/tokens";
import Text from "../../components/Text";
import AcceptCollectionBidTooltip from "../../components/AcceptCollectionBidTooltip";
import useHandleNftItem from "../../hook/useHandleNftItem";
import useRefresh from "../../hook/useRefresh";
import getQuery, { BACKEND_URL } from "../../util/useAxios";

const Marketplace: React.FC = () => {
	const [collectionOffers, setCollectionOffers] = useState([]);
	const [selectedTab, setSelectedTab] = useState(MarketplaceTabs.ITEMS);

	const [expandedFilter, setExpandedFilter] = useState<boolean>(
		// isXs || isSm || isMd
		false
	);
	const [filterOption, setFilterOption] = useState<FilterOptions>();
	const { isXs, isSm, isMd } = useMatchBreakpoints();
	const { nftRefresh } = useRefresh();
	const { withdrawBid } = useHandleNftItem();
	const { search } = useLocation();
	const collectionId = new URLSearchParams(search).get("id") || "";

	const targetCollection = useMemo(
		() => getCollectionById(collectionId || ""),
		[collectionId]
	);

	// useEffect(() => {
	//   setExpandedFilter(isXs || isSm || isMd);
	// }, [isXs, isSm, isMd]);

	useEffect(() => {
		(async () => {
			const collectionId = targetCollection.collectionId;
			const data = await getQuery({
				url: `${BACKEND_URL}/collection-bids?collectionIds=${collectionId}`,
			});
			setCollectionOffers(data[collectionId]);
		})();
	}, [targetCollection, nftRefresh]);

	const marketplaceNFTs = useAppSelector((state) => {
		// console.log("debug nfts", state.nfts);
		return (
			(state.nfts as any)[`${targetCollection.collectionId}_marketplace`] || []
		);
	});
	const tokenPrices = useAppSelector((state) => state.tokenPrices);
	const account = useAppSelector((state) => state.accounts.keplrAccount);

	const metaDataOptions = useMemo(() => {
		let result: { [key: string]: string[] } = {};
		marketplaceNFTs?.forEach((nft: any) => {
			if (
				nft.metaData &&
				nft.metaData.attributes &&
				nft.metaData.attributes.length
			) {
				nft.metaData.attributes.forEach(
					(attribute: { trait_type: string; value: string }) => {
						result[attribute.trait_type] = [
							...new Set(
								(result[attribute.trait_type] || []).concat(attribute.value)
							),
						];
					}
				);
			}
		});
		return result;
	}, [marketplaceNFTs]);

	const filteredNfts = useFilter(
		marketplaceNFTs,
		filterOption,
		collectionId as CollectionIds
	);

	const filterActivitiesFunc = useCallback(
		(activities: any[]) => {
			const sortedSaleHistory = activities
				? activities
						.slice()
						.sort((history1: any, history2: any) =>
							history1?.time < history2.time ? 1 : -1
						)
				: [];
			if (filterOption?.searchWord) {
				const result: any[] = [];
				sortedSaleHistory.forEach((item: any) => {
					const tokenId = targetCollection.customTokenId
						? getCustomTokenId(item.token_id, targetCollection.customTokenId)
						: item.token_id;
					if (tokenId.includes(filterOption.searchWord)) result.push(item);
				});
				return result;
			} else {
				return sortedSaleHistory;
			}
		},
		[filterOption, targetCollection.customTokenId]
	);

	const handleChangeNftListTab = (selected: MarketplaceTabs) => {
		setSelectedTab(selected);
	};

	const handleAcceptWithdrawBid = async (offer: any) => {
		if (!account?.address) return;
		if (account.address === offer.bidder) {
			withdrawBid(offer);
		}
	};

	return (
		<Wrapper>
			{/* <ExploreHeader /> */}
			<NFTAdvertise collection={targetCollection} />
			<Statistic items={marketplaceNFTs} collectionId={collectionId || ""} />
			<HorizontalDivider />
			<MainContentContainer
				isMobile={isXs || isSm || isMd}
				expanded={expandedFilter}
			>
				<FilterPanel
					onChangeExpanded={setExpandedFilter}
					expanded={expandedFilter}
					onChangeFilterOption={setFilterOption}
					metaDataOptions={metaDataOptions}
					onChangeNftListTab={handleChangeNftListTab}
				>
					<NftList>
						{/* <NftListTitle>Items</NftListTitle> */}
						{selectedTab === MarketplaceTabs.ITEMS && (
							<NFTContainer
								nfts={filteredNfts}
								status={NFTItemStatus.BUY}
								// sort={isAscending ? "as" : "des"}
								emptyMsg="No NFTs on Sale"
								sort={"as"}
							/>
						)}
						{selectedTab === MarketplaceTabs.ACTIVITY && (
							<ActivityList
								filterFunc={filterActivitiesFunc}
								collectionId={targetCollection.collectionId}
							/>
						)}
						{selectedTab === MarketplaceTabs.BIDS && (
							<BidsWrapper>
								<table>
									<thead>
										<tr>
											<th>Price</th>
											<th>USD Price</th>
											<th>Expiration</th>
											<th>From</th>
											{!!account?.address && <th />}
										</tr>
									</thead>
									<tbody>
										{collectionOffers.map((offer: any, index: number) => {
											const listPrice = offer.list_price || {};
											const tokenName = (
												Object.keys(TokenType) as Array<keyof typeof TokenType>
											).filter((key) => TokenType[key] === listPrice?.denom)[0];
											const tokenPrice =
												tokenPrices[listPrice?.denom as TokenType]?.market_data
													.current_price?.usd || 0;
											const priceInUsd = (
												(+listPrice.amount * tokenPrice) /
												Math.pow(
													10,
													TokenStatus[listPrice?.denom as TokenType].decimal ||
														6
												)
											).toLocaleString("en-US", {
												maximumFractionDigits: 2,
											});
											const expirationDate = moment(
												new Date(+(offer?.expires_at || "0") / 1e6)
											).format("YYYY-MM-DD hh:mm:ss");
											return (
												<tr key={index}>
													<td>
														<CoinIconWrapper>
															<CoinIcon
																alt=""
																src={`/coin-images/${listPrice?.denom.replace(
																	/\//g,
																	""
																)}.png`}
															/>
															<Text>
																{Number(listPrice.amount) /
																	Math.pow(
																		10,
																		TokenStatus[listPrice?.denom as TokenType]
																			.decimal || 6
																	)}
															</Text>
															<Text>{tokenName}</Text>
														</CoinIconWrapper>
													</td>
													<td>{priceInUsd}</td>
													<td>{expirationDate}</td>
													<td title={offer.bidder}>
														{offer.bidder === account?.address
															? "YOU"
															: offer.bidder}
													</td>
													{!!account?.address && (
														<td>
															<AcceptWithdrawButton
																onClick={() => handleAcceptWithdrawBid(offer)}
																{...(account.address !== offer.bidder && {
																	"data-for": `acceptCollectionBid-${offer.bidder}`,
																	"data-tip": true,
																	"data-event": "click focus",
																})}
															>
																{account.address === offer.bidder
																	? "Withdraw"
																	: "Accept"}
															</AcceptWithdrawButton>
															{account.address !== offer.bidder && (
																<AcceptCollectionBidTooltip
																	id={`acceptCollectionBid-${offer.bidder}`}
																	collection={targetCollection}
																	bidder={offer.bidder}
																/>
															)}
														</td>
													)}
												</tr>
											);
										})}
									</tbody>
								</table>
							</BidsWrapper>
						)}
					</NftList>
				</FilterPanel>
			</MainContentContainer>
		</Wrapper>
	);
};

export default Marketplace;
