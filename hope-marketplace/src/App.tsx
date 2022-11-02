import React, { useEffect } from "react";
import Helmet from "react-helmet";
import {
  // HashRouter,
  Router,
  useLocation,
} from "react-router-dom";
// import { ChainInfo } from "@keplr-wallet/types";
// import { coin } from "@cosmjs/proto-signing";
import { createBrowserHistory } from "history";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
import useMatchBreakpoints from "./hook/useMatchBreakpoints";
import styled, { createGlobalStyle, css } from "styled-components";

import { RefreshContextProvider } from "./context/RefreshContext";
import Updater from "./context/Updater";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import { useAppDispatch } from "./app/hooks";

import { fetchTokenPrices } from "./features/tokenPrices/tokenPricesSlice";
import { PopoutContextProvider } from "./context/PopoutContext";
import { ThemeContextProvider } from "./context/ThemeContext";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import { WalletProvider } from "./context/Wallet";

const history = createBrowserHistory();

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);

const GlobalStyle = createGlobalStyle<{ isMobile: boolean }>`
  html {
    overflow-x: hidden;
  }
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

const ScrollToTopOnRouting = () => {
  const { pathname } = useLocation(); // consider about the key when you want to trigger on change params
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTokenPrices());
    const fetchTokenPriceInterval = setInterval(() => {
      dispatch(fetchTokenPrices());
    }, 1000 * 60 * 60);
    return clearInterval(fetchTokenPriceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isXs, isSm } = useMatchBreakpoints();
  const isMobile = isXs || isSm;

  return (
    <main>
      <Helmet>
        <meta
          name="description"
          content="http://hopers.io/ 🍀 an avenue for the evolution of #DeFi & #NFTs on $JUNO living in the #Cosmos ⚛️"
        />

        <meta itemProp="name" content="-- Hopers.io Marketplace --" />
        <meta
          itemProp="description"
          content="http://hopers.io/ 🍀 an avenue for the evolution of #DeFi & #NFTs on $JUNO living in the #Cosmos ⚛️"
        />
        <meta itemProp="image" content="http://hopers.io/SEO.png" />

        <meta property="og:url" content="https://hopers.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="-- Hopers.io Marketplace --" />
        <meta
          property="og:description"
          content="http://hopers.io/ 🍀 an avenue for the evolution of #DeFi & #NFTs on $JUNO living in the #Cosmos ⚛️"
        />
        <meta property="og:image" content="http://hopers.io/SEO.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="-- Hopers.io Marketplace --" />
        <meta
          name="twitter:description"
          content="http://hopers.io/ 🍀 an avenue for the evolution of #DeFi & #NFTs on $JUNO living in the #Cosmos ⚛️"
        />
        <meta name="twitter:image" content="http://hopers.io/SEO.png" />
      </Helmet>
      <ThemeContextProvider>
        <GlobalStyle isMobile={isMobile} />
        <WalletProvider>
          <RefreshContextProvider>
            <PopoutContextProvider>
              <Updater />
              <MainWrapper className="main">
                <Router history={history}>
                  <ScrollToTopOnRouting />
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
        </WalletProvider>
      </ThemeContextProvider>
    </main>
  );
}

export default App;
