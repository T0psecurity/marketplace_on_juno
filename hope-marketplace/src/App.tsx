import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
// import {
//   //  useAppDispatch,
//   useAppSelector,
// } from "./app/hooks";
// import { deleteAccount } from "./features/accounts/accountsSlice";
import useContract from "./hook/useContract";
// import useFetch from "./hook/useFetch";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const history = createBrowserHistory();

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);
function App() {
  // const dispatch = useAppDispatch();
  // const account = useAppSelector((state) => state.accounts.keplrAccount);
  const { initContracts } = useContract();
  // const { fetchAllNFTs } = useFetch();
  useEffect(() => {
    // remove existing account
    // if (account) {
    //   dispatch(deleteAccount(account.address));
    // }
    // import target contracts
    initContracts();
    // if (account) {
    //   setInterval(() => {
    //     fetchAllNFTs();
    //   }, 5000);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
}

export default App;
