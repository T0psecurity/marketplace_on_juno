import React from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import {
  MarketplaceInfo,
  MarketplaceMintInfo,
} from "../../constants/Collections";
import { CollectionStateType } from "../../features/collections/collectionsSlice";
import useContract from "../../hook/useContract";
import useFetch from "../../hook/useFetch";

import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import useResponsiveSize from "../../hook/useResponsiveSize";

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
    title: "Percent minted",
    getFunc: () => {
      return 0;
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
  const { fetchAllNFTs } = useFetch();
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[mintItem.collectionId]
  );

  const fontSize = useResponsiveSize(
    ELEMENT_SIZE.DETAIL_BLOCK_TITLE
  ).toString();
  const operationItemSize = useResponsiveSize(
    ELEMENT_SIZE.OPERATION_ITEM_WIDTH
  ).toString();

  const handleMintNft = async () => {
    if (!mintItem.mintContract) {
      toast.error("Mint contract not found!");
    }
    if (collectionState.totalNfts <= collectionState.mintedNfts) {
      toast.error("All nfts are minted!");
    }
    let mintIndexArray: number[] = [];
    collectionState.mintCheck.forEach((item: boolean, index: number) => {
      if (item) mintIndexArray.push(index);
    });
    const selectedIndex = mintIndexArray.sort(() => 0.5 - Math.random()).pop();
    const message = {
      mint: { rand: `${selectedIndex || 0 + 1}` },
    };
    console.log("message", message);
    try {
      await runExecute(mintItem.mintContract, message);
      toast.success("Success!");
      fetchAllNFTs();
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
            {item.getFunc()}
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
        <DetailTitle bold isMobile={!isXl}>
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
            disabled={
              collectionState.myMintedNfts === null ||
              collectionState.myMintedNfts >= collectionState.maxNfts
            }
            width={operationItemSize}
            onClick={handleMintNft}
          >
            {`Mint ${mintInfo.mintDate || "Now"}`}
          </MintButton>
        </OperationContainer>
      </MintDetailInfo>
      {isXl && renderMintImage()}
    </MintDetailContainer>
  );
};

export default MintItem;
