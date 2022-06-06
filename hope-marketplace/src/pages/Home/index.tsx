import React from "react";

import {
  Wrapper,
  SubWrapper,
  ImgWrapper,
  MainContent,
  SubContent,
} from "./styled";

import home from "../../assets/images/home.png";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <SubWrapper>
        <MainContent>
          Hopers.io is the first rev-share IBC NFT Marketplace.
        </MainContent>
        <SubContent>
          The DAO governs the marketplace and earns rewards through the staking
          system of the token $HOPE.
        </SubContent>
      </SubWrapper>
      <ImgWrapper src={home} alt="home" />
    </Wrapper>
  );
};

export default Home;
