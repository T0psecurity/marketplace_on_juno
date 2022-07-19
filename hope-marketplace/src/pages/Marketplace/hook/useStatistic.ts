import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  getCollectionById,
  MarketplaceInfo,
} from "../../../constants/Collections";
import { CollectionStateType } from "../../../features/collections/collectionsSlice";
import { NFTPriceType } from "../../../types/nftPriceTypes";
import { addSuffix, convertNumberToString } from "../../../util/string";

const useStatistic = (collectionId: string, items: any) => {
  const targetCollection: MarketplaceInfo = useMemo(
    () => getCollectionById(collectionId || ""),
    [collectionId]
  );
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[collectionId]
  );
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
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
  const floorPrices: { hope: number; juno: number; raw: number; neta: number } =
    useMemo(() => {
      let result = { hope: 1e9, juno: 1e9, raw: 1e9, neta: 1e9 };
      items.forEach((item: any) => {
        const crrListedPrice = item.list_price || {};
        let crrPrice = Number(crrListedPrice.amount || "0");
        crrPrice = Number.isNaN(crrPrice) ? 0 : crrPrice / 1e6;
        if (crrListedPrice.denom === NFTPriceType.HOPE) {
          if (result.hope > crrPrice) result.hope = crrPrice;
        } else if (crrListedPrice.denom === NFTPriceType.JUNO) {
          if (result.juno > crrPrice) result.juno = crrPrice;
        } else if (crrListedPrice.denom === NFTPriceType.RAW) {
          if (result.raw > crrPrice) result.raw = crrPrice;
        } else if (crrListedPrice.denom === NFTPriceType.NETA) {
          if (result.neta > crrPrice) result.neta = crrPrice;
        }
      });
      return result;
    }, [items]);

  const volumePrices: {
    hope: number;
    juno: number;
    raw: number;
    totalInJuno: number;
  } = useMemo(() => {
    const hopeVolume = collectionState.tradingInfo?.hopeTotal || 0;
    const rawVolume = collectionState.tradingInfo?.rawTotal || 0;
    const netaVolume = collectionState.tradingInfo?.netaTotal || 0;
    const junoVolume = collectionState.tradingInfo?.ujunoTotal || 0;

    const hopeUsd = tokenPrices["hope"]?.market_data.current_price?.usd || 0;
    const rawUsd = tokenPrices["raw"]?.market_data.current_price?.usd || 0;
    const netaUsd = tokenPrices["neta"]?.market_data.current_price?.usd || 0;
    const junoUsd = tokenPrices["ujuno"]?.market_data.current_price?.usd || 0;

    const totalVolumeInJuno =
      junoVolume +
      (hopeUsd ? hopeVolume * (junoUsd / hopeUsd) : 0) +
      (rawUsd ? rawVolume * (junoUsd / rawUsd) : 0) +
      (netaUsd ? netaVolume * (junoUsd / netaUsd) : 0);

    return {
      hope: hopeVolume,
      raw: rawVolume,
      juno: junoVolume,
      totalInJuno: totalVolumeInJuno,
    };
  }, [collectionState, tokenPrices]);

  return {
    total,
    itemsOnSale,
    owners,
    // hopeFloorPrice: floorPrices.hope,
    // junoFloorPrice: floorPrices.juno,
    hopeFloorPrice: floorPrices.hope === 1e9 ? null : floorPrices.hope,
    junoFloorPrice: floorPrices.juno === 1e9 ? null : floorPrices.juno,
    rawFloorPrice: floorPrices.raw === 1e9 ? null : floorPrices.raw,
    netaFloorPrice: floorPrices.neta === 1e9 ? null : floorPrices.neta,
    hopeVolume: addSuffix(volumePrices.hope),
    junoVolume: addSuffix(volumePrices.juno),
    totalVolumeInJuno: addSuffix(volumePrices.totalInJuno),
  };
};

export default useStatistic;
