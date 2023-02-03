import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Collections, { MarketplaceInfo } from "../constants/Collections";
import {
	CollectionStateType,
	// DEFAULT_COLLECTION_STATE,
	setCollectionState,
} from "../features/collections/collectionsSlice";
import { setNFTs } from "../features/nfts/nftsSlice";
import useContract from "./useContract";
import { setCollectionTraitStates } from "../features/collectionTraits/collectionTraitsSlice";
import { TokenType, TokenStatus } from "../types/tokens";
import { setRarityRankState } from "../features/rarityRanks/rarityRanksSlice";
import {
	BalancesType,
	clearBalances,
	setTokenBalances,
} from "../features/balances/balancesSlice";
import { TPool, TPoolConfig } from "../types/pools";
import { setLiquidityInfo } from "../features/liquidities/liquiditiesSlice";
import {
	TokenCoingeckoIds,
	setTokenPrice,
} from "../features/tokenPrices/tokenPricesSlice";
import { convertStringToNumber } from "../util/string";
import { Liquidities } from "../constants/Liquidities";

export const getCustomTokenId = (origin: string, target: string): string =>
	`${target}.${origin.split(".").pop()}`;

export const getTokenIdNumber = (id: string): string => {
	if (!id) return "";
	return id.split(".").pop() || "";
};

