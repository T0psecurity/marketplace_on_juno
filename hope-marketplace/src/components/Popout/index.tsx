import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useContext } from "react";
// import { toast } from "react-toastify";
// import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import {
  // MsgTransferEncodeObject,
  GasPrice,
  MsgTransferEncodeObject,
} from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
// import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import Long from "long";

import { PopoutContext } from "../../context/PopoutContext";
import { TokenType, TokenStatus } from "../../types/tokens";
import {
  ChainConfigs,
  ChainTypes,
  IBCConfig,
} from "../../constants/ChainTypes";

import "./style.scss";
import { useAppSelector } from "../../app/hooks";

// import {
//   Wrapper,
//   Logo,
//   OperationButton,
//   Container,
//   AmountInputer,
//   ErrMsgContainer,
//   SwapDirection,
//   StyledSvg,
//   TokenSelectContainer,
//   TokenIcon,
//   SwapDirectionContainer,
//   SwapDirectionItem,
// } from "./styled";

export enum SwapType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

type SwapInfo = {
  denom: TokenType;
  swapType: SwapType;
  swapChains: {
    origin: ChainTypes;
    foreign: ChainTypes;
  };
  minAmount?: number;
};

interface QuickSwapProps {
  swapInfo: SwapInfo;
  isFullControl: boolean;
  closeNewWindow: (params: any) => void;
}

const getWallets = async ({
  origin,
  foreign,
}: {
  origin: ChainTypes;
  foreign: ChainTypes;
}) => {
  const originChainConfig = ChainConfigs[origin];
  await window.keplr?.enable(originChainConfig.chainId);
  const originOfflineSigner = await window.getOfflineSignerAuto?.(
    originChainConfig.chainId
  );
  const originAccount = await originOfflineSigner?.getAccounts();
  let originWasmChainClient = null;
  if (originOfflineSigner) {
    try {
      originWasmChainClient = await SigningCosmWasmClient.connectWithSigner(
        originChainConfig.rpcEndpoint,
        originOfflineSigner,
        {
          gasPrice: GasPrice.fromString(
            `${originChainConfig.gasPrice}${originChainConfig.microDenom}`
          ),
        }
      );
    } catch (e) {}
  }
  const originResult = {
    account: originAccount?.[0],
    client: originWasmChainClient,
  };

  const foreignChainConfig = ChainConfigs[foreign];
  await window.keplr?.enable(foreignChainConfig.chainId);
  const foreignOfflineSigner = await window.getOfflineSignerAuto?.(
    foreignChainConfig.chainId
  );
  const foreignAccount = await foreignOfflineSigner?.getAccounts();
  let foreignWasmChainClient = null;
  if (foreignOfflineSigner) {
    try {
      foreignWasmChainClient = await SigningCosmWasmClient.connectWithSigner(
        foreignChainConfig.rpcEndpoint,
        foreignOfflineSigner,
        {
          gasPrice: GasPrice.fromString(
            `${foreignChainConfig.gasPrice}${foreignChainConfig.microDenom}`
          ),
        }
      );
    } catch (e) {
      console.error("wallets", e);
    }
  }
  const foreignResult = {
    account: foreignAccount?.[0],
    client: foreignWasmChainClient,
  };

  return { origin: originResult, foreign: foreignResult };
};

const ArrowIcon = ({ ...props }) => (
  <svg
    className="styledSvg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z" />
  </svg>
);

