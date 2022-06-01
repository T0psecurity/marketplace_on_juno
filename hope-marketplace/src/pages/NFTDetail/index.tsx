import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Title } from "../../components/PageTitle";
import NFTItemDetail from "../../components/NFTItemDetail";
import useContract, { contractAddresses } from "../../hook/useContract";
import usePickNFT from "../../hook/usePickNFT";
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
  const history = useHistory();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const [nftPrice, setNftPrice] = useState("");
  const [transferAdd, setTransferAdd] = useState("");
  const [nftPriceType, setNftPriceType] = useState("");
  const { search } = useLocation();
  const token_id = new URLSearchParams(search).get("token_id");
  const { pickNFTByTokenId } = usePickNFT();
  const selectedNFT: any = pickNFTByTokenId(token_id || "");

  const { runExecute } = useContract();
  const status = selectedNFT.seller
    ? selectedNFT.seller === account?.address
      ? "Withdraw"
      : "Buy"
    : "Sell";
  const handleNFTItem = async () => {
    if (status === "Sell") {
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
          contract: selectedNFT.token_id.includes("Hope")
            ? contractAddresses.MARKET_CONTRACT
            : contractAddresses.MARKET_REVEAL_CONTRACT,
          token_id: selectedNFT.token_id,
          msg: btoa(
            JSON.stringify({
              list_price: {
                denom: nftPriceType === NFTPriceType.HOPE ? "hope" : "ujuno",
                amount: `${price * 1e6}`,
              },
            })
          ),
        },
      };
      try {
        await runExecute(
          selectedNFT.token_id.includes("Hope")
            ? contractAddresses.NFT_CONTRACT
            : contractAddresses.REVEAL_NFT_CONTRACT,
          message
        );
        toast.success("Success!");
        history.push("/profile");
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    } else if (status === "Withdraw") {
      const message = {
        withdraw_nft: {
          offering_id: selectedNFT.id,
        },
      };
      try {
        await runExecute(
          selectedNFT.token_id.includes("Hope")
            ? contractAddresses.MARKET_CONTRACT
            : contractAddresses.MARKET_REVEAL_CONTRACT,
          message
        );
        toast.success("Success!");
        history.push("/profile");
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    } else if (status === "Buy") {
      const price = selectedNFT?.list_price || {};
      const message =
        price.denom === NFTPriceType.HOPE
          ? {
              send: {
                contract: selectedNFT.token_id.includes("Hope")
                  ? contractAddresses.MARKET_CONTRACT
                  : contractAddresses.MARKET_REVEAL_CONTRACT,
                amount: price.amount,
                msg: btoa(
                  JSON.stringify({
                    offering_id: selectedNFT.id,
                  })
                ),
              },
            }
          : {
              buy_nft: {
                offering_id: selectedNFT.id,
              },
            };
      try {
        if (price.denom === NFTPriceType.HOPE) {
          await runExecute(contractAddresses.TOKEN_CONTRACT, message);
        } else {
          await runExecute(
            selectedNFT.token_id.includes("Hope")
              ? contractAddresses.MARKET_CONTRACT
              : contractAddresses.MARKET_REVEAL_CONTRACT,
            message,
            {
              funds: "" + Number(price.amount) / 1e6,
            }
          );
        }
        toast.success("Success!");
        history.push("/profile");
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
    const { value } = e.target;
    setNftPriceType(value);
  };
  const handleChangeTransferAdd = (e: any) => {
    const { value } = e.target;
    setTransferAdd(value);
  };
  const handleTransferNFT = async () => {
    const message = {
      transfer_nft: {
        recipient: transferAdd,
        token_id: selectedNFT.token_id,
      },
    };
    try {
      await runExecute(
        selectedNFT.token_id.includes("Hope")
          ? contractAddresses.NFT_CONTRACT
          : contractAddresses.REVEAL_NFT_CONTRACT,
        message
      );
      toast.success("Success!");
      history.push("/profile");
    } catch (err) {
      console.log("err: ", err);
      toast.error("Fail!");
    }
  };
  return (
    <Wrapper>
      <Title title="HOPE GALAXY NFT - collection 1" />
      <NFTItemDetail />
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
