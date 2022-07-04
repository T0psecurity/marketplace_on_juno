import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  getCollectionById,
  MarketplaceInfo,
} from "../../../constants/Collections";
import { CollectionStateType } from "../../../features/collections/collectionsSlice";
import { NFTPriceType } from "../../../hook/useHandleNftItem";
import { addSuffix, convertNumberToString } from "../../../util/string";

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

  // const floorPrices: { hope: number; juno: number } = useMemo(
  //   () => ({
  //     hope: collectionState.tradingInfo?.hopeMin || 0,
  //     juno: collectionState.tradingInfo?.junoMin || 0,
  //   }),
  //   [collectionState]
  // );
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
    // hopeFloorPrice: floorPrices.hope,
    // junoFloorPrice: floorPrices.juno,
    hopeFloorPrice: floorPrices.hope === 1e9 ? null : floorPrices.hope,
    junoFloorPrice: floorPrices.juno === 1e9 ? null : floorPrices.juno,
    hopeVolume: addSuffix(volumePrices.hope),
    junoVolume: addSuffix(volumePrices.juno),
  };
};

export default useStatistic;
