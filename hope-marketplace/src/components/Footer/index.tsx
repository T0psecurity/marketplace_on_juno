import React from "react";
import { useHistory } from "react-router-dom";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import Advertise, { Advertise2 } from "../Advertise";
// import {
//   // DiscordIcon,
//   // MediumIcon,
//   // instagramIcon,
//   // mailIcon,
//   // TwitterIcon,
//   // youtubeIcon,
// } from "../Icons";
import {
  BookIcon,
  TempleIcon,
  DiscordIcon,
  MediumIcon,
  TwitterIcon,
} from "../SvgIcons";
import Text from "../Text";

import {
  FooterInfo,
  FooterSocialLinkItem,
  FooterSocialLinkItemContainer,
  FooterWrapper,
  FooterImage,
  // FooterDocIcon,
  // MainContent,
  // FooterLinksContainer,
  // FooterLinksPanel,
  // FooterLinkItem,
  LaunchpadButton,
  FooterAdvertiseWrapper,
  // SubContent,
} from "./styled";

const SocialIcons = [
  {
    Icon: TwitterIcon,
    link: "https://twitter.com/Hopers_io",
  },
  {
    Icon: DiscordIcon,
    link: "https://discord.com/invite/BfKPacc5jF",
  },
  { Icon: MediumIcon, link: "https://hopegalaxy.medium.com/" },
  { Icon: TempleIcon, link: "" },
  { Icon: BookIcon, link: "" },
];

const RocketIcon = ({ ...props }) => (
  <svg
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.9951 25.5842C12.7246 25.7424 12.4716 25.8913 12.2183 26.0389C11.8835 26.2341 11.6453 26.204 11.3764 25.9303C9.77205 24.2974 8.1677 22.6641 6.56415 21.0304C6.28286 20.7441 6.25294 20.5078 6.44845 20.156C6.59168 19.8982 6.73572 19.6408 6.88375 19.3756C6.63438 19.2341 6.43129 19.1723 6.1516 19.3508C4.91911 20.1386 3.66747 20.895 2.42141 21.6604C2.11259 21.8503 1.86562 21.8239 1.60986 21.5677C1.26793 21.2261 0.932773 20.8779 0.59722 20.5298C0.342663 20.2659 0.336678 19.9462 0.584054 19.6595C1.39201 18.7233 2.20277 17.7895 3.01152 16.8541C3.851 15.8829 4.68929 14.9109 5.52757 13.9385C5.65285 13.7933 5.80367 13.7246 5.99719 13.712C7.4168 13.6188 8.83562 13.5155 10.2548 13.4204C10.4408 13.4078 10.5593 13.3342 10.6702 13.1715C12.1732 10.9619 13.8071 8.86214 15.7051 6.98606C17.2097 5.49878 18.8443 4.18272 20.6574 3.1066C21.7438 2.46159 22.8802 1.92068 24.0588 1.47129C24.2738 1.38913 24.4235 1.40174 24.6018 1.58516C26.5541 3.59179 28.5155 5.58907 30.4818 7.58187C30.6326 7.73438 30.6422 7.86493 30.5755 8.04916C29.8753 9.97974 28.9305 11.7753 27.7519 13.4464C26.2991 15.5063 24.5954 17.3283 22.6735 18.9307C21.4964 19.912 20.2624 20.8226 19.0466 21.7552C18.909 21.8605 18.8451 21.9687 18.834 22.135C18.7398 23.5682 18.6389 25.001 18.5483 26.4346C18.5335 26.6652 18.4637 26.8441 18.2893 27.0003C16.4356 28.6588 14.5867 30.323 12.7358 31.9848C12.4094 32.2776 12.1161 32.267 11.8077 31.9538C11.4825 31.624 11.1574 31.2938 10.835 30.9615C10.5832 30.702 10.5549 30.4515 10.742 30.1359C11.5089 28.8434 12.2674 27.5457 13.0522 26.265C13.2154 25.9978 13.0789 25.8242 12.9951 25.5842ZM24.5459 9.99479C24.5551 8.68686 23.497 7.59895 22.2094 7.59244C20.9383 7.58594 19.8702 8.66408 19.8602 9.96307C19.8498 11.2787 20.8956 12.3609 22.1883 12.3727C23.4735 12.3845 24.5368 11.3121 24.5459 9.99479Z"
      fill="black"
    />
    <path
      d="M25.2188 1.07851C26.1037 0.887768 27.0066 0.666119 27.9199 0.503442C28.9856 0.313515 30.0601 0.174832 31.131 0.0158149C31.2228 0.002394 31.3166 -0.00126625 31.4091 0.000360531C31.765 0.00646095 32.0056 0.233803 31.9996 0.597795C31.9948 0.880447 31.9478 1.16269 31.9107 1.44413C31.7036 3.01397 31.4861 4.58259 31.1171 6.12355C31.0524 6.39278 30.9758 6.65876 30.9096 6.90766C29.0235 4.97586 27.1351 3.04121 25.2188 1.07851Z"
      fill="black"
    />
    <path
      d="M5.17493 31.8528C5.21563 31.4331 5.23159 31.0085 5.3054 30.5945C5.36525 30.259 5.57672 29.9999 5.85801 29.8031C5.98848 29.712 6.10897 29.6022 6.2187 29.4859C6.32922 29.3683 6.38987 29.2195 6.31446 29.0576C6.23586 28.888 6.101 28.7782 5.91068 28.7705C5.5049 28.7542 5.23957 28.9913 5.03329 29.3094C4.95788 29.4257 4.90122 29.5627 4.86851 29.6986C4.54971 31.0325 3.70664 31.6926 2.32932 31.8105C2.20364 31.8211 2.07755 31.8353 1.95147 31.8362C1.15947 31.8398 0.594499 32.2384 0.17436 32.8911C0.152415 32.9253 0.129673 32.9586 0.106132 32.9912C0.103339 32.9952 0.0937633 32.994 0.0626418 32.9997C0.0626418 32.6487 0.0410962 32.3002 0.0666318 31.9557C0.13446 31.0419 0.369068 30.1829 0.943617 29.4513C1.34381 28.9417 1.85571 28.5899 2.44622 28.3483C2.94217 28.1454 3.41298 27.8937 3.81038 27.5252C3.9604 27.3861 4.09686 27.221 4.20179 27.0449C4.33904 26.8139 4.29156 26.567 4.1204 26.3925C3.95082 26.2197 3.66914 26.1583 3.45887 26.2868C3.30964 26.3779 3.14526 26.495 3.06466 26.6439C2.58228 27.5345 1.82778 27.9449 0.859829 28.0271C0.574549 28.0515 0.294058 28.132 0 28.1889C0.233012 28.0018 0.462831 27.831 0.67709 27.6423C1.13513 27.2385 1.44635 26.7346 1.63387 26.1473C1.87447 25.3945 2.20244 24.6844 2.70597 24.0756C3.55383 23.0507 4.65904 22.6074 5.95696 22.6758C6.95604 22.7286 7.83262 23.1187 8.54363 23.8381C10.5597 25.8781 10.0379 29.4082 7.17548 30.6291C6.93689 30.7308 6.6923 30.819 6.45171 30.917C5.96334 31.1167 5.51288 31.3685 5.25832 31.8764C5.23039 31.8683 5.20246 31.8606 5.17493 31.8528Z"
      fill="black"
    />
  </svg>
);

