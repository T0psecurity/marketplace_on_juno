import React from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Title } from "../../components/PageTitle";
import NFTItemDetail from "../../components/NFTItemDetail";
import usePickNFT from "../../hook/usePickNFT";
import { getCollectionById } from "../../constants/Collections";
import {
  Wrapper,
  NFTItemAttributesContainer,
  NFTItemAttributeItem,
} from "./styled";
import { CollectionTraitsStateType } from "../../features/collectionTraits/collectionTraitsSlice";
import { addSpecialForUrl } from "../../util/string";

const NFTDetail: React.FC = () => {
  // const selectedNFT = useAppSelector((state) => state.nfts.selectedNFT);
  const { search } = useLocation();
  const token_id = addSpecialForUrl(
    new URLSearchParams(search).get("token_id")
  );
  const { pickNFTByTokenId } = usePickNFT();
  const selectedNFT: any = pickNFTByTokenId(token_id || "");

  const targetCollection = getCollectionById(selectedNFT.collectionId);

  const collectionTraitsState: CollectionTraitsStateType = useAppSelector(
    (state: any) => state.collectionTraitsStates[selectedNFT.collectionId]
  );

  return (
    <Wrapper>
      <Title title={targetCollection?.title} />
      <NFTItemDetail item={selectedNFT} />

      {selectedNFT.metaData?.attributes?.length && (
        <NFTItemAttributesContainer>
          {selectedNFT.metaData?.attributes.map(
            (
              attribute: { traits_type: string; value: string },
              index: number
            ) =>
              collectionTraitsState[attribute.value] && (
                <NFTItemAttributeItem key={index}>
                  <span>{attribute.value.replace(/_/g, " ")}</span>
                  <span>{`${collectionTraitsState[attribute.value]} / ${
                    collectionTraitsState.total
                  } `}</span>
                </NFTItemAttributeItem>
              )
          )}
        </NFTItemAttributesContainer>
      )}
    </Wrapper>
  );
};

export default NFTDetail;
