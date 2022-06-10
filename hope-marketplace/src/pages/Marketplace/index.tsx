import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
// import CollapseCard from "../../components/CollapseCard";
import NFTContainer from "../../components/NFTContainer";
import NFTIntroduction from "../../components/NFTIntroduction";
import { NFTItemStatus } from "../../components/NFTItem";
import { Title } from "../../components/PageTitle";
import { getCollectionById } from "../../constants/Collections";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import FilterPanel from "./FilterPanel";
import Statistic from "./Statistic";
import {
  Wrapper,
  CreatorContainer,
  Creator,
  CollectionDetail,
  HorizontalDivider,
  // SortButtonContainer,
  MainContentContainer,
  NftList,
} from "./styled";

const Marketplace: React.FC = () => {
  const { isXl } = useMatchBreakpoints();
  const [expandedFilter, setExpandedFilter] = useState<boolean>(isXl);
  const { search } = useLocation();
  const collectionId = new URLSearchParams(search).get("id");

  useEffect(() => {
    setExpandedFilter(isXl);
  }, [isXl]);

  const targetCollection = useMemo(
    () => getCollectionById(collectionId || ""),
    [collectionId]
  );

  // console.log("targetCollection", targetCollection);

  // const [isAscending, setIsAscending] = React.useState(true);
  const marketplaceNFTs = useAppSelector((state) => {
    // console.log("nfts", state.nfts);
    return state.nfts[`${targetCollection.collectionId}_marketplace`];
  });

  // const handleSort = () => {
  //   setIsAscending(!isAscending);
  // };

  return (
    <Wrapper>
      <NFTIntroduction
        backgroundImage={targetCollection.backgroundUrl}
        logo={targetCollection.logoUrl}
        socialLinks={targetCollection.socialLinks}
      />
      <Title title={targetCollection.title} />
      <CreatorContainer>
        created by
        <Creator>{` ${targetCollection.creator || ""} •`}</Creator>
      </CreatorContainer>
      <Statistic items={marketplaceNFTs} collectionId={collectionId || ""} />
      <CollectionDetail>{targetCollection.description}</CollectionDetail>
      <HorizontalDivider />
      <MainContentContainer isMobile={!isXl} expanded={expandedFilter}>
        <FilterPanel
          onChangeExpanded={setExpandedFilter}
          expanded={expandedFilter}
        />
        <NftList>
          Items
          <NFTContainer
            nfts={marketplaceNFTs}
            status={NFTItemStatus.BUY}
            // sort={isAscending ? "as" : "des"}
            sort={"as"}
          />
        </NftList>
      </MainContentContainer>
    </Wrapper>
  );
};

export default Marketplace;
