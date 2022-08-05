import React from "react";
import {
  CoinImage,
  PriceStatisticContainer,
  PriceStatisticContent,
  PriceStatisticItem,
  Span,
  Title,
  TokenName,
  Wrapper,
} from "./styled";
import { useAppSelector } from "../../app/hooks";
import { TokenFullName, TokenType } from "../../types/tokens";

const PriceStatistic: React.FC = () => {
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  return (
    <Wrapper>
      <Title>ECOSYSTEM PRICE CHARTS</Title>
      <PriceStatisticContainer>
        <PriceStatisticItem>
          <PriceStatisticContent>
            <Span>#</Span>
          </PriceStatisticContent>
          <PriceStatisticContent>
            <Span>Coin</Span>
          </PriceStatisticContent>
          <PriceStatisticContent>
            <Span>Price</Span>
          </PriceStatisticContent>
          <PriceStatisticContent>
            <Span>1h</Span>
          </PriceStatisticContent>
          <PriceStatisticContent>
            <Span>24h</Span>
          </PriceStatisticContent>
          <PriceStatisticContent>
            <Span>7d</Span>
          </PriceStatisticContent>
        </PriceStatisticItem>
        {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
          (key) => {
            const denom = TokenType[key];
            const tokenPrice = tokenPrices[denom];
            const currentPrice =
              tokenPrice?.market_data?.current_price?.usd || 0;
            const priceChange1h =
              tokenPrice?.market_data?.price_change_percentage_1h_in_currency?.usd?.toFixed(
                2
              ) || 0;
            const priceChange24h =
              tokenPrice?.market_data?.price_change_percentage_24h_in_currency?.usd?.toFixed(
                2
              ) || 0;
            const priceChange7d =
              tokenPrice?.market_data?.price_change_percentage_7d_in_currency?.usd?.toFixed(
                2
              ) || 0;
            return (
              <PriceStatisticItem key={denom}>
                <PriceStatisticContent>
                  <CoinImage coinType={denom} />
                </PriceStatisticContent>
                <PriceStatisticContent>
                  <TokenName>
                    <Span>{TokenFullName[denom]}</Span>
                    <Span>{`(${key})`}</Span>
                  </TokenName>
                </PriceStatisticContent>
                <PriceStatisticContent>
                  <Span>{`$${currentPrice}`}</Span>
                </PriceStatisticContent>
                <PriceStatisticContent>
                  <Span
                    color={priceChange1h < 0 ? "#FF4842" : "#35cb00"}
                  >{`${priceChange1h}%`}</Span>
                </PriceStatisticContent>
                <PriceStatisticContent>
                  <Span
                    color={priceChange24h < 0 ? "#FF4842" : "#35cb00"}
                  >{`${priceChange24h}%`}</Span>
                </PriceStatisticContent>
                <PriceStatisticContent>
                  <Span
                    color={priceChange7d < 0 ? "#FF4842" : "#35cb00"}
                  >{`${priceChange7d}%`}</Span>
                </PriceStatisticContent>
              </PriceStatisticItem>
            );
          }
        )}
      </PriceStatisticContainer>
    </Wrapper>
  );
};

export default PriceStatistic;
