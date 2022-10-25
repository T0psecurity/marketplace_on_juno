import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { TIME_DIFF_BETWEEN_ONCHAIN } from ".";
import { useAppSelector } from "../../app/hooks";
import { DiscordIcon, GlobeIcon, TwitterIcon } from "../../components/SvgIcons";
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
import { OtherTokens, TokenType } from "../../types/tokens";
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
  DetailContainer,
  SocialLinks,
  Status,
} from "./styled";

interface Props {
  mintItem: MarketplaceInfo;
}

type NFT_DETAIL_KEY = {
  title: string | number;
  key?: "totalNfts" | "royalties";
  getFunc?: any;
  width?: string;
  props?: any;
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
    title: "Percent Minted",
    getFunc: (state: CollectionStateType): string => {
      return (
        ((state?.mintedNfts * 100) / state?.totalNfts).toLocaleString("en-Us", {
          maximumFractionDigits: 2,
        }) + "%"
      );
    },
    props: (state: CollectionStateType): any => ({
      percent: (state?.mintedNfts * 100) / state?.totalNfts,
    }),
  },
];

const MINT_DETAIL_OPERATION: NFT_DETAIL_KEY = {
  title: 1,
  width: "min(100%, 155px)",
  props: (): any => ({
    style: {
      minWidth: "90px",
      width: "max-content",
      background: "rgba(2, 226, 150, 0.12)",
      borderRadius: "10px",
      justifyContent: "center",
    },
  }),
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

const STATUS = {
  live: {
    title: "Live",
    color: "#02e296",
    background: "rgba(2, 226, 150, 0.12)",
  },
  scheduled: {
    title: "Scheduled",
    color: "#f7ed51",
    background: "rgba(247, 237, 81, 0.25)",
  },
  soldout: {
    title: "Sold Out",
    color: "#ff0000",
    background: "rgba(255, 0, 0, 0.25)",
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
  const { isXl, isXxl, isXxxl, isXxxxl } = useMatchBreakpoints();
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

  const isMobile = !isXl && !isXxl && !isXxxl && !isXxxxl;

  useEffect(() => {
    const interval = setInterval(() => setCrrTime(new Date()), 800);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const mintStatus = useMemo(() => {
    let result: any = null;
    const mintInfo = targetCollection.mintInfo;

    let mintDate = mintInfo?.mintDate
      ? new Date(mintInfo.mintDate)
      : new Date();
    if (collectionState.mintInfo?.startMintTime) {
      mintDate = new Date(
        (collectionState.mintInfo.startMintTime + TIME_DIFF_BETWEEN_ONCHAIN) *
          1000
      );
    }
    const now = new Date();
    const isLive = compareDate(now, mintDate) !== -1;
    if (
      !mintInfo ||
      (collectionState?.totalNfts !== 0 &&
        collectionState?.mintedNfts >= collectionState?.totalNfts)
    ) {
      result = STATUS.soldout;
    } else if (!mintInfo.mintDate || isLive) {
      result = STATUS.live;
    } else {
      result = STATUS.scheduled;
    }
    return result;
  }, [collectionState, targetCollection.mintInfo]);

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
      if (targetCollection.mintInfo?.mintLogic?.extraLogic) {
        await targetCollection.mintInfo.mintLogic.extraLogic({
          collection: targetCollection,
          account: account.address,
          runQuery,
          runExecute,
          state: globalState,
        });
      }
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
      <DetailBlock
        key={index}
        {...(item.props ? { ...item.props(collectionState) } : {})}
      >
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
    <MintImage isMobile={isMobile} alt="mint image" src={mintInfo.mintImage} />
  );

  return (
    <MintDetailContainer isMobile={isMobile}>
      <MintDetailInfo>
        <DetailTitle
          bold
          isMobile={isMobile}
          onClick={() => {
            history.push(
              `/collections/marketplace?id=${mintItem.collectionId}`
            );
          }}
        >
          {mintItem.title}
          <DetailContainer>
            <Status background={mintStatus.background} color={mintStatus.color}>
              {mintStatus.title}
            </Status>
            <SocialLinks>
              <TwitterIcon
                width={20}
                onClick={(e: any) => {
                  e.stopPropagation();
                  window.open(targetCollection.socialLinks.twitter);
                }}
              />
              <DiscordIcon
                width={20}
                onClick={(e: any) => {
                  e.stopPropagation();
                  window.open(targetCollection.socialLinks.discord);
                }}
              />
              <GlobeIcon
                width={20}
                onClick={(e: any) => {
                  e.stopPropagation();
                  window.open(targetCollection.socialLinks.website);
                }}
              />
            </SocialLinks>
          </DetailContainer>
        </DetailTitle>
        <DetailInfo isMobile={isMobile}>{mintItem.description}</DetailInfo>
        {isMobile && <MintImageWrapper>{renderMintImage()}</MintImageWrapper>}
        <DetailBlockContainer flexDirection="column">
          <DetailBlock colored>
            <DetailBlockContent>Mint Information</DetailBlockContent>
          </DetailBlock>
          {renderDetailBlocks(NFT_DETAIL_KEYS, "25%")}
        </DetailBlockContainer>
        {/* <DetailTitle>Public Sale</DetailTitle>
        <DetailInfo>{`Price ${
          collectionState.price
            ? `${collectionState.price} $${mintPriceDenom}`
            : mintItem.mintInfo?.price
        }`}</DetailInfo> */}
        <OperationContainer isMobile={isMobile}>
          <FlexColumn width={operationItemSize}>
            <DetailInfo># to mint</DetailInfo>
            {renderDetailBlocks([MINT_DETAIL_OPERATION])}
          </FlexColumn>
          <FlexColumn>
            <DetailInfo>
              {collectionState.price
                ? `${collectionState.price} $${mintPriceDenom}${
                    collectionState.tokenPrice
                      ? ` + ${collectionState.tokenPrice} $${
                          OtherTokens[collectionState.tokenAddress || ""]
                        }`
                      : ""
                  }`
                : mintItem.mintInfo?.price}
            </DetailInfo>
            <MintButton
              isMobile={isMobile}
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
          </FlexColumn>
        </OperationContainer>
      </MintDetailInfo>
      {!isMobile && renderMintImage()}
    </MintDetailContainer>
  );
};

export default MintItem;
