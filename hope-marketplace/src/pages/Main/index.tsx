import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MyNFT from "../MyNFT";
import Marketplace from "../Marketplace";
import { Wrapper } from "./styled";

const Main: React.FC = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact={false} path="/explore" component={MyNFT} />
        <Route exact={false} path="/resources" component={Marketplace} />
        <Redirect to="/" />
      </Switch>
    </Wrapper>
  );
};

export default Main;
