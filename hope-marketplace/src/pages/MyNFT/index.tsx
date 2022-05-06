import React, { useEffect } from "react";

import { Wrapper } from "./styled";

import { useAppSelector } from "../../app/hooks";
import useFetch from "../../hook/useFetch";
import { SubTitle, Title } from "../../components/PageTitle";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";

const MyNFT: React.FC = () => {
  const { fetchAllNFTs } = useFetch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const unlistedNFTs = useAppSelector((state) => state.nfts.unlistedNFTs);
  const listedNFTs = useAppSelector((state) => state.nfts.listedNFTs);

  useEffect(() => {
    if (account && account.address) {
      fetchAllNFTs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  return (
    <Wrapper>
      <Title title="Hope Galaxy NFTs" />
      <SubTitle subTitle="NFTs in My Wallet" />
      <NFTContainer nfts={unlistedNFTs} status={NFTItemStatus.SELL} />
      <SubTitle subTitle="My NFTs in Market Place" />
      <NFTContainer nfts={listedNFTs} status={NFTItemStatus.WITHDRAW} />
    </Wrapper>
  );
};

export default MyNFT;
