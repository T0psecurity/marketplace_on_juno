import { useEffect } from "react";

import useRefresh from "../hook/useRefresh";
import { useAppSelector } from "../app/hooks";
import useFetch from "../hook/useFetch";

export default function Updater(): null {
	const {
		nftRefresh,
		// priceRefresh,
	} = useRefresh();
	const account = useAppSelector((state) => state?.accounts?.keplrAccount);
	const { fetchAllNFTs, clearAllNFTs, fetchLiquidities } = useFetch();

	useEffect(() => {
		fetchLiquidities(account);
	}, [account, fetchLiquidities, nftRefresh]);

	useEffect(() => {
		fetchAllNFTs(account);
		if (!account) {
			clearAllNFTs();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nftRefresh, account]);

	return null;
}
