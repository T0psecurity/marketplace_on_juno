import React from "react";
import { useAppSelector } from "../../app/hooks";
import { NFTPriceType } from "../../hook/useHandleNftItem";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import Image from "../Image";
import {
  DetailContent,
  DetailTitle,
  MintVideoContainer,
  NFTDetailContainer,
  Wrapper,
  // NFTItemImage,
} from "./styled";

interface NFTItemDetailProps {
  item?: any;
}

const NFTItemDetail: React.FC<NFTItemDetailProps> = ({ item }) => {
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const owner = item.seller || account?.address || "";
  const price = item.list_price || {};
  const url = item.token_id?.includes("Reveal")
    ? `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${item.token_id.replace(
        "Reveal.",
        ""
      )}.png`
    : "/others/mint_pass.png";

  return (
    <Wrapper isMobile={isMobile}>
      <MintVideoContainer>
        <Image alt="" src={url} />
      </MintVideoContainer>
      <NFTDetailContainer>
        <DetailTitle>NFT ID</DetailTitle>
        <DetailContent>{item.token_id || ""}</DetailContent>
        <DetailTitle>Owner</DetailTitle>
        <DetailContent>{`${owner}${
          account?.address === owner ? " (YOU)" : ""
        }`}</DetailContent>
        <DetailTitle>Price</DetailTitle>
        <DetailContent>{`${+(price?.amount || 0) / 1e6} ${
          price.denom
            ? `${price.denom === NFTPriceType.HOPE ? "HOPE" : "JUNO"}`
            : ""
        }`}</DetailContent>
      </NFTDetailContainer>
    </Wrapper>
  );
};

export default NFTItemDetail;
