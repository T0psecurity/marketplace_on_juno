export enum PriceSortDirectionType {
  "asc",
  "desc",
}
export interface FilterPanelProps {
  onChangeExpanded: any;
  expanded: boolean;
  onChangeFilterOption: any;
  metaDataOptions?: { [key: string]: string[] };
}

export type StatusFilterType = {
  buyNow: boolean;
  onAuction: boolean;
  new: boolean;
  hasOffers: boolean;
};

export const DEFAULT_STATUS_FILTER: StatusFilterType = {
  buyNow: false,
  onAuction: false,
  new: false,
  hasOffers: false,
};

export type StatusFilterButtonType = {
  title: string;
  key: keyof StatusFilterType;
};

export type MetaDataFilterOption = {
  [key: string]: { [key: string]: boolean };
};

export type FilterOptions = {
  price: PriceSortDirectionType;
  searchWord?: string;
  priceType?: string;
  metaDataFilterOption?: MetaDataFilterOption;
};
