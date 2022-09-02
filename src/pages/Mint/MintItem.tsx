import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { TIME_DIFF_BETWEEN_ONCHAIN } from ".";
import { useAppSelector } from "../../app/hooks";
import {
  getCollectionById,
  MarketplaceInfo,
  MarketplaceMintInfo,
  MintContracts,
} from "../../constants/Collections";
import { CollectionStateType } from "../../features/collections/collectionsSlice";
import useContract from "../../hook/useContract";

import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import useRefresh from "../../hook/useRefresh";
import useResponsiveSize from "../../hook/useResponsiveSize";
import { TokenType } from "../../types/tokens";
import {
  compareDate,
  convertDateToString,
  timeDistance,
} from "../../util/date";

import {
  MintDetailContainer,
  MintDetailInfo,
  DetailTitle,
  DetailInfo,
  DetailBlockContainer,
  DetailBlock,
  DetailBlockTitle,
  DetailBlockContent,
  OperationContainer,
  FlexColumn,
  MintButton,
  LeftTimeContainer,
  MintImage,
  MintImageWrapper,
} from "./styled";

interface Props {
  mintItem: MarketplaceInfo;
}

type NFT_DETAIL_KEY = {
  title: string | number;
  key?: "totalNfts" | "royalties";
  getFunc?: any;
  width?: string;
};

const NFT_DETAIL_KEYS: NFT_DETAIL_KEY[] = [
  {
    title: "Numbers of NFTs",
    key: "totalNfts",
  },
  {
    title: "Royalties",
    key: "royalties",
  },
  {
    title: "Number of Minted NFTs",
    getFunc: (state: CollectionStateType): number => {
      return state?.mintedNfts;
    },
  },
];

const MINT_DETAIL_OPERATION: NFT_DETAIL_KEY = {
  title: 1,
  width: "min(100%, 155px)",
};

const ELEMENT_SIZE = {
  DETAIL_BLOCK_TITLE: {
    xs: "10px",
    sm: "12px",
    md: "16px",
    lg: "18px",
    xl: "22px",
  },
  OPERATION_ITEM_WIDTH: {
    md: "40%",
    xl: "325px",
  },
};

