import React from "react";
import { useHistory } from "react-router-dom";
import { SocialLinks } from "../../constants/Collections";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";

import { DiscordIcon, GlobeIcon, TwitterIcon } from "../Icons";
import Text from "../Text";

import {
  Wrapper,
  HopeLogoIcon,
  SocialLinkContainer,
  SocialLinkItem,
  MainImage,
  DescriptionWrapper,
} from "./styeld";

interface NFTIntroductionProps {
  backgroundImage: string;
  logo?: string | null | undefined;
  socialLinks: SocialLinks;
  title: string;
  creator: string;
  description: string;
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
  title,
  creator,
  description,
}) => {
  const history = useHistory();
  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;

  return (
    <Wrapper isMobile={isMobile}>
      <MainImage
        backgroundImage={backgroundImage}
        onClick={() => history.push("/")}
      />
      <DescriptionWrapper>
        <Text fontSize="2.3em" bold justifyContent="flex-start">
          {title}
        </Text>
        <Text fontSize="1.3em" bold justifyContent="flex-start">
          <Text>created by</Text>
          <Text color="#0057FF">{creator}</Text>
        </Text>
        <Text
          style={{ textAlign: "left", marginTop: 10 }}
          justifyContent="flex-start"
        >
          {description}
        </Text>
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
      </DescriptionWrapper>
      <HopeLogoIcon
        isMobile={isMobile}
        logoUrl={logo}
        onClick={() => history.push("/")}
      />
    </Wrapper>
  );
};

export default NFTIntroduction;
