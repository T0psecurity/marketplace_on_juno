import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Collections from "../../constants/Collections";
import { setKeplrAccount } from "../../features/accounts/accountsSlice";
import { useKeplr } from "../../features/accounts/useKeplr";
import { setNFTs } from "../../features/nfts/nftsSlice";
import useContract from "../../hook/useContract";
import useFetch from "../../hook/useFetch";
import useOnClickOutside from "../../hook/useOnClickOutside";
import useWindowSize from "../../hook/useWindowSize";
import { ListIcon } from "../Icons";
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
} from "./styled";
import { useCosmodal } from "../../features/accounts/useCosmodal";

const HeaderLinks = [
  {
    title: "Explore",
    url: "/collections/explore",
  },
  { title: "Launchpad", url: "http://launchpad.hopers.io/" },
  { title: "Mint", url: "/collections/mint" },
];

const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // const [runningFetch, setRunningFetch] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null); // TODO: must use useRef
  const [fetchingIntervalId, setFetchingIntervalId] =
    useState<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const { connect } = useKeplr();
  const { connect: connectWithCosmodal } = useCosmodal();
  const history = useHistory();
  const {
    fetchCollectionInfo,
    fetchMyNFTs,
    fetchMarketplaceNFTs,
    clearAllNFTs,
  } = useFetch();
  const { initContracts } = useContract();

  const { isMobile } = useWindowSize(900);

  useEffect(() => {
    initContracts();
    setInterval(() => {
      fetchMarketplaceNFTs();
      fetchCollectionInfo();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account) {
      // setRunningFetch(true);
      // initContracts();
      const intervalId: NodeJS.Timeout | null = setInterval(() => {
        fetchMyNFTs();
      }, 5000);
      setFetchingIntervalId(intervalId);
    } else {
      clearAllNFTs();
      if (fetchingIntervalId) clearInterval(fetchingIntervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const clickWalletButton = () => {
    if (!account) {
      // connect();
      connectWithCosmodal();
    } else {
      dispatch(setKeplrAccount());
      Collections.forEach((collection: MarketplaceInfo) =>
        setNFTs([collection.collectionId, []])
      );
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

  useOnClickOutside(ref, handleClickOutsideMenuIcon);

  return (
    <HeaderWrapper>
      <LogoContainer>
        <HeaderLogo onClick={() => handleClickLink("/")} />
        {/* Hopers.io */}
      </LogoContainer>
      {isMobile ? (
        <MenuIconContainer ref={(node) => setRef(node)}>
          <MenuIcon onClick={handleOpenMenu}>{ListIcon}</MenuIcon>
          {isOpenMenu && (
            <MenuContainer onClick={(e) => e.preventDefault()}>
              {HeaderLinks.map((linkItem, linkIndex) => (
                <MenuItem
                  key={linkIndex}
                  onClick={() => handleClickLink(linkItem.url)}
                >
                  {linkItem.title}
                </MenuItem>
              ))}
              <MenuItem onClick={() => handleClickLink("/profile")}>
                My Profile
              </MenuItem>
              <MenuItem onClick={clickWalletButton}>
                {account ? (
                  <>
                    {account.label}
                    <DisconnectIcon alt="" src="/others/logout.png" />
                  </>
                ) : (
                  "Connect"
                )}
              </MenuItem>
            </MenuContainer>
          )}
        </MenuIconContainer>
      ) : (
        <ButtonContainer>
          {HeaderLinks.map((linkItem, linkIndex) => (
            <LinkButton
              key={linkIndex}
              onClick={() => handleClickLink(linkItem.url)}
            >
              {linkItem.title}
            </LinkButton>
          ))}
          <ProfileIcon onClick={() => handleClickLink("/profile")} />
          <ConnectWalletButton onClick={clickWalletButton}>
            {account ? (
              <>
                {account.label}
                <DisconnectIcon alt="" src="/others/logout.png" />
              </>
            ) : (
              "Connect"
            )}
          </ConnectWalletButton>
        </ButtonContainer>
      )}
    </HeaderWrapper>
  );
};

export default Header;
