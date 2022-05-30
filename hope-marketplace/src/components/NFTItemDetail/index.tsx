import React from "react";
import { useAppSelector } from "../../app/hooks";
import { NFTPriceType } from "../NFTItem";
import {
  DetailContent,
  DetailTitle,
  MintVideoContainer,
  NFTDetailContainer,
  Wrapper,
  NFTItemImage,
} from "./styled";

const NFTItemDetail: React.FC = () => {
  const selectedNFT = useAppSelector((state) => state.nfts.selectedNFT);
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const owner = selectedNFT.seller || account?.address || "";
  const price = selectedNFT.list_price || {};
  const url = selectedNFT.token_id.includes("Reveal")
    ? `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${selectedNFT.token_id.replace(
        "Reveal.",
        ""
      )}.png`
    : "/others/mint_pass.png";

  return (
    <Wrapper>
      <MintVideoContainer>
        <NFTItemImage alt="" src={url} />
      </MintVideoContainer>
      <NFTDetailContainer>
        <DetailTitle>NFT ID</DetailTitle>
        <DetailContent>{selectedNFT.token_id || ""}</DetailContent>
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
