import React from "react";
import {
  discordIcon,
  instagramIcon,
  mailIcon,
  twitterIcon,
  youtubeIcon,
} from "./Icons";

import {
  FooterInfo,
  FooterInfoContent,
  FooterInfoTitle,
  FooterLinkItem,
  FooterLinkItemContainer,
  FooterWrapper,
} from "./styled";

const SocialIcons = [
  {
    Icon: mailIcon,
    link: "https://www.hopegalaxy.io/",
  },
  {
    Icon: discordIcon,
    link: "https://discord.gg/BfKPacc5jF",
  },
  {
    Icon: instagramIcon,
    link: "",
  },
  {
    Icon: twitterIcon,
    link: "https://twitter.com/HopeGalaxyNFT",
  },
  {
    Icon: youtubeIcon,
    link: "",
  },
];

const Footer: React.FC = () => {
  const openNewUrl = (url: string) => {
    window.open(url);
  };
  return (
    <FooterWrapper>
      <FooterInfo>
        <FooterInfoTitle>Stay in the loop</FooterInfoTitle>
        <FooterInfoContent>
          Join our mailing list to stay in the loop with our newest feature
          releases, NFT drops, and tips and tricks for navigating HopeGalaxy.io
        </FooterInfoContent>
      </FooterInfo>
      <FooterInfo>
        <FooterInfoTitle>Join the community</FooterInfoTitle>
        <FooterLinkItemContainer>
          {SocialIcons.map((icon, index) => (
            <FooterLinkItem key={index} onClick={() => openNewUrl(icon.link)}>
              {icon.Icon}
            </FooterLinkItem>
          ))}
        </FooterLinkItemContainer>
      </FooterInfo>
    </FooterWrapper>
  );
};

export default Footer;
