import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import NFTContainer from "../../components/NFTContainer";
import NFTIntroduction from "../../components/NFTIntroduction";
import { NFTItemStatus } from "../../components/NFTItem";
import { Title } from "../../components/PageTitle";
import { getCollectionById } from "../../constants/Collections";
import {
  Wrapper,
  HorizontalDivider,
  StyledButton,
  SortButtonContainer,
} from "./styled";

const Marketplace: React.FC = () => {
  const { search } = useLocation();
  const collectionId = new URLSearchParams(search).get("id");

  const targetCollection = useMemo(
    () => getCollectionById(collectionId || ""),
    [collectionId]
  );

  // console.log("targetCollection", targetCollection);

  const [isAscending, setIsAscending] = React.useState(true);
  const marketplaceNFTs = useAppSelector((state) => {
    // console.log("nfts", state.nfts);
    return state.nfts[`${targetCollection.collectionId}_marketplace`];
  });

  const handleSort = () => {
    setIsAscending(!isAscending);
  };

  return (
    <Wrapper>
      <NFTIntroduction
        backgroundImage={targetCollection.backgroundUrl}
        logo={targetCollection.logoUrl}
      />
      <Title title={targetCollection.title} />
      <HorizontalDivider />
      <SortButtonContainer>
        <StyledButton onClick={handleSort}>
          Sort By Price {!isAscending ? "Ascending" : "Descending"}
        </StyledButton>
      </SortButtonContainer>
      <NFTContainer
        nfts={marketplaceNFTs}
        status={NFTItemStatus.BUY}
        sort={isAscending ? "as" : "des"}
      />
    </Wrapper>
  );
};

export default Marketplace;
