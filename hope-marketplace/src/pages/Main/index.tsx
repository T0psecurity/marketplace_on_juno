import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MyNFT from "../MyNFT";
import Marketplace from "../Marketplace";
import ExploreMarketplace from "../ExploreMarketplace";
import NFTDetail from "../NFTDetail";
import Home from "../Home";
import Mint from "../Mint";
import { Wrapper } from "./styled";

const Main: React.FC = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact={false} path="/profile" component={MyNFT} />
        <Route
          exact={false}
          path="/collections/marketplace"
          component={Marketplace}
        />
        <Route
          exact={false}
          path="/collections/explore"
          component={ExploreMarketplace}
        />
        <Route exact={false} path="/collections/mint" component={Mint} />
        <Route exact={false} path="/detail" component={NFTDetail} />
        <Route exact path="/" component={Home} />
        <Redirect to="/profile" />
      </Switch>
    </Wrapper>
  );
};

export default Main;
