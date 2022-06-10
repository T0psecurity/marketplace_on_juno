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

  return { total, owners };
};

export default useStatistic;
