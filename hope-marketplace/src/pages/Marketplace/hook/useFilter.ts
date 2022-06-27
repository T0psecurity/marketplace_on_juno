import { useMemo } from "react";
import { FilterOptions, PriceSortDirectionType } from "../types";

const useFilter = (nfts: any[], filterOption: FilterOptions | undefined) => {
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
    return resultNfts.sort((nft1: any, nft2) =>
      filterOption.price === PriceSortDirectionType.asc
        ? Number(nft1.list_price?.amount) - Number(nft2.list_price?.amount)
        : Number(nft2.list_price?.amount) - Number(nft1.list_price?.amount)
    );
  }, [nfts, filterOption]);
};

export default useFilter;
