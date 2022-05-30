import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MyNFT from "../MyNFT";
import Marketplace from "../Marketplace";
import HopeMarketplace from "../HopeMarketplace";
import ExploreMarketplace from "../ExploreMarketplace";
import NFTDetail from "../NFTDetail";
import Home from "../Home";
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
        <Route
          exact={false}
          path="/collections/hopegalaxy1"
          component={HopeMarketplace}
        />
        <Route
          exact={false}
          path="/collections/explore"
          component={ExploreMarketplace}
        />
        <Route exact={false} path="/detail" component={NFTDetail} />
        <Route exact path="/" component={Home} />
        <Redirect to="/profile" />
      </Switch>
    </Wrapper>
  );
};

export default Main;
