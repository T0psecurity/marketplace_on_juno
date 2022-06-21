import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getCollectionById } from "../constants/Collections";
import useContract from "./useContract";
import useFetch from "./useFetch";
import { contractAddresses } from "./useContract";

export const NFTPriceType = {
  HOPE: "hope",
  JUNO: "ujuno",
};

const useHandleNftItem = () => {
  const { runExecute } = useContract();
  const { fetchAllNFTs } = useFetch();
  const history = useHistory();

  const sellNft = useCallback(
    async (item: any, nftPrice: any, nftPriceType: any) => {
      const targetCollection = getCollectionById(item.collectionId);
      const regExp = /^(\d+(\.\d+)?)$/;
      const price = +nftPrice;
      if (!item.collectionId || !targetCollection) {
        toast.error("Collection not found!");
        return;
      }
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
      const marketplaceContract = targetCollection.marketplaceContract[0];
      const nftContract = targetCollection.nftContract;
      const message = {
        send_nft: {
          // contract: item.token_id.includes("Hope")
          //   ? contractAddresses.MARKET_CONTRACT
          //   : contractAddresses.MARKET_REVEAL_CONTRACT,
          contract: marketplaceContract,
          token_id: item.token_id,
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
          // item.token_id.includes("Hope")
          //   ? contractAddresses.NFT_CONTRACT
          //   : contractAddresses.REVEAL_NFT_CONTRACT,
          nftContract,
          message
        );
        toast.success("Success!");
        fetchAllNFTs();
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    },
    [runExecute, fetchAllNFTs]
  );
  const withdrawNft = useCallback(
    async (item: any) => {
      const message = {
        withdraw_nft: {
          offering_id: item.id,
        },
      };
      try {
        await runExecute(
          // item.token_id.includes("Hope")
          //   ? contractAddresses.MARKET_CONTRACT
          //   : contractAddresses.MARKET_REVEAL_CONTRACT,
          item.contractAddress,
          message
        );
        toast.success("Success!");
        fetchAllNFTs();
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    },
    [runExecute, fetchAllNFTs]
  );
  const buyNft = useCallback(
    async (item: any) => {
      if (!item.contractAddress) return;
      const price = item?.list_price || {};
      const message =
        price.denom === NFTPriceType.HOPE
          ? {
              send: {
                // contract: item.token_id.includes("Hope")
                //   ? contractAddresses.MARKET_CONTRACT
                //   : contractAddresses.MARKET_REVEAL_CONTRACT,
                contract: item.contractAddress,
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
          await runExecute(
            // item.token_id.includes("Hope")
            //   ? contractAddresses.MARKET_CONTRACT
            //   : contractAddresses.MARKET_REVEAL_CONTRACT,
            item.contractAddress,
            message,
            {
              funds: "" + price.amount / 1e6,
            }
          );
        }
        toast.success("Success!");
        fetchAllNFTs();
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    },
    [runExecute, fetchAllNFTs]
  );
  const transferNft = useCallback(
    async (recipient: any, item: any, callbackLink?: string) => {
      const targetCollection = getCollectionById(item.collectionId);
      const message = {
        transfer_nft: {
          recipient: recipient,
          token_id: item.token_id,
        },
      };
      try {
        await runExecute(targetCollection.nftContract, message);
        toast.success("Success!");
        if (callbackLink) history.push(callbackLink);
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      }
    },
    [history, runExecute]
  );

  return {
    sellNft,
    withdrawNft,
    buyNft,
    transferNft,
  };
};

export default useHandleNftItem;
