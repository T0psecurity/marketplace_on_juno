import React from "react";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import useStatistic from "./hook/useStatistic";

import {
  StatisticWrapper as Wrapper,
  StatisticItem,
  StatisticValue,
  StatisticName,
} from "./styled";

interface StatisticProps {
  items: any[];
}

type StatisticItemType = { name: string; key: string };

const STATISTIC_PARAMS: StatisticItemType[] = [
  {
    name: "Items",
    key: "total",
  },
  {
    name: "Owners",
    key: "owners",
  },
  {
    name: "Floor Price",
    key: "floorPrice",
  },
  {
    name: "Volume Trade",
    key: "volumeTrade",
  },
];

const Statistic: React.FC<StatisticProps> = ({ items }) => {
  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;

  const statistics: any = useStatistic(items);

  return (
    <Wrapper>
      {STATISTIC_PARAMS.map(
        (statisticItem: StatisticItemType, index: number) => (
          <StatisticItem key={index} isMobile={isMobile}>
            <StatisticValue>
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
