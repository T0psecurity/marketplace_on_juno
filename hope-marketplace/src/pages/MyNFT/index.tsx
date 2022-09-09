import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import ReactSelect from "react-select";

import {
  Wrapper,
  // ProfileImage,
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
  ChartArea,
  MyAssetsArea,
  StyledExploreHeader,
  ReceivedOfferBanner,
  OffersContainer,
  ItemTd,
  TokenNameContainer,
  AcceptWithdrawBidButton,
} from "./styled";

import { useAppSelector } from "../../app/hooks";
import {
  SubTitle,
  // Title
} from "../../components/PageTitle";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
import Collections, {
  CollectionIds,
  getCollectionById,
  getCollectionByNftContract,
  MarketplaceContracts,
  MarketplaceInfo,
} from "../../constants/Collections";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { TokenStatus, TokenType, TokenFullName } from "../../types/tokens";
import usePopoutQuickSwap, { SwapType } from "../../components/Popout";
import { ChainTypes } from "../../constants/ChainTypes";
import { Tabs } from "./styled";
import SearchInputer from "../../components/SearchInputer";
import ActivityList from "../../components/ActivityList";
import { ThemeContext } from "../../context/ThemeContext";
import { SortDirectionType } from "../Marketplace/types";
import { getCustomTokenId, getTokenIdNumber } from "../../hook/useFetch";
import ExploreHeader from "../../components/ExploreHeader";
import Text from "../../components/Text";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { LineColors } from "../../constants/colors";
import useContract from "../../hook/useContract";
import moment from "moment";
import usePickNFT from "../../hook/usePickNFT";
import useHandleNftItem from "../../hook/useHandleNftItem";
// import { getCustomTokenId } from "../../hook/useFetch";

enum TAB_TYPE {
  ITEMS = "NFTs",
  ACTIVITY = "Activity",
  OFFER = "Offer",
  STATS = "Stats",
}

enum NFT_TYPE {
  ALL = "My NFTs",
  AVAILABLE = "Available",
  ONSALE = "On Sale",
}

const MAX_ITEM = 10;

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

const RADIAN = Math.PI / 180;

