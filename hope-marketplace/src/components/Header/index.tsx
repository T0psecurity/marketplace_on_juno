import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setKeplrAccount } from "../../features/accounts/accountsSlice";
import { useKeplr } from "../../features/accounts/useKeplr";
import useFetch from "../../hook/useFetch";
import useOnClickOutside from "../../hook/useOnClickOutside";
import useWindowSize from "../../hook/useWindowSize";
import { ListIcon } from "../Icons";
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

const HeaderLinks = [
  {
    title: "Explore",
    url: "/collections/mintpass1",
  },
  { title: "Launchpad", url: "https://www.hopers.io/" },
  { title: "Create", url: "" },
];

const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null); // TODO: must use useRef
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const { connect } = useKeplr();
  const history = useHistory();
  const { fetchAllNFTs } = useFetch();

  const { isMobile } = useWindowSize(900);

  useEffect(() => {
    fetchAllNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const clickWalletButton = () => {
    if (!account) {
      connect();
    } else {
      dispatch(setKeplrAccount());
    }
  };

  const handleClickLink = (url: string) => {
    if (!url) return;
    if (url.includes("https:")) {
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
        <HeaderLogo onClick={() => window.open("https://hopegalaxy.io")} />
        Hopers.io
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
