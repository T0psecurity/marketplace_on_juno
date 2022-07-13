import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
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
import { compareDate, convertDateToString } from "../../util/date";

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
  const mintInfo: MarketplaceMintInfo = mintItem.mintInfo || {
    totalNfts: 0,
    royalties: "",
    price: "",
    mintImage: "",
  };
  const { isXl } = useMatchBreakpoints();
  const { runExecute } = useContract();
  const history = useHistory();
  const { refresh } = useRefresh();
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[mintItem.collectionId]
  );
  const targetCollection = getCollectionById(mintItem.collectionId);
  const mintDate = mintInfo.mintDate ? new Date(mintInfo.mintDate) : new Date();
  const now = new Date();
  const isLive = compareDate(now, mintDate) !== -1;

  const fontSize = useResponsiveSize(
    ELEMENT_SIZE.DETAIL_BLOCK_TITLE
  ).toString();
  const operationItemSize = useResponsiveSize(
    ELEMENT_SIZE.OPERATION_ITEM_WIDTH
  ).toString();

  const handleMintNft = async () => {
    // if (!mintItem.mintContract && !mintItem.mintInfo?.mintUrl) {
    //   toast.error("Mint contract not found!");
    //   return;
    // }
    if (mintItem.mintInfo?.mintUrl) {
      window.open(mintItem.mintInfo.mintUrl);
      return;
    }
    if (collectionState.totalNfts <= collectionState.mintedNfts) {
      toast.error("All nfts are minted!");
      return;
    }
    let mintIndexArray: number[] = [];
    collectionState.mintCheck.forEach((item: boolean, index: number) => {
      if (item) mintIndexArray.push(index);
    });
    const selectedIndex = mintIndexArray.sort(() => 0.5 - Math.random()).pop();
    const message = mintItem.mintContract
      ? {
          mint: { rand: `${(selectedIndex || 0) + 1}` },
        }
      : {
          mint: { address: targetCollection.nftContract },
        };
    // console.log(mintItem.mintContract, "message", message);
    try {
      await runExecute(mintItem.mintContract || MintContracts[0], message, {
        funds: `${collectionState.price > 0 ? collectionState.price : ""}`,
      });
      toast.success("Success!");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Fail!");
    }
  };

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

  const isSoldOut: boolean =
    !!collectionState.mintedNfts &&
    collectionState.mintedNfts >= collectionState.totalNfts;

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
        <DetailInfo>{`Price ${mintItem.mintInfo?.price}`}</DetailInfo>
        <OperationContainer>
          <FlexColumn width={operationItemSize}>
            <DetailInfo># to mint</DetailInfo>
            {renderDetailBlocks([MINT_DETAIL_OPERATION])}
          </FlexColumn>
          <MintButton
            soldOut={isSoldOut}
            disabled={
              !targetCollection.isLaunched ||
              // (mintItem.mintContract &&
              //   collectionState.myMintedNfts === null) ||
              isSoldOut
            }
            width={operationItemSize}
            onClick={handleMintNft}
          >
            {isSoldOut
              ? "Mint Sold Out"
              : isLive && targetCollection.isLaunched
              ? "Mint Now"
              : `Mint ${convertDateToString(mintInfo.mintDate || "")}`}
          </MintButton>
        </OperationContainer>
      </MintDetailInfo>
      {isXl && renderMintImage()}
    </MintDetailContainer>
  );
};

export default MintItem;