const QuickSwap: React.FC<QuickSwapProps> = ({
  closeNewWindow,
  isFullControl,
  swapInfo: swapInfoProps,
}) => {
  const [sendingTx, setSendingTx] = useState(false);
  const [swapAmount, setSwapAmount] = useState("");
  const [swapInfo, setSwapInfo] = useState<SwapInfo>({
    denom: TokenType.ATOM,
    swapType: SwapType.WITHDRAW,
    swapChains: {
      origin: ChainTypes.COSMOS,
      foreign: ChainTypes.JUNO,
    },
  });
  const [errMsg, setErrorMsg] = useState("");
  const balances = useAppSelector((state) => state.balances);

  useEffect(() => {
    setSwapInfo(swapInfoProps);
  }, [swapInfoProps]);

  const { fromChain, toChain } = useMemo(() => {
    const denom = swapInfo.denom;
    const tokenStatus = TokenStatus[denom];
    const chainConfig = ChainConfigs[tokenStatus.chain];

    return {
      fromChain:
        swapInfo.swapType === SwapType.DEPOSIT
          ? chainConfig.chainName
          : "JUNO Chain",
      toChain:
        swapInfo.swapType === SwapType.WITHDRAW
          ? chainConfig.chainName
          : "JUNO Chain",
    };
  }, [swapInfo]);

  const setErrMsg = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 2000);
  };

  const handleAccept = async () => {
    if (sendingTx) return;
    if (!swapAmount) {
      setErrMsg("Please input amount.");
      return;
    }
    const amount = Number(swapAmount);
    if (isNaN(amount)) {
      setErrMsg("Invalid amount.");
      return;
    }
    if (
      swapInfo.swapType === SwapType.DEPOSIT &&
      swapInfo.minAmount &&
      amount < swapInfo.minAmount
    ) {
      setErrMsg(`Amount should be greater than ${swapInfo.minAmount}.`);
      return;
    }
    if (
      swapInfo.swapType === SwapType.WITHDRAW &&
      amount * 1e6 > balances[swapInfo.denom].amount
    ) {
      setErrMsg(
        `Amount should be smaller than ${balances[swapInfo.denom].amount}`
      );
    }
    setSendingTx(true);
    const wallets = await getWallets(swapInfo.swapChains);

    const foreignChainConfig = ChainConfigs[swapInfo.swapChains.foreign];

    const timeout = Math.floor(new Date().getTime() / 1000) + 600;
    const timeoutTimestampNanoseconds = timeout
      ? Long.fromNumber(timeout).multiply(1_000_000_000)
      : undefined;

    if (!wallets.origin || !wallets.foreign) {
      setSendingTx(false);
      return;
    }

    const tokenStatus = TokenStatus[swapInfo.denom];

    const senderAddress = wallets.foreign.account?.address;
    const receiverAddress = wallets.origin.account?.address;

    const client = wallets.foreign.client;

    const transferMsg: MsgTransferEncodeObject = {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: MsgTransfer.fromPartial({
        sourcePort: "transfer",
        sourceChannel:
          swapInfo.swapType === SwapType.DEPOSIT
            ? IBCConfig[tokenStatus.chain].channel
            : IBCConfig[tokenStatus.chain].juno_channel,
        sender: senderAddress,
        receiver: receiverAddress,
        token: {
          denom:
            swapInfo.swapType === SwapType.DEPOSIT
              ? foreignChainConfig.microDenom
              : swapInfo.denom,
          amount: String(Number(swapAmount) * 1e6),
        },
        timeoutHeight: undefined,
        timeoutTimestamp: timeoutTimestampNanoseconds,
      }),
    };

    if (senderAddress && client) {
      try {
        await client.signAndBroadcast(
          senderAddress,
          [transferMsg],
          "auto",
          "memo"
        );
        closeNewWindow(true);
      } catch (e) {
        setSendingTx(false);
      }
    } else {
      setSendingTx(false);
    }
  };

  const handleChangeSwapAmount = (e: any) => {
    if (sendingTx) return;
    const { value } = e.target;
    setSwapAmount(value);
  };

  const handleChangeSwapType = (type: SwapType) => {
    if (sendingTx) return;
    setSwapInfo((prev) => ({
      ...prev,
      swapType: type,
      swapChains: {
        origin: prev.swapChains.foreign,
        foreign: prev.swapChains.origin,
      },
    }));
  };

  const handleChangeSwapToken = (denom: TokenType) => {
    setSwapInfo((prev) => ({
      ...prev,
      denom,
    }));
  };

  return (
    <div className="wrapper">
      <div className="logo" />
      <div className="container">
        <div className="swapDirection">
          {fromChain}
          <ArrowIcon />
          {toChain}
        </div>
        {isFullControl && (
          <>
            <div className="tokenSelectContainer">
              {(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
                (key) => {
                  const denom = TokenType[key];
                  const tokenStatus = TokenStatus[denom];
                  if (!tokenStatus.isIBCCOin) return null;
                  return (
                    <img
                      className="tokenIcon"
                      alt=""
                      src={`https://hopers.io/coin-images/${denom.replace(
                        /\//g,
                        ""
                      )}.png`}
                      onClick={() => handleChangeSwapToken(denom)}
                    />
                  );
                }
              )}
            </div>
            <div className="swapDirectionContainer">
              <div
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  color:
                    swapInfo.swapType === SwapType.DEPOSIT
                      ? "#39c639"
                      : "black",
                }}
                onClick={() => handleChangeSwapType(SwapType.DEPOSIT)}
              >
                DEPOSIT
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  color:
                    swapInfo.swapType === SwapType.WITHDRAW
                      ? "#39c639"
                      : "black",
                }}
                onClick={() => handleChangeSwapType(SwapType.WITHDRAW)}
              >
                WITHDRAW
              </div>
            </div>
          </>
        )}
        <input
          className="amountInputer"
          onChange={handleChangeSwapAmount}
          value={swapAmount}
        />
        <div className="errMsgContainer">{errMsg}</div>
        <div className="operationButton" onClick={handleAccept}>
          {sendingTx ? "..." : "Accept"}
        </div>
      </div>
    </div>
  );
};

const usePopoutQuickSwap = () => {
  const { showNewWindow, closeNewWindow } = useContext(PopoutContext);

  const popoutQuickSwap = useCallback(
    (swapInfo: SwapInfo, isFullControl?: boolean, callback?: any) => {
      showNewWindow(
        <QuickSwap
          swapInfo={swapInfo}
          isFullControl={isFullControl || false}
          closeNewWindow={(params: any) => closeNewWindow(params)}
        />,
        {
          title: "Quick Swap",
          onClose: callback,
        }
      );
    },
    [closeNewWindow, showNewWindow]
  );
  return popoutQuickSwap;
};

export default usePopoutQuickSwap;
