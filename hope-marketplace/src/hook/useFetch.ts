import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import Collections, {
	MarketplaceContracts,
	MarketplaceInfo,
} from "../constants/Collections";
import {
	CollectionStateType,
	// DEFAULT_COLLECTION_STATE,
	setCollectionState,
} from "../features/collections/collectionsSlice";
import { setNFTs } from "../features/nfts/nftsSlice";
import getQuery from "../util/useAxios";
import useContract from "./useContract";
import { MintContracts } from "../constants/Collections";
import { setCollectionTraitStates } from "../features/collectionTraits/collectionTraitsSlice";
import { TokenType } from "../types/tokens";
import { setRarityRankState } from "../features/rarityRanks/rarityRanksSlice";
import {
	BalancesType,
	clearBalances,
	setTokenBalances,
} from "../features/balances/balancesSlice";
import { Liquidities } from "../constants/Liquidities";
import { TPool } from "../types/pools";
import { setLiquidityInfo } from "../features/liquidities/liquiditiesSlice";

type AttributeType = {
	trait_type: string;
	value: string;
};

type MetaDataItemType = {
	attributes: AttributeType[];
	[key: string]: any;
};

const MAX_ITEMS = 10;

const getMin = (number: number, max?: number): number => {
	const maxNumber = max || 1e5;
	return maxNumber === number ? 0 : number;
};

export const getCustomTokenId = (origin: string, target: string): string =>
	`${target}.${origin.split(".").pop()}`;

const buildNFTItem = (
	item: any,
	contractAddress: string,
	collection: MarketplaceInfo,
	metaData: any
) => {
	const customTokenId = collection.customTokenId;

	const tokenNumberStr = Number(getTokenIdNumber(item.token_id));
	const tokenNumber: number = isNaN(tokenNumberStr) ? 0 : tokenNumberStr;
	const crrItem = {
		...item,
		...(customTokenId && {
			token_id_display: getCustomTokenId(item.token_id, customTokenId),
		}),
		contractAddress,
		collectionId: collection.collectionId,
		...(metaData &&
			metaData[tokenNumber - 1] && {
				metaData: metaData[tokenNumber - 1],
			}),
	};
	return crrItem;
};

const getTraitsStatus = (
	metaData: MetaDataItemType[]
): { total: number; [key: string]: number } => {
	let result: { total: number; [key: string]: number } = { total: 0 };
	metaData.forEach((metaDataItem: MetaDataItemType) => {
		result.total += 1;
		const attributes: AttributeType[] = metaDataItem.attributes;
		attributes.forEach((attribute: AttributeType) => {
			result[attribute.value] = (result[attribute.value] || 0) + 1;
		});
	});
	return result;
};

export const getTokenIdNumber = (id: string): string => {
	if (!id) return "";
	return id.split(".").pop() || "";
};

