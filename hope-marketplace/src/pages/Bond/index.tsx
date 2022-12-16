import React from "react";
import ExploreHeader from "../../components/ExploreHeader";
import PageWrapper from "../../components/PageWrapper";
import PoolImage from "../../components/PoolImage";
import PoolName from "../../components/PoolName";
import { CancelIcon, VerifiedBadge } from "../../components/SvgIcons";
import Table, { ColumnTypes, TColumns } from "../../components/Table";
import Text from "../../components/Text";
import { TempLiquidities, TPool } from "../../types/pools";
import { Wrapper } from "./styled";

const Bond: React.FC = () => {
	const Columns: TColumns<TPool>[] = [
		{
			name: "",
			title: "",
			render: (value: any, data: TPool) => (
				<PoolImage token1={data.token1} token2={data.token2} />
			),
		},
		{
			name: "",
			title: "Pool Name",
			render: (value: any, data: TPool) => <PoolName pool={data} />,
		},
		{
			name: "isVerified",
			title: "Verified",
			render: (value, data) => (value ? <VerifiedBadge /> : <CancelIcon />),
		},
		{ name: "earned", title: "Earned", type: ColumnTypes.NUMBER },
		{ name: "apr", title: "APR Rewards" },
		{ name: "pool", title: "Liquidity Pool" },
		{ name: "ratio", title: "Value" },
	];
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
				<Table<TPool>
					data={TempLiquidities}
					columns={Columns}
					renderDetailRow={(rowData) => (
						<>
							<div style={{ height: 30 }} />
							<div style={{ height: 30 }} />
						</>
					)}
				/>
			</Wrapper>
		</PageWrapper>
	);
};

export default Bond;
