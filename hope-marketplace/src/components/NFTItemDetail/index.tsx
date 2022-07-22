import React, { useState } from "react";
import { saveAs } from "file-saver";
import { useAppSelector } from "../../app/hooks";
import { CollectionStateType } from "../../features/collections/collectionsSlice";
import useHandleNftItem from "../../hook/useHandleNftItem";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import Image from "../Image";
import {
  DetailContent,
  DetailTitle,
  MintVideoContainer,
  NFTDetailContainer,
  Wrapper,
  NFTItemImageDownloadIcon,
  // NFTItemImage,
  NFTItemOperationButton,
  NFTItemOperationContainer,
  NFTItemPriceInputer,
  NFTItemPriceType,
  CoinIcon,
  MainPriceContainer,
  UsdPriceContainer,
} from "./styled";
import ReactSelect from "react-select";
import { TokenType } from "../../types/tokens";
import { CollectionIds } from "../../constants/Collections";

interface NFTItemDetailProps {
  item?: any;
}

const getTokenIdNumber = (id: string): string => {
  if (!id) return "";
  return id.split(".").pop() || "";
};

const NFTItemDetail: React.FC<NFTItemDetailProps> = ({ item }) => {
  const { sellNft, withdrawNft, buyNft, transferNft } = useHandleNftItem();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[item.collectionId]
  );
  const rarityRanks = useAppSelector(
    (state) =>
      state.rarityRank[item.collectionId as CollectionIds]?.[
        Number(getTokenIdNumber(item.token_id))
      ]
  );
  const [nftPrice, setNftPrice] = useState("");
  const [transferAdd, setTransferAdd] = useState("");
  const [TokenType, setTokenType] = useState("");

  const owner = item.seller || account?.address || "";
  const price = item.list_price || {};
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
  } else if (collectionState?.imageUrl) {
    url = `${collectionState.imageUrl}${getTokenIdNumber(item.token_id)}.png`;
  }

  const downloadImage = () => {
    saveAs(url, item.token_id);
  };

  const status = item.seller
    ? item.seller === account?.address
      ? "Withdraw"
      : "Buy"
    : "Sell";

  const handleNFTItem = async () => {
    if (status === "Sell") {
      await sellNft(item, nftPrice, TokenType);
    } else if (status === "Withdraw") {
      await withdrawNft(item);
    } else if (status === "Buy") {
      await buyNft(item);
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
    setTokenType(item.value);
  };

  const handleChangeTransferAdd = (e: any) => {
    const { value } = e.target;
    setTransferAdd(value);
  };

  const handleTransferNFT = async () => {
    await transferNft(transferAdd, item, "/profile");
  };

  const selectOptions = (
    Object.keys(TokenType) as Array<keyof typeof TokenType>
  ).map((key) => {
    return {
      value: TokenType[key],
      label: key,
    };
  });

  return (
    <Wrapper isMobile={isMobile}>
      <MintVideoContainer>
        <Image alt="" src={url} />
        <NFTItemImageDownloadIcon
          onClick={downloadImage}
          width="39"
          height="39"
          viewBox="0 0 39 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4912 0.00016266C30.0708 -0.0433684 38.8683 8.65621 38.9988 19.1178C39.1341 29.9892 30.5221 38.7986 19.8753 38.9964C9.0119 39.1989 0.205019 30.5343 0.00352952 19.8806C-0.201744 8.96944 8.57297 -0.00456897 19.4912 0.00016266ZM19.4827 3.82805C10.8196 3.82805 3.83372 10.7996 3.82899 19.451C3.82331 28.1061 10.7695 35.0975 19.2926 35.1893C27.9812 35.283 35.1667 28.212 35.161 19.6175C35.1544 10.8025 28.2376 3.82805 19.4827 3.82805Z"
            fill="#39C639"
          />
          <path
            d="M19.1876 28.9908C17.1557 28.9908 15.1228 28.9804 13.0909 28.9994C12.6482 29.0031 12.4571 28.8801 12.4845 28.4155C12.5148 27.913 12.5129 27.4058 12.4845 26.9032C12.459 26.4528 12.6245 26.2919 13.0814 26.2967C14.7983 26.3156 16.5153 26.3042 18.2331 26.3033C18.375 26.3033 18.5169 26.308 18.6578 26.2985C18.7619 26.2919 18.901 26.3279 18.9464 26.1982C18.9908 26.0724 18.8603 26.009 18.7912 25.9304C18.708 25.8358 18.6143 25.7506 18.5254 25.6617C16.3866 23.522 14.2478 21.3824 12.1109 19.2408C12.0257 19.1547 11.8659 19.079 11.9046 18.9484C11.9557 18.7762 12.143 18.8349 12.2745 18.8339C12.9679 18.8273 13.6613 18.8122 14.3537 18.8358C14.786 18.85 14.9185 18.6891 14.9156 18.2586C14.8996 15.5322 14.9071 12.8058 14.9081 10.0795C14.9081 9.44447 14.9109 9.44069 15.5239 9.44069C17.9815 9.4388 20.4391 9.4388 22.8967 9.44069C23.5106 9.44069 23.5125 9.44542 23.5135 10.0785C23.5144 12.7888 23.5248 15.5 23.504 18.2103C23.5002 18.6816 23.6336 18.8604 24.1141 18.8377C24.7905 18.8065 25.4688 18.8273 26.1461 18.8339C26.2775 18.8349 26.4648 18.7762 26.5169 18.9475C26.5566 19.0781 26.3939 19.1519 26.3107 19.2408C26.1375 19.4244 25.9559 19.5986 25.7771 19.7774C23.8162 21.7391 21.8542 23.698 19.898 25.6645C19.7381 25.8254 19.4061 25.9834 19.495 26.1878C19.5981 26.4263 19.9472 26.2976 20.1865 26.2985C21.8722 26.308 23.5579 26.3023 25.2436 26.3042C25.9181 26.3052 25.9266 26.3165 25.9294 26.996C25.9313 27.4843 25.9105 27.9745 25.9342 28.4618C25.955 28.8811 25.7828 29.0013 25.3779 28.9984C23.3148 28.9823 21.2517 28.9908 19.1876 28.9908Z"
            fill="#39C639"
          />
        </NFTItemImageDownloadIcon>
      </MintVideoContainer>
      <NFTDetailContainer>
        <DetailTitle>NFT ID</DetailTitle>
        <DetailContent>
          {item.token_id_display || item.token_id || ""}
        </DetailContent>
        <DetailTitle>Owner</DetailTitle>
        <DetailContent>{`${owner}${
          account?.address === owner ? " (YOU)" : ""
        }`}</DetailContent>
        {rarityRanks && (
          <>
            <DetailTitle>Rarity Rank</DetailTitle>
            <DetailContent>{`#${rarityRanks.rank}`}</DetailContent>
          </>
        )}
        {status !== "Sell" && (
          <>
            <DetailTitle>Price</DetailTitle>
            <DetailContent>
              <CoinIcon alt="" src={`/coin-images/${price.denom}.png`} />
              <MainPriceContainer>{`${+(price?.amount || 0) / 1e6} ${
                price.denom
                  ? `${(Object.keys(TokenType) as Array<keyof typeof TokenType>)
                      .filter((x) => TokenType[x] === price.denom)[0]
                      ?.toUpperCase()}`
                  : ""
              }`}</MainPriceContainer>
              <UsdPriceContainer>
                {tokenPrice &&
                  `(${((+(price?.amount || 0) / 1e6) * tokenPrice).toFixed(
                    2
                  )}$)`}
              </UsdPriceContainer>
            </DetailContent>
          </>
        )}
        <NFTItemOperationContainer>
          <NFTItemOperationButton onClick={handleNFTItem}>
            {status} Now
          </NFTItemOperationButton>
          {status === "Sell" && (
            <div style={{ display: "flex" }}>
              <NFTItemPriceInputer
                width="200px"
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
                    }),
                  }}
                  onChange={handleChangePriceType}
                  // options={[
                  //   { value: TokenType.HOPE, label: "HOPE" },
                  //   { value: TokenType.JUNO, label: "JUNO" },
                  //   { value: TokenType.RAW, label: "RAW" },
                  //   { value: TokenType.NETA, label: "NETA" },
                  // ]}
                  options={selectOptions}
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
      </NFTDetailContainer>
    </Wrapper>
  );
};

export default NFTItemDetail;
