import React from "react";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import NFTItem from "../NFTItem";

import { Wrapper } from "./styled";

interface NFTContainerProps {
  nfts: any;
  status: string;
  emptyMsg?: string;
  sort?: string;
}

const NFTContainer: React.FC<NFTContainerProps> = ({
  nfts,
  status,
  emptyMsg,
  sort,
}) => {
  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;
  const hasNFTs = !!nfts && nfts.length > 0;
  if (sort === "as")
    sort &&
      nfts
        .slice()
        .sort(
          (a: any, b: any) =>
            Number(a.list_price?.amount) - Number(b.list_price?.amount)
        );
  else
    sort &&
      nfts
        .slice()
        .sort(
          (a: any, b: any) =>
            Number(a.list_price?.amount) - Number(b.list_price?.amount)
        )
        .reverse();
  return (
    <Wrapper noGrid={!hasNFTs} isMobile={isMobile}>
      {hasNFTs
        ? nfts.map((nft: any, index: any) => {
            return <NFTItem key={index} item={nft} status={status} />;
          })
        : emptyMsg ?? "No NFTs"}
    </Wrapper>
  );
};

export default NFTContainer;
