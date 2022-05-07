import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { setSelectedNFT } from "../../features/nfts/nftsSlice";
import useContract, { contractAddresses } from "../../hook/useContract";
import useFetch from "../../hook/useFetch";

import {
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

export const NFTPriceType = {
  HOPE: "hope",
  JUNO: "juno",
};

export default function NFTItem({ item, status }: NFTItemProps) {
  const [nftPrice, setNftPrice] = useState("");
  const [nftPriceType, setNftPriceType] = useState("");
  const { runExecute } = useContract();
  const { fetchAllNFTs } = useFetch();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const price = item?.list_price || {};

  const handleNFTItem = async () => {
    if (status === NFTItemStatus.SELL) {
      const regExp = /^(\d+(\.\d+)?)$/;
      const price = +nftPrice;
      if (!(price > 0 && regExp.test(nftPrice))) {
        toast.error("Invalid Price!");
        return;
      }
      if (!nftPriceType) {
        toast.error("Select Price Type!");
        return;
      }
      if (nftPriceType === NFTPriceType.HOPE && price < 1) {
        toast.error("Insufficient Price!");
        return;
      }
      const message = {
        send_nft: {
          contract: contractAddresses.MARKET_CONTRACT,
          token_id: item.token_id,
          msg: btoa(
            JSON.stringify({
              list_price: {
                denom: nftPriceType === NFTPriceType.HOPE ? "hope" : "ujunox",
                amount: `${price * 1e6}`,
              },
            })
          ),
        },
      };
      try {
        await runExecute(contractAddresses.NFT_CONTRACT, message);
        toast.success("Success!");
        fetchAllNFTs();
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    } else if (status === NFTItemStatus.WITHDRAW) {
      const message = {
        withdraw_nft: {
          offering_id: item.id,
        },
      };
      try {
        await runExecute(contractAddresses.MARKET_CONTRACT, message);
        toast.success("Success!");
        fetchAllNFTs();
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    } else if (status === NFTItemStatus.BUY) {
      const price = item?.list_price || {};
      const message =
        price.denom === NFTPriceType.HOPE
          ? {
              send: {
                contract: contractAddresses.MARKET_CONTRACT,
                amount: price.amount,
                msg: btoa(
                  JSON.stringify({
                    offering_id: item.id,
                  })
                ),
              },
            }
          : {
              buy_nft: {
                offering_id: item.id,
              },
            };
      try {
        if (price.denom === NFTPriceType.HOPE) {
          await runExecute(contractAddresses.TOKEN_CONTRACT, message);
        } else {
          await runExecute(contractAddresses.MARKET_CONTRACT, message, {
            funds: "" + price.amount / 1e6,
          });
        }
        toast.success("Success!");
        fetchAllNFTs();
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    }
  };

  const handleChangeNFTPrice = (e: any) => {
    const { value } = e.target;
    setNftPrice(value);
    // if (!isNaN(Number(value))) setNftPrice(Number(value));
  };

  const handleChangePriceType = (e: any) => {
    console.log("clicked", item.token_id);
    const { value } = e.target;
    setNftPriceType(value);
  };

  const handleGotoDetail = () => {
    dispatch(setSelectedNFT(item));
    history.push("/detail");
  };

  return (
    <NFTItemWrapper>
      <NFTItemImage
        onClick={handleGotoDetail}
        alt=""
        src="others/mint_pass.png"
      />
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
      <NFTItemOperationContainer>
        <NFTItemOperationButton onClick={handleNFTItem}>
          {status}
        </NFTItemOperationButton>
        {status === NFTItemStatus.SELL && (
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
