import React from "react";
import {
  DiscordIcon,
  MediumIcon,
  // instagramIcon,
  // mailIcon,
  TwitterIcon,
  // youtubeIcon,
} from "../Icons";

import {
  FooterInfo,
  FooterLinkItem,
  FooterLinkItemContainer,
  FooterWrapper,
  FooterImage,
  FooterDocIcon,
} from "./styled";

const SocialIcons = [
  // {
  //   Icon: mailIcon,
  //   link: "https://www.hopegalaxy.io/",
  // },
  { Icon: MediumIcon, link: "https://hopegalaxy.medium.com/" },
  {
    Icon: TwitterIcon,
    link: "https://twitter.com/Hopers_io",
  },
  {
    Icon: DiscordIcon,
    link: "https://discord.com/invite/BfKPacc5jF",
  },
  // {
  //   Icon: instagramIcon,
  //   link: "",
  // },
  // {
  //   Icon: youtubeIcon,
  //   link: "",
  // },
];

const Footer: React.FC = () => {
  const openNewUrl = (url: string) => {
    window.open(url);
  };
  return (
    <FooterWrapper>
      <FooterInfo>
        <FooterImage src="/others/logoHopers.png" alt="" />
      </FooterInfo>
      <FooterInfo>
        Hopers.io is the world’s first Interchain IBC NFT marketplace that is
        completely community driven with a revshare model for the $HOPE
        governance Dao token stakers.
      </FooterInfo>
      <FooterInfo>
        <FooterDocIcon
          onClick={() => openNewUrl("https://hopers-io.gitbook.io/docs/")}
        >
          Docs
        </FooterDocIcon>
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
