import { useEffect, useState } from "react";

import useRefresh from "../hook/useRefresh";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useFetch from "../hook/useFetch";
import getQuery, { BACKEND_URL } from "../util/useAxios";
// import { setTokenPrice } from "../features/tokenPrices/tokenPricesSlice";
// import { TokenType } from "../types/tokens";

export default function Updater(): null {
	const [basicData, setBasicData] = useState<any>({});
	const {
		nftRefresh,
		// priceRefresh,
	} = useRefresh();
	const account = useAppSelector((state) => state?.accounts?.keplrAccount);
	const {
		fetchAllNFTs,
		clearAllNFTs,
		fetchLiquidities,
		//  fetchOtherTokenPrice,
		fetchTokenPricesUsingPools,
	} = useFetch();
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			const data = await getQuery({
				url: `${BACKEND_URL}/cache?fields=collectionInfo,collectionTraits,marketplaceNFTs,liquiditiesInfo,tokenPriceInfo`,
			});
			// const { tokenPriceInfo } = data;
			// if (tokenPriceInfo) {
			// 	Object.keys(tokenPriceInfo).forEach((key) => {
			// 		dispatch(setTokenPrice([key as TokenType, tokenPriceInfo[key]]));
			// 	});
			// }
			setBasicData(data || {});
		})();
	}, [dispatch, nftRefresh]);

	// useEffect(() => {
	// 	fetchOtherTokenPrice();
	// }, [fetchOtherTokenPrice, nftRefresh]);

	useEffect(() => {
		fetchTokenPricesUsingPools();
	}, [fetchTokenPricesUsingPools, nftRefresh]);

	useEffect(() => {
		fetchLiquidities(account, basicData.liquiditiesInfo);
	}, [account, basicData.liquiditiesInfo, fetchLiquidities, nftRefresh]);

	useEffect(() => {
		fetchAllNFTs(account, basicData);
		if (!account) {
			clearAllNFTs();
		}
	}, [nftRefresh, account, basicData, fetchAllNFTs, clearAllNFTs]);

	return null;
}
