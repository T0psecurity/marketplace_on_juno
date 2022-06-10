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
import Statistic from "./Statistic";
import {
  Wrapper,
  Creator,
  CollectionDetail,
  HorizontalDivider,
  StyledButton as Button,
  // SortButtonContainer,
  MainContentContainer,
  FilterContainer,
  FilterContainerTitle,
  NftList,
  StatusFilterPanel,
  StyledSvg,
  StyledCollapseCard as CollapseCard,
} from "./styled";

const ArrowIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: any;
}) => (
  <StyledSvg
    className={className}
    viewBox="0 0 1128 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M1097.855149 473.209109h-929.064612L568.332002 76.916503a44.938006 44.938006 0 1 0-63.543869-63.55752L0 518.147115l493.403474 492.993954a43.90465 43.90465 0 0 0 62.110549-62.069598L168.544825 563.071471h929.310324a29.94957 29.94957 0 0 0 30.031475-30.031475v-29.881317a29.93592 29.93592 0 0 0-30.031475-29.94957z"
      fill=""
    />
  </StyledSvg>
);

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
      />
      <Title title={targetCollection.title} />
      <Creator>{`created by ${targetCollection.creator || "      "}`}</Creator>
      <Statistic items={marketplaceNFTs} />
      <CollectionDetail>{targetCollection.description}</CollectionDetail>
      <HorizontalDivider />
      <MainContentContainer isMobile={!isXl} expanded={expandedFilter}>
        <FilterContainer>
          <FilterContainerTitle>
            Filter
            <ArrowIcon onClick={() => setExpandedFilter(!expandedFilter)} />
          </FilterContainerTitle>
          <CollapseCard title="Status">
            <StatusFilterPanel>
              <Button>Buy Now</Button>
              <Button>On Auction</Button>
              <Button>New</Button>
              <Button>Has Offers</Button>
            </StatusFilterPanel>
          </CollapseCard>
          <CollapseCard title="Price" />
          <CollapseCard title="Chains" />
          <CollapseCard title="On Sale In" />
        </FilterContainer>
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
