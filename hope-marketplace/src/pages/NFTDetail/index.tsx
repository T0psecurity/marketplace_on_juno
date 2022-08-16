import React, { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import NFTItemDetail from "../../components/NFTItemDetail";
import usePickNFT from "../../hook/usePickNFT";
// import { getCollectionById } from "../../constants/Collections";
import {
  Wrapper,
  NFTItemAttributesContainer,
  NFTItemAttributeItem,
  AttributeOfferPanel,
  NFTItemDescription,
  NFTItemDescriptionHeader,
  NFTItemDescriptionContent,
  NFTItemAttributeType,
  NFTItemAttributeValue,
  ViewCollectionButton,
  // HorizontalDivider,
} from "./styled";
import { CollectionTraitsStateType } from "../../features/collectionTraits/collectionTraitsSlice";
import { addSpecialForUrl } from "../../util/string";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import {
  AttributeIcon,
  ItemActivityIcon,
  MoreFromCollectionIcon,
  OfferListIcon,
} from "../../components/SvgIcons";
import ActivityList from "../../components/ActivityList";
import { getRandomIndex } from "../../util/basic";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
// import NFTAdvertise from "../../components/NFTAdvertise";

const NFTDetail: React.FC = () => {
  // const selectedNFT = useAppSelector((state) => state.nfts.selectedNFT);
  const { search } = useLocation();
  const token_id = addSpecialForUrl(
    new URLSearchParams(search).get("token_id")
  );
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const { pickNFTByTokenId } = usePickNFT();
  const selectedNFT: any = pickNFTByTokenId(token_id || "");
  const history = useHistory();

  const collectionTraitsState: CollectionTraitsStateType = useAppSelector(
    (state: any) => state.collectionTraitsStates[selectedNFT.collectionId]
  );
  const marketplaceNFTs = useAppSelector(
    (state) => (state.nfts as any)[`${selectedNFT.collectionId}_marketplace`]
  );

  const randomNfts = useMemo(() => {
    if (!marketplaceNFTs.length) return [];
    const randomIndex = getRandomIndex({ max: marketplaceNFTs.length - 1 }, 4);
    return randomIndex.map((index) => marketplaceNFTs[index]);
  }, [marketplaceNFTs]);

  const filterActivitiesFunc = useCallback(
    (activities: any[]) => {
      return activities
        ? activities
            .slice()
            .sort((history1: any, history2: any) =>
              history1?.time < history2.time ? 1 : -1
            )
            .filter((item) => item.token_id === token_id)
        : [];
    },
    [token_id]
  );

  return (
    <Wrapper>
      {/* <NFTAdvertise collection={targetCollection} />
      <HorizontalDivider /> */}

      <NFTItemDetail item={selectedNFT} />
      <AttributeOfferPanel isMobile={isMobile}>
        <NFTItemDescription>
          <NFTItemDescriptionHeader>
            <AttributeIcon width={30} height={30} />
            Attribute
          </NFTItemDescriptionHeader>
          <NFTItemDescriptionContent>
            {selectedNFT.metaData?.attributes?.length && (
              <NFTItemAttributesContainer>
                {selectedNFT.metaData?.attributes.map(
                  (
                    attribute: { trait_type: string; value: string },
                    index: number
                  ) =>
                    collectionTraitsState[attribute.value] && (
                      <NFTItemAttributeItem key={index}>
                        <NFTItemAttributeType>
                          {attribute.trait_type}
                        </NFTItemAttributeType>
                        <NFTItemAttributeValue>
                          <span>{attribute.value.replace(/_/g, " ")}</span>
                          <span>{`${collectionTraitsState[attribute.value]} / ${
                            collectionTraitsState.total
                          } `}</span>
                        </NFTItemAttributeValue>
                      </NFTItemAttributeItem>
                    )
                )}
              </NFTItemAttributesContainer>
            )}
          </NFTItemDescriptionContent>
        </NFTItemDescription>
        <NFTItemDescription>
          <NFTItemDescriptionHeader>
            <OfferListIcon width={30} height={30} /> NFT Offers
          </NFTItemDescriptionHeader>
          <NFTItemDescriptionContent></NFTItemDescriptionContent>
        </NFTItemDescription>
      </AttributeOfferPanel>
      <NFTItemDescription>
        <NFTItemDescriptionHeader>
          <ItemActivityIcon width={30} height={30} />
          Items Activity
        </NFTItemDescriptionHeader>
        <NFTItemDescriptionContent>
          <ActivityList
            filterFunc={filterActivitiesFunc}
            collectionId={selectedNFT.collectionId}
          />
        </NFTItemDescriptionContent>
      </NFTItemDescription>
      <NFTItemDescription>
        <NFTItemDescriptionHeader>
          <MoreFromCollectionIcon width={30} height={30} /> More from this
          collection
          <ViewCollectionButton
            onClick={() => {
              history.push(
                `/collections/marketplace?id=${selectedNFT.collectionId}`
              );
            }}
          >
            View
          </ViewCollectionButton>
        </NFTItemDescriptionHeader>
        <NFTItemDescriptionContent maxHeight="500px">
          <NFTContainer
            nfts={randomNfts}
            status={NFTItemStatus.BUY}
            emptyMsg="No NFTs on Sale"
            sort={"as"}
          />
        </NFTItemDescriptionContent>
      </NFTItemDescription>
    </Wrapper>
  );
};

export default NFTDetail;
