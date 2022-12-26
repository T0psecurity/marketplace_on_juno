import React from "react";
import ExploreHeader from "../../components/ExploreHeader";
import PageWrapper from "../../components/PageWrapper";

const Stake: React.FC = () => {
	return (
		<PageWrapper>
			<ExploreHeader
				title="Stake"
				tabs={[
					{ title: "Bond", url: "/bond" },
					{ title: "Stake", url: "/stake" },
					{ title: "Airdrop", url: "/airdrop" },
				]}
			/>
		</PageWrapper>
	);
};

export default Stake;
