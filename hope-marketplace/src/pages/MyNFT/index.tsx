import React from "react";

import { Wrapper, ProfileImage, HorizontalDivider } from "./styled";

import { useAppSelector } from "../../app/hooks";
import { SubTitle, Title } from "../../components/PageTitle";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
import Collections, { MarketplaceInfo } from "../../constants/Collections";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";

const MyNFT: React.FC = () => {
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const nfts = useAppSelector((state) => state.nfts);
  let unlistedNFTs: any = [],
    listedNFTs: any = [];
  Collections.forEach((collection: MarketplaceInfo) => {
    const collectionId = collection.collectionId;
    const listedKey = `${collectionId}_listed`;
    if (nfts[collectionId] && nfts[collectionId].length)
      unlistedNFTs = unlistedNFTs.concat(nfts[collectionId]);
    if ((nfts as any)[listedKey] && (nfts as any)[listedKey].length)
      listedNFTs = listedNFTs.concat((nfts as any)[listedKey]);
  });

  return (
    <Wrapper isMobile={isMobile}>
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