const MyNFT: React.FC = () => {
  const [selectedPageTab, setSelectedPageTab] = useState<TAB_TYPE>(
    TAB_TYPE.ITEMS
  );
  const [isReceivedOffer, setIsReceivedOffer] = useState(false);
  const [myOffers, setMyOffers] = useState([]);
  const [selectedNftTab, setSelectedNftTab] = useState<NFT_TYPE>(NFT_TYPE.ALL);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchActivityValue, setSearchActivityValue] = useState("");
  const [selectedTokenType, setSelectedTokenType] = useState<
    TokenType | undefined
  >();
  const [sortDirection, setSortDirection] = useState<
    SortDirectionType | undefined
  >(SortDirectionSelectOptions[0].value);

  const { runQuery } = useContract();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const { pickNFTByTokenId } = usePickNFT();
  const { acceptBid, withdrawBid } = useHandleNftItem();
  const popoutQuickSwap = usePopoutQuickSwap();
  const { isDark } = useContext(ThemeContext);
  const isMobile = isXs || isSm || isMd;
  const nfts = useAppSelector((state) => state.nfts);
  const balances = useAppSelector((state) => state.balances);
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const collectionStates = useAppSelector((state) => state.collectionStates);

  useEffect(() => {
    (async () => {
      let offers: any = [];
      const fetchBidsToMyNft = async (startAfter?: any) => {
        if (!account?.address) return;
        const fetchedBidsResult = await runQuery(MarketplaceContracts[0], {
          bids_by_seller: {
            seller: account.address,
            start_after: startAfter,
            limit: MAX_ITEM,
          },
        });
        const fetchedBids = fetchedBidsResult?.bids || [];
        offers = offers.concat(fetchedBids);
        if (fetchedBids.length === MAX_ITEM) {
          await fetchBidsToMyNft({
            collection: fetchedBids[MAX_ITEM - 1].collection,
            token_id: fetchedBids[MAX_ITEM - 1].token_id,
            bidder: fetchedBids[MAX_ITEM - 1].bidder,
          });
        }
      };
      const fetchMyBids = async (startAfter?: any) => {
        if (!account?.address) return;
        const fetchedBidsResult = await runQuery(MarketplaceContracts[0], {
          bids_by_bidder: {
            bidder: account.address,
            start_after: startAfter,
            limit: MAX_ITEM,
          },
        });
        const fetchedBids = fetchedBidsResult?.bids || [];
        offers = offers.concat(fetchedBids);
        if (fetchedBids.length === MAX_ITEM) {
          await fetchMyBids({
            collection: fetchedBids[MAX_ITEM - 1].collection,
            token_id: fetchedBids[MAX_ITEM - 1].token_id,
          });
        }
      };
      const fetchMyCollectionBids = async (startAfter?: any) => {
        if (!account?.address) return;
        const fetchedBidsResult = await runQuery(MarketplaceContracts[0], {
          collection_bids_by_bidder: {
            bidder: account.address,
            start_after: startAfter,
            limit: MAX_ITEM,
          },
        });
        const fetchedBids = fetchedBidsResult?.bids || [];
        offers = offers.concat(fetchedBids);
        if (fetchedBids.length === MAX_ITEM) {
          await fetchMyCollectionBids({
            collection: fetchedBids[MAX_ITEM - 1].collection,
            token_id: fetchedBids[MAX_ITEM - 1].token_id,
          });
        }
      };
      await fetchBidsToMyNft();
      setIsReceivedOffer(!!offers.length);
      await fetchMyBids();
      await fetchMyCollectionBids();
      setMyOffers(offers);
    })();
  }, [account, runQuery]);

  const collectionsSelectValues = [
    { value: "", label: "Choose Collection" },
  ].concat(
    Collections.map((collection) => ({
      value: collection.collectionId,
      label: collection.title,
    })).sort((collection1, collection2) =>
      collection1.label > collection2.label ? 1 : -1
    )
  );

  const [selectCollectionValue, setSelectCollectionValue] = useState(
    collectionsSelectValues[0]
  );

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
    setSearchActivityValue(value);
  };

  const handleChangeSortDirection = (item: any) => {
    setSortDirection(item.value);
  };

  const handleAcceptWithdrawOffer = (offer: any) => {
    if (offer.bidder === account?.address) {
      withdrawBid(offer);
    } else {
      acceptBid(offer);
    }
  };

  const filterActivitiesFunc = useCallback(
    (activities: any[]) => {
      let result: any[] = [];
      if (
        searchActivityValue ||
        selectedTokenType ||
        selectCollectionValue.value
      ) {
        activities.forEach((activityItem: any) => {
          let filtered =
            !selectCollectionValue.value ||
            selectCollectionValue.value === activityItem.collectionId;
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
    [
      searchActivityValue,
      selectCollectionValue.value,
      selectedTokenType,
      sortDirection,
      tokenPrices,
    ]
  );

  const { totalBalanceInUsd, chartData } = useMemo(() => {
    const chartDataResult: any = [];
    const totalBalance = (
      Object.keys(TokenType) as Array<keyof typeof TokenType>
    ).reduce((result, key) => {
      const denom = TokenType[key];
      const crrBalance = (balances?.[denom]?.amount || 0) / 1e6;
      const crrTokenPrice =
        tokenPrices[denom]?.market_data.current_price?.usd || 0;
      if (crrBalance * crrTokenPrice > 0)
        chartDataResult.push({
          name: key,
          tokenFullName: TokenFullName[denom],
          token: denom,
          price: crrBalance * crrTokenPrice,
        });
      return result + crrBalance * crrTokenPrice;
    }, 0);
    return {
      totalBalanceInUsd: totalBalance.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      }),
      chartData: chartDataResult,
    };
  }, [balances, tokenPrices]);

  const displayedNfts = useMemo(() => {
    const result = myNfts[selectedNftTab];
    if (selectCollectionValue.value) {
      return result.filter(
        (item: any) => item.collectionId === selectCollectionValue.value
      );
    }
    return result;
  }, [myNfts, selectCollectionValue.value, selectedNftTab]);

  const CollectionSelect = () => (
    <ReactSelect
      value={selectCollectionValue}
      onChange={(value: any) => setSelectCollectionValue(value)}
      options={collectionsSelectValues}
      styles={{
        container: (provided, state) => ({
          ...provided,
          margin: "5px 10px",
          width: 200,
          border: "1px solid black",
          borderRadius: "5px",
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          color: "black",
        }),
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: isDark ? "#838383" : "white",
          zIndex: 10,
        }),
        singleValue: (provided, state) => ({
          ...provided,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }),
      }}
    />
  );

  const renderCustomizedLabel = (params: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload } =
      params;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill={isDark ? "white" : "black"}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}% (${payload.name})`}
      </text>
    );

    // const { percent, price, payload } = params;
    // const priceDisplay = price.toLocaleString("en-US", {
    //   maximumFractionDigits: 3,
    // });
    // const percentDisplay = `${(percent * 100).toFixed(0)}%`;
    // return `${payload.name}: ${priceDisplay}$ (${percentDisplay})`;
  };

  return (
    <Wrapper isMobile={isMobile}>
      {/* <Title title="Profile" icon={<ProfileImage />} /> */}
      <ExploreHeader title="Profile" />
      {/* <HorizontalDivider /> */}
      {/* <SubTitle subTitle="My Balance on Juno Chain" textAlign="left" /> */}
      <MyAssetsArea>
        <Text fontSize="1.17em" justifyContent="flex-start">
          <Text bold>My Assets</Text>
          <Text>{`(${totalBalanceInUsd}$)`}</Text>
        </Text>
        <ChartArea>
          <ResponsiveContainer width="80%" height="80%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                innerRadius="40%"
                fill="#8884d8"
                dataKey="price"
                label={renderCustomizedLabel}
              >
                {chartData.map((entry: any, index: number) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={LineColors[entry.token as TokenType]}
                    />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartArea>
        <TokenTypeString>JUNO Chain Assets</TokenTypeString>
        <TokenBalancesWrapper>
          {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
            (key) => {
              const denom = TokenType[key];
              const tokenStatus = TokenStatus[denom];
              if (tokenStatus.isIBCCOin) return null;
              const tokenBalance = (balances?.[denom]?.amount || 0) / 1e6;
              const tokenPrice =
                tokenPrices[denom]?.market_data.current_price?.usd || 0;
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
                    {tokenBalance.toLocaleString("en-US", {
                      maximumFractionDigits: 3,
                    })}
                    <Text style={{ fontSize: "0.8em" }}>
                      {`${(tokenBalance * tokenPrice).toLocaleString("en-US", {
                        maximumFractionDigits: 3,
                      })}$`}
                    </Text>
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
              const tokenBalance = (balances?.[denom]?.amount || 0) / 1e6;
              const tokenPrice =
                tokenPrices[denom]?.market_data.current_price?.usd || 0;
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
                    {tokenBalance.toLocaleString("en-US", {
                      maximumFractionDigits: 3,
                    })}
                    <Text style={{ fontSize: "0.9em" }}>
                      {`${(tokenBalance * tokenPrice).toLocaleString("en-US", {
                        maximumFractionDigits: 3,
                      })}$`}
                    </Text>
                  </TokenBalance>
                  <WithdrawButton onClick={() => handleClickBalanceItem(denom)}>
                    Withdraw / Deposit
                  </WithdrawButton>
                </TokenBalanceItem>
              );
            }
          )}
        </TokenBalancesWrapper>
      </MyAssetsArea>
      <StyledExploreHeader
        title={`My ${selectedPageTab}`}
        tabs={(Object.keys(TAB_TYPE) as Array<keyof typeof TAB_TYPE>).map(
          (key) => ({
            title: key,
            onClick: () => setSelectedPageTab(TAB_TYPE[key]),
            selected: () => selectedPageTab === TAB_TYPE[key],
          })
        )}
        extra={isReceivedOffer ? <ReceivedOfferBanner /> : null}
      />
      {selectedPageTab === TAB_TYPE.ITEMS && (
        <>
          <MyNftsHeader>
            <Tabs flexWrap="wrap">
              {(Object.keys(NFT_TYPE) as Array<keyof typeof NFT_TYPE>).map(
                (key) => (
                  <Tab
                    key={key}
                    selected={selectedNftTab === NFT_TYPE[key]}
                    onClick={() => setSelectedNftTab(NFT_TYPE[key])}
                    title={`${NFT_TYPE[key]} (${
                      myNfts[NFT_TYPE[key]].length || 0
                    })`}
                  />
                )
              )}
            </Tabs>
            <CollectionSelect />
            <SearchWrapper>
              <SearchInputer onChange={handleChangeSearchValue} />
            </SearchWrapper>
          </MyNftsHeader>
          <NFTContainer
            nfts={displayedNfts}
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
            <CollectionSelect />
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
      {selectedPageTab === TAB_TYPE.OFFER && (
        <OffersContainer>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Price</th>
                <th>From</th>
                <th>Action</th>
                <th>Expiration</th>
              </tr>
            </thead>
            <tbody>
              {myOffers.length ? (
                myOffers.map((offer: any, index: number) => {
                  const listPrice = offer.list_price || {};
                  const currentNft: any = pickNFTByTokenId(
                    offer?.token_id || ""
                  );
                  const targetCollection =
                    (offer?.token_id
                      ? getCollectionById(currentNft.collectionId || "")
                      : getCollectionByNftContract(offer?.collection || "")) ||
                    {};
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
                  const collectionState =
                    collectionStates[targetCollection.collectionId] || {};

                  let url = "";
                  if (currentNft.collectionId === "mintpass1") {
                    url = "/others/mint_pass.png";
                  } else if (currentNft.collectionId === "mintpass2") {
                    url = "/others/mint_pass2.png";
                  } else if (currentNft.collectionId === "hopegalaxy1") {
                    url = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
                      currentNft.token_id
                    )}.png`;
                  } else if (collectionState.imageUrl) {
                    url = `${collectionState.imageUrl}${getTokenIdNumber(
                      currentNft.token_id
                    )}.png`;
                  }

                  return (
                    <tr key={index}>
                      <td>OFFER</td>
                      <td>
                        <ItemTd>
                          <img alt="" src={url} />
                          <TokenNameContainer>
                            <Text>{targetCollection.title}</Text>
                            {!!offer?.token_id ? (
                              <Text>
                                {targetCollection.customTokenId
                                  ? getCustomTokenId(
                                      currentNft.token_id,
                                      targetCollection.customTokenId
                                    )
                                  : currentNft.token_id}
                              </Text>
                            ) : (
                              <Text>Collection Offer</Text>
                            )}
                          </TokenNameContainer>
                        </ItemTd>
                      </td>
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
                          <Text>{`($${priceInUsd})`}</Text>
                        </CoinIconWrapper>
                      </td>
                      <td title={offer.bidder}>
                        {offer.bidder === account?.address
                          ? "YOU"
                          : offer.bidder}
                      </td>
                      <td>
                        {account?.address ? (
                          <AcceptWithdrawBidButton
                            onClick={() => handleAcceptWithdrawOffer(offer)}
                          >
                            {account.address === offer.bidder
                              ? "Withdraw"
                              : "Accept"}
                          </AcceptWithdrawBidButton>
                        ) : null}
                      </td>
                      <td>{expirationDate}</td>
                    </tr>
                  );
                })
              ) : (
                <td colSpan={6}>No Offers</td>
              )}
            </tbody>
          </table>
        </OffersContainer>
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
