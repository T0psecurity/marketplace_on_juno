import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import { CollectionIds } from "../../../constants/Collections";
import { getTokenIdNumber } from "../../../hook/useFetch";
import { TokenType } from "../../../types/tokens";
import { FilterOptions, SortDirectionType } from "../types";

const useFilter = (
  nfts: any[],
  filterOption: FilterOptions | undefined,
  collectionId: CollectionIds
) => {
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const rarityRanks = useAppSelector((state) => state.rarityRank[collectionId]);

  return useMemo(() => {
    if (!filterOption) return nfts;
    let resultNfts = nfts.slice();
    if (filterOption.searchWord) {
      resultNfts = resultNfts.filter((nft: any) =>
        (nft.token_id_display || nft.token_id || "").includes(
          filterOption.searchWord
        )
      );
    }
    if (filterOption.priceType) {
      resultNfts = resultNfts.filter(
        (nft: any) => nft.list_price.denom === filterOption.priceType
      );
    }
    if (filterOption.metaDataFilterOption) {
      Object.keys(filterOption.metaDataFilterOption).forEach(
        (metaDataKey: string) => {
          if (filterOption.metaDataFilterOption) {
            const currentFilterOption =
              filterOption.metaDataFilterOption[metaDataKey] || {};
            let filteredString = "";
            Object.keys(currentFilterOption).forEach((optionKey: string) => {
              filteredString += currentFilterOption[optionKey] ? optionKey : "";
            });
            if (filteredString) {
              resultNfts = resultNfts.filter((nft: any) => {
                const attributes = nft.metaData.attributes;
                const targetAttribute = attributes.filter(
                  (attribute: { trait_type: string; value: string }) =>
                    attribute.trait_type === metaDataKey
                )[0];
                return (
                  !!targetAttribute?.value &&
                  filteredString.includes(targetAttribute.value)
                );
              });
            }
          }
        }
      );
    }
    return resultNfts.sort((nft1: any, nft2) => {
      if (filterOption.sortOption.field === "price") {
        const price1 = nft1?.list_price || {};
        const tokenPrice1 =
          tokenPrices[price1.denom as TokenType]?.market_data.current_price
            ?.usd || 0;

        const price2 = nft2?.list_price || {};
        const tokenPrice2 =
          tokenPrices[price2.denom as TokenType]?.market_data.current_price
            ?.usd || 0;

        // return filterOption.price === PriceSortDirectionType.asc
        //   ? Number(nft1.list_price?.amount) - Number(nft2.list_price?.amount)
        //   : Number(nft2.list_price?.amount) - Number(nft1.list_price?.amount);

        return filterOption.sortOption.direction === SortDirectionType.asc
          ? Number(nft1.list_price?.amount) * tokenPrice1 -
              Number(nft2.list_price?.amount) * tokenPrice2
          : Number(nft2.list_price?.amount) * tokenPrice2 -
              Number(nft1.list_price?.amount) * tokenPrice1;
      } else {
        const tokenRarityRank1 =
          rarityRanks?.[Number(getTokenIdNumber(nft1.token_id))]?.rank || 0;
        const tokenRarityRank2 =
          rarityRanks?.[Number(getTokenIdNumber(nft2.token_id))]?.rank || 0;
        return filterOption.sortOption.direction === SortDirectionType.asc
          ? tokenRarityRank1 - tokenRarityRank2
          : tokenRarityRank2 - tokenRarityRank1;
      }
    });
  }, [filterOption, nfts, tokenPrices, rarityRanks]);
};

export default useFilter;
