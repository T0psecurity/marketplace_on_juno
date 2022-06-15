import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  getCollectionById,
  MarketplaceInfo,
} from "../../../constants/Collections";
import { CollectionStateType } from "../../../features/collections/collectionsSlice";
// import { NFTPriceType } from "../../../hook/useHandleNftItem";

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
  const targetCollection: MarketplaceInfo = useMemo(
    () => getCollectionById(collectionId || ""),
    [collectionId]
  );
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[collectionId]
  );
  // console.log("collectionState", collectionState);

  const total: string = useMemo(() => {
    if (!targetCollection) return "";
    return addSuffix(targetCollection.mintInfo?.totalNfts || 0);
  }, [targetCollection]);

  const itemsOnSale: string = useMemo(() => {
    const length: number = items?.length || 0;
    return addSuffix(length);
  }, [items]);

  const owners: string = useMemo(() => {
    const sellers = items.map((item: any) => item.seller);
    return convertNumberToString([...new Set(sellers)].length);
  }, [items]);

  const floorPrices: { hope: number; juno: number } = useMemo(
    () => ({
      hope: collectionState.tradingInfo?.hopeMin || 0,
      juno: collectionState.tradingInfo?.junoMin || 0,
    }),
    [collectionState]
  );

  const volumePrices: { hope: number; juno: number } = useMemo(
    () => ({
      hope: collectionState.tradingInfo?.hopeTotal || 0,
      juno: collectionState.tradingInfo?.junoTotal || 0,
    }),
    [collectionState]
  );

  return {
    total,
    itemsOnSale,
    owners,
    hopeFloorPrice: floorPrices.hope,
    junoFloorPrice: floorPrices.juno,
    hopeVolume: volumePrices.hope,
    junoVolume: volumePrices.juno,
  };
};

export default useStatistic;
