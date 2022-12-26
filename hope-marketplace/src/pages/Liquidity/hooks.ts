import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import useContract from "../../hook/useContract";
import { TPool } from "../../types/pools";
import { TPoolInfo } from "./type";

export const useLiquidityInfo = (pool: TPool) => {
	const { runQuery } = useContract();
	const [poolInfo, setPoolInfo] = useState<TPoolInfo>({ balance: 0 });
	const account = useAppSelector((state) => state.accounts.keplrAccount);

	useEffect(() => {
		if (!account) {
			setPoolInfo({ balance: 0 });
			return;
		}
		(async () => {
			const queryResult = await runQuery(pool.lpAddress, {
				balance: {
					address: account.address,
				},
			});
			let balance = Number(queryResult.balance);
			balance = isNaN(balance) ? 0 : balance / 1e6;
			setPoolInfo({
				balance,
			});
		})();
	}, [account, pool, runQuery]);
	return poolInfo;
};
