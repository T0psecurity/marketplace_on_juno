import React from "react";
import { Title } from "../../components/PageTitle";
import { Wrapper, Flex } from "./styled";
import { Collections } from "./Collections";
import MarketplaceItem, { MarketplaceItemProps } from "./MarketplaceItem";

const ExploreMarketplace: React.FC = () => {
  return (
    <Wrapper>
      <Title title="Explore Collections" />
      <Flex>
        {Collections.map((item: MarketplaceItemProps, index: number) => (
          <MarketplaceItem key={index} {...item} />
        ))}
      </Flex>
    </Wrapper>
  );
};

export default ExploreMarketplace;
