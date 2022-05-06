import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
import { SubTitle, Title } from "../../components/PageTitle";
import useFetch from "../../hook/useFetch";

const Marketplace: React.FC = () => {
  const { fetchListedNFTs } = useFetch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const marketplaceNFTs = useAppSelector((state) => state.nfts.marketplaceNFTs);

  useEffect(() => {
    if (account && account.address) {
      fetchListedNFTs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  return (
    <>
      <Title title="Hope Galaxy NFTs" />
      <SubTitle subTitle="Created by HopeGalaxy" />
      <NFTContainer nfts={marketplaceNFTs} status={NFTItemStatus.BUY} />
    </>
  );
};

export default Marketplace;
