import React, { useMemo, useState } from "react";
import { Title } from "../../components/PageTitle";
import Collections, {
  CollectionIds,
  MarketplaceBasicInfo,
  MarketplaceInfo,
} from "../../constants/Collections";
import MarketplaceItem from "./MarketplaceItem";
import SearchInputer from "../../components/SearchInputer";
import {
  Wrapper,
  SearchWrapper,
  Flex,
  FilterWrapper,
  FilterItem,
} from "./styled";
import {
  NewIcon,
  TopIcon,
  VerifiedIcon,
  CommunityIcon,
  UtilityIcon,
  ArtIcon,
  NFTIcon,
} from "./SvgIcons";
import { useAppSelector } from "../../app/hooks";
import { TotalStateType } from "../../features/collections/collectionsSlice";
import { NFTPriceType } from "../../types/nftPriceTypes";

type FilterOptionsType = {
  title: string;
  Icon: any;
  order: CollectionIds[];
};

const ExploreMarketplace: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [orderValue, setOrderValue] = useState<CollectionIds[]>([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState<string>("");
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const collectionStates: TotalStateType = useAppSelector(
    (state) => state.collectionStates
  );

  const handleChangeSearchValue = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const displayCollections: MarketplaceBasicInfo[] = useMemo(() => {
    let result = Collections;
    if (searchValue) {
      result = result.filter((item: MarketplaceBasicInfo) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    let finalResult: MarketplaceBasicInfo[] = [];
    if (orderValue && orderValue.length) {
      orderValue.forEach((id: CollectionIds) =>
        finalResult.push(result.filter((item) => item.collectionId === id)[0])
      );
    } else {
      finalResult = result;
    }
    return finalResult;
  }, [orderValue, searchValue]);

  const tvlOrderIds = useMemo(() => {
    const junoUsd =
      tokenPrices[NFTPriceType.JUNO]?.market_data.current_price?.usd || 0;
    const idArray = Collections.map((collection: MarketplaceInfo) => {
      const collectionState = collectionStates[collection.collectionId];
      let tradesVolumeResult = 0;
      (Object.keys(NFTPriceType) as Array<keyof typeof NFTPriceType>).forEach(
        (key) => {
          const crrVolume =
            (collectionState.tradingInfo as any)?.[
              `${NFTPriceType[key]}Total`
            ] || 0;
          const crrUsd =
            tokenPrices[NFTPriceType[key]]?.market_data.current_price?.usd || 0;
          tradesVolumeResult += crrUsd ? crrVolume * (junoUsd / crrUsd) : 0;
        }
      );
      return { id: collection.collectionId, volume: tradesVolumeResult };
    });
    return idArray
      .sort((item1, item2) => (item1.volume < item2.volume ? 1 : -1))
      .map((item) => item.id);
  }, [collectionStates, tokenPrices]);

  const filterOptions: FilterOptionsType[] = [
    {
      title: "New",
      Icon: () => <NewIcon />,
      order: [
        CollectionIds.WITCHES,
        CollectionIds.CRYPTOGIRLS,
        CollectionIds.BORED,
        CollectionIds.GOBLIN,
        CollectionIds.NETANOTS,
        CollectionIds.SUNNYSIDE,
        CollectionIds.JUNOPUNKS,
        CollectionIds.MINTPASSI,
        CollectionIds.MINTPASSII,
        CollectionIds.HOPEGALAXYI,
      ],
    },
    {
      title: "Top",
      Icon: () => <TopIcon />,
      order: tvlOrderIds,
    },
    {
      title: "Verified",
      Icon: () => <VerifiedIcon />,
      order: [
        CollectionIds.HOPEGALAXYI,
        CollectionIds.MINTPASSI,
        CollectionIds.MINTPASSII,
        CollectionIds.JUNOPUNKS,
      ],
    },
    {
      title: "Community",
      Icon: () => <CommunityIcon />,
      order: [
        CollectionIds.BORED,
        CollectionIds.GOBLIN,
        CollectionIds.NETANOTS,
        CollectionIds.WITCHES,
      ],
    },
    {
      title: "Utility",
      Icon: () => <UtilityIcon />,
      order: [
        CollectionIds.HOPEGALAXYI,
        CollectionIds.JUNOPUNKS,
        CollectionIds.JUNOFARMING,
        CollectionIds.MINTPASSI,
        CollectionIds.MINTPASSII,
      ],
    },
    {
      title: "Art",
      Icon: () => <ArtIcon />,
      order: [
        CollectionIds.SUNNYSIDE,
        CollectionIds.GOBLIN,
        CollectionIds.CRYPTOGIRLS,
        CollectionIds.BORED,
      ],
    },
    {
      title: "Collectibles",
      Icon: () => <NFTIcon />,
      order: [],
    },
  ];

  const handleClickFilterOption = (item: FilterOptionsType) => {
    if (item.title === selectedFilterOption) {
      setSelectedFilterOption("");
      setOrderValue([]);
    } else {
      setSelectedFilterOption(item.title);
      setOrderValue(item.order);
    }
  };

  return (
    <Wrapper>
      <Title title="Explore Collections" />
      <FilterWrapper>
        {filterOptions.map((item: FilterOptionsType, index: number) => (
          <FilterItem
            key={index}
            checked={selectedFilterOption === item.title}
            onClick={() => handleClickFilterOption(item)}
          >
            {item.title}
            <item.Icon />
          </FilterItem>
        ))}
      </FilterWrapper>
      <SearchWrapper>
        <SearchInputer onChange={handleChangeSearchValue} />
      </SearchWrapper>
      <Flex>
        {displayCollections.map((item: MarketplaceBasicInfo, index: number) => (
          <MarketplaceItem key={item.collectionId} {...item} />
        ))}
      </Flex>
    </Wrapper>
  );
};

export default ExploreMarketplace;
