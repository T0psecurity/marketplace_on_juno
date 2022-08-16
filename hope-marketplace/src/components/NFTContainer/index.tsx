import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import NFTItem, { NFTItemStatus } from "../NFTItem";

import { LoadMoreButton, Wrapper } from "./styled";

interface NFTContainerProps {
  nfts: any;
  status: string;
  emptyMsg?: string;
  sort?: string;
}

const INITIAL_RENDER_COUNT = 20;

const NFTContainer: React.FC<NFTContainerProps> = ({
  nfts,
  status,
  emptyMsg,
  sort,
}) => {
  const [renderCount, setRenderCount] = useState<number>(INITIAL_RENDER_COUNT);
  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;
  const hasNFTs = !!nfts && nfts.length > 0;
  const account = useAppSelector((state) => state?.accounts.keplrAccount);

  return (
    <>
      <Wrapper noGrid={!hasNFTs} isMobile={isMobile}>
        {hasNFTs
          ? nfts.slice(0, renderCount).map((nft: any, index: any) => {
              return (
                <NFTItem
                  key={`${index}-${nft.token_id}`}
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
      {hasNFTs && (
        <LoadMoreButton
          onClick={() =>
            setRenderCount((prev) => Math.min(prev + 15, nfts.length))
          }
        >
          Load More NFTs...
        </LoadMoreButton>
      )}
    </>
  );
};

export default NFTContainer;
