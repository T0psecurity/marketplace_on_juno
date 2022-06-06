import React from "react";

import { Title } from "../../components/PageTitle";

import {
  Wrapper,
  ButtonContainer,
  StyledButton,
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
} from "./styled";

type NFT_DETAIL = {
  title: string | number;
  content?: string | number;
  width?: string;
};

const JUNO_PUNKS_NFT_DETAIL: NFT_DETAIL[] = [
  {
    title: "Numbers of NFTs",
    content: 500,
  },
  {
    title: "Royalties",
    content: "7% + 3%",
  },
  {
    title: "Percent minted",
    content: "0%",
  },
];

const MINT_DETAIL: NFT_DETAIL = {
  title: 1,
  width: "155px",
};

const Mint: React.FC = () => {
  const renderDetailBlocks = (items: NFT_DETAIL[]) => {
    return items.map((item: any, index: any) => (
      <DetailBlock width={item.width} key={index}>
        <DetailBlockTitle>{item.title}</DetailBlockTitle>
        {!!item.content && (
          <DetailBlockContent>{item.content}</DetailBlockContent>
        )}
      </DetailBlock>
    ));
  };

  return (
    <Wrapper>
      <Title title="Mint Page" />
      <ButtonContainer>
        <StyledButton>Live</StyledButton>
        <StyledButton backgroundColor="white">Sold Out</StyledButton>
      </ButtonContainer>
      <MintDetailContainer>
        <MintDetailInfo>
          <DetailTitle bold>Juno Punks NFT</DetailTitle>
          <DetailInfo>
            1st 500 unique PFP collection to celebrate $JUNO through PUNKS.
          </DetailInfo>
          <DetailBlockContainer>
            {renderDetailBlocks(JUNO_PUNKS_NFT_DETAIL)}
          </DetailBlockContainer>
          <DetailTitle>Public Sale</DetailTitle>
          <DetailInfo>Price FREE MINT • Max 1 x wallet</DetailInfo>
          <OperationContainer>
            <FlexColumn>
              <DetailInfo># to mint</DetailInfo>
              {renderDetailBlocks([MINT_DETAIL])}
            </FlexColumn>
            <MintButton>Mint Now</MintButton>
          </OperationContainer>
        </MintDetailInfo>
        <MintImage alt="mint image" src="/others/tmp.png" />
      </MintDetailContainer>
    </Wrapper>
  );
};

export default Mint;