const MintItem: React.FC<Props> = ({ mintItem }) => {
  const mintInfo: MarketplaceMintInfo = useMemo(
    () =>
      mintItem.mintInfo || {
        totalNfts: 0,
        royalties: "",
        price: "",
        mintImage: "",
      },
    [mintItem]
  );
  const [crrTime, setCrrTime] = useState(new Date());
  const { isXl } = useMatchBreakpoints();
  const { runQuery, runExecute } = useContract();
  const history = useHistory();
  const { refresh } = useRefresh();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const tokenBalances = useAppSelector((state) => state.balances);
  const globalState = useAppSelector((state) => state);
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[mintItem.collectionId]
  );
  const targetCollection = getCollectionById(mintItem.collectionId);
  const mintDate = mintInfo.mintDate ? new Date(mintInfo.mintDate) : new Date();
  const now = new Date();
  const isLive = compareDate(now, mintDate) !== -1;

  useEffect(() => {
    const interval = setInterval(() => setCrrTime(new Date()), 800);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fontSize = useResponsiveSize(
    ELEMENT_SIZE.DETAIL_BLOCK_TITLE
  ).toString();

  const operationItemSize = useResponsiveSize(
    ELEMENT_SIZE.OPERATION_ITEM_WIDTH
  ).toString();

  const isSoldOut: boolean =
    !!collectionState?.mintedNfts &&
    collectionState?.mintedNfts >= collectionState?.totalNfts;

  const includesPrivateMint =
    (collectionState?.mintInfo?.mintPeriod || 0) > 0 &&
    (collectionState?.mintInfo?.startMintTime || 0) > 0;
  const { passedPrivateMint, beforePrivateMint, timeLeft } = useMemo(() => {
    let isPassed = false,
      isBefore = false,
      left = "";
    if (
      collectionState?.mintInfo &&
      (collectionState.mintInfo?.startMintTime || 0) > 0
    ) {
      const startMintTime = new Date(
        (collectionState?.mintInfo.startMintTime + TIME_DIFF_BETWEEN_ONCHAIN) *
          1000
      );
      const endMintTime = new Date(
        (collectionState.mintInfo.startMintTime +
          (collectionState.mintInfo.mintPeriod || 0)) *
          1000
      );
      isPassed = Number(crrTime) > Number(endMintTime);
      isBefore = Number(crrTime) < Number(startMintTime);
      if (isBefore) {
        left = timeDistance(crrTime, startMintTime);
      } else if (!isPassed) {
        left = timeDistance(crrTime, endMintTime);
      }
    }
    return {
      passedPrivateMint: isPassed,
      beforePrivateMint: isBefore,
      timeLeft: left,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionState, crrTime]);

  const mintPriceDenom = (
    Object.keys(TokenType) as Array<keyof typeof TokenType>
  ).filter((key) => {
    return (
      TokenType[key] === (targetCollection.mintInfo?.denom || TokenType.JUNO)
    );
  })[0];

  const handleMintNft = async () => {
    if (!account) {
      toast.error("Connect wallet!");
      return;
    }
    // const whiteLists = await React.lazy(
    //   () => import(`../../assets/whiteLists/${targetCollection.collectionId}`)
    // );

    if (mintItem.mintInfo?.mintUrl) {
      window.open(mintItem.mintInfo.mintUrl);
      return;
    }
    if (beforePrivateMint) {
      toast.error(`Mint is not started. ${timeLeft} left!`);
      return;
    }
    const targetBalances =
      tokenBalances[targetCollection.mintInfo?.denom || TokenType.JUNO] || {};
    if ((targetBalances.amount || 0) / 1e6 < collectionState.price) {
      toast.error(
        `Insufficient balance! You have only ${
          (targetBalances.amount || 0) / 1e6
        } ${mintPriceDenom}.`
      );
      return;
    }
    if (
      includesPrivateMint &&
      targetCollection.mintInfo?.isWhiteListMint &&
      !passedPrivateMint
    ) {
      const whiteLists =
        await require(`../../assets/whiteLists/${targetCollection.collectionId}`);
      if (!whiteLists.includes(account.address)) {
        toast.error("You are not whitelisted.");
        return;
      }
    }
    if (collectionState.totalNfts <= collectionState.mintedNfts) {
      toast.error("All nfts are minted!");
      return;
    }
    let mintIndexArray: number[] = [];
    collectionState.mintCheck?.forEach((item: boolean, index: number) => {
      if (item) mintIndexArray.push(index);
    });
    const selectedIndex = mintIndexArray.sort(() => 0.5 - Math.random()).pop();
    let mintAddress = "",
      funds = null;
    let message = mintItem.mintContract
      ? {
          mint: { rand: `${(selectedIndex || 0) + 1}` },
        }
      : {
          mint: { address: targetCollection.nftContract },
        };
    if (targetCollection.mintInfo?.mintLogic?.getMintMessage) {
      const customResult =
        await targetCollection.mintInfo?.mintLogic.getMintMessage({
          collection: targetCollection,
          account: account.address,
          runQuery,
          runExecute,
          state: globalState,
        });
      message = customResult.message;
      mintAddress = customResult.address || "";
      funds = customResult.funds;
    }
    if (!message) return;
    try {
      await runExecute(
        mintAddress || mintItem.mintContract || MintContracts[0],
        message,
        funds ||
          (!targetCollection.mintInfo?.denom ||
          targetCollection.mintInfo?.denom === TokenType.JUNO
            ? {
                funds: `${
                  collectionState.price > 0 ? collectionState.price : ""
                }`,
              }
            : undefined)
      );
      toast.success("Success!");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Fail!");
    }
  };

  const buttonString = useMemo(() => {
    let result = "";
    if (isSoldOut) {
      result = "Mint Sold Out";
    } else if (includesPrivateMint && beforePrivateMint) {
      result = "WL Mint Scheduled";
    } else if (includesPrivateMint && !passedPrivateMint) {
      result = "WL Mint Live";
    } else if (isLive && targetCollection.isLaunched) {
      result = "Mint Live";
    } else {
      result = `Mint ${convertDateToString(mintInfo.mintDate || "")}`;
    }
    return result;
  }, [
    beforePrivateMint,
    includesPrivateMint,
    isLive,
    isSoldOut,
    mintInfo,
    passedPrivateMint,
    targetCollection,
  ]);

  const renderDetailBlocks = (items: NFT_DETAIL_KEY[], width?: string) => {
    return items.map((item: NFT_DETAIL_KEY, index: any) => (
      <DetailBlock width={item.width || width} key={index}>
        <DetailBlockTitle fontSize={fontSize}>{item.title}</DetailBlockTitle>
        {item.key && !!mintInfo[item.key] && (
          <DetailBlockContent fontSize={fontSize}>
            {mintInfo[item.key]}
          </DetailBlockContent>
        )}
        {item.getFunc && typeof item.getFunc === "function" && (
          <DetailBlockContent fontSize={fontSize}>
            {item.getFunc(collectionState)}
          </DetailBlockContent>
        )}
      </DetailBlock>
    ));
  };

  const renderMintImage = () => (
    <MintImage isMobile={!isXl} alt="mint image" src={mintInfo.mintImage} />
  );

  return (
    <MintDetailContainer isMobile={!isXl}>
      <MintDetailInfo>
        <DetailTitle
          bold
          isMobile={!isXl}
          onClick={() => {
            history.push(
              `/collections/marketplace?id=${mintItem.collectionId}`
            );
          }}
        >
          {mintItem.title}
        </DetailTitle>
        <DetailInfo isMobile={!isXl}>{mintItem.description}</DetailInfo>
        {!isXl && <MintImageWrapper>{renderMintImage()}</MintImageWrapper>}
        <DetailBlockContainer>
          {renderDetailBlocks(NFT_DETAIL_KEYS, "25%")}
        </DetailBlockContainer>
        <DetailTitle>Public Sale</DetailTitle>
        <DetailInfo>{`Price ${
          collectionState.price
            ? `${collectionState.price} $${mintPriceDenom}`
            : mintItem.mintInfo?.price
        }`}</DetailInfo>
        <OperationContainer isMobile={!isXl}>
          <FlexColumn width={operationItemSize}>
            <DetailInfo># to mint</DetailInfo>
            {renderDetailBlocks([MINT_DETAIL_OPERATION])}
          </FlexColumn>
          <MintButton
            isMobile={!isXl}
            soldOut={isSoldOut}
            backgroundColor={beforePrivateMint ? "#FCFF5C" : ""}
            disabled={
              !targetCollection.isLaunched ||
              // (mintItem.mintContract &&
              //   collectionState.myMintedNfts === null) ||
              isSoldOut
            }
            width={operationItemSize}
            onClick={handleMintNft}
          >
            {buttonString}
            {timeLeft && (
              <LeftTimeContainer>
                {beforePrivateMint
                  ? `TIME LEFT ${timeLeft}`
                  : `ENDING IN ${timeLeft}`}
              </LeftTimeContainer>
            )}
          </MintButton>
        </OperationContainer>
      </MintDetailInfo>
      {isXl && renderMintImage()}
    </MintDetailContainer>
  );
};

export default MintItem;
