import React from "react";
import {
  // HashRouter,
  Router,
} from "react-router-dom";
import { ChainInfo } from "@keplr-wallet/types";
import { coin } from "@cosmjs/proto-signing";
import { createBrowserHistory } from "history";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
import {
  KeplrWalletConnectV1,
  Wallet,
  WalletClient,
  WalletManagerProvider,
} from "@noahsaso/cosmodal";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import WalletConnect from "@walletconnect/client";
import { getChainConfig } from "./features/accounts/useKeplr";
import {
  AccountType,
  setKeplrAccount,
} from "./features/accounts/accountsSlice";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import {
  useAppDispatch,
  //  useAppDispatch,
  useAppSelector,
} from "./app/hooks";
// import { deleteAccount } from "./features/accounts/accountsSlice";
// import useContract from "./hook/useContract";
// import useFetch from "./hook/useFetch";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const history = createBrowserHistory();

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);
function App() {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.connection.config);
  const chainInfo: ChainInfo = getChainConfig(config);

  const enableWallet = async (wallet: Wallet, client: WalletClient) => {
    if (!(client instanceof KeplrWalletConnectV1)) {
      await client.experimentalSuggestChain(getChainConfig(config));
    }
    await client.enable(config.chainId);
    const { name: label, bech32Address: address } = await client.getKey(
      config.chainId
    );
    dispatch(
      setKeplrAccount({
        label,
        address,
        type: AccountType.Keplr,
        balance: coin(0, config["microDenom"]),
      })
    );
  };

  const walletInfoList: Wallet[] = [
    {
      id: "keplr-wallet-extension",
      name: "Keplr Wallet",
      description: "Keplr Browser Extension",
      imageUrl: "/wallet-images/keplr-wallet-extension.png",
      isWalletConnect: false,
      getClient: getKeplrFromWindow,
      onSelect: async () => {
        const hasKeplr = !!(await getKeplrFromWindow());
        if (!hasKeplr) {
          // throw new KeplrNotInstalledError();
        }
      },
    },
    {
      id: "walletconnect-keplr",
      name: "WalletConnect",
      description: "Keplr Mobile",
      imageUrl: "/wallet-images/walletconnect-keplr.png",
      isWalletConnect: true,
      getClient: async (walletConnect?: WalletConnect) => {
        if (walletConnect?.connected)
          return new KeplrWalletConnectV1(walletConnect, [chainInfo]);
        throw new Error("Mobile wallet not connected.");
      },
    },
  ];

  return (
    <WalletManagerProvider enableWallet={enableWallet} wallets={walletInfoList}>
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
