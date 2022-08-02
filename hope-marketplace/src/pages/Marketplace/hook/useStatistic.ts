import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  FloorPriceType,
  getCollectionById,
  MarketplaceInfo,
  VolumePriceType,
} from "../../../constants/Collections";
import { CollectionStateType } from "../../../features/collections/collectionsSlice";
import { TokenType } from "../../../types/tokens";
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

  const floorPrices: FloorPriceType = useMemo(() => {
    let result: FloorPriceType = {} as FloorPriceType;
    items.forEach((item: any) => {
      const crrListedPrice = item.list_price || {};
      const denom: TokenType = crrListedPrice.denom;
      let crrPrice = Number(crrListedPrice.amount || "0");
      crrPrice = Number.isNaN(crrPrice) ? 0 : crrPrice / 1e6;

      if (
        !(result as any)[`${denom}FloorPrice`] ||
        (result as any)[`${denom}FloorPrice`] > crrPrice
      )
        (result as any)[`${denom}FloorPrice`] = crrPrice;
    });
    return result;
  }, [items]);

  const volumePrices: VolumePriceType = useMemo(() => {
    let result: VolumePriceType = {} as VolumePriceType;
    const junoUsd = tokenPrices["ujuno"]?.market_data.current_price?.usd || 0;
    (Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach((key) => {
      const crrVolume =
        (collectionState?.tradingInfo as any)?.[`${TokenType[key]}Total`] || 0;
      const crrUsd =
        tokenPrices[TokenType[key]]?.market_data.current_price?.usd || 0;
      (result as any)[`${TokenType[key]}Volume`] = crrVolume;
      result.totalVolumeInJuno =
        (result.totalVolumeInJuno || 0) +
        (crrUsd ? crrVolume * (junoUsd / crrUsd) : 0);
    });
    Object.keys(result).forEach((key) => {
      (result as any)[key] = addSuffix((result as any)[key]);
    });

    return result;
  }, [collectionState, tokenPrices]);

  return {
    total,
    itemsOnSale,
    owners,
    ...floorPrices,
    ...volumePrices,
  };
};

export default useStatistic;
