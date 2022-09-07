import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import {
  CollectionIds,
  getCollectionById,
  MarketplaceInfo,
} from "../../constants/Collections";
import { getCustomTokenId, getTokenIdNumber } from "../../hook/useFetch";
import { TokenType } from "../../types/tokens";
import Image from "../Image";
import Text from "../Text";
import ToolTip from "../ToolTip";
import { MarketplaceContracts } from "../../constants/Collections";
import useContract from "../../hook/useContract";
import {
  BalanceItem,
  CoinIcon,
  CoinIconWrapper,
  NftContainer,
  NftItem,
  NftItemImage,
  TooltipContainer,
  Wrapper,
} from "./styled";

interface AcceptCollectionBidTooltipProps {
  id: string;
  collection: MarketplaceInfo;
  bidder: string;
}

const AcceptCollectionBidTooltip: React.FC<AcceptCollectionBidTooltipProps> = ({
  id,
  collection,
  bidder,
}) => {
  const { runExecute } = useContract();
  const marketplaceNFTs = useAppSelector((state) => {
    return (state.nfts as any)[`${collection.collectionId}_listed`] || [];
  });
  const unlistedNFTs = useAppSelector((state) => {
    return (state.nfts as any)[collection.collectionId] || [];
  });
  const collectionStates = useAppSelector(
    (state: any) => state.collectionStates
  );
  const balances = useAppSelector((state) => state.balances);
  const tokenPrices = useAppSelector((state) => state.tokenPrices);

  const handleAcceptBid = async (item: any) => {
    const message = {
      accept_collection_bid: {
        nft_address: collection.nftContract,
        token_id: item.token_id,
        bidder,
      },
    };
    try {
      await runExecute(MarketplaceContracts[0], message);
      toast.success("Accept bid successfully!");
    } catch (e) {
      toast.error("Accept bid failed!");
    }
  };

  return (
    <Wrapper>
      <ToolTip
        id={id}
        place="top"
        effect="solid"
        arrowColor="#02e296"
        globalEventOff="click"
        clickable
      >
        <TooltipContainer>
          <Text>Select NFT for Accept</Text>
          <NftContainer>
            {marketplaceNFTs.map((item: any, index: number) => {
              const price = item.list_price || {};
              const denom = price.denom;
              const tokenBalance =
                (balances?.[denom as TokenType]?.amount || 0) / 1e6;
              const tokenPrice =
                tokenPrices[denom as TokenType]?.market_data.current_price
                  ?.usd || 0;
              const collectionState =
                collectionStates[item.collectionId as CollectionIds];
              let url = "";
              if (item.collectionId === "mintpass1") {
                url = "/others/mint_pass.png";
              } else if (item.collectionId === "mintpass2") {
                url = "/others/mint_pass2.png";
              } else if (item.collectionId === "hopegalaxy1") {
                url = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
                  item.token_id
                )}.png`;
              } else if (collectionState.imageUrl) {
                url = `${collectionState.imageUrl}${getTokenIdNumber(
                  item.token_id
                )}.png`;
              }
              const targetCollection =
                getCollectionById(item.collectionId || "") || {};
              return (
                <NftItem
                  key={`listed-${index}`}
                  onClick={() => handleAcceptBid(item)}
                >
                  <NftItemImage>
                    <Image alt="" src={url} />
                  </NftItemImage>
                  <Text>
                    {targetCollection.customTokenId
                      ? getCustomTokenId(
                          item.token_id,
                          targetCollection.customTokenId
                        )
                      : item.token_id}
                  </Text>
                  <CoinIconWrapper>
                    <CoinIcon
                      alt=""
                      src={`/coin-images/${denom.replace(/\//g, "")}.png`}
                    />
                  </CoinIconWrapper>
                  <BalanceItem>
                    <Text>
                      {tokenBalance.toLocaleString("en-US", {
                        maximumFractionDigits: 3,
                      })}
                    </Text>
                    <Text fontSize="0.6em">
                      {`${(tokenBalance * tokenPrice).toLocaleString("en-US", {
                        maximumFractionDigits: 3,
                      })}$`}
                    </Text>
                  </BalanceItem>
                </NftItem>
              );
            })}
            {unlistedNFTs.map((item: any, index: number) => {
              const collectionState =
                collectionStates[item.collectionId as CollectionIds];
              let url = "";
              if (item.collectionId === "mintpass1") {
                url = "/others/mint_pass.png";
              } else if (item.collectionId === "mintpass2") {
                url = "/others/mint_pass2.png";
              } else if (item.collectionId === "hopegalaxy1") {
                url = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
                  item.token_id
                )}.png`;
              } else if (collectionState.imageUrl) {
                url = `${collectionState.imageUrl}${getTokenIdNumber(
                  item.token_id
                )}.png`;
              }
              return (
                <NftItem
                  key={`unlisted-${index}`}
                  onClick={() => handleAcceptBid(item)}
                >
                  <NftItemImage>
                    <Image alt="" src={url} />
                  </NftItemImage>
                  <Text>{item.token_id_display || item.token_id}</Text>
                </NftItem>
              );
            })}
          </NftContainer>
        </TooltipContainer>
      </ToolTip>
    </Wrapper>
  );
};

export default AcceptCollectionBidTooltip;
