import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setKeplrAccount } from "../../features/accounts/accountsSlice";
import { useKeplr } from "../../features/accounts/useKeplr";
import useFetch from "../../hook/useFetch";
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
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const { connect } = useKeplr();
  const history = useHistory();
  const { fetchAllNFTs } = useFetch();

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

  return (
    <HeaderWrapper>
      <LogoContainer>
        <HeaderLogo onClick={() => window.open("https://hopegalaxy.io")} />
        Hopers.io
      </LogoContainer>
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
    </HeaderWrapper>
  );
};

export default Header;
