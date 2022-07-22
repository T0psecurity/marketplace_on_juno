import React, { useCallback, useState } from "react";

import { useContext } from "react";
// import { toast } from "react-toastify";
// import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";

import { PopoutContext } from "../../context/PopoutContext";
import { TokenType } from "../../types/tokens";
import {
  ChainConfigs,
  ChainTypes,
  // IBCConfig,
} from "../../constants/ChainTypes";

import {
  Wrapper,
  Logo,
  OperationButton,
  Container,
  AmountInputer,
  ErrMsgContainer,
} from "./styled";
import {
  // MsgTransferEncodeObject,
  GasPrice,
} from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

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
  closeNewWindow: (params: any) => void;
}

const getWallets = async ({
  origin,
  foreign,
}: {
  origin: ChainTypes;
  foreign: ChainTypes;
}) => {
  const foreignChainConfig = ChainConfigs[foreign];
  await window.keplr?.enable(foreignChainConfig.chainId);
  const foreignOfflineSigner = window.getOfflineSigner?.(
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

  const originChainConfig = ChainConfigs[origin];
  await window.keplr?.enable(originChainConfig.chainId);
  const originOfflineSigner = window.getOfflineSigner?.(
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

  return { origin: originResult, foreign: foreignResult };
};

const QuickSwap: React.FC<QuickSwapProps> = ({ closeNewWindow, swapInfo }) => {
  const [swapAmount, setSwapAmount] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleAccept = async () => {
    // closeNewWindow(100);
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
    const wallets = await getWallets(swapInfo.swapChains);
    console.log("wallets", wallets);

    // const transferMsg: MsgTransferEncodeObject = {
    //   typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
    //   value: MsgTransfer.fromPartial({
    //     sourcePort: "transfer",
    //     sourceChannel:
    //       swapInfo.swapType === SwapType.DEPOSIT
    //         ? IBCConfig[swapInfo.swapChains.foreign].channel
    //         : IBCConfig[swapInfo.swapChains.foreign].juno_channel,
    //     sender: swapInfo.swapType === SwapType.DEPOSIT? wallets,
    //     receiver: recipientAddress,
    //     token: transferAmount,
    //     timeoutHeight: timeoutHeight,
    //     timeoutTimestamp: timeoutTimestampNanoseconds,
    //   }),
    // };
  };

  const handleChangeSwapAmount = (e: any) => {
    const { value } = e.target;
    setSwapAmount(value);
  };

  return (
    <Wrapper>
      <Logo />
      <Container>
        <AmountInputer onChange={handleChangeSwapAmount} value={swapAmount} />
        <ErrMsgContainer>{errMsg}</ErrMsgContainer>
        <OperationButton onClick={handleAccept}>Accept</OperationButton>
      </Container>
    </Wrapper>
  );
};

const usePopoutQuickSwap = () => {
  const { showNewWindow, closeNewWindow } = useContext(PopoutContext);

  const popoutQuickSwap = useCallback(
    (swapInfo: SwapInfo, callback?: any) => {
      showNewWindow(
        <QuickSwap
          swapInfo={swapInfo}
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
