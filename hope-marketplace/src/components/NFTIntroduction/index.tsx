import React from "react";
import { useHistory } from "react-router-dom";
import { SocialLinks } from "../../constants/Collections";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";

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
  socialLinks: SocialLinks;
}

const SocialLinkItems: {
  icon: React.ReactElement;
  socialKey: keyof SocialLinks;
  backgroundColor: string;
}[] = [
  {
    icon: GlobeIcon,
    socialKey: "website",
    backgroundColor: "#00ff00",
  },
  {
    icon: TwitterIcon,
    socialKey: "twitter",
    backgroundColor: "#1da1f2",
  },
  {
    icon: DiscordIcon,
    socialKey: "discord",
    backgroundColor: "#7591ff",
  },
];

const NFTIntroduction: React.FC<NFTIntroductionProps> = ({
  backgroundImage,
  logo,
  socialLinks,
}) => {
  const history = useHistory();
  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;

  return (
    <Wrapper
      isMobile={isMobile}
      backgroundImage={backgroundImage}
      onClick={() => history.push("/")}
    >
      <HopeLogoIcon
        isMobile={isMobile}
        logoUrl={logo}
        onClick={() => history.push("/")}
      />
      <SocialLinkContainer isMobile={isMobile}>
        {SocialLinkItems.map((linkItem, linkIndex) => (
          <SocialLinkItem
            onClick={() => window.open(socialLinks[linkItem.socialKey])}
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
