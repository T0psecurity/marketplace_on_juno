import React, { useState } from "react";
import ReactSelect, { ControlProps } from "react-select";
// import {
//   getCollectionById,
//   MarketplaceInfo,
//   StatisticSettings,
// } from "../../constants/Collections";
// import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { NFTPriceType } from "../../types/nftPriceTypes";
import useStatistic from "./hook/useStatistic";

import {
  StatisticWrapper as Wrapper,
  StatisticItem,
  StatisticValue,
  StatisticName,
  StatisticIcon,
  SelectItem,
  SelectItemTitle,
  SelectItemContent,
  CustomControl,
} from "./styled";

interface StatisticProps {
  items: any[];
  collectionId: string;
}

// type StatisticItemType = {
//   name: string;
//   key: keyof StatisticSettings;
//   icon?: string;
//   mobileRenderOrder: number;
// };

// const STATISTIC_PARAMS: StatisticItemType[] = [
//   {
//     name: "Items",
//     key: "total",
//     mobileRenderOrder: 1,
//   },
//   {
//     name: "Items On Sale",
//     key: "itemsOnSale",
//     mobileRenderOrder: 4,
//   },
//   // {
//   //   name: "Owners",
//   //   key: "owners",
//   // },
//   {
//     name: "Floor Price",
//     key: "hopeFloorPrice",
//     icon: "/coin-images/hope.png",
//     mobileRenderOrder: 2,
//   },
//   // {
//   //   name: "Volume",
//   //   key: "hopeVolume",
//   //   icon: "/coin-images/hope.png",
//   //   mobileRenderOrder: 3,
//   // },
//   {
//     name: "Floor Price",
//     key: "rawFloorPrice",
//     icon: "/coin-images/raw.png",
//     mobileRenderOrder: 3,
//   },
//   {
//     name: "Floor Price",
//     key: "netaFloorPrice",
//     icon: "/coin-images/neta.png",
//     mobileRenderOrder: 4,
//   },
//   {
//     name: "Floor Price",
//     key: "ujunoFloorPrice",
//     icon: "/coin-images/ujuno.png",
//     mobileRenderOrder: 6,
//   },
//   {
//     name: "Volume",
//     key: "totalVolumeInJuno",
//     icon: "/coin-images/ujuno.png",
//     mobileRenderOrder: 7,
//   },
// ];

const Statistic: React.FC<StatisticProps> = ({ items, collectionId }) => {
  const SelectOptions = (
    Object.keys(NFTPriceType) as Array<keyof typeof NFTPriceType>
  ).map((key) => {
    return {
      value: NFTPriceType[key],
      text: key,
    };
  });

  const [selectValue, setSelectValue] = useState(SelectOptions[0]);
  // const { isXs, isSm } = useMatchBreakpoints();
  // const isMobile = isXs || isSm;

  const statistics: any = useStatistic(collectionId, items);
  // const targetCollection: MarketplaceInfo = getCollectionById(
  //   collectionId || ""
  // );

  // if (isMobile) {
  //   const orderedStatisticParams = STATISTIC_PARAMS.sort(
  //     (param1: StatisticItemType, param2: StatisticItemType) => {
  //       return param1.mobileRenderOrder - param2.mobileRenderOrder;
  //     }
  //   );
  //   let firstItems: any[] = [];
  //   let secondItems: any[] = [];
  //   let rendered: number = 0;
  //   orderedStatisticParams.forEach(
  //     (statisticItem: StatisticItemType, index: number) => {
  //       if (
  //         !targetCollection.statisticOption ||
  //         !targetCollection.statisticOption[statisticItem.key]
  //       ) {
  //         if (rendered < 3) {
  //           firstItems.push(
  //             <StatisticItem key={index} isMobile>
  //               <StatisticValue>
  //                 {statisticItem.icon && (
  //                   <StatisticIcon alt="" src={statisticItem.icon} />
  //                 )}
  //                 {statistics[statisticItem.key] || "X"}
  //               </StatisticValue>
  //               <StatisticName>{statisticItem.name}</StatisticName>
  //             </StatisticItem>
  //           );
  //         } else {
  //           secondItems.push(
  //             <StatisticItem key={index} isMobile>
  //               <StatisticValue>
  //                 {statisticItem.icon && (
  //                   <StatisticIcon alt="" src={statisticItem.icon} />
  //                 )}
  //                 {statistics[statisticItem.key] || "X"}
  //               </StatisticValue>
  //               <StatisticName>{statisticItem.name}</StatisticName>
  //             </StatisticItem>
  //           );
  //         }
  //         rendered++;
  //       }
  //     }
  //   );
  //   return (
  //     <>
  //       <Wrapper>{firstItems}</Wrapper>
  //       <Wrapper>{secondItems}</Wrapper>
  //     </>
  //   );
  // }

  const CustomSelectItem = ({ ...props }) => {
    const { selectOption, option } = props;
    return (
      <SelectItem
        onClick={() => {
          if (selectOption) selectOption(option);
        }}
        checked={option.value === selectValue.value}
      >
        <StatisticIcon alt="" src={`/coin-images/${option.value}.png`} />
        <SelectItemTitle>
          <SelectItemContent>{option.text}</SelectItemContent>
          <SelectItemContent>Floor Price</SelectItemContent>
        </SelectItemTitle>
        <StatisticValue>
          {statistics[`${option.value}FloorPrice`] || "X"}
        </StatisticValue>
      </SelectItem>
    );
  };

  const CustomMenuList = (props: any) => {
    const { options, selectOption } = props;
    return options.map((option: any) => (
      <CustomSelectItem selectOption={selectOption} option={option} />
    ));
  };

  const CustomControlItem = ({
    children,
    ...props
  }: ControlProps<any, false>) => {
    return (
      <CustomControl>
        <CustomSelectItem option={selectValue} />
        {children}
      </CustomControl>
    );
  };

  return (
    <Wrapper>
      <StatisticItem>
        <StatisticValue>{statistics.total || "X"}</StatisticValue>
        <StatisticName>Items</StatisticName>
      </StatisticItem>
      <StatisticItem>
        <StatisticValue>{statistics.itemsOnSale || "X"}</StatisticValue>
        <StatisticName>Items On Sale</StatisticName>
      </StatisticItem>
      <StatisticItem>
        <StatisticValue>{statistics.totalVolumeInJuno || "X"}</StatisticValue>
        <StatisticName>Total Volume</StatisticName>
      </StatisticItem>
      <ReactSelect
        value={selectValue}
        onChange={(value: any) => setSelectValue(value)}
        options={SelectOptions}
        styles={{
          container: (provided, state) => ({
            ...provided,
            margin: "5px 10px",
            minWidth: 100,
          }),
          // control: (provided, state) => ({
          //   ...provided,
          //   minHeight: "unset",
          // }),
        }}
        components={{ MenuList: CustomMenuList, Control: CustomControlItem }}
      />
      {/* {STATISTIC_PARAMS.map(
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
      )} */}
    </Wrapper>
  );
};

export default Statistic;
