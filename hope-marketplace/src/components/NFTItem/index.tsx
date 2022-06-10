import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getCollectionById } from "../../constants/Collections";
// import { useAppDispatch } from "../../app/hooks";
// import { setSelectedNFT } from "../../features/nfts/nftsSlice";
import useHandleNftItem, { NFTPriceType } from "../../hook/useHandleNftItem";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";

import {
  NFTItemImageWrapper,
  NFTItemImage,
  NFTItemInfoContainer,
  NFTItemWrapper,
  NFTItemInfo,
  NFTItemOperationButton,
  NFTItemOperationContainer,
  NFTItemPriceInputer,
  NFTItemPriceType,
} from "./styled";

export interface NFTItemProps {
  item: any;
  status: string;
}

export const NFTItemStatus = {
  BUY: "buy",
  SELL: "sell",
  WITHDRAW: "withdraw",
};

export default function NFTItem({ item, status }: NFTItemProps) {
  const [nftPrice, setNftPrice] = useState("");
  const [nftPriceType, setNftPriceType] = useState("");
  const [logoSize, setLogoSize] = useState<{
    width?: string;
    height?: string;
  }>({});
  const [imageVisible, setImageVisible] = useState<boolean>(false);

  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;

  const targetCollection = getCollectionById(item.collectionId);

  const { sellNft, withdrawNft, buyNft } = useHandleNftItem();
  // const dispatch = useAppDispatch();
  const history = useHistory();
  const price = item?.list_price || {};
  const url = item.token_id.includes("Reveal")
    ? `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${item.token_id.replace(
        "Reveal.",
        ""
      )}.png`
    : "/others/mint_pass.png";

  const handleNFTItem = async () => {
    if (status === NFTItemStatus.SELL) {
      await sellNft(item, nftPrice, nftPriceType);
    } else if (status === NFTItemStatus.WITHDRAW) {
      await withdrawNft(item);
    } else if (status === NFTItemStatus.BUY) {
      await buyNft(item);
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

  const handleGotoDetail = () => {
    // dispatch(setSelectedNFT(item));
    history.push(`/detail?token_id=${item.token_id}`);
  };

  const handleOnLoadImage = (e: any) => {
    // console.log("e", e);
    const {
      target: { offsetHeight, offsetWidth },
    } = e;
    if (offsetHeight > offsetWidth) {
      setLogoSize({
        // height: "400px",
        height: "100%",
      });
    } else {
      setLogoSize({
        // width: "370px",
        width: "100%",
      });
    }
    setImageVisible(true);
  };

  const isSellItem = status === NFTItemStatus.SELL;

  return (
    <NFTItemWrapper>
      <NFTItemImageWrapper isMobile={isMobile}>
        <NFTItemImage
          onClick={handleGotoDetail}
          alt=""
          src={url}
          onLoad={handleOnLoadImage}
          width={logoSize.width}
          height={logoSize.height}
          imageVisible={imageVisible}
        />
      </NFTItemImageWrapper>
      <div>
        <NFTItemInfo>{targetCollection.title}</NFTItemInfo>
        <NFTItemInfoContainer>
          <NFTItemInfo>{item.token_id}</NFTItemInfo>
          <NFTItemInfo>
            {!!price.amount && +price.amount > 0
              ? `${price.amount / 1e6} ${
                  price.denom === NFTPriceType.HOPE ? "HOPE" : "JUNO"
                }`
              : ""}
          </NFTItemInfo>
        </NFTItemInfoContainer>
      </div>

      <NFTItemOperationContainer isSellItem={isSellItem}>
        <NFTItemOperationButton onClick={handleNFTItem}>
          {status} Now
        </NFTItemOperationButton>
        {isSellItem && (
          <>
            <NFTItemPriceInputer
              key={item.token_id}
              value={nftPrice}
              onChange={handleChangeNFTPrice}
            />
            <NFTItemPriceType>
              <input
                type="radio"
                id={`hope-${item.token_id}`}
                name="priceType"
                value={NFTPriceType.HOPE}
                onClick={handleChangePriceType}
              />
              <label htmlFor={`hope-${item.token_id}`}>HOPE</label>
              <br />
              <input
                type="radio"
                id={`juno-${item.token_id}`}
                name="priceType"
                value={NFTPriceType.JUNO}
                onClick={handleChangePriceType}
              />
              <label htmlFor={`juno-${item.token_id}`}>JUNO</label>
              <br />
            </NFTItemPriceType>
          </>
        )}
      </NFTItemOperationContainer>
    </NFTItemWrapper>
  );
}
