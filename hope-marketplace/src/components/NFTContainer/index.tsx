import React from "react";
import { useAppSelector } from "../../app/hooks";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import NFTItem, { NFTItemStatus } from "../NFTItem";

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
  const account = useAppSelector((state) => state?.accounts.keplrAccount);

  return (
    <Wrapper noGrid={!hasNFTs} isMobile={isMobile}>
      {hasNFTs
        ? nfts.map((nft: any, index: any) => {
            return (
              <NFTItem
                key={index}
                item={nft}
                status={
                  nft?.seller === account?.address
                    ? NFTItemStatus.WITHDRAW
                    : status
                }
              />
            );
          })
        : emptyMsg ?? "No NFTs"}
    </Wrapper>
  );
};

export default NFTContainer;
