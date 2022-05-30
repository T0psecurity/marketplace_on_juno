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
  StyledButton,
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

const HopeMarketplace: React.FC = () => {
  const { fetchListedNFTs } = useFetch();
  const history = useHistory();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const [isAscending, setIsAscending] = React.useState(true);
  const marketplaceNFTs = useAppSelector((state) => state.nfts.marketplaceNFTs);
  const revealMarketplaceNFTs: any = [];
  marketplaceNFTs.forEach((item: any) => {
    if (item.token_id.includes("Reveal")) revealMarketplaceNFTs.push(item);
  });
  const handleSort = () => {
    setIsAscending(!isAscending);
  };
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
              onClick={() => window.open(linkItem.url)}
              key={linkIndex}
              backgroundColor={linkItem.backgroundColor}
            >
              {linkItem.icon}
            </SocialLinkItem>
          ))}
        </SocialLinkContainer>
      </BackgroundWrapper>
      <Title title="Hope Galaxy NFT - Collection 1" />
      <HorizontalDivider />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "0 200px",
        }}
      >
        <StyledButton onClick={handleSort}>
          Sort By Price {!isAscending ? "Ascending" : "Descending"}
        </StyledButton>
      </div>
      <NFTContainer
        nfts={revealMarketplaceNFTs}
        status={NFTItemStatus.BUY}
        sort={isAscending ? "as" : "des"}
      />
    </Wrapper>
  );
};

export default HopeMarketplace;
