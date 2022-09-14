import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactSelect, { ControlProps } from "react-select";
import { FilterButtonOptions, PresaleState } from ".";
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
import { TokenType } from "../../types/tokens";

import {
  Button,
  ClearDiv,
  CustomControl,
  IDOItemContent,
  IDOItemHeader,
  IDOItemSocialLinkContainer,
  IDOItemWrapper as Wrapper,
  OtherInfoContainer,
  PresaleStatus,
  RememberMe,
  SelectItem,
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
import useIDOStatus from "./useIDOStatus";

interface IDOItemProps extends BasicProps {
  idoInfo: IDOInterface;
}

enum SwapAmountType {
  ORIGIN,
  TARGET,
}

type AvailableTokenType = TokenType.JUNO | TokenType.ATOM;

export const AvailableTokens: {
  [key in AvailableTokenType]: {
    fieldKey: string;
    name: string;
  };
} = {
  [TokenType.JUNO]: {
    fieldKey: "token_cost_juno",
    name: "JUNO",
  },
  [TokenType.ATOM]: {
    fieldKey: "token_cost_atom",
    name: "ATOM",
  },
};

const IDOItem: React.FC<IDOItemProps> = ({ idoInfo }) => {
  const [swapAmount, setSwapAmount] = useState<any>({
    [SwapAmountType.ORIGIN]: 0,
    [SwapAmountType.TARGET]: 0,
  });
  const [selectedTokenType, setSelectedTokenType] =
    useState<AvailableTokenType>(TokenType.JUNO);

  const { idoStatus: basicIdoStatus } = useIDOStatus(idoInfo.id);
  const history = useHistory();

  const SelectOptions = (
    Object.keys(AvailableTokens) as Array<keyof typeof AvailableTokens>
  ).map((key) => {
    return {
      value: key,
    };
  });

  const balances = useAppSelector((state) => state.balances);

  const idoStatus = useMemo(() => {
    const tokenBalance = (balances[TokenType.JUNO]?.amount || 0) / 1e6;

    let ratio = basicIdoStatus.costs[selectedTokenType];

    return {
      ...basicIdoStatus,
      ratio,
      tokenBalance,
      balance:
        tokenBalance.toLocaleString("en-Us", {
          maximumFractionDigits: 2,
        }) + " JUNO",
    };
  }, [balances, basicIdoStatus, selectedTokenType]);

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

  const CustomSelectItem = ({ ...props }) => {
    const { selectOption, option } = props;
    return (
      <SelectItem
        onClick={() => {
          if (selectOption) selectOption(option);
        }}
        checked={option.value === selectedTokenType}
      >
        <TokenImage
          alt=""
          src={`/coin-images/${option.value.replace(/\//g, "")}.png`}
        />
      </SelectItem>
    );
  };

  const CustomMenuList = (props: any) => {
    const { options, selectOption } = props;
    return options.map((option: any, index: number) => (
      <CustomSelectItem
        key={index}
        selectOption={selectOption}
        option={option}
      />
    ));
  };

  const CustomControlItem = ({
    children,
    ...props
  }: ControlProps<any, false>) => {
    return (
      <CustomControl>
        <CustomSelectItem option={{ value: selectedTokenType }} />
        {children}
      </CustomControl>
    );
  };

  return (
    <Wrapper>
      <IDOItemHeader>
        <Text justifyContent="flex-start" fontSize="20px" bold>
          {`${idoInfo.title} | ${idoInfo.name}`}
          <PresaleStatus
            style={{ marginLeft: 10 }}
            backgroundColor={
              FilterButtonOptions[idoStatus.crrState].backgroundColor
            }
          >
            {FilterButtonOptions[idoStatus.crrState].title}
          </PresaleStatus>
        </Text>
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
          <Button
            color="white"
            onClick={() => history.push(`/ido/detail?id=${idoInfo.id}`)}
          >
            Details
          </Button>
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
              <ReactSelect
                value={{ value: selectedTokenType }}
                onChange={(value: any) => setSelectedTokenType(value.value)}
                options={SelectOptions}
                styles={{
                  container: (provided, state) => ({
                    ...provided,
                    margin: "5px 10px",
                    minWidth: 100,
                    border: "1px solid black",
                    borderRadius: "5px",
                  }),
                  dropdownIndicator: (provided, state) => ({
                    ...provided,
                    color: "black",
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    // backgroundColor: isDark ? "#838383" : "white",
                    zIndex: 10,
                  }),
                }}
                components={{
                  MenuList: CustomMenuList,
                  Control: CustomControlItem,
                }}
              />
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
                <Text>{`1 ${AvailableTokens[selectedTokenType].name} = ${idoStatus.ratio} HOPERS`}</Text>
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
        <OtherInfoContainer>
          <CountDown
            time={
              idoStatus.crrState === PresaleState.BEFORE
                ? idoStatus.startTime
                : idoStatus.endTime
            }
          />
          <RememberMe>
            <Text>Remember me...</Text>
            <input placeholder="Email Alert" />
          </RememberMe>
        </OtherInfoContainer>
      </IDOItemContent>
    </Wrapper>
  );
};

export default IDOItem;
