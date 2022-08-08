import React, { useMemo, useState } from "react";
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
} from "./styled";

import { useAppSelector } from "../../app/hooks";
import { SubTitle, Title } from "../../components/PageTitle";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
import Collections, { MarketplaceInfo } from "../../constants/Collections";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { TokenStatus, TokenType } from "../../types/tokens";
import usePopoutQuickSwap, { SwapType } from "../../components/Popout";
import { ChainTypes } from "../../constants/ChainTypes";
import { Tabs } from "./styled";
import SearchInputer from "../../components/SearchInputer";
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

const MyNFT: React.FC = () => {
  const [selectedPageTab, setSelectedPageTab] = useState<TAB_TYPE>(
    TAB_TYPE.ITEMS
  );
  const [selectedNftTab, setSelectedNftTab] = useState<NFT_TYPE>(NFT_TYPE.ALL);
  const [searchValue, setSearchValue] = useState<string>("");
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const popoutQuickSwap = usePopoutQuickSwap();
  const isMobile = isXs || isSm || isMd;
  const nfts = useAppSelector((state) => state.nfts);
  const balances = useAppSelector((state) => state.balances);

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
