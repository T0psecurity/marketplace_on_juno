import React from "react";
import { useHistory } from "react-router-dom";
import { Title } from "../../components/PageTitle";
import { Wrapper, Card, Flex, StyledImg, Text, StyledButton } from "./styled";
import collection from "../../assets/images/Collection.png";
import mintpass from "../../assets/images/Mintpass.png";

const ExploreMarketplace: React.FC = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Title title="Explore Collections" />
      <Flex>
        <Card>
          <StyledImg src={mintpass} alt="collection" />
          <Text>Hope Galaxy NFT - Collection 1</Text>
          <StyledButton
            onClick={(e) => {
              history.push("/collections/hopegalaxy1");
            }}
          >
            View Collection
          </StyledButton>
        </Card>
        <Card>
          <StyledImg src={collection} alt="mintpass" />
          <Text>Hope Galaxy Mint Pass 1</Text>
          <StyledButton
            onClick={(e) => {
              history.push("/collections/mintpass1");
            }}
          >
            View Collection
          </StyledButton>
        </Card>
      </Flex>
    </Wrapper>
  );
};

export default ExploreMarketplace;
