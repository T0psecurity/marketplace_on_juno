import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";

import { Title } from "../../components/PageTitle";
import Collections, { MarketplaceInfo } from "../../constants/Collections";
import { CollectionStateType } from "../../features/collections/collectionsSlice";
import { compareDate } from "../../util/date";
import MintItem from "./MintItem";

import { Wrapper, ButtonContainer, StyledButton } from "./styled";

enum FILTER_TYPE {
  LIVE,
  SOLDOUT,
  SCHEDULED,
  ALL,
}

type FILTERED_RESULT = {
  [key in keyof typeof FILTER_TYPE]: MarketplaceInfo[];
};

const Mint: React.FC = () => {
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.LIVE);
  const collectionStates: { [key: string]: CollectionStateType } =
    useAppSelector((state: any) => state.collectionStates);

  const filteredCollections: MarketplaceInfo[] = useMemo(() => {
    if (filterType === FILTER_TYPE.ALL) return Collections;
    let filteredResult: FILTERED_RESULT = {} as FILTERED_RESULT;
    Collections.forEach((collection: MarketplaceInfo) => {
      const collectionState = collectionStates[collection.collectionId];
      const mintInfo = collection.mintInfo;
      let filteredType = FILTER_TYPE.ALL;

      const mintDate = mintInfo?.mintDate
        ? new Date(mintInfo.mintDate)
        : new Date();
      const now = new Date();
      const isLive = compareDate(now, mintDate) !== -1;
      if (
        !mintInfo ||
        (collectionState.totalNfts !== 0 &&
          collectionState.mintedNfts >= collectionState.totalNfts)
      ) {
        filteredType = FILTER_TYPE.SOLDOUT;
      } else if (!mintInfo.mintDate || isLive) {
        filteredType = FILTER_TYPE.LIVE;
      } else {
        filteredType = FILTER_TYPE.SCHEDULED;
      }
      filteredResult[filteredType] = filteredResult[filteredType]
        ? filteredResult[filteredType].concat(collection)
        : [collection];
    });
    return filteredResult[filterType];
  }, [collectionStates, filterType]);

  return (
    <Wrapper>
      <Title title="Mint Page" />
      <ButtonContainer>
        <StyledButton
          checked={filterType === FILTER_TYPE.LIVE}
          onClick={() => setFilterType(FILTER_TYPE.LIVE)}
        >
          Live
        </StyledButton>
        <StyledButton
          checked={filterType === FILTER_TYPE.SOLDOUT}
          backgroundColor="#C63939"
          color="white"
          onClick={() => setFilterType(FILTER_TYPE.SOLDOUT)}
        >
          Sold Out
        </StyledButton>
        <StyledButton
          checked={filterType === FILTER_TYPE.SCHEDULED}
          backgroundColor="#FCFF5C"
          onClick={() => setFilterType(FILTER_TYPE.SCHEDULED)}
        >
          Scheduled
        </StyledButton>
        <StyledButton
          checked={filterType === FILTER_TYPE.ALL}
          backgroundColor="white"
          onClick={() => setFilterType(FILTER_TYPE.ALL)}
        >
          All
        </StyledButton>
      </ButtonContainer>
      {filteredCollections?.map((collection: MarketplaceInfo, index: number) =>
        collection.mintInfo ? (
          <MintItem key={index} mintItem={collection} />
        ) : null
      )}
    </Wrapper>
  );
};

export default Mint;
