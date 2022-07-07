import { useContext } from "react";
import { RefreshContext } from "../context/RefreshContext";

const useRefresh = () => {
  const { value, price, refreshAll } = useContext(RefreshContext);
  return { nftRefresh: value, priceRefresh: price, refresh: refreshAll };
};

export default useRefresh;
