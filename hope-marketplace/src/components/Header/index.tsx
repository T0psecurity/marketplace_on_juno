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
} from "./styled";

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

  return (
    <HeaderWrapper>
      <LogoContainer>
        <HeaderLogo onClick={() => window.open("https://hopegalaxy.io")} />
        Hopers.io
      </LogoContainer>
      <ButtonContainer>
        <LinkButton onClick={() => history.push("/explore")}>
          My Page
        </LinkButton>
        <LinkButton onClick={() => history.push("/resources")}>
          MarketPlace
        </LinkButton>
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
