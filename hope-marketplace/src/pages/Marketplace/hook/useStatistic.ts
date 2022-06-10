import { useMemo } from "react";

const convertNumberToString = (number: number): string => {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
};

const useStatistic = (items: any) => {
  const total: string = useMemo(() => {
    const length: number = items?.length || 0;
    if (length >= 1e6) return `${convertNumberToString(length / 1e6)}M`;
    if (length >= 1e3) return `${convertNumberToString(length / 1e3)}K`;
    return convertNumberToString(length);
  }, [items]);

  const owners: string = useMemo(() => {
    const sellers = items.map((item: any) => item.seller);
    return convertNumberToString([...new Set(sellers)].length);
  }, [items]);

  const floorPrices: { hope: number; juno: number } = useMemo(() => {
    let result = { hope: 1e9, juno: 1e9 };
    items.forEach((item: any) => {
      const crrListedPrice = item.list_price || {};
      let crrPrice = Number(crrListedPrice.amount || "0");
      crrPrice = Number.isNaN(crrPrice) ? 0 : crrPrice / 1e6;
      if (crrListedPrice.denom === "hope") {
        if (result.hope > crrPrice) result.hope = crrPrice;
      } else if (crrListedPrice.denom === "ujuno") {
        if (result.juno > crrPrice) result.juno = crrPrice;
      }
    });
    return result;
  }, [items]);

  return {
    total,
    owners,
    hopeFloorPrice: floorPrices.hope,
    junoFloorPrice: floorPrices.juno,
  };
};

export default useStatistic;
