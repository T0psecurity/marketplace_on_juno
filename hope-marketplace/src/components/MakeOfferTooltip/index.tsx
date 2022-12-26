import React, { useState } from "react";
import ReactSelect, { ControlProps } from "react-select";
import { useAppSelector } from "../../app/hooks";
import { MarketplaceInfo } from "../../constants/Collections";
import useHandleNftItem from "../../hook/useHandleNftItem";
import { TokenStatus, TokenType } from "../../types/tokens";
import { CalendarIcon, OfferIcon } from "../SvgIcons";
import ToolTip from "../ToolTip";
import {
	BalanceItem,
	CoinIcon,
	CoinIconWrapper,
	CustomExpirationControl,
	ExpirationWrapper,
	HoperLogo,
	MakeOfferButton,
	PriceInputer,
	PriceInputerWrapper,
	SelectedTokenItem,
	TokenTypeContainer,
	TokenTypeItem,
	TokenTypesContainer,
	TooltipContainer,
	Wrapper,
	StyledText as Text,
} from "./styled";

interface MakeOfferTooltipProps {
	id: string;
	nftItem?: any;
	collection: MarketplaceInfo;
}

const DropdownIndicator = ({ ...props }) => (
	<svg
		width="21"
		height="19"
		viewBox="0 0 21 19"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M8.52075 18.2985C8.41925 18.1911 7.98525 17.7858 7.62825 17.4082C5.383 15.1944 1.708 9.41948 0.58625 6.39688C0.406 5.93785 0.0245 4.7773 0 4.15723C0 3.56308 0.126 2.99669 0.3815 2.45621C0.7385 1.78246 1.30025 1.24199 1.9635 0.945835C2.42375 0.755188 3.801 0.459036 3.8255 0.459036C5.33225 0.162884 7.7805 0 10.486 0C13.0638 0 15.4122 0.162884 16.9417 0.405358C16.9662 0.433122 18.6778 0.729274 19.264 1.05319C20.335 1.64735 21 2.80789 21 4.04988V4.15723C20.9738 4.9661 20.3087 6.66712 20.2842 6.66712C19.1607 9.52684 15.666 15.1685 13.3438 17.4359C13.3438 17.4359 12.747 18.0745 12.3743 18.3522C11.8388 18.7853 11.1755 19 10.5122 19C9.772 19 9.0825 18.7575 8.52075 18.2985Z"
			fill="black"
		/>
	</svg>
);

const ExpirationOptions = [
	{
		value: 1,
		label: "1 Day",
	},
	{
		value: 7,
		label: "7 Days",
	},
	{
		value: 15,
		label: "15 Days",
	},
	{
		value: 30,
		label: "1 Month",
	},
	{
		value: 60,
		label: "2 Months",
	},
	{
		value: 180,
		label: "6 Months",
	},
];

