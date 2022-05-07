import React from "react";
import {
  discordIcon,
  // instagramIcon,
  // mailIcon,
  twitterIcon,
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
  {
    Icon: twitterIcon,
    link: "https://twitter.com/Hopers_io",
  },
  {
    Icon: discordIcon,
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
        <FooterLinkItemContainer>
          {SocialIcons.map((icon, index) => (
            <FooterLinkItem key={index} onClick={() => openNewUrl(icon.link)}>
              {icon.Icon}
            </FooterLinkItem>
          ))}
        </FooterLinkItemContainer>
      </FooterInfo>
      <FooterInfo>
        <FooterImage src="/others/logoHopers.png" alt="" />
      </FooterInfo>
      <FooterInfo>
        <FooterDocIcon
          onClick={() => openNewUrl("https://hopers-io.gitbook.io/docs/")}
        >
          Docs
        </FooterDocIcon>
      </FooterInfo>
    </FooterWrapper>
  );
};

export default Footer;
