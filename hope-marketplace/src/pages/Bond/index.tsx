import React from "react";
import ExploreHeader from "../../components/ExploreHeader";
import PageWrapper from "../../components/PageWrapper";
import Text from "../../components/Text";
import { Wrapper } from "./styled";

const Bond: React.FC = () => {
	return (
		<PageWrapper>
			<ExploreHeader
				title="Bond"
				tabs={[
					{ title: "Bond", url: "/bond" },
					{ title: "Stake", url: "/stake" },
					{ title: "Airdrop", url: "/airdrop" },
				]}
			/>
			<Wrapper>
				<Text
					width="100%"
					flexDirection="column"
					margin="30px 0 0 0"
					gap="10px"
				>
					<Text bold fontSize="35px">
						Bond
					</Text>
					<Text bold fontSize="20px">
						Bond LP Token to earn
					</Text>
				</Text>
			</Wrapper>
		</PageWrapper>
	);
};

export default Bond;
