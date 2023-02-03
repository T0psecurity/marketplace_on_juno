import { useEffect, useState } from "react";
import { getDexStatus } from "../util/useAxios";
import { convertStringToNumber } from "../util/string";
import useContract from "./useContract";
import { TokenStatus, TokenType } from "../types/tokens";

const useDexStatus = () => {
	const [dexStatus, setDexStatus] = useState<{
		txNumber: number;
		tradingVolume: number;
		burningVolume: number;
	}>({
		txNumber: 0,
		tradingVolume: 0,
		burningVolume: 0,
	});
	const { runQuery } = useContract();

	useEffect(() => {
		(async () => {
			const data = await getDexStatus();
			const fetchedDexStatus = data[0] || {};
			const txNumber = convertStringToNumber(fetchedDexStatus.txNumber);
			const tradingVolume =
				convertStringToNumber(fetchedDexStatus.tradingVolume) / 1e6;
			const hopersTokenAddress =
				TokenStatus[TokenType.HOPERS].contractAddress;
			if (!hopersTokenAddress) return;
			const hopersTokenInfo = await runQuery(hopersTokenAddress, {
				token_info: {},
			});
			const totalSupply = convertStringToNumber(
				hopersTokenInfo?.total_supply
			);
			const burningVolume = 2 * 1e9 - totalSupply / 1e6;
			setDexStatus({
				txNumber,
				tradingVolume,
				burningVolume,
			});
		})();
	}, [runQuery]);

	// useEffect(() => {
	// 	(async () => {
	// 		const hopersTokenAddress =
	// 			TokenStatus[TokenType.HOPERS].contractAddress;
	// 		if (!hopersTokenAddress) return;
	// 		const hopersTokenInfo = await runQuery(hopersTokenAddress, {
	// 			token_info: {},
	// 		});
	// 		const totalSupply = convertStringToNumber(
	// 			hopersTokenInfo?.total_supply
	// 		);
	// 		if (totalSupply) {
	// 			setDexStatus((prev) => ({
	// 				...prev,
	// 				burningVolume: 2 * 1e9 - totalSupply / 1e6,
	// 			}));
	// 		}
	// 	})();
	// }, [runQuery]);

	return dexStatus;
};

export default useDexStatus;
