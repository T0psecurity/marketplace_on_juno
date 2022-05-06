import React from "react";
import { Title } from "../../components/PageTitle";
import NFTItemDetail from "../../components/NFTItemDetail";
import { Wrapper } from "./styled";

const NFTDetail: React.FC = () => {
  return (
    <Wrapper>
      <Title title="HOPE GALAXY NFT - collection 1" />
      <NFTItemDetail />
    </Wrapper>
  );
};

export default NFTDetail;
