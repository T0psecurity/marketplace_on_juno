import React from "react";
import { useAppSelector } from "../../app/hooks";
import { NFTPriceType } from "../NFTItem";
import {
  DetailContent,
  DetailTitle,
  MintVideo,
  MintVideoContainer,
  NFTDetailContainer,
  Wrapper,
} from "./styled";

const NFTItemDetail: React.FC = () => {
  const selectedNFT = useAppSelector((state) => state.nfts.selectedNFT);
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const owner = selectedNFT.seller || account?.address || "";
  const price = selectedNFT.list_price || {};
  return (
    <Wrapper>
      <MintVideoContainer>
        <MintVideo autoPlay loop id="video">
          <source src="videos/video1.mp4"></source>
        </MintVideo>
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