const useFetch = () => {
	const { runQuery, getBalances } = useContract();
	const [liquiditiesInfo, setLiquiditiesInfo] = useState<TPool[]>([]);
	const dispatch = useAppDispatch();
	const junoPrice = useAppSelector(
		(state) => state.tokenPrices[TokenType.JUNO]
	);

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
					dispatch(
						setRarityRankState([collection.collectionId, rarities])
					);
				}
			} catch (e) {
				console.error("file read error", collection.collectionId, e);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchCollectionInfo = useCallback(
		(account, basicData: any) => {
			Collections.forEach(async (collection: MarketplaceInfo) => {
				let storeObject: CollectionStateType = {
					mintCheck: [],
					mintedNfts: 0,
					totalNfts: collection?.mintInfo?.totalNfts || 0,
					maxNfts: 0,
					imageUrl: "",
					price: 0,
					myMintedNfts: null,
					...(basicData?.[collection.collectionId] || {}),
				};
				if (collection.mintContract) {
					if (collection.mintInfo?.mintLogic?.fetchInfo) {
						storeObject =
							await collection.mintInfo.mintLogic.fetchInfo({
								collection,
								runQuery,
								account: account?.address,
							});
					} else if (account && account.address) {
						const userInfo = await runQuery(
							collection.mintContract,
							{
								get_user_info: { address: account.address },
							}
						);
						storeObject.myMintedNfts =
							(storeObject.myMintedNfts || 0) + (userInfo || "0");
					}
				}
				dispatch(
					setCollectionState([collection.collectionId, storeObject])
				);
			});
		},
		[dispatch, runQuery]
	);

	const fetchMarketplaceNFTs = useCallback(
		(account, basicData: any) => {
			Collections.forEach((collection: MarketplaceInfo) => {
				const basicNFTInfo =
					basicData?.marketplaceNFTs?.[collection.collectionId] || [];
				const metaData =
					basicData?.collectionTraits?.[collection.collectionId];
				if (metaData) {
					dispatch(
						setCollectionTraitStates([
							collection.collectionId,
							metaData,
						])
					);
				}
				let listedNFTs: any = [];
				basicNFTInfo.forEach((item: any) => {
					if (item.seller === account?.address) {
						listedNFTs = [...listedNFTs, item];
					}
				});
				dispatch(
					setNFTs([`${collection.collectionId}_listed`, listedNFTs])
				);
				dispatch(
					setNFTs([
						`${collection.collectionId}_marketplace`,
						basicNFTInfo,
					])
				);
			});
		},
		[dispatch]
	);

	const fetchMyNFTs = useCallback(
		(account) => {
			if (!account) return;
			Collections.forEach(async (collection: MarketplaceInfo) => {
				if (collection.nftContract) {
					const queryResult: any = await runQuery(
						collection.nftContract,
						{
							tokens: {
								owner: account?.address,
								start_after: undefined,
								limit: 100,
							},
						}
					);
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
		(account, basicData: any) => {
			fetchMarketplaceNFTs(account, basicData);
			fetchCollectionInfo(account, basicData?.collectionInfo);
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
		async (account, basicData: any) => {
			let fetchLPBalanceQueries: any[] = [],
				fetchRewardQueries: any[] = [];
			let balances: any[] = [],
				rewards: any[] = [];
			let stakingQueryIndices: number[] = [],
				tokenDecimals: number[] = [];
			let liquidities: TPool[] = Liquidities.reduce(
				(result: TPool[], liquidity, index: number) => {
					const liquidityInfo = (basicData as TPool[]).find(
						(item) =>
							item.token1 === liquidity.tokenA &&
							item.token2 === liquidity.tokenB
					);
					if (liquidityInfo) {
						const lpAddress = liquidityInfo.lpAddress;
						fetchLPBalanceQueries.push(
							runQuery(lpAddress, {
								balance: { address: account?.address },
							})
						);
						const stakingAddress = liquidityInfo.stakingAddress;
						if (stakingAddress) {
							const stakingAddressArray =
								typeof stakingAddress === "string"
									? [stakingAddress]
									: stakingAddress;
							const configs =
								typeof stakingAddress === "string"
									? [liquidityInfo.config as TPoolConfig]
									: (liquidityInfo.config as TPoolConfig[]);
							stakingAddressArray.forEach(
								(address, addressIndex) => {
									stakingQueryIndices.push(index);
									const config = configs[addressIndex];
									if (config.rewardToken) {
										const tokenStatus =
											TokenStatus[config.rewardToken];
										tokenDecimals.push(
											tokenStatus.decimal || 6
										);
									} else {
										tokenDecimals.push(6);
									}
									fetchRewardQueries.push(
										runQuery(address, {
											staker_info: {
												staker: account?.address,
											},
										})
									);
								}
							);
						}
						return [...result, liquidityInfo];
					}
					return result;
				},
				[]
			);
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
					const liquidityIndex = stakingQueryIndices[index];
					const hasSeveralStakingContract =
						typeof liquidities[liquidityIndex].stakingAddress !==
						"string";
					const reward =
						convertStringToNumber(rewards[index]?.pending_reward) /
						Math.pow(10, tokenDecimals[index]);
					liquidities[liquidityIndex].pendingReward =
						hasSeveralStakingContract
							? [
									...((liquidities[liquidityIndex]
										.pendingReward || []) as number[]),
									reward,
							  ]
							: reward;

					const bonded =
						convertStringToNumber(rewards[index]?.bond_amount) /
						1e6;
					liquidities[liquidityIndex].bonded =
						hasSeveralStakingContract
							? [
									...((liquidities[liquidityIndex].bonded ||
										[]) as number[]),
									bonded,
							  ]
							: bonded;

					const totalEarned =
						convertStringToNumber(rewards[index]?.total_earned) /
						1e6;
					liquidities[liquidityIndex].totalEarned =
						hasSeveralStakingContract
							? [
									...((liquidities[liquidityIndex]
										.totalEarned || []) as number[]),
									totalEarned,
							  ]
							: totalEarned;
				}
			}
			setLiquiditiesInfo(liquidities);
			dispatch(setLiquidityInfo(liquidities));

			setLiquiditiesInfo(liquidities);
			dispatch(setLiquidityInfo(liquidities));
		},
		[dispatch, runQuery]
	);

	const fetchOtherTokenPrice = useCallback(() => {
		// First, calculate HOPERS price
		const hopersJunoLiquidity = liquiditiesInfo.find(
			(liquidity) =>
				liquidity.token1 === TokenType.HOPERS &&
				liquidity.token2 === TokenType.JUNO
		);
		const junoPriceInUsd =
			Number(junoPrice?.market_data?.current_price?.usd) || 0;
		const ratio = hopersJunoLiquidity?.ratio || 0;
		const hopersPrice = junoPriceInUsd * ratio;
		dispatch(
			setTokenPrice([
				TokenType.HOPERS,
				{ market_data: { current_price: { usd: hopersPrice } } },
			])
		);

		// Second calculates price of tokens which can't be fetched from coingecko
		Object.keys(TokenCoingeckoIds).forEach((key: string) => {
			const tokenType = key as TokenType;
			if (
				tokenType !== TokenType.HOPERS &&
				!TokenCoingeckoIds[tokenType]
			) {
				const targetPool = liquiditiesInfo.find(
					(liquidity) =>
						liquidity.token1 === TokenType.HOPERS &&
						liquidity.token2 === tokenType
				);
				const ratio = targetPool?.ratio || 0;
				const targetPrice = ratio ? hopersPrice / ratio : 0;
				dispatch(
					setTokenPrice([
						tokenType,
						{
							market_data: {
								current_price: { usd: targetPrice },
							},
						},
					])
				);
			}
		});
	}, [dispatch, junoPrice?.market_data?.current_price?.usd, liquiditiesInfo]);

	const fetchTokenPricesUsingPools = useCallback(() => {
		// First, calculate HOPERS price
		const hopersUsdcLiquidity = liquiditiesInfo.find(
			(liquidity) =>
				liquidity.token1 === TokenType.HOPERS &&
				liquidity.token2 === TokenType.USDC
		);
		const ratio = hopersUsdcLiquidity?.ratio || 0;
		const hopersPrice = ratio;
		dispatch(
			setTokenPrice([
				TokenType.HOPERS,
				{ market_data: { current_price: { usd: hopersPrice } } },
			])
		);
		// Second calculates price of tokens which can't be fetched from coingecko
		Object.keys(TokenCoingeckoIds).forEach((key: string) => {
			const tokenType = key as TokenType;
			if (tokenType !== TokenType.HOPERS) {
				const targetPool = liquiditiesInfo.find(
					(liquidity) =>
						liquidity.token1 === TokenType.HOPERS &&
						liquidity.token2 === tokenType
				);
				const ratio = targetPool?.ratio || 0;
				const targetPrice = ratio ? hopersPrice / ratio : 0;
				dispatch(
					setTokenPrice([
						tokenType,
						{
							market_data: {
								current_price: { usd: targetPrice },
							},
						},
					])
				);
			}
		});
	}, [dispatch, liquiditiesInfo]);

	return {
		fetchAllNFTs,
		fetchCollectionInfo,
		fetchMarketplaceNFTs,
		fetchMyNFTs,
		getTokenBalances,
		clearAllNFTs,
		fetchLiquidities,
		fetchOtherTokenPrice,
		fetchTokenPricesUsingPools,
	};
};

export default useFetch;
