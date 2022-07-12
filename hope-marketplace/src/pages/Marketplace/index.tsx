import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
// import CollapseCard from "../../components/CollapseCard";
import NFTContainer from "../../components/NFTContainer";
import NFTIntroduction from "../../components/NFTIntroduction";
import { NFTItemStatus } from "../../components/NFTItem";
import { Title } from "../../components/PageTitle";
import { getCollectionById } from "../../constants/Collections";
import { getCustomTokenId } from "../../hook/useFetch";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import ActivityList from "./AcitivityList";
import FilterPanel from "./FilterPanel";
import useFilter from "./hook/useFilter";
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
  // NftListTitle,
} from "./styled";
import { FilterOptions, MarketplaceTabs } from "./types";

const Marketplace: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(MarketplaceTabs.ITEMS);
  const { isXl } = useMatchBreakpoints();
  const [expandedFilter, setExpandedFilter] = useState<boolean>(isXl);
  const [filterOption, setFilterOption] = useState<FilterOptions>();
  const { search } = useLocation();
  const collectionId = new URLSearchParams(search).get("id");

  useEffect(() => {
    setExpandedFilter(isXl);
  }, [isXl]);

  const targetCollection = useMemo(
    () => getCollectionById(collectionId || ""),
    [collectionId]
  );

  const marketplaceNFTs = useAppSelector((state) => {
    // console.log("nfts", state.nfts);
    return state.nfts[`${targetCollection.collectionId}_marketplace`] || [];
  });
  const saleHistory = useAppSelector(
    (state) => state.collectionStates[collectionId || ""]?.saleHistory
  );

  const metaDataOptions = useMemo(() => {
    let result: { [key: string]: string[] } = {};
    marketplaceNFTs?.forEach((nft: any) => {
      if (
        nft.metaData &&
        nft.metaData.attributes &&
        nft.metaData.attributes.length
      ) {
        nft.metaData.attributes.forEach(
          (attribute: { trait_type: string; value: string }) => {
            result[attribute.trait_type] = [
              ...new Set(
                (result[attribute.trait_type] || []).concat(attribute.value)
              ),
            ];
          }
        );
      }
    });
    return result;
  }, [marketplaceNFTs]);

  const filteredNfts = useFilter(marketplaceNFTs, filterOption);
  const filteredHistory = useMemo(() => {
    const sortedSaleHistory = saleHistory
      ? saleHistory
          .slice()
          .sort((history1: any, history2: any) =>
            history1?.time < history2.time ? 1 : -1
          )
      : [];
    if (filterOption?.searchWord) {
      const result: any[] = [];
      sortedSaleHistory.forEach((item: any) => {
        const tokenId = targetCollection.customTokenId
          ? getCustomTokenId(item.token_id, targetCollection.customTokenId)
          : item.token_id;
        if (tokenId.includes(filterOption.searchWord)) result.push(item);
      });
      return result;
    } else {
      return sortedSaleHistory;
    }
  }, [filterOption, saleHistory, targetCollection]);

  const handleChangeNftListTab = (selected: MarketplaceTabs) => {
    setSelectedTab(selected);
  };

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
      <CollectionDetail>{targetCollection.description}</CollectionDetail>
      <Statistic items={marketplaceNFTs} collectionId={collectionId || ""} />
      <HorizontalDivider />
      <MainContentContainer isMobile={!isXl} expanded={expandedFilter}>
        <FilterPanel
          onChangeExpanded={setExpandedFilter}
          expanded={expandedFilter}
          onChangeFilterOption={setFilterOption}
          metaDataOptions={metaDataOptions}
          onChangeNftListTab={handleChangeNftListTab}
        >
          <NftList>
            {/* <NftListTitle>Items</NftListTitle> */}
            {selectedTab === MarketplaceTabs.ITEMS && (
              <NFTContainer
                nfts={filteredNfts}
                status={NFTItemStatus.BUY}
                // sort={isAscending ? "as" : "des"}
                emptyMsg="No NFTs on Sale"
                sort={"as"}
              />
            )}
            {selectedTab === MarketplaceTabs.ACTIVITY && (
              <ActivityList
                collectionId={collectionId || ""}
                history={filteredHistory}
              />
            )}
          </NftList>
        </FilterPanel>
      </MainContentContainer>
    </Wrapper>
  );
};

export default Marketplace;
