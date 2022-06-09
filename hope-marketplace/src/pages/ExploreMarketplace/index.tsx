import React from "react";
import { Title } from "../../components/PageTitle";
import { Wrapper, Flex } from "./styled";
import Collections, { MarketplaceBasicInfo } from "../../constants/Collections";
import MarketplaceItem from "./MarketplaceItem";

const ExploreMarketplace: React.FC = () => {
  return (
    <Wrapper>
      <Title title="Explore Collections" />
      <Flex>
        {Collections.map((item: MarketplaceBasicInfo, index: number) => (
          <MarketplaceItem key={index} {...item} />
        ))}
      </Flex>
    </Wrapper>
  );
};

export default ExploreMarketplace;
