import React from "react";
import { useAppSelector } from "../../app/hooks";
import ExploreHeader from "../../components/ExploreHeader";
import PageWrapper from "../../components/PageWrapper";
import PoolImage from "../../components/PoolImage";
import PoolName from "../../components/PoolName";
import { CancelIcon, VerifiedBadge } from "../../components/SvgIcons";
import Table, { ColumnTypes, TColumns } from "../../components/Table";
import Text from "../../components/Text";
import { TPool } from "../../types/pools";
import { getTokenName } from "../../types/tokens";
import { Wrapper } from "./styled";

import { addSuffix } from "../../util/string";
import { PoolType } from "../Liquidity/type";
import BondTableDetailRow from "./BondTableDetailRow";

const Bond: React.FC = () => {
	const liquidities = useAppSelector((state) => state.liquidities);
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
			sort: (data1, data2, direction) => {
				const name1 = `${getTokenName(data1.token1)}-${getTokenName(
					data1.token2
				)}`;
				const name2 = `${getTokenName(data2.token1)}-${getTokenName(
					data2.token2
				)}`;

				return direction === "up"
					? name1 > name2
						? 1
						: -1
					: name2 > name1
					? 1
					: -1;
			},
			render: (value: any, data: TPool) => <PoolName pool={data} />,
		},
		{
			name: "isVerified",
			title: "Verified",
			render: (value, data) => (value ? <VerifiedBadge /> : <CancelIcon />),
		},
		{ name: "earned", title: "Earned", type: ColumnTypes.NUMBER, sort: true },
		{ name: "apr", title: "APR Rewards", sort: true },
		{ name: "pool", title: "Liquidity Pool", sort: true },
		{
			name: "ratio",
			title: "Value",
			sort: true,
			render: (value, data) => (
				<Text bold color="black">{`1${getTokenName(data.token1)} = ${addSuffix(
					value || 0
				)}${getTokenName(data.token2)}`}</Text>
			),
		},
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
					data={liquidities}
					columns={Columns}
					renderDetailRow={(rowData) => (
						<BondTableDetailRow rowData={rowData} />
					)}
					option={{
						emptyString: "No Liquidities",
						tab: {
							tabs: (Object.keys(PoolType) as Array<keyof typeof PoolType>).map(
								(key) => PoolType[key]
							),
						},
						search: {
							onChange: (searchValue, liquidities) =>
								liquidities.filter(
									(liquidity) =>
										!searchValue ||
										liquidity.token1
											.toLowerCase()
											.includes(searchValue.toLowerCase()) ||
										liquidity.token2
											.toLowerCase()
											.includes(searchValue.toLowerCase())
								),
						},
					}}
				/>
			</Wrapper>
		</PageWrapper>
	);
};

export default Bond;
