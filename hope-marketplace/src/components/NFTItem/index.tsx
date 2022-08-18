import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactSelect from "react-select";
import { useAppSelector } from "../../app/hooks";
import { CollectionIds, getCollectionById } from "../../constants/Collections";
import { ThemeContext } from "../../context/ThemeContext";
import { CollectionStateType } from "../../features/collections/collectionsSlice";
import { getTokenIdNumber } from "../../hook/useFetch";
// import { useAppDispatch } from "../../app/hooks";
// import { setSelectedNFT } from "../../features/nfts/nftsSlice";
import useHandleNftItem from "../../hook/useHandleNftItem";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { TokenType } from "../../types/tokens";
import { addSuffix, escapeSpecialForUrl } from "../../util/string";
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
  NFTItemPriceContainer,
  NFTItemTokenPrice,
  NFTItemUsdPrice,
  RarityRankContainer,
  RarityRankContent,
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

export default function NFTItem({ item, status }: NFTItemProps) {
  const [isPendingTx, setIsPendingTx] = useState(false);
  const [nftPrice, setNftPrice] = useState("");
  const [nftPriceType, setNftPriceType] = useState("");
  const { isDark } = useContext(ThemeContext);

  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const tokenIdNumber = Number(getTokenIdNumber(item.token_id) || 0);
  const tokenRarityRank = useAppSelector(
    (state) =>
      state.rarityRank[item.collectionId as CollectionIds]?.[tokenIdNumber]
  );

  const targetCollection = getCollectionById(item.collectionId);
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[item.collectionId]
  );

  const { sellNft, withdrawNft, buyNft } = useHandleNftItem();
  // const dispatch = useAppDispatch();
  const history = useHistory();
  const price = item?.list_price || {};
  const tokenPrice =
    tokenPrices[price.denom as TokenType]?.market_data.current_price?.usd || 0;

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
  // console.log(item.collectionId, collectionState, url);

  const handleNFTItem = async () => {
    setIsPendingTx(true);
    try {
      if (status === NFTItemStatus.SELL) {
        await sellNft(item, nftPrice, nftPriceType);
      } else if (status === NFTItemStatus.WITHDRAW) {
        await withdrawNft(item);
      } else if (status === NFTItemStatus.BUY) {
        await buyNft(item);
      }
    } finally {
      setIsPendingTx(false);
    }
  };

  const handleChangeNFTPrice = (e: any) => {
    const { value } = e.target;
    setNftPrice(value);
    // if (!isNaN(Number(value))) setNftPrice(Number(value));
  };

  // const handleChangePriceType = (e: any) => {
  //   const { value } = e.target;
  //   setTokenType(value);
  // };
  const handleChangePriceType = (item: any) => {
    setNftPriceType(item.value);
  };

  const handleGotoDetail = () => {
    // dispatch(setSelectedNFT(item));
    history.push(`/detail?token_id=${escapeSpecialForUrl(item.token_id)}`);
  };

  const isSellItem = status === NFTItemStatus.SELL;
  const SelectOptions = (
    Object.keys(TokenType) as Array<keyof typeof TokenType>
  ).map((key) => {
    return {
      value: TokenType[key],
      label: key,
    };
  });

  const NFTItemPriceItem = () =>
    !!price.amount && +price.amount > 0 ? (
      <NFTItemInfo>
        <CoinIcon
          alt=""
          src={`/coin-images/${price.denom.replace(/\//g, "")}.png`}
        />
        <NFTItemPriceContainer isMobile={isMobile}>
          <NFTItemTokenPrice>{price.amount / 1e6}</NFTItemTokenPrice>
          <NFTItemUsdPrice>
            {tokenPrice &&
              `(${addSuffix(
                Number(((+(price?.amount || 0) / 1e6) * tokenPrice).toFixed(2)),
                1
              )}$)`}
          </NFTItemUsdPrice>
        </NFTItemPriceContainer>
      </NFTItemInfo>
    ) : null;

  const NFTItemOperationButtonItem = () => (
    <NFTItemOperationButton onClick={handleNFTItem} disabled={isPendingTx}>
      {`${status}${isPendingTx ? "ing" : " Now"}`}
    </NFTItemOperationButton>
  );

  return (
    <NFTItemWrapper isMobile={isMobile}>
      {tokenRarityRank && (
        <RarityRankContainer>
          <RarityRankContent bold>Rank</RarityRankContent>
          <RarityRankContent>{`#${tokenRarityRank.rank}`}</RarityRankContent>
        </RarityRankContainer>
      )}
      <NFTItemImageWrapper onClick={handleGotoDetail} isMobile={isMobile}>
        <Image alt="" src={url} key={url} />
      </NFTItemImageWrapper>
      <div>
        <NFTItemInfo>{targetCollection.title}</NFTItemInfo>
        <NFTItemInfoContainer isMobile={isMobile}>
          <NFTItemInfo>{item.token_id_display || item.token_id}</NFTItemInfo>
          {!isMobile && <NFTItemPriceItem />}
        </NFTItemInfoContainer>
        {isMobile && <NFTItemPriceItem />}
      </div>

      <NFTItemOperationContainer isSellItem={isSellItem}>
        {!isMobile && <NFTItemOperationButtonItem />}
        {isSellItem && (
          <div>
            <NFTItemPriceInputer
              key={item.token_id}
              value={nftPrice}
              onChange={handleChangeNFTPrice}
            />
            <NFTItemPriceType>
              <ReactSelect
                styles={{
                  dropdownIndicator: (provided, state) => ({
                    ...provided,
                    padding: 0,
                  }),
                  valueContainer: (provided, state) => ({
                    ...provided,
                    // height: 10,
                    padding: 0,
                  }),
                  container: (provided, state) => ({
                    ...provided,
                    margin: "5px 10px",
                    minWidth: 100,
                  }),
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: "unset",
                    ...(isDark && {
                      backgroundColor: "#838383",
                    }),
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    backgroundColor: isDark ? "#838383" : "white",
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    ...(isDark && {
                      color: "white",
                    }),
                  }),
                }}
                onChange={handleChangePriceType}
                options={SelectOptions}
              />
              {/* <input
                type="radio"
                id={`hope-${item.token_id}`}
                name="priceType"
                value={TokenType.HOPE}
                onClick={handleChangePriceType}
              />
              <label htmlFor={`hope-${item.token_id}`}>HOPE</label>
              <br />
              <input
                type="radio"
                id={`juno-${item.token_id}`}
                name="priceType"
                value={TokenType.JUNO}
                onClick={handleChangePriceType}
              />
              <label htmlFor={`juno-${item.token_id}`}>JUNO</label>
              <br /> */}
            </NFTItemPriceType>
          </div>
        )}
      </NFTItemOperationContainer>
      {isMobile && <NFTItemOperationButtonItem />}
    </NFTItemWrapper>
  );
}
