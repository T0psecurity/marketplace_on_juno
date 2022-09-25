import { useEffect, useMemo, useState } from "react";
import { PresaleState, AvailableTokens } from "./type";
import {
  // getIDOById,
  IDOIds,
} from "../../constants/IDOs";
import useContract from "../../hook/useContract";

const tempIdoContractInfo = {
  admin: "",
  claim_start: 1673954985,
  presale_period: 1200,
  presale_start: 1673954985,
  token_address: "",
  token_cost_atom: "2000",
  token_cost_juno: "1000",
  total_supply: "1000000000000",
  vesting_step_period: 900,
};

const useIDOStatus = (id: IDOIds) => {
  const [fetchResult, setFetchResult] = useState<{
    stateInfo: any;
    saleInfo: any;
  }>({
    stateInfo: {},
    saleInfo: {},
  });
  const { runQuery } = useContract();

  useEffect(() => {
    (async () => {
      // const idoInfo = getIDOById(id);
      // const contractAddress = idoInfo.contract;
      // const stateQueryResult = await runQuery(contractAddress, {
      //   get_state_info: {},
      // });
      // const saleQueryResult = await runQuery(contractAddress, {
      //   get_sale_info: {},
      // });
      setFetchResult({
        // stateInfo: stateQueryResult || {},
        stateInfo: tempIdoContractInfo || {},
        // saleInfo: saleQueryResult || {},
        saleInfo: {},
      });
    })();
  }, [id, runQuery]);

  const idoStatus = useMemo(() => {
    const totalAmount = Number(fetchResult.stateInfo.total_supply || 0) / 1e6;
    const startTime = fetchResult.stateInfo?.presale_start
      ? new Date(fetchResult.stateInfo.presale_start * 1000)
      : new Date();
    const endTime = new Date(
      Number(startTime) + (fetchResult.stateInfo.presale_period || 0) * 1000
    );
    const now = new Date();
    const crrState =
      Number(now) < Number(startTime)
        ? PresaleState.BEFORE
        : Number(now) < Number(endTime)
        ? PresaleState.PRESALE
        : PresaleState.ENDED;
    const tokenSoldAmount = 0;
    // Number(fetchResult.saleInfo.token_sold_amount || 0) / 1e6;
    // const percentageSold = Number(
    //   ((tokenSoldAmount / totalAmount) * 100).toFixed(2)
    // );
    const percentageSold = 0;

    let costs: any = {};
    (
      Object.keys(AvailableTokens) as Array<keyof typeof AvailableTokens>
    ).forEach((key) => {
      costs[key] = Number(
        fetchResult.stateInfo[AvailableTokens[key].fieldKey] || 0
      );
    });

    return {
      percentageSold,
      totalSold: tokenSoldAmount.toLocaleString("en-Us", {
        maximumFractionDigits: 2,
      }),
      total: totalAmount.toLocaleString("en-Us", { maximumFractionDigits: 2 }),
      startTime,
      endTime,
      crrState,
      costs,
    };
  }, [fetchResult]);

  return { idoStatus, fetchResult };
};

export default useIDOStatus;
