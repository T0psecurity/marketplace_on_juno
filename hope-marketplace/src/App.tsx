import React, { useEffect } from "react";
import {
  // HashRouter,
  Router,
} from "react-router-dom";
// import { ChainInfo } from "@keplr-wallet/types";
// import { coin } from "@cosmjs/proto-signing";
import { createBrowserHistory } from "history";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
import useMatchBreakpoints from "./hook/useMatchBreakpoints";
import styled, { createGlobalStyle, css } from "styled-components";
import {
  // KeplrWalletConnectV1,
  // Wallet,
  // WalletClient,
  WalletManagerProvider,
  WalletType,
} from "@noahsaso/cosmodal";
// import { getKeplrFromWindow } from "@keplr-wallet/stores";
// import WalletConnect from "@walletconnect/client";
// import { getChainConfig } from "./features/accounts/useKeplr";
// import {
//   AccountType,
//   setKeplrAccount,
// } from "./features/accounts/accountsSlice";

import { RefreshContextProvider } from "./context/RefreshContext";
import Updater from "./context/Updater";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import { useAppDispatch } from "./app/hooks";
// import { deleteAccount } from "./features/accounts/accountsSlice";
// import useContract from "./hook/useContract";
// import useFetch from "./hook/useFetch";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { fetchTokenPrices } from "./features/tokenPrices/tokenPricesSlice";
import { ChainConfigs, ChainTypes } from "./constants/ChainTypes";
import { PopoutContextProvider } from "./context/PopoutContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const history = createBrowserHistory();

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);

const GlobalStyle = createGlobalStyle<{ isMobile: boolean }>`
* {
  transition: color 0.5s, background-color 0.5s;
}
  ${({ isMobile }) =>
    !isMobile &&
    css`
      *::-webkit-scrollbar {
        width: 5px;
        position: absolute;
      }

      *::-webkit-scrollbar-track {
        background: transparent;
      }

      *::-webkit-scrollbar-thumb {
        background-color: #444857;
        border-radius: 10px;
        border: 3px solid #444857;
      }
    `}
`;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTokenPrices());
    const fetchTokenPriceInterval = setInterval(() => {
      dispatch(fetchTokenPrices());
    }, 1000 * 60 * 10);
    return clearInterval(fetchTokenPriceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;
  const config = ChainConfigs[ChainTypes.JUNO];
  // const chainInfo: ChainInfo = getChainConfig(config);

  // const enableWallet = async (wallet: Wallet, client: WalletClient) => {
  //   if (!(client instanceof KeplrWalletConnectV1)) {
  //     await client.experimentalSuggestChain(getChainConfig(config));
  //   }
  //   await client.enable(config.chainId);
  //   const { name: label, bech32Address: address } = await client.getKey(
  //     config.chainId
  //   );
  //   dispatch(
  //     setKeplrAccount({
  //       label,
  //       address,
  //       type: AccountType.Keplr,
  //       balance: coin(0, config["microDenom"]),
  //     })
  //   );
  // };

  // const walletInfoList: any[] = [
  //   {
  //     id: "keplr-wallet-extension",
  //     name: "Keplr Wallet",
  //     description: "Keplr Browser Extension",
  //     imageUrl: "/wallet-images/keplr-wallet-extension.png",
  //     isWalletConnect: false,
  //     getClient: getKeplrFromWindow,
  //     onSelect: async () => {
  //       const hasKeplr = !!(await getKeplrFromWindow());
  //       if (!hasKeplr) {
  //         // throw new KeplrNotInstalledError();
  //       }
  //     },
  //   },
  //   {
  //     id: "walletconnect-keplr",
  //     name: "WalletConnect",
  //     description: "Keplr Mobile",
  //     imageUrl: "/wallet-images/walletconnect-keplr.png",
  //     isWalletConnect: true,
  //     getClient: async (walletConnect?: WalletConnect) => {
  //       if (walletConnect?.connected)
  //         return new KeplrWalletConnectV1(walletConnect, [chainInfo]);
  //       throw new Error("Mobile wallet not connected.");
  //     },
  //   },
  // ];

  return (
    <ThemeContextProvider>
      <GlobalStyle isMobile={isMobile} />
      <WalletManagerProvider
        defaultChainId={config.chainId}
        enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
        localStorageKey="keplr-wallet"
        walletConnectClientMeta={{
          name: "Hopers.io Marketplace",
          description:
            "The DAO governs the marketplace and earns rewards through the staking system of the token $HOPE.",
          url: "https://hopers.io",
          icons: ["https://hopers.io/logo.png"],
        }}
      >
        <RefreshContextProvider>
          <PopoutContextProvider>
            <Updater />
            <MainWrapper className="main">
              <Router history={history}>
                <Header />
                <Main />
                <Footer />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  hideProgressBar
                  newestOnTop
                  closeOnClick
                  theme="colored"
                />
              </Router>
            </MainWrapper>
          </PopoutContextProvider>
        </RefreshContextProvider>
      </WalletManagerProvider>
    </ThemeContextProvider>
  );
}

export default App;
