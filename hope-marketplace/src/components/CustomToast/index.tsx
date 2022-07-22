import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import { getCollectionById } from "../../constants/Collections";
import { CollectionStateType } from "../../features/collections/collectionsSlice";
import { getTokenIdNumber } from "../../hook/useFetch";
import { escapeSpecialForUrl } from "../../util/string";
import Image from "../Image";
import {
  Wrapper,
  Logo,
  Container,
  Content,
  NFTItemImageWrapper,
  NFTItemOperationButton,
  InsufficientErrorMessage,
  QuickSwapLink,
  InsufficientErrorMessageWrapper,
} from "./styled";

export enum ToastType {
  BUY = "bought",
  MINT = "minted",
}

interface BuySuccessToastProps {
  type: ToastType;
  nftItem: any;
}

const BuySuccessToast: React.FC<BuySuccessToastProps> = ({ type, nftItem }) => {
  const history = useHistory();
  const targetCollection = getCollectionById(nftItem.collectionId);
  const collectionState: CollectionStateType = useAppSelector(
    (state: any) => state.collectionStates[nftItem.collectionId]
  );

  let url = "";
  if (nftItem.collectionId === "mintpass1") {
    url = "/others/mint_pass.png";
  } else if (nftItem.collectionId === "mintpass2") {
    url = "/others/mint_pass2.png";
  } else if (nftItem.collectionId === "hopegalaxy1") {
    url = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
      nftItem.token_id
    )}.png`;
  } else if (collectionState.imageUrl) {
    url = `${collectionState.imageUrl}${getTokenIdNumber(
      nftItem.token_id
    )}.png`;
  }

  const handleGotoDetail = () => {
    // dispatch(setSelectedNFT(item));
    history.push(`/detail?token_id=${escapeSpecialForUrl(nftItem.token_id)}`);
  };

  return (
    <Wrapper>
      <Logo />
      <Container>
        <Content>{`You successfully ${type}`}</Content>
        <Content bold>{targetCollection.title}</Content>
        <Content bold>{nftItem.token_id_display || nftItem.token_id}</Content>
        <NFTItemImageWrapper>
          <Image alt="" src={url} key={url} />
        </NFTItemImageWrapper>
        <NFTItemOperationButton onClick={handleGotoDetail}>
          View NFT
        </NFTItemOperationButton>
      </Container>
    </Wrapper>
  );
};

export const showBuySuccessToast = (item: any, type: ToastType) =>
  toast(<BuySuccessToast nftItem={item} type={type} />, {
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
  });

export const showInsufficientToast = (
  balance: number,
  tokenName: string,
  clickLink?: any
) => {
  toast.error(
    <InsufficientErrorMessageWrapper>
      <InsufficientErrorMessage>{`Insufficient balance! You have only ${
        (balance || 0) / 1e6
      } ${tokenName}.`}</InsufficientErrorMessage>
      {clickLink && (
        <QuickSwapLink onClick={clickLink}>
          Click here to quick swap!
        </QuickSwapLink>
      )}
    </InsufficientErrorMessageWrapper>
  );
};
