import React, { useEffect } from "react";

import { Wrapper, ProfileImage, HorizontalDivider } from "./styled";

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
  }, [account, fetchAllNFTs]);
  return (
    <Wrapper>
      <Title title="Profile" icon={<ProfileImage />} />
      <HorizontalDivider />
      <SubTitle subTitle="My NFTs" textAlign="left" />
      <NFTContainer
        nfts={unlistedNFTs}
        status={NFTItemStatus.SELL}
        emptyMsg="No NFTs in your wallet"
      />
      <HorizontalDivider />
      <SubTitle subTitle="My NFTs on sale" textAlign="left" />
      <NFTContainer
        nfts={listedNFTs}
        status={NFTItemStatus.WITHDRAW}
        emptyMsg="No NFTs on sale"
      />
      <HorizontalDivider />
      <SubTitle subTitle="My NFTs created" textAlign="left" />
      <NFTContainer nfts={[]} status={""} emptyMsg="No NFTs created" />
    </Wrapper>
  );
};

export default MyNFT;
