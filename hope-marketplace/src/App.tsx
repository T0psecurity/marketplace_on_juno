import React from "react";
import {
  // HashRouter,
  Router,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
import {
  KeplrWalletConnectV1,
  WalletInfo,
  WalletManagerProvider,
} from "cosmodal";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import WalletConnect from "@walletconnect/client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import {
  //  useAppDispatch,
  useAppSelector,
} from "./app/hooks";
// import { deleteAccount } from "./features/accounts/accountsSlice";
// import useContract from "./hook/useContract";
// import useFetch from "./hook/useFetch";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ChainInfo } from "@keplr-wallet/types";
import { getChainConfig } from "./features/accounts/useKeplr";

const history = createBrowserHistory();

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);
function App() {
  const config = useAppSelector((state) => state.connection.config);
  const chainInfo: ChainInfo = getChainConfig(config);

  const walletInfoList: WalletInfo[] = [
    {
      id: "keplr-wallet-extension",
      name: "Keplr Wallet",
      description: "Keplr Browser Extension",
      logoImgUrl: "/wallet-images/keplr-wallet-extension.png",
      getWallet: () => getKeplrFromWindow(),
    },
    {
      id: "walletconnect-keplr",
      name: "WalletConnect",
      description: "Keplr Mobile",
      logoImgUrl: "/wallet-images/walletconnect-keplr.png",
      getWallet: (connector?: WalletConnect) =>
        Promise.resolve(
          connector
            ? new KeplrWalletConnectV1(connector, [chainInfo])
            : undefined
        ),
    },
  ];

  return (
    <WalletManagerProvider walletInfoList={walletInfoList}>
      <div className="main">
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
      </div>
    </WalletManagerProvider>
  );
}

export default App;
