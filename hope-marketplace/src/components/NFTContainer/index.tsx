import React from "react";
import NFTItem from "../NFTItem";

import { Wrapper } from "./styled";

interface NFTContainerProps {
  nfts: any;
  status: string;
  emptyMsg?: string;
}

const NFTContainer: React.FC<NFTContainerProps> = ({
  nfts,
  status,
  emptyMsg,
}) => {
  const hasNFTs = !!nfts && nfts.length > 0;
  return (
    <Wrapper noGrid={!hasNFTs}>
      {hasNFTs
        ? nfts.map((nft: any, index: any) => {
            return <NFTItem key={index} item={nft} status={status} />;
          })
        : emptyMsg ?? "No NFTs"}
    </Wrapper>
  );
};

export default NFTContainer;
