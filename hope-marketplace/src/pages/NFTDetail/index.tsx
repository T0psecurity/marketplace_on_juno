import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Title } from "../../components/PageTitle";
import NFTItemDetail from "../../components/NFTItemDetail";
import usePickNFT from "../../hook/usePickNFT";
import useHandleNftItem from "../../hook/useHandleNftItem";
import {
  Wrapper,
  NFTItemOperationButton,
  NFTItemOperationContainer,
  NFTItemPriceInputer,
  NFTItemPriceType,
} from "./styled";

const NFTPriceType = {
  HOPE: "hope",
  JUNO: "juno",
};
const NFTDetail: React.FC = () => {
  // const selectedNFT = useAppSelector((state) => state.nfts.selectedNFT);
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const [nftPrice, setNftPrice] = useState("");
  const [transferAdd, setTransferAdd] = useState("");
  const [nftPriceType, setNftPriceType] = useState("");
  const { search } = useLocation();
  const token_id = new URLSearchParams(search).get("token_id");
  const { pickNFTByTokenId } = usePickNFT();
  const selectedNFT: any = pickNFTByTokenId(token_id || "");
  const { sellNft, withdrawNft, buyNft, transferNft } = useHandleNftItem();

  const status = selectedNFT.seller
    ? selectedNFT.seller === account?.address
      ? "Withdraw"
      : "Buy"
    : "Sell";
  const handleNFTItem = async () => {
    if (status === "Sell") {
      await sellNft(selectedNFT, nftPrice, nftPriceType);
    } else if (status === "Withdraw") {
      await withdrawNft(selectedNFT);
    } else if (status === "Buy") {
      await buyNft(selectedNFT);
    }
  };
  const handleChangeNFTPrice = (e: any) => {
    const { value } = e.target;
    setNftPrice(value);
    // if (!isNaN(Number(value))) setNftPrice(Number(value));
  };

  const handleChangePriceType = (e: any) => {
    const { value } = e.target;
    setNftPriceType(value);
  };
  const handleChangeTransferAdd = (e: any) => {
    const { value } = e.target;
    setTransferAdd(value);
  };
  const handleTransferNFT = async () => {
    await transferNft(transferAdd, selectedNFT, "/profile");
  };
  return (
    <Wrapper>
      <Title title="HOPE GALAXY NFT - collection 1" />
      <NFTItemDetail item={selectedNFT} />
      <NFTItemOperationContainer>
        <NFTItemOperationButton onClick={handleNFTItem}>
          {status} Now
        </NFTItemOperationButton>
        {status === "Sell" && (
          <div style={{ display: "flex" }}>
            <NFTItemPriceInputer
              width="200px"
              key={selectedNFT.token_id}
              value={nftPrice}
              onChange={handleChangeNFTPrice}
            />
            <NFTItemPriceType>
              <input
                type="radio"
                id={`hope-${selectedNFT.token_id}`}
                name="priceType"
                value={NFTPriceType.HOPE}
                onClick={handleChangePriceType}
              />
              <label htmlFor={`hope-${selectedNFT.token_id}`}>HOPE</label>
              <br />
              <input
                type="radio"
                id={`juno-${selectedNFT.token_id}`}
                name="priceType"
                value={NFTPriceType.JUNO}
                onClick={handleChangePriceType}
              />
              <label htmlFor={`juno-${selectedNFT.token_id}`}>JUNO</label>
              <br />
            </NFTItemPriceType>
          </div>
        )}
      </NFTItemOperationContainer>
      {status === "Sell" && (
        <NFTItemOperationContainer>
          <NFTItemOperationButton
            onClick={handleTransferNFT}
            style={{ background: "#0000ff" }}
          >
            Transfer
          </NFTItemOperationButton>

          <NFTItemPriceInputer
            width="270px"
            value={transferAdd}
            onChange={handleChangeTransferAdd}
          />
        </NFTItemOperationContainer>
      )}
    </Wrapper>
  );
};

export default NFTDetail;
