import React from "react";

import { Wrapper,SubWrapper,ImgWrapper } from "./styled";

import home from "../../assets/images/home.png";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <SubWrapper>
        <h1 style={{textAlign:"left"}}>Discover, collect and sell NFTs with the world's first community IBC NFT marketplace</h1>
        <span style={{fontSize:"24px", textAlign:"left"}}>
        On Hopers.io the DAO governs and earns rewards through staking the $HOPE token with a community driven revshare model
        </span>
      </SubWrapper>
      <ImgWrapper src={home} alt="home" />
    </Wrapper>
  );
};

export default Home;
