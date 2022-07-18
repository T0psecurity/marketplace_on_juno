import React from "react";

import home from "../../assets/images/home.png";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";

import {
  Wrapper,
  SubWrapper,
  ImgWrapper,
  MainContent,
  SubContent,
} from "./styled";

const Home: React.FC = () => {
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;

  return (
    <Wrapper isMobile={isMobile}>
      {isMobile && <ImgWrapper src={home} alt="home" isMobile={isMobile} />}
      <SubWrapper>
        <MainContent isMobile={isMobile}>
          Hopers.io NFT marketplace $JUNO
        </MainContent>
        <SubContent isMobile={isMobile}>
          The DAO governs the marketplace and earns rewards through the staking
          system of the token $HOPE.
        </SubContent>
      </SubWrapper>
      {!isMobile && <ImgWrapper src={home} alt="home" isMobile={isMobile} />}
    </Wrapper>
  );
};

export default Home;
