import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { DiscordIcon, GlobeIcon, TwitterIcon } from "../../components/Icons";
import NFTContainer from "../../components/NFTContainer";
import { NFTItemStatus } from "../../components/NFTItem";
import { Title } from "../../components/PageTitle";
import useFetch from "../../hook/useFetch";
import {
  Wrapper,
  HorizontalDivider,
  BackgroundWrapper,
  HopeLogoIcon,
  SocialLinkContainer,
  SocialLinkItem,
} from "./styled";

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

const Marketplace: React.FC = () => {
  const { fetchListedNFTs } = useFetch();
  const history = useHistory();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const marketplaceNFTs = useAppSelector((state) => state.nfts.marketplaceNFTs);

  useEffect(() => {
    if (account && account.address) {
      fetchListedNFTs();
    }
  }, [account, fetchListedNFTs]);
  return (
    <Wrapper>
      <BackgroundWrapper onClick={() => history.push("/")}>
        <HopeLogoIcon onClick={() => history.push("/")} />
        <SocialLinkContainer>
          {SocialLinkItems.map((linkItem, linkIndex) => (
            <SocialLinkItem
              // onClick={() => history.push(linkItem.url)}
              onClick={() => window.open(linkItem.url)}
              key={linkIndex}
              backgroundColor={linkItem.backgroundColor}
            >
              {linkItem.icon}
            </SocialLinkItem>
          ))}
        </SocialLinkContainer>
      </BackgroundWrapper>
      <Title title="Mint Pass Hope Galaxy NFT - Collection 1" />
      <HorizontalDivider />
      <NFTContainer nfts={marketplaceNFTs} status={NFTItemStatus.BUY} />
    </Wrapper>
  );
};

export default Marketplace;
