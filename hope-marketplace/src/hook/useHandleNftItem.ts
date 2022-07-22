import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../app/hooks";
import { showCustomToast, ToastType } from "../components/CustomToast";
import {
  getCollectionById,
  MarketplaceContracts,
} from "../constants/Collections";
import { TokenStatus, TokenType } from "../types/tokens";
import useContract from "./useContract";
import useRefresh from "./useRefresh";

const useHandleNftItem = () => {
  const { runExecute } = useContract();
  const { refresh } = useRefresh();
  const history = useHistory();
  const balances = useAppSelector((state) => state.balances);

  const sellNft = useCallback(
    async (item: any, nftPrice: any, TokenType: any) => {
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
      if (!TokenType) {
        toast.error("Select Price Type!");
        return;
      }
      // if (TokenType === TokenType.HOPE && price < 1) {
      //   toast.error("Insufficient Price!");
      //   return;
      // }
      // const marketplaceContract = targetCollection.marketplaceContract[0];
      const marketplaceContract = MarketplaceContracts[0];
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
                denom: TokenType,
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
        refresh();
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    },
    [runExecute, refresh]
  );
  const withdrawNft = useCallback(
    async (item: any) => {
      const targetCollection = getCollectionById(item.collectionId);
      const message = {
        withdraw_nft: {
          offering_id: item.id,
          ...(MarketplaceContracts.includes(item.contractAddress) && {
            nft_address: targetCollection.nftContract,
          }),
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
        refresh();
      } catch (err) {
        console.error(err);
        toast.error("Fail!");
      }
    },
    [runExecute, refresh]
  );
  const buyNft = useCallback(
    async (item: any) => {
      if (!item.contractAddress) return;
      const price = item?.list_price || {};
      const myBalance = balances[price.denom as TokenType];
      if ((myBalance?.amount || 0) < Number(price.amount)) {
        const tokenName = (
          Object.keys(TokenType) as Array<keyof typeof TokenType>
        )
          .filter((x) => TokenType[x] === price.denom)[0]
          ?.toUpperCase();
        toast.error(
          `Insufficient balance! You have only ${
            (myBalance?.amount || 0) / 1e6
          } ${tokenName}.`
        );
        return;
      }
      const targetCollection = getCollectionById(item.collectionId);
      const message =
        price.denom === TokenType.JUNO
          ? {
              buy_nft: {
                offering_id: item.id,
                ...(MarketplaceContracts.includes(item.contractAddress) && {
                  nft_address: targetCollection.nftContract,
                }),
              },
            }
          : {
              send: {
                // contract: item.token_id.includes("Hope")
                //   ? contractAddresses.MARKET_CONTRACT
                //   : contractAddresses.MARKET_REVEAL_CONTRACT,
                contract: item.contractAddress,
                amount: price.amount,
                msg: btoa(
                  JSON.stringify({
                    offering_id: item.id,
                    ...(MarketplaceContracts.includes(item.contractAddress) && {
                      nft_address: targetCollection.nftContract,
                    }),
                  })
                ),
              },
            };
      try {
        if (price.denom === TokenType.JUNO) {
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
        } else {
          await runExecute(
            TokenStatus[price.denom as TokenType].contractAddress || "",
            message
          );
        }
        showCustomToast(item, ToastType.BUY);
        refresh();
      } catch (err: any) {
        const errMsg = err.message;
        console.error(errMsg, typeof errMsg);
        toast.error(`Fail! ${errMsg}`);
      }
    },
    [runExecute, refresh]
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
