import {
  useCallback,
  // useEffect
} from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../app/hooks";
import {
  showBuySuccessToast,
  showInsufficientToast,
  ToastType,
} from "../components/CustomToast";
import usePopoutQuickSwap, { SwapType } from "../components/Popout";
import { ChainTypes } from "../constants/ChainTypes";
import {
  CollectionIds,
  getCollectionById,
  MarketplaceContracts,
} from "../constants/Collections";
import { TokenStatus, TokenType } from "../types/tokens";
import useContract from "./useContract";
import usePickNFT from "./usePickNFT";
import useRefresh from "./useRefresh";

const useHandleNftItem = () => {
  const { runExecute } = useContract();
  const { refresh } = useRefresh();
  const history = useHistory();
  const popoutQuickSwap = usePopoutQuickSwap();
  const { pickNFTByTokenId } = usePickNFT();
  const balances = useAppSelector((state) => state.balances);

  const sellNft = useCallback(
    async (item: any, nftPrice: any, tokenType: any, expireDate: number) => {
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
      if (!tokenType) {
        toast.error("Select Price Type!");
        return;
      }
      // if (targetCollection.listMinPrice?.amount && price * 1e6 < targetCollection.listMinPrice.amount) {
      //   toast.error(`Price couldn't be smaller than `)
      // }
      // if (TokenType === TokenType.HOPE && price < 1) {
      //   toast.error("Insufficient Price!");
      //   return;
      // }
      // const marketplaceContract = targetCollection.marketplaceContract[0];
      const marketplaceContract = MarketplaceContracts[0];
      const nftContract = targetCollection.nftContract;
      const tokenStatus = TokenStatus[tokenType as TokenType];
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
                denom: tokenType,
                amount: `${price * 1e6}`,
              },
              expire: `${(Number(new Date()) + 180 * 24 * 3600 * 1000) * 1e6}`,
              ...(!tokenStatus.isNativeCoin && {
                token_address: tokenStatus.contractAddress,
              }),
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
      // const message = {
      //   withdraw_nft: {
      //     offering_id: item.id,
      //     ...(MarketplaceContracts.includes(item.contractAddress) && {
      //       nft_address: targetCollection.nftContract,
      //     }),
      //   },
      // };
      const message = MarketplaceContracts.includes(item.contractAddress)
        ? {
            withdraw_nft: {
              token_id: item.token_id,
              nft_address: targetCollection.nftContract,
            },
          }
        : {
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
        refresh();
      } catch (err) {
        console.error("withdraw error", item, message, err);
        toast.error("Fail!");
      }
    },
    [runExecute, refresh]
  );

  const makeOfferToNft = useCallback(
    async (item: any, nftPrice: any, tokenType: any, expire: number) => {
      const regExp = /^(\d+(\.\d+)?)$/;
      const price = +nftPrice;
      const targetCollection = getCollectionById(item.collectionId);
      const tokenStatus = TokenStatus[tokenType as TokenType];
      if (!(price > 0 && regExp.test(nftPrice))) {
        toast.error("Invalid Price!");
        return;
      }
      if (!tokenType) {
        toast.error("Select Price Type!");
        return;
      }
      const message = tokenStatus.isNativeCoin
        ? {
            set_bid_coin: {
              nft_address: targetCollection.nftContract,
              expire: `${expire}`,
              sale_type: "auction",
              token_id: item.token_id,
              list_price: {
                denom: tokenType,
                amount: `${price * 1e6}`,
              },
            },
          }
        : {
            send: {
              contract: item.contractAddress,
              amount: `${price * 1e6}`,
              msg: btoa(
                JSON.stringify({
                  sale_type: "auction",
                  nft_address: targetCollection.nftContract,
                  token_id: item.token_id,
                  expire: `${expire}`,
                })
              ),
            },
          };
      try {
        if (tokenStatus.isNativeCoin) {
          await runExecute(item.contractAddress, message, {
            funds: `${price}`,
            denom: tokenType,
          });
        } else {
          await runExecute(
            TokenStatus[tokenType as TokenType].contractAddress || "",
            message
          );
        }
        toast.success("Make offer successfully!");
        refresh();
      } catch (err: any) {
        const errMsg = err.message;
        console.error(err, errMsg, typeof errMsg);
        toast.error(`Fail! ${errMsg}`);
      }
    },
    [refresh, runExecute]
  );

  const makeOfferToCollection = useCallback(
    async (
      collectionId: CollectionIds,
      nftPrice: any,
      tokenType: any,
      expire: number
    ) => {
      const regExp = /^(\d+(\.\d+)?)$/;
      const price = +nftPrice;
      const targetCollection = getCollectionById(collectionId);
      const tokenStatus = TokenStatus[tokenType as TokenType];
      if (!(price > 0 && regExp.test(nftPrice))) {
        toast.error("Invalid Price!");
        return;
      }
      if (!tokenType) {
        toast.error("Select Price Type!");
        return;
      }
      const message = tokenStatus.isNativeCoin
        ? {
            set_bid_coin: {
              nft_address: targetCollection.nftContract,
              expire: `${expire}`,
              sale_type: "collection_bid",
              list_price: {
                denom: tokenType,
                amount: `${price * 1e6}`,
              },
            },
          }
        : {
            send: {
              contract: MarketplaceContracts[0],
              amount: `${price * 1e6}`,
              msg: btoa(
                JSON.stringify({
                  sale_type: "collection_bid",
                  nft_address: targetCollection.nftContract,
                  expire: `${expire}`,
                })
              ),
            },
          };
      try {
        if (tokenStatus.isNativeCoin) {
          await runExecute(MarketplaceContracts[0], message, {
            funds: `${price}`,
            denom: tokenType,
          });
        } else {
          await runExecute(
            TokenStatus[tokenType as TokenType].contractAddress || "",
            message
          );
        }
        toast.success("Make offer successfully!");
        refresh();
      } catch (err: any) {
        const errMsg = err.message;
        console.error(err, errMsg, typeof errMsg);
        toast.error(`Fail! ${errMsg}`);
      }
    },
    [refresh, runExecute]
  );

  const mainLogic = useCallback(
    async (item: any) => {
      const price = item?.list_price || {};
      const targetCollection = getCollectionById(item.collectionId);
      const tokenStatus = TokenStatus[price.denom as TokenType];
      let message: any;
      if (item.contractAddress === MarketplaceContracts[0]) {
        message = tokenStatus.isNativeCoin
          ? {
              set_bid_coin: {
                nft_address: targetCollection.nftContract,
                expire: "0",
                sale_type: "fixed_price",
                token_id: item.token_id,
                list_price: price,
              },
            }
          : {
              send: {
                contract: item.contractAddress,
                amount: price.amount,
                msg: btoa(
                  JSON.stringify({
                    sale_type: "fixed_price",
                    nft_address: targetCollection.nftContract,
                    token_id: item.token_id,
                    expire: "0",
                  })
                ),
              },
            };
      } else {
        message = tokenStatus.isNativeCoin
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
      }
      try {
        if (tokenStatus.isNativeCoin) {
          await runExecute(
            // item.token_id.includes("Hope")
            //   ? contractAddresses.MARKET_CONTRACT
            //   : contractAddresses.MARKET_REVEAL_CONTRACT,
            item.contractAddress,
            message,
            {
              funds: "" + price.amount / 1e6,
              denom: price.denom,
            }
          );
        } else {
          await runExecute(
            TokenStatus[price.denom as TokenType].contractAddress || "",
            message
          );
        }
        showBuySuccessToast(item, ToastType.BUY);
        refresh();
      } catch (err: any) {
        const errMsg = err.message;
        console.error(err, errMsg, typeof errMsg);
        toast.error(`Fail! ${errMsg}`);
      }
    },
    [refresh, runExecute]
  );

  const buyNft = useCallback(
    async (item: any) => {
      if (!item.contractAddress) return;
      const price = item?.list_price || {};
      const myBalance = balances[price.denom as TokenType];
      const tokenStatus = TokenStatus[price.denom as TokenType];

      const showQuickSwapPopout = (
        item: any,
        denom: TokenType,
        insufficientAmount: number
      ) => {
        popoutQuickSwap(
          {
            swapType: SwapType.DEPOSIT,
            denom,
            swapChains: {
              origin: ChainTypes.JUNO,
              foreign: ChainTypes.COSMOS,
            },
            minAmount: insufficientAmount,
          },
          false,
          async (amount: any) => {
            if (amount) {
              setTimeout(() => {
                mainLogic(item);
              }, 5000);
            }
            return;
          }
        );
      };

      if ((myBalance?.amount || 0) < Number(price.amount)) {
        const tokenName = (
          Object.keys(TokenType) as Array<keyof typeof TokenType>
        )
          .filter((x) => TokenType[x] === price.denom)[0]
          ?.toUpperCase();
        const insufficientAmount =
          (Number(price.amount) - (myBalance?.amount || 0)) / 1e6;
        showInsufficientToast(
          myBalance?.amount || 0,
          tokenName,
          tokenStatus.isIBCCOin &&
            (() =>
              showQuickSwapPopout(
                item,
                price.denom as TokenType,
                insufficientAmount
              ))
        );
        return;
      }
      await mainLogic(item);
    },
    [balances, mainLogic, popoutQuickSwap]
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
        console.error("transfer error", item, message, err);
        toast.error("Fail!");
      }
    },
    [history, runExecute]
  );

  const acceptBid = useCallback(
    async (offer: any) => {
      if (!offer) return;
      const selectedNFT: any = pickNFTByTokenId(offer.token_id || "");
      const targetCollection = getCollectionById(selectedNFT.collectionId);
      const message = {
        accept_bid: {
          nft_address: targetCollection.nftContract,
          token_id: selectedNFT.token_id,
          bidder: offer.bidder,
        },
      };
      try {
        await runExecute(selectedNFT.contractAddress, message);
        toast.success("Accept bid successfully!");
        refresh();
        history.goBack();
      } catch (e) {
        toast.error("Accept bid failed!");
      }
    },
    [history, pickNFTByTokenId, refresh, runExecute]
  );

  const withdrawBid = useCallback(
    async (offer: any) => {
      if (!offer) return;
      const selectedNFT: any = pickNFTByTokenId(offer.token_id || "");
      const targetCollection = getCollectionById(selectedNFT.collectionId);
      const message = {
        remove_bid: {
          nft_address: targetCollection.nftContract,
          token_id: offer.token_id,
        },
      };
      try {
        await runExecute(selectedNFT.contractAddress, message);
        toast.success("Withdraw bid successfully!");
        refresh();
      } catch (e) {
        toast.error("Withdraw bid failed!");
      }
    },
    [history, pickNFTByTokenId, refresh, runExecute]
  );

  return {
    sellNft,
    withdrawNft,
    buyNft,
    transferNft,
    makeOfferToNft,
    makeOfferToCollection,
    acceptBid,
    withdrawBid,
  };
};

export default useHandleNftItem;
