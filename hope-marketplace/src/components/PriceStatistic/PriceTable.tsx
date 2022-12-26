import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { BasicProps } from "../../constants/BasicTypes";
import { TokenFullName, TokenType } from "../../types/tokens";
import {
	AllButton,
	CoinImage,
	PriceStatisticContainer,
	PriceStatisticContent,
	PriceStatisticItem,
	SearchContainer,
	SearchIcon,
	SearchInput,
	SearchInputWrapper,
	Span,
	TokenName,
} from "./styled";

interface IPriceTable extends BasicProps {
	onChangeSearchToken?: (param: string) => void;
	disableSearch?: boolean;
}

const PriceTable: React.FC<IPriceTable> = ({
	onChangeSearchToken,
	disableSearch,
}) => {
	const [searchedToken, setSearchedToken] = useState("");
	const tokenPrices = useAppSelector((state) => state.tokenPrices);

	const handleChangeSearchToken = (e: any) => {
		const { value } = e.target;
		setSearchedToken(value);
		if (onChangeSearchToken) {
			onChangeSearchToken(value);
		}
	};
	return (
		<PriceStatisticContainer>
			{!disableSearch && (
				<SearchContainer>
					<AllButton onClick={() => setSearchedToken("")}>All</AllButton>
					<SearchInputWrapper>
						<SearchInput
							placeholder="Search Vault"
							value={searchedToken}
							onChange={handleChangeSearchToken}
						/>
						<SearchIcon className="fa fa-search" />
					</SearchInputWrapper>
				</SearchContainer>
			)}
			<PriceStatisticItem first>
				<PriceStatisticContent>
					<Span>#</Span>
				</PriceStatisticContent>
				<PriceStatisticContent>
					<Span>Coin</Span>
				</PriceStatisticContent>
				<PriceStatisticContent>
					<Span>Price</Span>
				</PriceStatisticContent>
				<PriceStatisticContent>
					<Span>1h</Span>
				</PriceStatisticContent>
				<PriceStatisticContent>
					<Span>24h</Span>
				</PriceStatisticContent>
				<PriceStatisticContent>
					<Span>7d</Span>
				</PriceStatisticContent>
			</PriceStatisticItem>
			{(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
				(key, index, arr) => {
					const denom = TokenType[key];
					const tokenPrice = tokenPrices[denom];
					if (
						!searchedToken ||
						`${key} ${TokenFullName[denom]}`
							.toLowerCase()
							.indexOf(searchedToken.toLowerCase()) > -1
					) {
						const currentPrice =
							tokenPrice?.market_data?.current_price?.usd || 0;
						const priceChange1h =
							tokenPrice?.market_data?.price_change_percentage_1h_in_currency?.usd?.toFixed(
								2
							) || 0;
						const priceChange24h =
							tokenPrice?.market_data?.price_change_percentage_24h_in_currency?.usd?.toFixed(
								2
							) || 0;
						const priceChange7d =
							tokenPrice?.market_data?.price_change_percentage_7d_in_currency?.usd?.toFixed(
								2
							) || 0;
						return (
							<PriceStatisticItem key={denom} last={index === arr.length - 1}>
								<PriceStatisticContent>
									<CoinImage
										coinType={denom}
										onClick={() => setSearchedToken(key)}
									/>
								</PriceStatisticContent>
								<PriceStatisticContent>
									<TokenName>
										<Span>{`(${key})`}</Span>
										<Span>{TokenFullName[denom]}</Span>
									</TokenName>
								</PriceStatisticContent>
								<PriceStatisticContent>
									<Span>{`$${currentPrice}`}</Span>
								</PriceStatisticContent>
								<PriceStatisticContent>
									<Span
										color={priceChange1h < 0 ? "#FF4842" : "#35cb00"}
									>{`${priceChange1h}%`}</Span>
								</PriceStatisticContent>
								<PriceStatisticContent>
									<Span
										color={priceChange24h < 0 ? "#FF4842" : "#35cb00"}
									>{`${priceChange24h}%`}</Span>
								</PriceStatisticContent>
								<PriceStatisticContent>
									<Span
										color={priceChange7d < 0 ? "#FF4842" : "#35cb00"}
									>{`${priceChange7d}%`}</Span>
								</PriceStatisticContent>
							</PriceStatisticItem>
						);
					} else {
						return null;
					}
				}
			)}
		</PriceStatisticContainer>
	);
};

export default PriceTable;
