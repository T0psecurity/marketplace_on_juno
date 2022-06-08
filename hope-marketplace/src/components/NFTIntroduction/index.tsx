import React from "react";
import { useHistory } from "react-router-dom";

import { DiscordIcon, GlobeIcon, TwitterIcon } from "../Icons";

import {
  Wrapper,
  HopeLogoIcon,
  SocialLinkContainer,
  SocialLinkItem,
} from "./styeld";

interface NFTIntroductionProps {
  backgroundImage: string;
  logo?: string | null | undefined;
}

const SocialLinkItems = [
  {
    icon: GlobeIcon,
    url: " https://www.hopegalaxy.io/",
    backgroundColor: "#00ff00",
  },
  {
    icon: TwitterIcon,
    url: "https://twitter.com/HopeGalaxyNFT",
    backgroundColor: "#1da1f2",
  },
  {
    icon: DiscordIcon,
    url: "https://discord.com/invite/BfKPacc5jF",
    backgroundColor: "#7591ff",
  },
];

const NFTIntroduction: React.FC<NFTIntroductionProps> = ({
  backgroundImage,
  logo,
}) => {
  const history = useHistory();
  return (
    <Wrapper
      backgroundImage={backgroundImage}
      onClick={() => history.push("/")}
    >
      <HopeLogoIcon logoUrl={logo} onClick={() => history.push("/")} />
      <SocialLinkContainer>
        {SocialLinkItems.map((linkItem, linkIndex) => (
          <SocialLinkItem
            onClick={() => window.open(linkItem.url)}
            key={linkIndex}
            backgroundColor={linkItem.backgroundColor}
          >
            {linkItem.icon}
          </SocialLinkItem>
        ))}
      </SocialLinkContainer>
    </Wrapper>
  );
};

export default NFTIntroduction;
