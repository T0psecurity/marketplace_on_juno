import React from "react";
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

const MyNFT: React.FC = () => {
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const popoutQuickSwap = usePopoutQuickSwap();
  const isMobile = isXs || isSm || isMd;
  const nfts = useAppSelector((state) => state.nfts);
  const balances = useAppSelector((state) => state.balances);
  let unlistedNFTs: any = [],
    listedNFTs: any = [];
  Collections.forEach((collection: MarketplaceInfo) => {
    const collectionId = collection.collectionId;
    const listedKey = `${collectionId}_listed`;
    if (nfts[collectionId] && nfts[collectionId].length)
      unlistedNFTs = unlistedNFTs.concat(nfts[collectionId]);
    if ((nfts as any)[listedKey] && (nfts as any)[listedKey].length)
      listedNFTs = listedNFTs.concat((nfts as any)[listedKey]);
  });

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

  return (
    <Wrapper isMobile={isMobile}>
      <Title title="Profile" icon={<ProfileImage />} />
      <HorizontalDivider />
      <SubTitle subTitle="My Balances" textAlign="left" />
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
                <CoinIcon
                  alt=""
                  src={`/coin-images/${denom.replace(/\//g, "")}.png`}
                />
                <TokenBalance>{`${
                  (balances?.[denom]?.amount || 0) / 1e6
                } $${key}`}</TokenBalance>
              </TokenBalanceItem>
            );
          }
        )}
      </TokenBalancesWrapper>
      <TokenTypeString>
        IBC Assets <span>(Click Asset to Withdraw)</span>
      </TokenTypeString>
      <TokenBalancesWrapper>
        {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
          (key) => {
            const denom = TokenType[key];
            const tokenStatus = TokenStatus[denom];
            if (!tokenStatus.isIBCCOin) return null;
            return (
              <TokenBalanceItem
                key={denom}
                onClick={() => handleClickBalanceItem(denom)}
              >
                <CoinIcon
                  alt=""
                  src={`/coin-images/${denom.replace(/\//g, "")}.png`}
                />
                <TokenBalance>{`${
                  (balances?.[denom]?.amount || 0) / 1e6
                } $${key}`}</TokenBalance>
              </TokenBalanceItem>
            );
          }
        )}
      </TokenBalancesWrapper>
      <HorizontalDivider />
      <SubTitle subTitle="My NFTs" textAlign="left" />
      <NFTContainer
        nfts={unlistedNFTs}
        status={NFTItemStatus.SELL}
        emptyMsg="No NFTs in your wallet"
      />
      <HorizontalDivider />
      <SubTitle subTitle="My NFTs on sale" textAlign="left" />
      <NFTContainer
        nfts={listedNFTs}
        status={NFTItemStatus.WITHDRAW}
        emptyMsg="No NFTs on sale"
      />
      <HorizontalDivider />
      <SubTitle subTitle="My NFTs created" textAlign="left" />
      <NFTContainer nfts={[]} status={""} emptyMsg="No NFTs created" />
    </Wrapper>
  );
};

export default MyNFT;
