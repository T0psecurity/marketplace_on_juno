import React from "react";
import {
  getCollectionById,
  MarketplaceInfo,
  StatisticKeys,
} from "../../constants/Collections";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import useStatistic from "./hook/useStatistic";

import {
  StatisticWrapper as Wrapper,
  StatisticItem,
  StatisticValue,
  StatisticName,
  StatisticIcon,
} from "./styled";

interface StatisticProps {
  items: any[];
  collectionId: string;
}

type StatisticItemType = {
  name: string;
  key: `${StatisticKeys}`;
  icon?: string;
  mobileRenderOrder: number;
};

const STATISTIC_PARAMS: StatisticItemType[] = [
  {
    name: "Items",
    key: "total",
    mobileRenderOrder: 1,
  },
  {
    name: "Items On Sale",
    key: "itemsOnSale",
    mobileRenderOrder: 4,
  },
  // {
  //   name: "Owners",
  //   key: "owners",
  // },
  {
    name: "Floor Price",
    key: "hopeFloorPrice",
    icon: "/coin-images/hope.png",
    mobileRenderOrder: 2,
  },
  // {
  //   name: "Volume",
  //   key: "hopeVolume",
  //   icon: "/coin-images/hope.png",
  //   mobileRenderOrder: 3,
  // },
  {
    name: "Floor Price",
    key: "rawFloorPrice",
    icon: "/coin-images/raw.png",
    mobileRenderOrder: 3,
  },
  {
    name: "Floor Price",
    key: "junoFloorPrice",
    icon: "/coin-images/juno.png",
    mobileRenderOrder: 5,
  },
  {
    name: "Volume",
    key: "totalVolumeInJuno",
    icon: "/coin-images/juno.png",
    mobileRenderOrder: 6,
  },
];

const Statistic: React.FC<StatisticProps> = ({ items, collectionId }) => {
  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;

  const statistics: any = useStatistic(collectionId, items);
  const targetCollection: MarketplaceInfo = getCollectionById(
    collectionId || ""
  );

  if (isMobile) {
    const orderedStatisticParams = STATISTIC_PARAMS.sort(
      (param1: StatisticItemType, param2: StatisticItemType) => {
        return param1.mobileRenderOrder - param2.mobileRenderOrder;
      }
    );
    let firstItems: any[] = [];
    let secondItems: any[] = [];
    let rendered: number = 0;
    orderedStatisticParams.forEach(
      (statisticItem: StatisticItemType, index: number) => {
        if (
          !targetCollection.statisticOption ||
          !targetCollection.statisticOption[statisticItem.key]
        ) {
          if (rendered < 3) {
            firstItems.push(
              <StatisticItem key={index} isMobile>
                <StatisticValue>
                  {statisticItem.icon && (
                    <StatisticIcon alt="" src={statisticItem.icon} />
                  )}
                  {statistics[statisticItem.key] || "X"}
                </StatisticValue>
                <StatisticName>{statisticItem.name}</StatisticName>
              </StatisticItem>
            );
          } else {
            secondItems.push(
              <StatisticItem key={index} isMobile>
                <StatisticValue>
                  {statisticItem.icon && (
                    <StatisticIcon alt="" src={statisticItem.icon} />
                  )}
                  {statistics[statisticItem.key] || "X"}
                </StatisticValue>
                <StatisticName>{statisticItem.name}</StatisticName>
              </StatisticItem>
            );
          }
          rendered++;
        }
      }
    );
    return (
      <>
        <Wrapper>{firstItems}</Wrapper>
        <Wrapper>{secondItems}</Wrapper>
      </>
    );
  }

  return (
    <Wrapper>
      {STATISTIC_PARAMS.map(
        (statisticItem: StatisticItemType, index: number) => {
          if (
            targetCollection.statisticOption &&
            targetCollection.statisticOption[statisticItem.key]
          ) {
            return null;
          }
          return (
            <StatisticItem key={index}>
              <StatisticValue>
                {statisticItem.icon && (
                  <StatisticIcon alt="" src={statisticItem.icon} />
                )}
                {statistics[statisticItem.key] || "X"}
              </StatisticValue>
              <StatisticName>{statisticItem.name}</StatisticName>
            </StatisticItem>
          );
        }
      )}
    </Wrapper>
  );
};

export default Statistic;
