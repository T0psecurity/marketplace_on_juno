import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Collections from "../../constants/Collections";
// import { useKeplr } from "../../features/accounts/useKeplr";
import { setNFTs } from "../../features/nfts/nftsSlice";
import {
  AccountType,
  setKeplrAccount,
} from "../../features/accounts/accountsSlice";
// import useContract from "../../hook/useContract";
import useOnClickOutside from "../../hook/useOnClickOutside";
import useWindowSize from "../../hook/useWindowSize";
import { DiscordIcon, ListIcon, MediumIcon, TwitterIcon } from "../Icons";
import { MarketplaceInfo } from "../../constants/Collections";
import {
  HeaderWrapper,
  LogoContainer,
  HeaderLogo,
  // HeaderBackToHomeButton,
  ConnectWalletButton,
  DisconnectIcon,
  ButtonContainer,
  LinkButton,
  ProfileIcon,
  MenuIcon,
  MenuIconContainer,
  MenuContainer,
  MenuItem,
  MenuHeader,
  MenuFooter,
  MenuFooterLinkItem,
  HeaderBackground,
  HorizontalDivider,
  LinkContainer,
} from "./styled";
import { coin } from "@cosmjs/proto-signing";
import useRefresh from "../../hook/useRefresh";
import { ChainConfigs, ChainTypes } from "../../constants/ChainTypes";
import ToggleThemeButton from "../ToogleThemeButton";
import {
  ExploreIcon,
  HomeIcon,
  // LaunchpadIcon,
  MintIcon,
  ProfileIcon as ProfileMenuIcon,
  WalletIcon,
} from "../SvgIcons";
import HopePriceDisplay from "../HopePriceDisplay";
// import { useCosmodal } from "../../features/accounts/useCosmodal";

const HeaderLinks = [
  {
    title: "Swap",
    url: "/",
    icon: ExploreIcon,
  },
  {
    title: "NFT",
    url: "/",
    icon: ExploreIcon,
  },
  {
    title: "Earn",
    url: "/",
    icon: ExploreIcon,
  },
  {
    isDivider: true,
  },
  { title: "Mint", url: "/collections/mint", icon: MintIcon },
  {
    title: "IDO",
    url: "/",
    icon: ExploreIcon,
  },
  // {
  //   title: "Launchpad",
  //   url: "http://launchpad.hopers.io/",
  //   icon: LaunchpadIcon,
  // },
];

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

const Header: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // const [runningFetch, setRunningFetch] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null); // TODO: must use useRef
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const config = ChainConfigs[ChainTypes.JUNO];
  // const { connect } = useKeplr();
  // const { connect: connectWithCosmodal } = useCosmodal();
  const { connect, disconnect, connectedWallet } = useWalletManager();
  const history = useHistory();
  // const { initContracts } = useContract();
  const { refresh } = useRefresh();

  const { isMobile } = useWindowSize(900);

  useEffect(() => {
    refresh();
    // initContracts();
    return () => {
      dispatch(setKeplrAccount());
      Collections.forEach((collection: MarketplaceInfo) =>
        setNFTs([collection.collectionId, []])
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!connectedWallet) {
      dispatch(setKeplrAccount());
      Collections.forEach((collection: MarketplaceInfo) =>
        setNFTs([collection.collectionId, []])
      );
    } else {
      const { name: label, address } = connectedWallet;
      dispatch(
        setKeplrAccount({
          label,
          address,
          type: AccountType.Keplr,
          balance: coin(0, config["microDenom"]),
        })
      );
    }
  }, [connectedWallet, dispatch, config, refresh]);

  useEffect(() => {
    const headerElement = document.getElementById("header");
    const headerElementHeight = headerElement?.clientHeight || 0;
    if (headerElementHeight !== headerHeight)
      setHeaderHeight(headerElementHeight);
  });

  const clickWalletButton = () => {
    if (!account) {
      connect();
      // connectWithCosmodal();
    } else {
      // dispatch(setKeplrAccount());
      // Collections.forEach((collection: MarketplaceInfo) =>
      //   setNFTs([collection.collectionId, []])
      // );
      disconnect();
    }
  };

  const handleClickLink = (url: string) => {
    if (!url) return;
    if (url.includes("http:")) {
      window.open(url);
    } else {
      history.push(url);
    }
  };

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleClickOutsideMenuIcon = () => {
    setIsOpenMenu(false);
  };

  const openNewUrl = (url: string) => {
    window.open(url);
  };

  useOnClickOutside(ref, handleClickOutsideMenuIcon);

  const ConnectButton = () => (
    <ConnectWalletButton
      onClick={clickWalletButton}
      title={account?.label || ""}
    >
      {account ? (
        <>
          <span>{account.label}</span>
          <DisconnectIcon alt="" src="/others/logout.png" />
        </>
      ) : (
        <>
          <WalletIcon width={20} height={15} />
          <span style={{ marginLeft: 5 }}>Connect Wallet</span>
        </>
      )}
    </ConnectWalletButton>
  );

  return (
    <>
      <HeaderBackground height={headerHeight} />
      <HeaderWrapper id="header">
        <LogoContainer>
          <HeaderLogo
            isMobile={isMobile}
            onClick={() => handleClickLink("/")}
          />
          {/* Hopers.io */}
        </LogoContainer>
        {isMobile ? (
          <MenuIconContainer ref={(node) => setRef(node)}>
            <MenuIcon onClick={handleOpenMenu}>{ListIcon}</MenuIcon>
            {isOpenMenu && (
              <MenuContainer onClick={(e) => e.preventDefault()}>
                <MenuHeader>
                  <ConnectButton />
                  <ToggleThemeButton />
                </MenuHeader>
                <MenuItem onClick={() => handleClickLink("/")}>
                  <HomeIcon width={20} height={20} />
                  Home
                </MenuItem>
                {HeaderLinks.map((linkItem, linkIndex) =>
                  linkItem.isDivider ? null : (
                    <MenuItem
                      key={linkIndex}
                      onClick={() => handleClickLink(linkItem.url || "/")}
                    >
                      {linkItem.icon && (
                        <linkItem.icon width={20} height={20} />
                      )}
                      {linkItem.title}
                    </MenuItem>
                  )
                )}
                <MenuItem
                  onClick={() => handleClickLink("/profile")}
                  lastElement
                >
                  <ProfileMenuIcon width={20} height={20} />
                  My Profile
                </MenuItem>
                <MenuFooter>
                  {SocialIcons.map((icon, index) => (
                    <MenuFooterLinkItem
                      key={index}
                      onClick={() => openNewUrl(icon.link)}
                    >
                      {icon.Icon}
                    </MenuFooterLinkItem>
                  ))}
                </MenuFooter>
              </MenuContainer>
            )}
          </MenuIconContainer>
        ) : (
          <ButtonContainer isMobile={isMobile}>
            <LinkContainer>
              {HeaderLinks.map((linkItem, linkIndex) =>
                linkItem.isDivider ? (
                  <HorizontalDivider />
                ) : (
                  <LinkButton
                    key={linkIndex}
                    onClick={() => handleClickLink(linkItem.url || "/")}
                  >
                    {linkItem.title}
                  </LinkButton>
                )
              )}
            </LinkContainer>
            <LinkContainer>
              <HopePriceDisplay />
              <div style={{ display: "flex", alignItems: "center" }}>
                <ProfileIcon onClick={() => handleClickLink("/profile")} />
                <ToggleThemeButton />
                <ConnectButton />
              </div>
            </LinkContainer>
          </ButtonContainer>
        )}
      </HeaderWrapper>
    </>
  );
};

export default Header;
