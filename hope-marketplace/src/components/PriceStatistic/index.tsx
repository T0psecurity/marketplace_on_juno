import React, { useEffect, useMemo, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { LineColors } from "../../constants/colors";
import {
	fetchTokenPriceHistory,
	TokenHistoryPeriod,
} from "../../features/tokenPrices/tokenPricesSlice";
import { TokenFullName, TokenType } from "../../types/tokens";
import PriceTable from "./PriceTable";
// import { ThemeContext } from "../../context/ThemeContext";
import {
	ChartArea,
	ContentContainer,
	Title,
	Wrapper,
	// StyledSelect as Select,
} from "./styled";

// type LineDisplay = {
//   [key in TokenType]: boolean;
// };

// type PeriodOptionType = {
//   value: any;
//   label: string;
// };

// const SelectPeriodOptions: PeriodOptionType[] = [
//   // {
//   //   value: TokenHistoryPeriod.DAILY,
//   //   label: "Daily",
//   // },
//   {
//     value: TokenHistoryPeriod.WEEKLY,
//     label: "Weekly",
//   },
//   {
//     value: TokenHistoryPeriod.MONTHLY,
//     label: "Monthly",
//   },
//   {
//     value: TokenHistoryPeriod.YEARLY,
//     label: "Yearly",
//   },
// ];

const PriceStatistic: React.FC = () => {
	// const [historyPeriod, setHistoryPeriod] = useState<PeriodOptionType>(
	//   SelectPeriodOptions[1]
	// );
	// const [lineDisplay, setLineDisplay] = useState<LineDisplay>(
	//   {} as LineDisplay
	// );
	const [searchedToken, setSearchedToken] = useState("");
	const [tokenPriceHistory, setTokenPriceHistory] = useState<any[]>([]);

	// const { isDark } = useContext(ThemeContext);

	// useEffect(() => {
	//   let lineDisplaySetting: LineDisplay = {} as LineDisplay;
	//   (Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach((key) => {
	//     lineDisplaySetting[TokenType[key]] = true;
	//   });
	//   setLineDisplay(lineDisplaySetting);
	// }, []);

	useEffect(() => {
		(async () => {
			let result: any[] = [];
			const tokenHistoryQueryResult = await fetchTokenPriceHistory(
				// historyPeriod.value
				TokenHistoryPeriod.MONTHLY
			);
			Object.keys(tokenHistoryQueryResult?.[TokenType.JUNO] || {}).forEach(
				(date: string) => {
					let resultItem: any = { date };
					(Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach(
						(tokenType) => {
							const denom = TokenType[tokenType];
							resultItem[tokenType] = tokenHistoryQueryResult[denom]?.[date];
						}
					);
					result.push(resultItem);
				}
			);
			setTokenPriceHistory(result);
		})();
	}, []);

	// const handleClickChartLegend = (e: any) => {
	//   const { dataKey } = e;
	//   const denom: TokenType = TokenType[dataKey as keyof typeof TokenType];
	//   setLineDisplay((prev) => ({
	//     ...prev,
	//     [denom]: !prev[denom],
	//   }));
	// };

	const { legendPayload, lineDisplay } = useMemo(() => {
		if (!searchedToken) {
			return {
				legendPayload: [
					{
						dataKey: (
							Object.keys(TokenType) as Array<keyof typeof TokenType>
						).filter((key) => TokenType[key] === TokenType.JUNO)[0],
						value: (
							Object.keys(TokenType) as Array<keyof typeof TokenType>
						).filter((key) => TokenType[key] === TokenType.JUNO)[0],
						color: LineColors[TokenType.JUNO],
					},
				],
				lineDisplay: { [TokenType.JUNO]: true },
			};
		}
		const legendPayloadResult: any = [];
		let lineDisplayResult: any = {};
		(Object.keys(TokenType) as Array<keyof typeof TokenType>).forEach((key) => {
			const denom = TokenType[key];
			if (
				`${key} ${TokenFullName[denom]}`
					.toLowerCase()
					.indexOf(searchedToken.toLowerCase()) > -1
			) {
				legendPayloadResult.push({
					dataKey: key,
					value: key,
					color: LineColors[TokenType[key]],
				});
				lineDisplayResult[denom] = true;
			}
		});
		return {
			legendPayload: legendPayloadResult,
			lineDisplay: lineDisplayResult,
		};
	}, [searchedToken]);

	// const handleChangePeriodOption = (option: any) => {
	//   setHistoryPeriod(option);
	// };

	return (
		<Wrapper>
			<Title>ECOSYSTEM PRICE CHARTS</Title>
			<ContentContainer>
				<PriceTable
					onChangeSearchToken={(value: string) => setSearchedToken(value)}
				/>
				<ChartArea>
					{/* <Select
            styles={{
              control: (provided, state) => ({
                ...provided,
                ...(isDark && {
                  backgroundColor: "#838383",
                }),
              }),
              menu: (provided, state) => ({
                ...provided,
                backgroundColor: isDark ? "#838383" : "white",
              }),
              singleValue: (provided, state) => ({
                ...provided,
                ...(isDark && {
                  color: "white",
                }),
              }),
            }}
            value={historyPeriod}
            options={SelectPeriodOptions}
            onChange={handleChangePeriodOption}
          /> */}
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={tokenPriceHistory}
							margin={{
								top: 50,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Legend
								// onClick={handleClickChartLegend}
								payload={legendPayload}
							/>
							{(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
								(key) =>
									lineDisplay[TokenType[key]] && (
										<Line
											key={key}
											type="monotone"
											stroke={LineColors[TokenType[key]]}
											dataKey={key}
											dot={false}
										/>
									)
							)}
						</LineChart>
					</ResponsiveContainer>
				</ChartArea>
			</ContentContainer>
		</Wrapper>
	);
};

export default PriceStatistic;
