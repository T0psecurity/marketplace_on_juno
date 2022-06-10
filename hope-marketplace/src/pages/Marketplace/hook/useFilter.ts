import { useMemo } from "react";
import { FilterOptions, PriceSortDirectionType } from "../types";

const useFilter = (nfts: any[], filterOption: FilterOptions) => {
  return useMemo(() => {
    return nfts
      .slice()
      .sort((nft1: any, nft2) =>
        filterOption.price === PriceSortDirectionType.asc
          ? Number(nft1.list_price?.amount) - Number(nft2.list_price?.amount)
          : Number(nft2.list_price?.amount) - Number(nft1.list_price?.amount)
      );
  }, [nfts, filterOption]);
};

export default useFilter;
