import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";

import Collections, { MarketplaceInfo } from "../../constants/Collections";
import {
  CollectionStateType,
  TotalStateType,
} from "../../features/collections/collectionsSlice";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { NFTPriceType } from "../../types/nftPriceTypes";
import { addSuffix } from "../../util/string";

import {
  Wrapper,
  SubWrapper,
  ImgWrapper,
  MainContent,
  SubContent,
  TokensContainer,
  StatisticContainer,
  StatisticItem,
  StatisticContent,
  CoinIcon,
} from "./styled";

const Home: React.FC = () => {
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;

  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const totalMarketplaceNFTs: any = useAppSelector((state) => state.nfts);
  const collectionStates: TotalStateType = useAppSelector(
    (state) => state.collectionStates
  );

  const { tradesVolume, totalItemsOnSale } = useMemo(() => {
    const junoUsd =
      tokenPrices[NFTPriceType.JUNO]?.market_data.current_price?.usd || 0;
    let tradesVolumeResult = 0,
      totalItemsOnSaleResult = 0;
    Collections.forEach((collection: MarketplaceInfo) => {
      const crrMarketplaceItems =
        totalMarketplaceNFTs[`${collection.collectionId}_marketplace`] || [];
      totalItemsOnSaleResult += crrMarketplaceItems.length;

      const crrCollectionState: CollectionStateType =
        collectionStates[collection.collectionId];
      (Object.keys(NFTPriceType) as Array<keyof typeof NFTPriceType>).forEach(
        (key) => {
          const crrVolume =
            (crrCollectionState?.tradingInfo as any)?.[
              `${NFTPriceType[key]}Total`
            ] || 0;
          const crrUsd =
            tokenPrices[NFTPriceType[key]]?.market_data.current_price?.usd || 0;
          tradesVolumeResult += crrUsd ? crrVolume * (junoUsd / crrUsd) : 0;
        }
      );
    });
    return {
      tradesVolume: tradesVolumeResult,
      totalItemsOnSale: totalItemsOnSaleResult,
    };
  }, [collectionStates, tokenPrices, totalMarketplaceNFTs]);

  const HomeImage = () => (
    <ImgWrapper src="/others/home.png" alt="home" isMobile={isMobile} />
  );

  const Tokens = () => (
    <TokensContainer>$JUNO - $HOPE - $RAW - $NETA</TokensContainer>
  );

  return (
    <Wrapper isMobile={isMobile}>
      {isMobile && (
        <>
          <HomeImage />
          <Tokens />
        </>
      )}
      <SubWrapper>
        <MainContent isMobile={isMobile}>
          Hopers.io NFT marketplace $JUNO
        </MainContent>
        <SubContent isMobile={isMobile}>
          The DAO governs the marketplace and earns rewards through the staking
          system of the token $HOPE.
        </SubContent>
      </SubWrapper>
      {!isMobile && <HomeImage />}
      <StatisticContainer>
        <StatisticItem>
          <StatisticContent bold>
            <CoinIcon alt="" src="/coin-images/ujuno.png" />
            {addSuffix(tradesVolume)}
          </StatisticContent>
          <StatisticContent>Trades Volume</StatisticContent>
        </StatisticItem>
        <StatisticItem>
          <StatisticContent bold>
            {addSuffix(totalItemsOnSale)}
          </StatisticContent>
          <StatisticContent>Items on Sale</StatisticContent>
        </StatisticItem>
        <StatisticItem>
          <StatisticContent bold>2,95K</StatisticContent>
          <StatisticContent>Transaction</StatisticContent>
        </StatisticItem>
      </StatisticContainer>
      {!isMobile && <Tokens />}
    </Wrapper>
  );
};

export default Home;