// const Links: { title: string; url: string }[][] = [
//   [
//     { title: "Home", url: "" },
//     { title: "Contact", url: "" },
//     { title: "Resource", url: "" },
//   ],
//   [
//     { title: "Litepaper", url: "" },
//     { title: "Guides", url: "" },
//     { title: "Docs", url: "" },
//   ],
// ];

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
        {/* <FooterLinksContainer>
          {Links.map((linksGroup, groupIndex) => (
            <FooterLinksPanel key={groupIndex}>
              {linksGroup.map((link, linkIndex) => (
                <FooterLinkItem key={linkIndex}>{link.title}</FooterLinkItem>
              ))}
            </FooterLinksPanel>
          ))}
        </FooterLinksContainer> */}
        <Text margin="24px" fontSize="20px">
          <Text bold>Hopers.io,</Text>
          <Text>an</Text>
          <Text>avenue</Text>
          <Text>for</Text>
          <Text>the</Text>
          <Text>evolution</Text>
          <Text>of</Text>
          <Text bold color="white">
            DeFi
          </Text>
          <Text>&</Text>
          <Text bold color="white">
            NFTs
          </Text>
          <Text>on</Text>
          <Text bold>Juno</Text>
        </Text>
        <LaunchpadButton
          onClick={() => window.open("https://launchpad.hopers.io/")}
        >
          <RocketIcon />
          Launchpad
        </LaunchpadButton>
        <FooterSocialLinkItemContainer>
          {SocialIcons.map((icon, index) => (
            <FooterSocialLinkItem
              key={index}
              onClick={() => icon.link && openNewUrl(icon.link)}
            >
              <icon.Icon />
            </FooterSocialLinkItem>
          ))}
        </FooterSocialLinkItemContainer>
      </FooterInfo>
      <FooterAdvertiseWrapper>
        <Advertise images={Advertise2} />
      </FooterAdvertiseWrapper>
      {/* <FooterInfo>
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
        <FooterSocialLinkItemContainer>
          {SocialIcons.map((icon, index) => (
            <FooterSocialLinkItem key={index} onClick={() => openNewUrl(icon.link)}>
              {icon.Icon}
            </FooterSocialLinkItem>
          ))}
        </FooterSocialLinkItemContainer>
      </FooterInfo> */}
    </FooterWrapper>
  );
};

export default Footer;
