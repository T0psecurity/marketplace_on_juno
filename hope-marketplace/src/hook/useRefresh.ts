import { useContext } from "react";
import { RefreshContext } from "../context/RefreshContext";

const useRefresh = () => {
  const { value, price } = useContext(RefreshContext);
  return { refresh: value, priceRefresh: price };
};

export default useRefresh;
