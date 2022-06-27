import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getCollectionById } from "../../constants/Collections";
import { CollectionStateType } from "../../features/collections/collectionsSlice";
// import { useAppDispatch } from "../../app/hooks";
// import { setSelectedNFT } from "../../features/nfts/nftsSlice";
import useHandleNftItem, { NFTPriceType } from "../../hook/useHandleNftItem";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import Image from "../Image";

import {
  NFTItemImageWrapper,
  NFTItemInfoContainer,
  NFTItemWrapper,
  NFTItemInfo,
  NFTItemOperationButton,
  NFTItemOperationContainer,
  NFTItemPriceInputer,
  NFTItemPriceType,
  CoinIcon,
} from "./styled";

export interface NFTItemProps {
  item: any;
  status: string;
  enableDownloadImage?: boolean;
}

export const NFTItemStatus = {
  BUY: "buy",
  SELL: "sell",
  WITHDRAW: "withdraw",
};

const getTokenIdNumber = (id: string): string => {
  if (!id) return "";
  return id.split(".").pop() || "";
};

export default function NFTItem({ item, status }: NFTItemProps) {
  const [nftPrice, setNftPrice] = useState("");
  const [nftPriceType, setNftPriceType] = useState("");

  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;

  const targetCollection = getCollectionById(item.collectionId);
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[item.collectionId]
  );

  const { sellNft, withdrawNft, buyNft } = useHandleNftItem();
  // const dispatch = useAppDispatch();
  const history = useHistory();
  const price = item?.list_price || {};
  let url = "";
  if (item.collectionId === "mintpass1") {
    url = "/others/mint_pass.png";
  } else if (item.collectionId === "mintpass2") {
    url = "/others/mint_pass2.png";
  } else if (item.collectionId === "hopegalaxy1") {
    url = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
      item.token_id
    )}.png`;
  } else if (collectionState.imageUrl) {
    url = `${collectionState.imageUrl}${getTokenIdNumber(item.token_id)}.png`;
  }

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

  const isSellItem = status === NFTItemStatus.SELL;

  return (
    <NFTItemWrapper>
      <NFTItemImageWrapper onClick={handleGotoDetail} isMobile={isMobile}>
        <Image alt="" src={url} />
      </NFTItemImageWrapper>
      <div>
        <NFTItemInfo>{targetCollection.title}</NFTItemInfo>
        <NFTItemInfoContainer>
          <NFTItemInfo>{item.token_id_display || item.token_id}</NFTItemInfo>
          <NFTItemInfo>
            {!!price.amount && +price.amount > 0 ? (
              <>
                <CoinIcon
                  alt=""
                  src={
                    price.denom === NFTPriceType.HOPE
                      ? "/coin-images/hope.png"
                      : "/coin-images/juno.png"
                  }
                />
                {price.amount / 1e6}
              </>
            ) : null}
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
