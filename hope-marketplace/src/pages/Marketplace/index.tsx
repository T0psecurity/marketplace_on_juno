import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import NFTAdvertise from "../../components/NFTAdvertise";
// import CollapseCard from "../../components/CollapseCard";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
import { getCollectionById, CollectionIds } from "../../constants/Collections";
import { getCustomTokenId } from "../../hook/useFetch";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import ActivityList from "../../components/ActivityList";
// import ExploreHeader from "../../components/ExploreHeader";
import FilterPanel from "./FilterPanel";
import useFilter from "./hook/useFilter";
import Statistic from "./Statistic";
import {
  Wrapper,
  HorizontalDivider,
  // SortButtonContainer,
  MainContentContainer,
  NftList,
  // NftListTitle,
} from "./styled";
import { FilterOptions, MarketplaceTabs } from "./types";

const Marketplace: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(MarketplaceTabs.ITEMS);
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const [expandedFilter, setExpandedFilter] = useState<boolean>(
    isXs || isSm || isMd
  );
  const [filterOption, setFilterOption] = useState<FilterOptions>();
  const { search } = useLocation();
  const collectionId = new URLSearchParams(search).get("id") || "";

  useEffect(() => {
    setExpandedFilter(isXs || isSm || isMd);
  }, [isXs, isSm, isMd]);

  const targetCollection = useMemo(
    () => getCollectionById(collectionId || ""),
    [collectionId]
  );

  const marketplaceNFTs = useAppSelector((state) => {
    // console.log("nfts", state.nfts);
    return (
      (state.nfts as any)[`${targetCollection.collectionId}_marketplace`] || []
    );
  });

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

  const filteredNfts = useFilter(
    marketplaceNFTs,
    filterOption,
    collectionId as CollectionIds
  );

  const filterActivitiesFunc = useCallback(
    (activities: any[]) => {
      const sortedSaleHistory = activities
        ? activities
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
    },
    [filterOption, targetCollection.customTokenId]
  );

  const handleChangeNftListTab = (selected: MarketplaceTabs) => {
    setSelectedTab(selected);
  };

  return (
    <Wrapper>
      {/* <ExploreHeader /> */}
      <NFTAdvertise collection={targetCollection} />
      <Statistic items={marketplaceNFTs} collectionId={collectionId || ""} />
      <HorizontalDivider />
      <MainContentContainer
        isMobile={isXs || isSm || isMd}
        expanded={expandedFilter}
      >
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
                filterFunc={filterActivitiesFunc}
                collectionId={targetCollection.collectionId}
              />
            )}
          </NftList>
        </FilterPanel>
      </MainContentContainer>
    </Wrapper>
  );
};

export default Marketplace;
