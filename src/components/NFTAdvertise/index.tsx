import React from "react";
import { MarketplaceInfo } from "../../constants/Collections";
import NFTIntroduction from "../NFTIntroduction";
import { Title } from "../PageTitle";
import { CollectionDetail, Creator, CreatorContainer } from "./styled";

interface NFTAdvertiseProps {
  collection: MarketplaceInfo;
}

const NFTAdvertise: React.FC<NFTAdvertiseProps> = ({ collection }) => {
  return (
    <>
      <NFTIntroduction
        backgroundImage={collection.backgroundUrl}
        logo={collection.logoUrl}
        socialLinks={collection.socialLinks}
      />
      <Title title={collection.title} />
      <CreatorContainer>
        created by
        <Creator>{` ${collection.creator || ""} •`}</Creator>
      </CreatorContainer>
      <CollectionDetail>{collection.description}</CollectionDetail>
    </>
  );
};

export default NFTAdvertise;
