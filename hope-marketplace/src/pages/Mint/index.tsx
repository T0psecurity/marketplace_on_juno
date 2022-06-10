import React from "react";

import { Title } from "../../components/PageTitle";
import Collections, { MarketplaceInfo } from "../../constants/Collections";
import MintItem from "./MintItem";

import { Wrapper, ButtonContainer, StyledButton } from "./styled";

const Mint: React.FC = () => {
  return (
    <Wrapper>
      <Title title="Mint Page" />
      <ButtonContainer>
        <StyledButton>Live</StyledButton>
        <StyledButton backgroundColor="white" color="black">
          Sold Out
        </StyledButton>
      </ButtonContainer>
      {Collections.map((collection: MarketplaceInfo, index: number) =>
        collection.mintInfo ? (
          <MintItem key={index} mintItem={collection} />
        ) : null
      )}
    </Wrapper>
  );
};

export default Mint;
