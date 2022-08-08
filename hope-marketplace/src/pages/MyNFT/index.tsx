import React, { useContext, useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";

import {
  Wrapper,
  ProfileImage,
  HorizontalDivider,
  TokenBalancesWrapper,
  TokenBalanceItem,
  CoinIcon,
  TokenBalance,
  TokenTypeString,
  CoinIconWrapper,
  WithdrawButton,
  MyNftsHeader,
  Tab,
  SearchWrapper,
  ActivityHeader,
  TokenContainer,
} from "./styled";

import { useAppSelector } from "../../app/hooks";
import { SubTitle, Title } from "../../components/PageTitle";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
import Collections, {
  CollectionIds,
  getCollectionById,
  MarketplaceInfo,
} from "../../constants/Collections";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { TokenStatus, TokenType } from "../../types/tokens";
import usePopoutQuickSwap, { SwapType } from "../../components/Popout";
import { ChainTypes } from "../../constants/ChainTypes";
import { Tabs } from "./styled";
import SearchInputer from "../../components/SearchInputer";
import ActivityList from "../../components/ActivityList";
import ReactSelect from "react-select";
import { ThemeContext } from "../../context/ThemeContext";
import { SortDirectionType } from "../Marketplace/types";
import { getCustomTokenId } from "../../hook/useFetch";
// import { getCustomTokenId } from "../../hook/useFetch";

enum TAB_TYPE {
  ITEMS = "NFTs",
  ACTIVITY = "Activity",
}

enum NFT_TYPE {
  ALL = "My NFTs",
  AVAILABLE = "Available",
  ONSALE = "On Sale",
}

// const checkSearchedNft = (
//   nft: any,
//   searchWord: string,
//   customTokenId: string
// ) => {
//   const tokenId = customTokenId
//     ? getCustomTokenId(nft.token_id, customTokenId)
//     : nft.token_id;
//   return tokenId.includes(searchWord);
// };

const SortDirectionSelectOptions = [
  {
    label: "No Sort",
    value: undefined,
  },
  {
    label: "Price low to high",
    value: SortDirectionType.asc,
  },
  {
    label: "Price high to low",
    value: SortDirectionType.desc,
  },
];

const MyNFT: React.FC = () => {
  const [selectedPageTab, setSelectedPageTab] = useState<TAB_TYPE>(
    TAB_TYPE.ITEMS
  );
  const [selectedNftTab, setSelectedNftTab] = useState<NFT_TYPE>(NFT_TYPE.ALL);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchActivityValue, setSearhActivityValue] = useState("");
  const [selectedTokenType, setSelectedTokenType] = useState<
    TokenType | undefined
  >();
  const [sortDirection, setSortDirection] = useState<
    SortDirectionType | undefined
  >(SortDirectionSelectOptions[0].value);
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const popoutQuickSwap = usePopoutQuickSwap();
  const { isDark } = useContext(ThemeContext);
  const isMobile = isXs || isSm || isMd;
  const nfts = useAppSelector((state) => state.nfts);
  const balances = useAppSelector((state) => state.balances);
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const account = useAppSelector((state) => state.accounts.keplrAccount);

  const myNfts: { [key in NFT_TYPE]: any } = useMemo(() => {
    let unlistedNFTs: any = [],
      listedNFTs: any = [],
      all: any = [];
    Collections.forEach((collection: MarketplaceInfo) => {
      const collectionId = collection.collectionId;
      const listedKey = `${collectionId}_listed`;
      if (
        nfts[collectionId] &&
        nfts[collectionId].length &&
        (!searchValue ||
          collection.title.toLowerCase().includes(searchValue.toLowerCase()))
      ) {
        // nfts[collectionId].forEach((item: any) => {
        //   if (
        //     !searchValue ||
        //     checkSearchedNft(item, searchValue, collection.customTokenId || "")
        //   ) {
        //     unlistedNFTs.push(item);
        //     all.push(item);
        //   }
        // });
        unlistedNFTs = unlistedNFTs.concat(nfts[collectionId]);
        all = all.concat(nfts[collectionId]);
      }
      if (
        (nfts as any)[listedKey] &&
        (nfts as any)[listedKey].length &&
        (!searchValue ||
          collection.title.toLowerCase().includes(searchValue.toLowerCase()))
      ) {
        // (nfts as any)[listedKey].forEach((item: any) => {
        //   if (
        //     !searchValue ||
        //     checkSearchedNft(item, searchValue, collection.customTokenId || "")
        //   ) {
        //     listedNFTs.push(item);
        //     all.push(item);
        //   }
        // });
        listedNFTs = listedNFTs.concat((nfts as any)[listedKey]);
        all = all.concat((nfts as any)[listedKey]);
      }
    });
    return {
      [NFT_TYPE.ALL]: unlistedNFTs.concat(listedNFTs),
      [NFT_TYPE.AVAILABLE]: unlistedNFTs,
      [NFT_TYPE.ONSALE]: listedNFTs,
    };
  }, [nfts, searchValue]);

  const handleClickBalanceItem = (tokenType: TokenType) => {
    const tokenStatus = TokenStatus[tokenType];
    if (!tokenStatus.isIBCCOin) return;
    popoutQuickSwap(
      {
        swapType: SwapType.WITHDRAW,
        denom: tokenType,
        swapChains: {
          origin: tokenStatus.chain,
          foreign: ChainTypes.JUNO,
        },
      },
      true,
      (status: any) => {
        if (status) {
          toast.success("IBC Transfer Success!");
        }
      }
    );
  };

  const handleChangeSearchValue = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleChangeActivitySearchValue = (e: any) => {
    const { value } = e.target;
    setSearhActivityValue(value);
  };

  const handleChangeSortDirection = (item: any) => {
    setSortDirection(item.value);
  };

  const filterActivitiesFunc = useCallback(
    (activities: any[]) => {
      let result: any[] = [];
      if (searchActivityValue || selectedTokenType) {
        activities.forEach((activityItem: any) => {
          let filtered = true;
          if (searchActivityValue) {
            const targetCollection = getCollectionById(
              activityItem.collectionId as CollectionIds
            );
            const tokenId = targetCollection.customTokenId
              ? getCustomTokenId(
                  activityItem.token_id,
                  targetCollection.customTokenId
                )
              : activityItem.token_id;
            filtered =
              filtered &&
              tokenId.toLowerCase().includes(searchActivityValue.toLowerCase());
          }
          if (selectedTokenType) {
            filtered =
              filtered && activityItem.denom === (selectedTokenType as string);
          }
          if (filtered) {
            result = [...result, activityItem];
          }
        });
      } else {
        result = activities;
      }
      return result.sort((item1: any, item2: any) => {
        if (
          sortDirection === SortDirectionType.asc ||
          sortDirection === SortDirectionType.desc
        ) {
          const tokenPrice1 =
            tokenPrices[item1.denom as TokenType]?.market_data.current_price
              ?.usd || 0;
          const tokenPrice2 =
            tokenPrices[item2.denom as TokenType]?.market_data.current_price
              ?.usd || 0;

          const price1 = tokenPrice1 * Number(item1.amount);
          const price2 = tokenPrice2 * Number(item2.amount);
          if (sortDirection === SortDirectionType.asc) {
            return price1 < price2 ? -1 : 1;
          } else {
            return price1 < price2 ? 1 : -1;
          }
        }
        return item1?.time < item2.time ? 1 : -1;
      });
    },
    [searchActivityValue, selectedTokenType, sortDirection, tokenPrices]
  );

  return (
    <Wrapper isMobile={isMobile}>
      <Title title="Profile" icon={<ProfileImage />} />
      <HorizontalDivider />
      <SubTitle subTitle="My Balance on Juno Chain" textAlign="left" />
      <TokenTypeString>JUNO Chain Assets</TokenTypeString>
      <TokenBalancesWrapper>
        {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
          (key) => {
            const denom = TokenType[key];
            const tokenStatus = TokenStatus[denom];
            if (tokenStatus.isIBCCOin) return null;
            return (
              <TokenBalanceItem
                key={denom}
                onClick={() => handleClickBalanceItem(denom)}
              >
                <CoinIconWrapper>
                  <CoinIcon
                    alt=""
                    src={`/coin-images/${denom.replace(/\//g, "")}.png`}
                  />
                  <TokenBalance>{key}</TokenBalance>
                </CoinIconWrapper>
                <TokenBalance>
                  {((balances?.[denom]?.amount || 0) / 1e6).toLocaleString(
                    "en-US",
                    { maximumFractionDigits: 3 }
                  )}
                </TokenBalance>
              </TokenBalanceItem>
            );
          }
        )}
      </TokenBalancesWrapper>
      <TokenTypeString>
        IBC Assets
        {/* <span>(Click Asset to Withdraw)</span> */}
      </TokenTypeString>
      <TokenBalancesWrapper>
        {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
          (key) => {
            const denom = TokenType[key];
            const tokenStatus = TokenStatus[denom];
            if (!tokenStatus.isIBCCOin) return null;
            return (
              <TokenBalanceItem key={denom} marginBottom="20px">
                <CoinIconWrapper>
                  <CoinIcon
                    alt=""
                    src={`/coin-images/${denom.replace(/\//g, "")}.png`}
                  />
                  <TokenBalance>{key}</TokenBalance>
                </CoinIconWrapper>
                <TokenBalance>
                  {((balances?.[denom]?.amount || 0) / 1e6).toLocaleString(
                    "en-US",
                    { maximumFractionDigits: 3 }
                  )}
                </TokenBalance>
                <WithdrawButton onClick={() => handleClickBalanceItem(denom)}>
                  Withdraw
                </WithdrawButton>
              </TokenBalanceItem>
            );
          }
        )}
      </TokenBalancesWrapper>
      <Tabs margin="50px 0">
        {(Object.keys(TAB_TYPE) as Array<keyof typeof TAB_TYPE>).map((key) => (
          <Tab
            key={key}
            fontSize="1.17em"
            selected={selectedPageTab === TAB_TYPE[key]}
            onClick={() => setSelectedPageTab(TAB_TYPE[key])}
          >
            {key}
          </Tab>
        ))}
      </Tabs>
      <SubTitle subTitle={`My ${selectedPageTab}`} />
      <HorizontalDivider />
      {selectedPageTab === TAB_TYPE.ITEMS && (
        <>
          <MyNftsHeader>
            <Tabs>
              {(Object.keys(NFT_TYPE) as Array<keyof typeof NFT_TYPE>).map(
                (key) => (
                  <Tab
                    key={key}
                    selected={selectedNftTab === NFT_TYPE[key]}
                    onClick={() => setSelectedNftTab(NFT_TYPE[key])}
                  >{`${NFT_TYPE[key]} (${
                    myNfts[NFT_TYPE[key]].length || 0
                  })`}</Tab>
                )
              )}
            </Tabs>
            <SearchWrapper>
              <SearchInputer onChange={handleChangeSearchValue} />
            </SearchWrapper>
          </MyNftsHeader>
          <NFTContainer
            nfts={myNfts[selectedNftTab]}
            status={NFTItemStatus.SELL}
            emptyMsg="No NFTs in your wallet"
          />
        </>
      )}
      {selectedPageTab === TAB_TYPE.ACTIVITY && (
        <>
          <ActivityHeader>
            <TokenContainer>
              {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
                (key) => (
                  <CoinIcon
                    alt=""
                    src={`/coin-images/${TokenType[key].replace(
                      /\//g,
                      ""
                    )}.png`}
                    size="50px"
                    onClick={() => {
                      setSelectedTokenType((prev) =>
                        prev === TokenType[key] ? undefined : TokenType[key]
                      );
                    }}
                  />
                )
              )}
            </TokenContainer>
            <ReactSelect
              defaultValue={SortDirectionSelectOptions[0]}
              onChange={handleChangeSortDirection}
              options={SortDirectionSelectOptions}
              styles={{
                menu: (provided, state) => ({
                  ...provided,
                  backgroundColor: isDark ? "#838383" : "white",
                }),
                control: (provided, state) => ({
                  ...provided,
                  ...(isDark && {
                    backgroundColor: "#838383",
                  }),
                }),
                singleValue: (provided, state) => ({
                  ...provided,
                  ...(isDark && {
                    color: "white",
                  }),
                }),
              }}
            />
            <SearchWrapper>
              <SearchInputer onChange={handleChangeActivitySearchValue} />
            </SearchWrapper>
          </ActivityHeader>
          <ActivityList
            user={account?.address || "zzz"}
            filterFunc={filterActivitiesFunc}
          />
        </>
      )}
      {/* <HorizontalDivider />
      <SubTitle subTitle="My NFTs on sale" textAlign="left" />
      <NFTContainer
        nfts={listedNFTs}
        status={NFTItemStatus.WITHDRAW}
        emptyMsg="No NFTs on sale"
      />
      <HorizontalDivider />
      <SubTitle subTitle="My NFTs created" textAlign="left" />
      <NFTContainer nfts={[]} status={""} emptyMsg="No NFTs created" /> */}
    </Wrapper>
  );
};

export default MyNFT;
