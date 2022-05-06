import React from "react";
import NFTItem from "../NFTItem";

import { Wrapper } from "./styled";

const NFTContainer: React.FC<any> = ({ nfts, status }) => {
  return (
    <Wrapper>
      {!!nfts && nfts.length > 0
        ? nfts.map((nft: any, index: any) => {
            return <NFTItem key={index} item={nft} status={status} />;
          })
        : "No NFTs"}
    </Wrapper>
  );
};

export default NFTContainer;