const useFetch = () => {
	const { runQuery, getBalances } = useContract();
	const dispatch = useAppDispatch();

	useEffect(() => {
		Collections.forEach(async (collection: MarketplaceInfo) => {
			let rarities = null;
			try {
				const rarityData =
					await require(`../rank_produce/${collection.collectionId}.json`);
				const weights = rarityData.weights || [];
				if (weights.length) {
					rarities = {};
					weights.forEach((item: any) => {
						rarities[item.token_id] = {
							weight: item.weight,
							rank: item.rank,
						};
					});
					dispatch(setRarityRankState([collection.collectionId, rarities]));
				}
			} catch (e) {
				console.error("file read error", collection.collectionId, e);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchCollectionInfo = useCallback(
		(account) => {
			Collections.forEach(async (collection: MarketplaceInfo) => {
				let storeObject: CollectionStateType = {
					mintCheck: [],
					mintedNfts: 0,
					totalNfts: collection?.mintInfo?.totalNfts || 0,
					maxNfts: 0,
					imageUrl: "",
					price: 0,
					myMintedNfts: null,
				};
				if (collection.mintContract) {
					if (collection.mintInfo?.mintLogic?.fetchInfo) {
						storeObject = await collection.mintInfo.mintLogic.fetchInfo({
							collection,
							runQuery,
							account: account?.address,
						});
					} else {
						const queryResult = await runQuery(collection.mintContract, {
							get_state_info: {},
						});
						if (queryResult)
							storeObject = {
								mintCheck: queryResult.check_mint,
								mintedNfts: +(queryResult.count || "0"),
								totalNfts: +(queryResult.total_nft || "0"),
								maxNfts: +(queryResult.max_nft || queryResult.total_nft || "0"),
								imageUrl: queryResult.image_url,
								price: +(queryResult.price || "0") / 1e6,
								myMintedNfts: null,
							};
						if (account && account.address) {
							const userInfo = await runQuery(collection.mintContract, {
								get_user_info: { address: account.address },
							});
							storeObject.myMintedNfts =
								(storeObject.myMintedNfts || 0) + (userInfo || "0");
						}
					}
				} else if (collection.isLaunched) {
					try {
						const queryResult = await runQuery(MintContracts[0], {
							get_collection_info: {
								nft_address: collection.nftContract,
							},
						});
						storeObject = {
							mintCheck: queryResult.check_mint,
							mintedNfts: +(queryResult.mint_count || "0"),
							totalNfts: +(queryResult.total_nft || "0"),
							maxNfts: +(queryResult.max_nft || queryResult.total_nft || "0"),
							imageUrl: queryResult.image_url,
							price: +(queryResult.price || "0") / 1e6,
							myMintedNfts: null,
						};
					} catch (e) {
						console.error(collection.collectionId, e);
					}
				}

				if (collection.isLaunched) {
					// const symbols = (
					//   Object.keys(TokenType) as Array<keyof typeof TokenType>
					// ).map((key) => TokenType[key]);
					const tradingInfoResult = await runQuery(MarketplaceContracts[0], {
						// get_tvl_all: {
						//   address: collection.nftContract,
						//   symbols: symbols,
						// },

						get_tvlby_collection: {
							collection: collection.nftContract,
							limit: MAX_ITEMS,
						},
					});
					let totalVolume: any = {};
					(Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach(
						(key) => (totalVolume[`${TokenType[key]}Total`] = 0)
					);
					tradingInfoResult?.tvl?.forEach((item: any) => {
						totalVolume[`${item.denom}Total`] =
							(totalVolume[`${item.denom}Total`] || 0) + item.amount / 1e6;
					});

					storeObject.tradingInfo = totalVolume;
				}
				if (
					collection.marketplaceContract &&
					collection.marketplaceContract.length
				) {
					try {
						const tradingInfoResult = await runQuery(
							collection.marketplaceContract[0],
							{
								get_trading_info: {},
							}
						);
						let crrTradingInfo: any = storeObject.tradingInfo;
						(Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach(
							(key) => {
								const totalKey = `${TokenType[key]}Total`;
								const minKey = `${TokenType[key]}Min`;
								const maxKey = `${TokenType[key]}Max`;

								crrTradingInfo[totalKey] =
									(crrTradingInfo[totalKey] || 0) +
									+(tradingInfoResult[`total_${key.toLowerCase()}`] || "0") /
										1e6;

								crrTradingInfo[minKey] = getMin(
									+(tradingInfoResult[`min_${key.toLowerCase()}`] || "0") / 1e6
								);
								crrTradingInfo[maxKey] =
									+(tradingInfoResult[`max_${key.toLowerCase()}`] || "0") / 1e6;
							}
						);

						storeObject.tradingInfo = crrTradingInfo;
					} catch (e) {}
				}
				// const collectionInfo = await runQuery(MarketplaceContracts[0], {
				//   get_collection_info: {
				//     address: collection.nftContract,
				//   },
				// });
				// let actionHistoryQueries = [];
				// for (
				//   let i = 0;
				//   i < Math.ceil((collectionInfo?.sale_id || 0) / MAX_ITEMS);
				//   i++
				// ) {
				//   let saleIds = [];
				//   for (let j = 0; j < MAX_ITEMS; j++)
				//     saleIds.push("" + (MAX_ITEMS * i + j + 1));
				//   actionHistoryQueries.push(
				//     runQuery(MarketplaceContracts[0], {
				//       get_sale_history: {
				//         address: collection.nftContract,
				//         id: saleIds,
				//       },
				//     })
				//   );
				// }
				// if (actionHistoryQueries.length) {
				//   await Promise.all(actionHistoryQueries).then((queryResults: any) => {
				//     let saleHistory: any[] = [];
				//     queryResults.forEach(
				//       (result: any[]) =>
				//         (saleHistory = saleHistory.concat(
				//           result.map((resultItem: any) => ({
				//             ...resultItem,
				//             collectionId: collection.collectionId,
				//           }))
				//         ))
				//     );
				//     storeObject.saleHistory = saleHistory;
				//     dispatch(
				//       setCollectionState([collection.collectionId, storeObject])
				//     );
				//   });
				// } else {
				//   dispatch(setCollectionState([collection.collectionId, storeObject]));
				// }

				// !should be tested
				let saleHistory: any[] = [];
				const fetchSaleHistory = async (startId?: any) => {
					const queryResult = await runQuery(MarketplaceContracts[0], {
						sale_history_by_collection: {
							collection: collection.nftContract,
							start_after: startId,
							limit: MAX_ITEMS,
						},
					});
					const saleHistoryResult = queryResult?.sale_history;
					saleHistory = saleHistory.concat(
						saleHistoryResult.map((item: any) => ({
							...item,
							collectionId: collection.collectionId,
						}))
					);
					if (saleHistoryResult?.length) {
						if (saleHistoryResult.length === MAX_ITEMS) {
							await fetchSaleHistory({
								token_id: saleHistoryResult[MAX_ITEMS - 1].token_id,
								time: saleHistoryResult[MAX_ITEMS - 1].time,
							});
						}
					}
				};
				await fetchSaleHistory();
				storeObject.saleHistory = saleHistory;
				dispatch(setCollectionState([collection.collectionId, storeObject]));
			});
		},
		[dispatch, runQuery]
	);

	const fetchMarketplaceNFTs = useCallback(
		(account) => {
			Collections.forEach(async (collection: MarketplaceInfo) => {
				let queries: any = [];
				let contractAddresses: string[] = [];

				// const collectionInfo = await runQuery(MarketplaceContracts[0], {
				//   get_collection_info: {
				//     address: collection.nftContract,
				//   },
				// });

				// for (
				//   let i = 0;
				//   i < Math.ceil((collectionInfo?.offering_id || 0) / MAX_ITEMS);
				//   i++
				// ) {
				//   let tokenIds = [];
				//   for (
				//     let j = 0;
				//     j < Math.min(collectionInfo?.offering_id || 0, MAX_ITEMS);
				//     j++
				//   ) {
				//     tokenIds.push("" + (MAX_ITEMS * i + j + 1));
				//   }
				//   queries.push(
				//     runQuery(MarketplaceContracts[0], {
				//       get_offering_page: {
				//         id: tokenIds,
				//         address: collection.nftContract,
				//       },
				//     })
				//   );
				//   contractAddresses.push(MarketplaceContracts[0]);
				// }
				if (
					collection.isLaunched &&
					collection.marketplaceContract &&
					collection.marketplaceContract.length
				) {
					collection.marketplaceContract.forEach(
						(contract: string, index: number) => {
							if (contract) {
								queries.push(
									runQuery(contract, {
										get_offerings: {},
									})
								);
								contractAddresses.push(contract);
							}
						}
					);
				}
				let metaData = collection.metaDataUrl
					? await getQuery({ url: collection.metaDataUrl })
					: null;
				if (metaData) {
					metaData = metaData?.sort((item1: any, item2: any) => {
						if (item1.edition) {
							return item1.edition > item2.edition ? 1 : -1;
						} else {
							return Number(item1.image.split(".")[0]) >
								Number(item2.image.split(".")[0])
								? 1
								: -1;
						}
					});
				}
				if (metaData) {
					dispatch(
						setCollectionTraitStates([
							collection.collectionId,
							getTraitsStatus(metaData),
						])
					);
				}
				let listedNFTs: any = [],
					marketplaceNFTs: any = [];

				const fetchMarketplaceNfts = async (startAfter?: any) => {
					const fetchedResult = await runQuery(MarketplaceContracts[0], {
						asks: {
							collection: collection.nftContract,
							start_after: startAfter,
							limit: MAX_ITEMS,
						},
					});
					const fetchedNfts = fetchedResult.asks || [];
					fetchedNfts.forEach((item: any) => {
						const crrItem = buildNFTItem(
							item,
							MarketplaceContracts[0],
							collection,
							metaData
						);
						if (item.seller === account?.address) {
							listedNFTs = [...listedNFTs, crrItem];
						}
						marketplaceNFTs = [...marketplaceNFTs, crrItem];
					});
					if (fetchedNfts.length === MAX_ITEMS) {
						await fetchMarketplaceNfts(fetchedNfts[MAX_ITEMS - 1].token_id);
					}
				};

				await fetchMarketplaceNfts();

				await Promise.all(queries).then((queryResults: any) => {
					queryResults.forEach((queryResult: any, index: number) => {
						const fetchedResult =
							queryResult?.offerings ||
							(!!queryResult?.length && queryResult) ||
							[];
						fetchedResult?.forEach((item: any, itemIndex: number) => {
							const crrItem = buildNFTItem(
								item,
								contractAddresses[index],
								collection,
								metaData
							);
							if (item.seller === account?.address) {
								listedNFTs = [...listedNFTs, crrItem];
							}
							marketplaceNFTs = [...marketplaceNFTs, crrItem];
						});
					});
					dispatch(setNFTs([`${collection.collectionId}_listed`, listedNFTs]));
					dispatch(
						setNFTs([`${collection.collectionId}_marketplace`, marketplaceNFTs])
					);
				});
			});
		},
		[dispatch, runQuery]
	);

	const fetchMyNFTs = useCallback(
		(account) => {
			if (!account) return;
			Collections.forEach(async (collection: MarketplaceInfo) => {
				if (collection.nftContract) {
					const queryResult: any = await runQuery(collection.nftContract, {
						tokens: {
							owner: account?.address,
							start_after: undefined,
							limit: 100,
						},
					});
					const customTokenId = collection.customTokenId;
					const nftList = queryResult?.tokens?.length
						? queryResult.tokens.map((item: string) => ({
								token_id: item,
								token_id_display: customTokenId
									? getCustomTokenId(item, customTokenId)
									: item,
								collectionId: collection.collectionId,
						  }))
						: [];
					dispatch(setNFTs([collection.collectionId, nftList]));
				}
			});
		},
		[dispatch, runQuery]
	);

	const getTokenBalances = useCallback(async () => {
		const result = await getBalances();
		if (!result) return;
		dispatch(setTokenBalances(result as BalancesType));
	}, [dispatch, getBalances]);

	const fetchAllNFTs = useCallback(
		(account) => {
			fetchMarketplaceNFTs(account);
			fetchCollectionInfo(account);
			if (!account) {
				dispatch(clearBalances());
				return;
			}
			fetchMyNFTs(account);
			getTokenBalances();
		},
		[
			dispatch,
			fetchCollectionInfo,
			fetchMarketplaceNFTs,
			fetchMyNFTs,
			getTokenBalances,
		]
	);

	const clearAllNFTs = useCallback(() => {
		Collections.forEach(async (collection: MarketplaceInfo) => {
			// dispatch(
			//   setCollectionState([collection.collectionId, DEFAULT_COLLECTION_STATE])
			// );
			dispatch(setNFTs([collection.collectionId, []]));
			dispatch(setNFTs([`${collection.collectionId}_listed`, []]));
			// dispatch(setNFTs([`${collection.collectionId}_marketplace`, []]));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchLiquidities = useCallback(
		(account) => {
			const fetchLiquiditiesInfoQueries = Liquidities.map((liquidity) =>
				runQuery(liquidity.contractAddress, { info: {} })
			);

			Promise.all(fetchLiquiditiesInfoQueries)
				.then(async (liquiditiesInfoResult) => {
					let fetchLPBalanceQueries: any[] = [],
						fetchRewardQueries: any[] = [],
						fetchConfigQueries: any[] = [];
					let balances: any[] = [],
						rewards: any[] = [],
						configs: any[] = [];
					let liquidities: TPool[] = liquiditiesInfoResult.map(
						(liquidityInfo, index) => {
							let pool = Number(liquidityInfo.lp_token_supply);
							pool = isNaN(pool) ? 0 : pool / 1e6;

							let token1Reserve = Number(liquidityInfo.token1_reserve);
							let token2Reserve = Number(liquidityInfo.token2_reserve);
							token1Reserve = isNaN(token1Reserve) ? 0 : token1Reserve;
							token2Reserve = isNaN(token2Reserve) ? 0 : token2Reserve;
							const lpAddress = liquidityInfo.lp_token_address || "";
							fetchLPBalanceQueries.push(
								runQuery(lpAddress, {
									balance: { address: account?.address },
								})
							);
							const stakingAddress = Liquidities[index].stakingAddress;
							fetchRewardQueries.push(
								runQuery(stakingAddress, {
									staker_info: {
										staker: account?.address,
										block_time: Math.floor(Number(new Date()) / 1e3),
									},
								})
							);
							fetchConfigQueries.push(runQuery(stakingAddress, { config: {} }));

							return {
								id: index + 1,
								token1: Liquidities[index].tokenA,
								token2: Liquidities[index].tokenB,
								isVerified: true,
								apr: "",
								pool,
								contract: Liquidities[index].contractAddress,
								lpAddress,
								stakingAddress,
								volume: 18000,
								token1Reserve,
								token2Reserve,
								ratio: token1Reserve ? token2Reserve / token1Reserve : 0,
							};
						}
					);
					await Promise.all(fetchConfigQueries)
						.then((configResult) => (configs = configResult))
						.catch((err2) => console.log(err2));
					for (let index = 0; index < configs.length; index++) {
						let config = configs[index];
						liquidities[index].config = {
							lockDuration: (config?.lock_duration || 0) * 1e3,
						};

						let totalSupplyInPresale =
							config?.distribution_schedule?.[0]?.[2] || 0;
						totalSupplyInPresale = Number(totalSupplyInPresale);
						totalSupplyInPresale = isNaN(totalSupplyInPresale)
							? 0
							: totalSupplyInPresale;

						const hopersReserve = liquidities[index].token1Reserve;
						if (hopersReserve) {
							const apr = (100 * totalSupplyInPresale) / (2 * hopersReserve);
							liquidities[index].apr = `${apr}%`;
						}
					}

					if (account) {
						await Promise.all(fetchLPBalanceQueries)
							.then((balanceResult) => (balances = balanceResult))
							.catch((err1) => console.log(err1));
						await Promise.all(fetchRewardQueries)
							.then((rewardResult) => (rewards = rewardResult))
							.catch((err2) => console.log(err2));
					}
					if (balances.length) {
						for (let index = 0; index < balances.length; index++) {
							let balance = balances[index]?.balance;
							balance = Number(balance);
							balance = isNaN(balance) ? 0 : balance / 1e6;
							liquidities[index].balance = balance;
						}
					}
					if (rewards.length) {
						for (let index = 0; index < rewards.length; index++) {
							let reward = rewards[index]?.pending_reward;
							reward = Number(reward);
							reward = isNaN(reward) ? 0 : reward / 1e6;

							let bonded = rewards[index]?.bond_amount;
							bonded = Number(bonded);
							bonded = isNaN(bonded) ? 0 : bonded / 1e6;
							liquidities[index].bonded = bonded;

							let totalEarned = rewards[index]?.bond_amount;
							totalEarned = Number(totalEarned);
							totalEarned = isNaN(totalEarned) ? 0 : totalEarned / 1e6;
							liquidities[index].totalEarned = totalEarned;
						}
					}
					dispatch(setLiquidityInfo(liquidities));
				})
				.catch((err) => console.log(err));
		},
		[dispatch, runQuery]
	);

	return {
		fetchAllNFTs,
		fetchCollectionInfo,
		fetchMarketplaceNFTs,
		fetchMyNFTs,
		getTokenBalances,
		clearAllNFTs,
		fetchLiquidities,
	};
};

export default useFetch;
