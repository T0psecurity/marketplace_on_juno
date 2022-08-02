import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";

import { Title } from "../../components/PageTitle";
import Collections, { MarketplaceInfo } from "../../constants/Collections";
import { TotalStateType } from "../../features/collections/collectionsSlice";
import { compareDate } from "../../util/date";
import MintItem from "./MintItem";

import { Wrapper, ButtonContainer, StyledButton } from "./styled";

enum FILTER_TYPE {
  LIVE,
  SOLDOUT,
  SCHEDULED,
  ALL,
}

const FilterButtonOptions: {
  [key in FILTER_TYPE]: { title: string; backgroundColor?: string };
} = {
  [FILTER_TYPE.LIVE]: {
    title: "Live",
  },
  [FILTER_TYPE.SOLDOUT]: {
    title: "Sold out",
    backgroundColor: "#C63939",
  },
  [FILTER_TYPE.SCHEDULED]: {
    title: "Scheduled",
    backgroundColor: "#FCFF5C",
  },
  [FILTER_TYPE.ALL]: {
    title: "All",
    backgroundColor: "white",
  },
};

type FILTERED_RESULT = {
  [key in keyof typeof FILTER_TYPE]: MarketplaceInfo[];
};

export const TIME_DIFF_BETWEEN_ONCHAIN = 100;

const Mint: React.FC = () => {
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.LIVE);
  const collectionStates: TotalStateType = useAppSelector(
    (state: any) => state.collectionStates
  );

  const {
    filteredCollections,
    totalFilteredCollections,
  }: {
    filteredCollections: MarketplaceInfo[];
    totalFilteredCollections: FILTERED_RESULT;
  } = useMemo(() => {
    // if (filterType === FILTER_TYPE.ALL) return { filteredCollections: Collections };
    let filteredResult: FILTERED_RESULT = {} as FILTERED_RESULT;
    Collections.forEach((collection: MarketplaceInfo) => {
      const collectionState = collectionStates[collection.collectionId];
      const mintInfo = collection.mintInfo;
      let filteredType = FILTER_TYPE.ALL;

      let mintDate = mintInfo?.mintDate
        ? new Date(mintInfo.mintDate)
        : new Date();
      if (collectionState.mintInfo?.startMintTime) {
        mintDate = new Date(
          (collectionState.mintInfo.startMintTime + TIME_DIFF_BETWEEN_ONCHAIN) *
            1000
        );
      }
      const now = new Date();
      const isLive = compareDate(now, mintDate) !== -1;
      if (
        !mintInfo ||
        (collectionState?.totalNfts !== 0 &&
          collectionState?.mintedNfts >= collectionState?.totalNfts)
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
    filteredResult[FILTER_TYPE.ALL] = Collections;
    return {
      filteredCollections: filteredResult[filterType],
      totalFilteredCollections: filteredResult,
    };
  }, [collectionStates, filterType]);

  return (
    <Wrapper>
      <Title title="Mint Page" />
      <ButtonContainer>
        {(Object.keys(FILTER_TYPE) as Array<keyof typeof FILTER_TYPE>).map(
          (key) => {
            const crrOption = FilterButtonOptions[FILTER_TYPE[key]];
            if (!crrOption) return null;
            let count = 0;
            totalFilteredCollections?.[FILTER_TYPE[key]]?.forEach(
              (collection) => !!collection.mintInfo && count++
            );
            return (
              <StyledButton
                checked={filterType === FILTER_TYPE[key]}
                onClick={() => setFilterType(FILTER_TYPE[key])}
                backgroundColor={crrOption.backgroundColor}
              >
                {`${crrOption.title} (${count})`}
              </StyledButton>
            );
          }
        )}
        {/* <StyledButton
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
        </StyledButton> */}
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
