import React from "react";
import { useHistory } from "react-router-dom";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
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
  MainContent,
  SubContent,
} from "./styled";

const SocialIcons = [
  { Icon: MediumIcon, link: "https://hopegalaxy.medium.com/" },
  {
    Icon: TwitterIcon,
    link: "https://twitter.com/Hopers_io",
  },
  {
    Icon: DiscordIcon,
    link: "https://discord.com/invite/BfKPacc5jF",
  },
];

const Footer: React.FC = () => {
  const history = useHistory();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;

  const openNewUrl = (url: string) => {
    window.open(url);
  };
  return (
    <FooterWrapper isMobile={isMobile}>
      <FooterInfo flexDirection="column">
        <FooterImage
          src="/others/logoHopers.png"
          alt=""
          onClick={() => history.push("/")}
        />
        {/* <SubContent>Actually Desktop Only 🖥️</SubContent> */}
      </FooterInfo>
      <FooterInfo>
        <MainContent>
          Hopers.io is a fully community driven JUNO NFT marketplace that shares
          revenue with those that stake $HOPE in the HOPE DAO.
        </MainContent>
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
