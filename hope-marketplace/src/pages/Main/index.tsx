import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MyNFT from "../MyNFT";
import Marketplace from "../Marketplace";
import ExploreMarketplace from "../ExploreMarketplace";
import NFTDetail from "../NFTDetail";
import Home from "../Home";
import Mint from "../Mint";
import Activity from "../Activity";
import IDO from "../IDO";
import IDODetail from "../IDO/IDODetail";
import Swap from "../Swap";
import { Wrapper } from "./styled";
import Liquidity from "../Liquidity";
import Bond from "../Bond";
import Stake from "../Stake";
import Airdrop from "../Airdrop";

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
				<Route exact={false} path="/nft/detail" component={NFTDetail} />
				<Route exact={false} path="/activity" component={Activity} />
				<Route exact path="/ido" component={IDO} />
				<Route exact path="/ido/detail" component={IDODetail} />
				<Route exact path="/swap" component={Swap} />
				<Route exact path="/liquidity" component={Liquidity} />
				<Route exact path="/bond" component={Bond} />
				<Route exact path="/stake" component={Stake} />
				<Route exact path="/airdrop" component={Airdrop} />
				<Route exact path="/" component={Home} />
				<Redirect to="/" />
			</Switch>
		</Wrapper>
	);
};

export default Main;