const MakeOfferTooltip: React.FC<MakeOfferTooltipProps> = ({
	id,
	nftItem,
	collection,
}) => {
	const [selectedTokenType, setSelectedTokenType] = useState({
		denom: TokenType.JUNO,
		title: "JUNO",
	});
	const [isOpenTokenTypes, setIsOpenTokenTypes] = useState(false);
	const [offerPrice, setOfferPrice] = useState(0);
	const [expirationDate, setExpirationDate] = useState(ExpirationOptions[3]);
	const balances = useAppSelector((state) => state.balances);
	const tokenPrices = useAppSelector((state) => state.tokenPrices);

	const { makeOfferToNft, makeOfferToCollection } = useHandleNftItem();

	const handleSelectTokenType = (token: any) => {
		setSelectedTokenType(token);
		setIsOpenTokenTypes(false);
	};

	const handleChangeOfferPrice = (e: any) => {
		const { value } = e.target;
		if (!Number.isNaN(Number(value))) {
			setOfferPrice(value);
		}
	};

	const handleMakeOffer = async () => {
		const expiration =
			(Number(new Date()) + expirationDate.value * 24 * 3600 * 1000) * 1e6;
		if (nftItem) {
			await makeOfferToNft(
				nftItem,
				offerPrice,
				selectedTokenType.denom,
				expiration
			);
		} else {
			await makeOfferToCollection(
				collection.collectionId,
				offerPrice,
				selectedTokenType.denom,
				expiration
			);
		}
	};

	const TokenBalanceItem = ({ token }: { token: keyof typeof TokenType }) => {
		const denom = TokenType[token];
		const tokenBalance = (balances?.[denom]?.amount || 0) / 1e6;
		const tokenPrice = tokenPrices[denom]?.market_data.current_price?.usd || 0;
		return (
			<TokenTypeItem
				key={denom}
				onClick={() => handleSelectTokenType({ denom, title: token })}
			>
				<CoinIconWrapper>
					<CoinIcon
						alt=""
						src={`/coin-images/${denom.replace(/\//g, "")}.png`}
					/>
					<Text>{token}</Text>
				</CoinIconWrapper>
				<BalanceItem>
					<Text>
						{tokenBalance.toLocaleString("en-US", {
							maximumFractionDigits: 3,
						})}
					</Text>
					<Text fontSize="0.6em">
						{`${(tokenBalance * tokenPrice).toLocaleString("en-US", {
							maximumFractionDigits: 3,
						})}$`}
					</Text>
				</BalanceItem>
			</TokenTypeItem>
		);
	};

	const CustomAuctionPeriodControlItem = ({
		children,
		...props
	}: ControlProps<any, false>) => {
		return (
			<CustomExpirationControl>
				<CalendarIcon width={20} />
				{children}
			</CustomExpirationControl>
		);
	};

	return (
		<Wrapper>
			<ToolTip
				id={id}
				place="top"
				effect="solid"
				arrowColor="#02e296"
				clickable
			>
				<TooltipContainer>
					<HoperLogo />
					<Text>{`Make an offer to this ${
						!!nftItem ? "NFT" : "Collection"
					}`}</Text>
					<Text bold>{collection.title}</Text>
					<TokenTypeContainer>
						<SelectedTokenItem>
							<CoinIcon
								alt=""
								src={`/coin-images/${selectedTokenType.denom.replace(
									/\//g,
									""
								)}.png`}
							/>
							<Text bold margin="0 20px 0 0">
								{selectedTokenType.title}
							</Text>
							<DropdownIndicator
								style={{ cursor: "pointer" }}
								onClick={() => setIsOpenTokenTypes((prev) => !prev)}
							/>
						</SelectedTokenItem>
						{isOpenTokenTypes && (
							<TokenTypesContainer>
								<Text>JUNO Chain Assets</Text>
								{(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
									(key) => {
										const denom = TokenType[key];
										const tokenStatus = TokenStatus[denom];
										if (tokenStatus.isIBCCoin) return null;
										return <TokenBalanceItem key={key} token={key} />;
									}
								)}
								<Text margin="10px 0 0 0">IBC Assets</Text>
								{(Object.keys(TokenType) as Array<keyof typeof TokenType>).map(
									(key) => {
										const denom = TokenType[key];
										const tokenStatus = TokenStatus[denom];
										if (!tokenStatus.isIBCCoin) return null;
										return <TokenBalanceItem token={key} />;
									}
								)}
							</TokenTypesContainer>
						)}
					</TokenTypeContainer>
					<PriceInputerWrapper>
						<PriceInputer
							hasError={
								Number(offerPrice) >
								(balances?.[selectedTokenType.denom]?.amount || 0) / 1e6
							}
							value={offerPrice}
							onChange={handleChangeOfferPrice}
						/>
						<Text
							onClick={() =>
								setOfferPrice(
									(balances?.[selectedTokenType.denom]?.amount || 0) / 1e6
								)
							}
							style={{
								color: "#9f9f9f",
								cursor: "pointer",
								position: "absolute",
								transform: "translate(-50%)",
								left: "50%",
								bottom: 0,
								fontSize: "14px",
							}}
						>
							Maximum Price
						</Text>
					</PriceInputerWrapper>
					<ExpirationWrapper>
						<Text>Expiration Date</Text>
						<ReactSelect
							value={expirationDate}
							onChange={(value: any) => setExpirationDate(value)}
							options={ExpirationOptions}
							styles={{
								dropdownIndicator: (provided, state) => ({
									...provided,
									padding: 0,
									color: "#02e296",
								}),
								indicatorSeparator: (provided, state) => ({
									...provided,
									backgroundColor: "#02e296",
								}),
								valueContainer: (provided, state) => ({
									...provided,
									// height: 10,
									padding: 0,
								}),
								control: (provided, state) => ({
									...provided,
									borderColor: "#02e296 !important",
									borderRadius: 10,
								}),
								menu: (provided, state) => ({
									...provided,
									backgroundColor: "white",
								}),
								option: (provided, state) => ({
									...provided,
									color: "black",
								}),
							}}
							components={{
								Control: CustomAuctionPeriodControlItem,
							}}
						/>
					</ExpirationWrapper>
					<MakeOfferButton onClick={handleMakeOffer}>
						<OfferIcon width={20} />
						Make Offer
					</MakeOfferButton>
				</TooltipContainer>
			</ToolTip>
		</Wrapper>
	);
};

export default MakeOfferTooltip;
