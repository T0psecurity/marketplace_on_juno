import { useMemo } from "react";
import { FilterOptions, PriceSortDirectionType } from "../types";

const useFilter = (nfts: any[], filterOption: FilterOptions | undefined) => {
  return useMemo(() => {
    if (!filterOption) return nfts;
    let resultNfts = nfts.slice();
    if (filterOption.searchWord) {
      resultNfts = resultNfts.filter((nft: any) =>
        nft.token_id_display.includes(filterOption.searchWord)
      );
    }
    if (filterOption.priceType) {
      resultNfts = resultNfts.filter(
        (nft: any) => nft.list_price.denom === filterOption.priceType
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
