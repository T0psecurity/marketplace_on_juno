import React, { useCallback, useMemo, useState, useEffect } from "react";
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
  CoinIconWrapper,
  CoinIcon,
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
import {
  getCollectionById,
  MarketplaceContracts,
} from "../../constants/Collections";
import useContract from "../../hook/useContract";
import Text from "../../components/Text";
import { TokenType } from "../../types/tokens";
import moment from "moment";
// import NFTAdvertise from "../../components/NFTAdvertise";

const MAX_ITEM = 30;

const NFTDetail: React.FC = () => {
  // const selectedNFT = useAppSelector((state) => state.nfts.selectedNFT);
  const [refreshInterval, setRefreshInterval] = useState(0);
  const [offers, setOffers] = useState([]);
  const { search } = useLocation();
  const token_id = addSpecialForUrl(
    new URLSearchParams(search).get("token_id")
  );

  const { runQuery } = useContract();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const { pickNFTByTokenId } = usePickNFT();
  const selectedNFT: any = pickNFTByTokenId(token_id || "");
  const history = useHistory();

  const targetCollection = getCollectionById(selectedNFT.collectionId);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshInterval((prev) => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!targetCollection?.nftContract) return;
    (async () => {
      let offers: any = [];
      const fetchOffers = async (startAfter?: any) => {
        const fetchedOffersResult = await runQuery(MarketplaceContracts[0], {
          bids: {
            collection: targetCollection.nftContract,
            token_id: selectedNFT.token_id,
            start_after: startAfter,
            limit: MAX_ITEM,
          },
        });
        const fetchedOffers = fetchedOffersResult.bids || [];
        offers = offers.concat(fetchedOffers);
        if (fetchedOffers.length === MAX_ITEM) {
          await fetchOffers(fetchedOffers[MAX_ITEM - 1].bidder);
        }
      };
      await fetchOffers();
      setOffers(offers);
    })();
  }, [
    refreshInterval,
    runQuery,
    selectedNFT.token_id,
    targetCollection.nftContract,
  ]);

  const collectionTraitsState: CollectionTraitsStateType = useAppSelector(
    (state: any) => state.collectionTraitsStates[selectedNFT.collectionId]
  );
  const marketplaceNFTs = useAppSelector(
    (state) => (state.nfts as any)[`${selectedNFT.collectionId}_marketplace`]
  );
  const tokenPrices = useAppSelector((state) => state.tokenPrices);

  const randomNfts = useMemo(() => {
    if (!marketplaceNFTs?.length) return [];
    const randomIndex = getRandomIndex({ max: marketplaceNFTs.length - 1 }, 4);
    return randomIndex.map((index) => marketplaceNFTs[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshInterval]);

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
          <NFTItemDescriptionContent>
            <table>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>USD Price</th>
                  <th>Expiration</th>
                  <th>From</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer: any, index: number) => {
                  const listPrice = offer.list_price || {};
                  const tokenName = (
                    Object.keys(TokenType) as Array<keyof typeof TokenType>
                  ).filter((key) => TokenType[key] === listPrice?.denom)[0];
                  const tokenPrice =
                    tokenPrices[listPrice?.denom as TokenType]?.market_data
                      .current_price?.usd || 0;
                  const priceInUsd = (
                    (+listPrice.amount * tokenPrice) /
                    1e6
                  ).toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  });
                  const expirationDate = moment(
                    new Date(+(offer?.expires_at || "0") / 1e6)
                  ).format("YYYY-MM-DD hh:mm:ss");
                  return (
                    <tr key={index}>
                      <td>
                        <CoinIconWrapper>
                          <CoinIcon
                            alt=""
                            src={`/coin-images/${listPrice?.denom.replace(
                              /\//g,
                              ""
                            )}.png`}
                          />
                          <Text>{Number(listPrice.amount) / 1e6}</Text>
                          <Text>{tokenName}</Text>
                        </CoinIconWrapper>
                      </td>
                      <td>{priceInUsd}</td>
                      <td>{expirationDate}</td>
                      <td>{offer.bidder}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </NFTItemDescriptionContent>
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
