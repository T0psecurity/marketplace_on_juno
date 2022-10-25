import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import Advertise, { Advertise1 } from "../../components/Advertise";
import ExploreHeader from "../../components/ExploreHeader";

// import { Title } from "../../components/PageTitle";
import Collections, {
  CollectionIds,
  MarketplaceInfo,
} from "../../constants/Collections";
import { TotalStateType } from "../../features/collections/collectionsSlice";
import { compareDate } from "../../util/date";
import MintItem from "./MintItem";

import { Wrapper } from "./styled";

enum FILTER_TYPE {
  LIVE,
  SOLDOUT,
  SCHEDULED,
  ALL,
}

const FilterButtonOptions: {
  [key in FILTER_TYPE]: {
    title: string;
    backgroundColor?: string;
    color?: string;
  };
} = {
  [FILTER_TYPE.LIVE]: {
    title: "Live",
  },
  [FILTER_TYPE.SOLDOUT]: {
    title: "Sold out",
    backgroundColor: "#C63939",
    color: "white",
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

const DISPLAY_ORDER = [CollectionIds.PUNKLAND];

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

  const exploreHeaderTabs = useMemo(() => {
    const result: any = [];
    (Object.keys(FILTER_TYPE) as Array<keyof typeof FILTER_TYPE>).forEach(
      (key) => {
        const crrOption = FilterButtonOptions[FILTER_TYPE[key]];
        if (crrOption) {
          let count = 0;
          totalFilteredCollections?.[FILTER_TYPE[key]]?.forEach(
            (collection) => !!collection.mintInfo && count++
          );
          result.push({
            title: `${crrOption.title} (${count})`,
            onClick: () => setFilterType(FILTER_TYPE[key]),
            selected: () => filterType === FILTER_TYPE[key],
          });
        }
      }
    );
    return result;
  }, [filterType, totalFilteredCollections]);
  return (
    <Wrapper>
      {/* <Title title="Mint Page" /> */}
      <ExploreHeader title="Mint Page" tabs={exploreHeaderTabs} />
      <Advertise images={Advertise1} />
      {/* <ButtonContainer>
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
                key={key}
                checked={filterType === FILTER_TYPE[key]}
                onClick={() => setFilterType(FILTER_TYPE[key])}
                backgroundColor={crrOption.backgroundColor}
                color={crrOption.color}
              >
                {`${crrOption.title} (${count})`}
              </StyledButton>
            );
          }
        )}
      </ButtonContainer> */}
      {filteredCollections
        ?.sort((collection1, collection2) => {
          const index1 =
            DISPLAY_ORDER.findIndex(
              (order) => order === collection1.collectionId
            ) ?? -1;
          const index2 =
            DISPLAY_ORDER.findIndex(
              (order) => order === collection2.collectionId
            ) ?? -1;
          return index2 - index1;
        })
        .map((collection: MarketplaceInfo, index: number) =>
          collection.mintInfo ? (
            <MintItem key={collection.collectionId} mintItem={collection} />
          ) : null
        )}
    </Wrapper>
  );
};

export default Mint;
