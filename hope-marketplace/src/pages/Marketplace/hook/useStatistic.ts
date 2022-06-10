import { useMemo } from "react";
import {
  getCollectionById,
  MarketplaceInfo,
} from "../../../constants/Collections";
import { NFTPriceType } from "../../../hook/useHandleNftItem";

const convertNumberToString = (number: number): string => {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
};

const addSuffix = (number: number): string => {
  if (number >= 1e6) return `${convertNumberToString(number / 1e6)}M`;
  if (number >= 1e3) return `${convertNumberToString(number / 1e3)}K`;
  return convertNumberToString(number);
};

const useStatistic = (collectionId: string, items: any) => {
  const total: string = useMemo(() => {
    const targetCollection: MarketplaceInfo = getCollectionById(
      collectionId || ""
    );
    if (!targetCollection) return "";
    return addSuffix(targetCollection.mintInfo?.totalNfts || 0);
  }, [collectionId]);

  const itemsOnSale: string = useMemo(() => {
    const length: number = items?.length || 0;
    return addSuffix(length);
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
      if (crrListedPrice.denom === NFTPriceType.HOPE) {
        if (result.hope > crrPrice) result.hope = crrPrice;
      } else if (crrListedPrice.denom === NFTPriceType.JUNO) {
        if (result.juno > crrPrice) result.juno = crrPrice;
      }
    });
    return result;
  }, [items]);

  return {
    total,
    itemsOnSale,
    owners,
    hopeFloorPrice: floorPrices.hope === 1e9 ? null : floorPrices.hope,
    junoFloorPrice: floorPrices.juno === 1e9 ? null : floorPrices.juno,
  };
};

export default useStatistic;
