import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

import Collections, { MarketplaceInfo } from "../../constants/Collections";
import {
  CollectionStateType,
  TotalStateType,
} from "../../features/collections/collectionsSlice";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { TokenType } from "../../types/tokens";
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
  StyledButton,
} from "./styled";

const Home: React.FC = () => {
  const history = useHistory();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;

  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const totalMarketplaceNFTs: any = useAppSelector((state) => state.nfts);
  const collectionStates: TotalStateType = useAppSelector(
    (state) => state.collectionStates
  );

  const { tradesVolume, totalItemsOnSale } = useMemo(() => {
    const junoUsd =
      tokenPrices[TokenType.JUNO]?.market_data.current_price?.usd || 0;
    let tradesVolumeResult = 0,
      totalItemsOnSaleResult = 0;
    Collections.forEach((collection: MarketplaceInfo) => {
      const crrMarketplaceItems =
        totalMarketplaceNFTs[`${collection.collectionId}_marketplace`] || [];
      totalItemsOnSaleResult += crrMarketplaceItems.length;

      const crrCollectionState: CollectionStateType =
        collectionStates[collection.collectionId];
      (Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach(
        (key) => {
          const crrVolume =
            (crrCollectionState?.tradingInfo as any)?.[
              `${TokenType[key]}Total`
            ] || 0;
          const crrUsd =
            tokenPrices[TokenType[key]]?.market_data.current_price?.usd || 0;
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

  const Tokens = () => {
    const tokens = (
      Object.keys(TokenType) as Array<keyof typeof TokenType>
    ).map((key) => `$${key}`);
    return <TokensContainer>{tokens.join(" - ")}</TokensContainer>;
  };

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
        <StyledButton onClick={() => history.push("/collections/explore")}>
          Explore
        </StyledButton>
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
        {/* <StatisticItem>
          <StatisticContent bold>2,95K</StatisticContent>
          <StatisticContent>Transaction</StatisticContent>
        </StatisticItem> */}
      </StatisticContainer>
      {!isMobile && <Tokens />}
    </Wrapper>
  );
};

export default Home;
