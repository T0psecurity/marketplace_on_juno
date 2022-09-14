import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import CountDown from "../../components/CountDown";
import {
  DiscordIcon,
  GlobeIcon,
  ListIcon,
  SwapCrossIcon,
  TwitterIcon,
} from "../../components/SvgIcons";
import Text from "../../components/Text";
import { BasicProps } from "../../constants/BasicTypes";
import { IDOInterface } from "../../constants/IDOs";
import useContract from "../../hook/useContract";
import { TokenType } from "../../types/tokens";

import {
  Button,
  ClearDiv,
  IDOItemContent,
  IDOItemHeader,
  IDOItemSocialLinkContainer,
  IDOItemWrapper as Wrapper,
  TokenAmountAutoInputer,
  TokenAmountAutoInputItem,
  TokenImage,
  TokenLogo,
  TokenLogoContainer,
  TokenOperationPanel,
  TokenPercentageSoldValue,
  TokenSoldStatus,
  TokenSoldStatusItem,
  TokenSwapAmountInputer,
  TokenSwapAmountItem,
  TokenSwapAmountPanel,
} from "./styled";

interface IDOItemProps extends BasicProps {
  idoInfo: IDOInterface;
}

enum SwapAmountType {
  ORIGIN,
  TARGET,
}

enum PresaleState {
  BEFORE,
  PRESALE,
  ENDED,
}

type AvailableTokenType = TokenType.JUNO | TokenType.ATOM;

const AvailableTokens: {
  [key in AvailableTokenType]: {
    fieldKey: string;
  };
} = {
  [TokenType.JUNO]: {
    fieldKey: "token_cost_juno",
  },
  [TokenType.ATOM]: {
    fieldKey: "token_cost_atom",
  },
};

