import React from "react";
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
  key: string;
  icon?: string;
};

const STATISTIC_PARAMS: StatisticItemType[] = [
  {
    name: "Items",
    key: "total",
  },
  {
    name: "Items On Sale",
    key: "itemsOnSale",
  },
  // {
  //   name: "Owners",
  //   key: "owners",
  // },
  {
    name: "Floor Price",
    key: "hopeFloorPrice",
    icon: "/coin-images/hope.png",
  },
  {
    name: "Volume",
    key: "hopeVolume",
    icon: "/coin-images/hope.png",
  },
  {
    name: "Floor Price",
    key: "junoFloorPrice",
    icon: "/coin-images/juno.png",
  },
  {
    name: "Volume",
    key: "junoVolume",
    icon: "/coin-images/juno.png",
  },
];

const Statistic: React.FC<StatisticProps> = ({ items, collectionId }) => {
  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;

  const statistics: any = useStatistic(collectionId, items);

  return (
    <Wrapper>
      {STATISTIC_PARAMS.map(
        (statisticItem: StatisticItemType, index: number) => (
          <StatisticItem key={index} isMobile={isMobile}>
            <StatisticValue>
              {statisticItem.icon && (
                <StatisticIcon alt="" src={statisticItem.icon} />
              )}
              {statistics[statisticItem.key] || "X"}
            </StatisticValue>
            <StatisticName>{statisticItem.name}</StatisticName>
          </StatisticItem>
        )
      )}
    </Wrapper>
  );
};

export default Statistic;
