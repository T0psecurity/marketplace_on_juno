import { useEffect } from "react";
import useRefresh from "../hook/useRefresh";
import { useAppSelector } from "../app/hooks";
import useFetch from "../hook/useFetch";

export default function Updater(): null {
  const {
    refresh,
    // priceRefresh,
  } = useRefresh();
  const account = useAppSelector((state) => state?.accounts.keplrAccount);
  const { fetchAllNFTs, clearAllNFTs } = useFetch();
  useEffect(() => {
    fetchAllNFTs();
    if (!account) {
      clearAllNFTs();
    }
  }, [refresh, account, fetchAllNFTs, clearAllNFTs]);

  return null;
}
