import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MyNFT from "../MyNFT";
import Marketplace from "../Marketplace";
import NFTDetail from "../NFTDetail";
import { Wrapper } from "./styled";

const Main: React.FC = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact={false} path="/profile" component={MyNFT} />
        <Route
          exact={false}
          path="/collections/mintpass1"
          component={Marketplace}
        />
        <Route exact={false} path="/detail" component={NFTDetail} />
        <Redirect to="/profile" />
      </Switch>
    </Wrapper>
  );
};

export default Main;