const IDOItem: React.FC<IDOItemProps> = ({ idoInfo }) => {
  const [swapAmount, setSwapAmount] = useState<any>({
    [SwapAmountType.ORIGIN]: 0,
    [SwapAmountType.TARGET]: 0,
  });
  const [fetchResult, setFetchResult] = useState<{
    stateInfo: any;
    saleInfo: any;
  }>({
    stateInfo: {},
    saleInfo: {},
  });
  const [selectedTokenType, setSelectedTokenType] =
    useState<AvailableTokenType>(TokenType.JUNO);

  const { runQuery } = useContract();
  const balances = useAppSelector((state) => state.balances);

  useEffect(() => {
    (async () => {
      const contractAddress = idoInfo.contract;
      const stateQueryResult = await runQuery(contractAddress, {
        get_state_info: {},
      });
      const saleQueryResult = await runQuery(contractAddress, {
        get_sale_info: {},
      });
      setFetchResult({
        stateInfo: stateQueryResult || {},
        saleInfo: saleQueryResult || {},
      });
    })();
  }, [idoInfo.contract, runQuery]);

  const idoStatus = useMemo(() => {
    const totalAmount = Number(fetchResult.stateInfo.total_supply || 0);
    const tokenBalance = (balances[TokenType.JUNO]?.amount || 0) / 1e6;
    const startTime = fetchResult.stateInfo?.presale_start
      ? new Date(fetchResult.stateInfo.presale_start * 1000)
      : new Date();
    const endTime = new Date(
      Number(startTime) + (fetchResult.stateInfo.presale_period || 0) * 1000
    );
    const now = new Date();
    let crrState =
      Number(now) < Number(startTime)
        ? PresaleState.BEFORE
        : Number(now) < Number(endTime)
        ? PresaleState.PRESALE
        : PresaleState.ENDED;
    let ratio = Number(
      fetchResult.stateInfo[AvailableTokens[selectedTokenType].fieldKey]
    );
    const tokenSoldAmount = Number(fetchResult.saleInfo.token_sold_amount || 0);
    const percentageSold = Number(
      ((tokenSoldAmount / totalAmount) * 100).toFixed(2)
    );

    return {
      ratio,
      percentageSold,
      total: totalAmount.toLocaleString("en-Us", { maximumFractionDigits: 2 }),
      tokenBalance,
      startTime,
      endTime,
      crrState,
      balance:
        tokenBalance.toLocaleString("en-Us", {
          maximumFractionDigits: 2,
        }) + " JUNO",
    };
  }, [balances, fetchResult, selectedTokenType]);

  const handleChangeSwapAmountInput = (amountType: SwapAmountType, e: any) => {
    const { value } = e.target;
    if (!Number.isNaN(Number(value))) {
      handleChangeSwapAmount(amountType, value);
    }
  };

  const handleChangeSwapAmount = (amountType: SwapAmountType, amount: any) => {
    let newAmountObject = {
      [amountType]: amount,
    };
    if (amountType === SwapAmountType.ORIGIN) {
      newAmountObject[SwapAmountType.TARGET] = Number(amount) * idoStatus.ratio;
    } else {
      newAmountObject[SwapAmountType.ORIGIN] = Number(amount) / idoStatus.ratio;
    }
    setSwapAmount(newAmountObject);
  };

  return (
    <Wrapper>
      <IDOItemHeader>
        <Text
          justifyContent="flex-start"
          fontSize="20px"
          bold
        >{`${idoInfo.title} | ${idoInfo.name}`}</Text>
        <IDOItemSocialLinkContainer>
          <TwitterIcon height={20} />
          <DiscordIcon height={20} />
          <GlobeIcon height={20} />
          <ListIcon height={20} />
        </IDOItemSocialLinkContainer>
      </IDOItemHeader>
      <IDOItemContent>
        <TokenLogoContainer>
          <TokenLogo src={`/token-logos/${idoInfo.id}.png`} alt="" />
          <Button color="white">Details</Button>
        </TokenLogoContainer>
        <Text justifyContent="flex-start">{idoInfo.description}</Text>
        <TokenOperationPanel>
          <TokenSoldStatus>
            <TokenSoldStatusItem>
              <Text>Number of Tokens in Presale</Text>
              <Text bold>{`${idoStatus.total} ${idoInfo.name}`}</Text>
            </TokenSoldStatusItem>
            <TokenSoldStatusItem>
              <Text>Percentage Sold</Text>
              <TokenPercentageSoldValue
                bold
                percentage={idoStatus.percentageSold}
              >{`${idoStatus.percentageSold}%`}</TokenPercentageSoldValue>
            </TokenSoldStatusItem>
          </TokenSoldStatus>
          <TokenSwapAmountPanel>
            <TokenSwapAmountItem>
              <TokenImage src="/coin-images/ujuno.png" alt="" />
              <TokenSwapAmountInputer>
                <TokenAmountAutoInputer>
                  <TokenAmountAutoInputItem
                    onClick={() =>
                      handleChangeSwapAmount(
                        SwapAmountType.ORIGIN,
                        idoStatus.tokenBalance * 0.25
                      )
                    }
                  >
                    25%
                  </TokenAmountAutoInputItem>
                  <TokenAmountAutoInputItem
                    onClick={() =>
                      handleChangeSwapAmount(
                        SwapAmountType.ORIGIN,
                        idoStatus.tokenBalance * 0.5
                      )
                    }
                  >
                    50%
                  </TokenAmountAutoInputItem>
                  <TokenAmountAutoInputItem
                    onClick={() =>
                      handleChangeSwapAmount(
                        SwapAmountType.ORIGIN,
                        idoStatus.tokenBalance * 0.75
                      )
                    }
                  >
                    75%
                  </TokenAmountAutoInputItem>
                  <TokenAmountAutoInputItem
                    onClick={() =>
                      handleChangeSwapAmount(
                        SwapAmountType.ORIGIN,
                        idoStatus.tokenBalance
                      )
                    }
                  >
                    100%
                  </TokenAmountAutoInputItem>
                </TokenAmountAutoInputer>
                <input
                  value={swapAmount[SwapAmountType.ORIGIN]}
                  onChange={(e) =>
                    handleChangeSwapAmountInput(SwapAmountType.ORIGIN, e)
                  }
                />
                <Text>{`Balance ${idoStatus.balance}`}</Text>
              </TokenSwapAmountInputer>
            </TokenSwapAmountItem>
            <SwapCrossIcon width={30} />
            <TokenSwapAmountItem>
              <TokenSwapAmountInputer>
                <Text>{`1 JUNO = ${idoStatus.ratio} HOPERS`}</Text>
                <input
                  value={swapAmount[SwapAmountType.TARGET]}
                  onChange={(e) =>
                    handleChangeSwapAmountInput(SwapAmountType.TARGET, e)
                  }
                />
                <Text>{idoInfo.name}</Text>
              </TokenSwapAmountInputer>
              <TokenImage src={`/token-logos/${idoInfo.id}.png`} alt="" />
            </TokenSwapAmountItem>
          </TokenSwapAmountPanel>
          <Button>BUY</Button>
        </TokenOperationPanel>
        <ClearDiv />
        <CountDown
          time={
            idoStatus.crrState === PresaleState.BEFORE
              ? idoStatus.startTime
              : idoStatus.endTime
          }
        />
      </IDOItemContent>
    </Wrapper>
  );
};

export default IDOItem;
