import React, { useContext, useState } from "react";
import { saveAs } from "file-saver";
import { useAppSelector } from "../../app/hooks";
import { CollectionStateType } from "../../features/collections/collectionsSlice";
import useHandleNftItem from "../../hook/useHandleNftItem";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import Image from "../Image";
import {
	DetailContent,
	// DetailTitle,
	MintVideoContainer,
	NFTDetailContainer,
	Wrapper,
	NFTItemImageDownloadIcon,
	// NFTItemImage,
	NFTItemOperationButton,
	NFTItemOperationContainer,
	NFTItemPriceType,
	CoinIcon,
	MainPriceContainer,
	UsdPriceContainer,
	Text,
	NFTItemDescription,
	NFTItemDescriptionHeader,
	NFTItemDescriptionContent,
	SelectItem,
	StatisticIcon,
	SelectItemTitle,
	SelectItemContent,
	StatisticValue,
	CustomControl,
	FloorPriceContainer,
	TokenImageWrapper,
	RarityRankContainer,
	SocialLinkContainer,
	SocialLinkIcon,
	TooltipContainer,
	StyledInfoIcon,
	SelectTokenItem,
	// CustomAuctionPeriodControl,
} from "./styled";
import ReactSelect, { ControlProps } from "react-select";
import { TokenType } from "../../types/tokens";
import {
	CollectionIds,
	getCollectionById,
	SocialLinks,
} from "../../constants/Collections";
import { ThemeContext } from "../../context/ThemeContext";
import { NFTItemPricePanel } from "./styled";
import {
	// CalendarIcon,
	DescriptionIcon,
	OfferIcon,
	TransferIcon,
	WalletIcon,
} from "../SvgIcons";
import useStatistic from "../../pages/Marketplace/hook/useStatistic";
import { useHistory } from "react-router-dom";
import { DiscordIcon, GlobeIcon, ShareIcon, TwitterIcon } from "../Icons";
import ReactTooltip from "react-tooltip";
import MakeOfferTooltip from "../MakeOfferTooltip";
import NFTItemPriceInputer from "./NFTItemPriceInputer";

interface NFTItemDetailProps {
	item?: any;
}

const getTokenIdNumber = (id: string): string => {
	if (!id) return "";
	return id.split(".").pop() || "";
};

const SocialIcons = [
	{ Icon: ShareIcon, link: "" },
	{
		Icon: GlobeIcon,
		link: "website",
		backgroundColor: "#00ff00",
	},
	{
		Icon: TwitterIcon,
		link: "twitter",
		backgroundColor: "#1da1f2",
	},
	{
		Icon: DiscordIcon,
		link: "discord",
		backgroundColor: "#7591ff",
	},
];

const SelectOptions = (
	Object.keys(TokenType) as Array<keyof typeof TokenType>
).map((key) => {
	return {
		value: TokenType[key],
		text: key,
	};
});

// const AuctionPeriodOptions = [
//   {
//     value: 30,
//     label: "1 month",
//   },
//   {
//     value: 7,
//     label: "7 days",
//   },
//   {
//     value: 1,
//     label: "1 day",
//   },
// ];

const NFTItemDetail: React.FC<NFTItemDetailProps> = ({ item }) => {
	const { isDark } = useContext(ThemeContext);
	const { sellNft, withdrawNft, buyNft, transferNft } = useHandleNftItem();
	const { isXs, isSm, isMd } = useMatchBreakpoints();
	const isMobile = isXs || isSm || isMd;
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	const tokenPrices = useAppSelector((state) => state.tokenPrices);
	const collectionState: CollectionStateType = useAppSelector(
		(state: any) => state.collectionStates[item.collectionId]
	);
	const rarityRanks = useAppSelector(
		(state) =>
			state.rarityRank[item.collectionId as CollectionIds]?.[
				Number(getTokenIdNumber(item.token_id))
			]
	);
	const [nftPrice, setNftPrice] = useState("");
	const [transferAdd, setTransferAdd] = useState("");
	const [nftPriceType, setNftPriceType] = useState<any>();
	const [selectValue, setSelectValue] = useState(SelectOptions[0]);
	// const [auctionPeriod, setAuctionPeriod] = useState(AuctionPeriodOptions[0]);
	const statistics: any = useStatistic(item.collectionId);
	const history = useHistory();

	const targetCollection = getCollectionById(item.collectionId);
	const owner = item.seller || account?.address || "";
	const price = item.list_price || {};
	const tokenPrice =
		tokenPrices[price.denom as TokenType]?.market_data.current_price?.usd || 0;

	let url = "";
	if (item.collectionId === "mintpass1") {
		url = "/others/mint_pass.png";
	} else if (item.collectionId === "mintpass2") {
		url = "/others/mint_pass2.png";
	} else if (item.collectionId === "hopegalaxy1") {
		url = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
			item.token_id
		)}.png`;
	} else if (collectionState?.imageUrl) {
		url = `${collectionState.imageUrl}${getTokenIdNumber(item.token_id)}.png`;
	}

	const downloadImage = () => {
		saveAs(url, item.token_id);
	};

	const status = item.seller
		? item.seller === account?.address
			? "Withdraw"
			: "Buy"
		: "Sell";

	const handleNFTItem = async () => {
		if (status === "Sell") {
			// const expire =
			//   (Number(new Date()) + auctionPeriod.value * 24 * 3600 * 1000) * 1e6;
			await sellNft(item, nftPrice, nftPriceType.value, 0);
		} else if (status === "Withdraw") {
			await withdrawNft(item);
		} else if (status === "Buy") {
			await buyNft(item);
		}
	};

	const handleChangeNFTPrice = (e: any) => {
		const { value } = e.target;
		setNftPrice(value);
		// if (!isNaN(Number(value))) setNftPrice(Number(value));
	};

	// const handleChangePriceType = (e: any) => {
	//   const { value } = e.target;
	//   setNftPriceType(value);

	// };
	const handleChangePriceType = (item: any) => {
		setNftPriceType(item);
	};

	const handleChangeTransferAdd = (e: any) => {
		const { value } = e.target;
		setTransferAdd(value);
	};

	const handleTransferNFT = async () => {
		await transferNft(transferAdd, item, "/profile");
	};

	const CustomSelectItem = ({ ...props }) => {
		const { selectOption, option } = props;
		return (
			<SelectItem
				onClick={() => {
					if (selectOption) selectOption(option);
				}}
				checked={option.value === selectValue.value}
			>
				<StatisticIcon
					alt=""
					src={`/coin-images/${option.value.replace(/\//g, "")}.png`}
				/>
				<SelectItemTitle>
					<SelectItemContent>{option.text}</SelectItemContent>
					<SelectItemContent>Floor Price</SelectItemContent>
				</SelectItemTitle>
				<StatisticValue>
					{statistics[`${option.value}FloorPrice`] || "X"}
				</StatisticValue>
			</SelectItem>
		);
	};

	const CustomMenuList = (props: any) => {
		const { options, selectOption } = props;
		return options.map((option: any, index: number) => (
			<CustomSelectItem
				key={index}
				selectOption={selectOption}
				option={option}
			/>
		));
	};

	const CustomControlItem = ({
		children,
		...props
	}: ControlProps<any, false>) => {
		return (
			<CustomControl>
				<CustomSelectItem option={selectValue} />
				{children}
			</CustomControl>
		);
	};

	const CustomTokenSelectItem = ({ ...props }) => {
		const { selectOption, option } = props;
		if (!option) return null;
		return (
			<SelectTokenItem
				onClick={() => {
					if (selectOption) selectOption(option);
				}}
				checked={option.value === nftPriceType?.value}
			>
				<StatisticIcon
					alt=""
					src={`/coin-images/${option.value.replace(/\//g, "")}.png`}
				/>
				<SelectItemContent>{option.text}</SelectItemContent>
			</SelectTokenItem>
		);
	};

	const CustomTokenMenuList = (props: any) => {
		const { options, selectOption } = props;
		return options.map((option: any, index: number) => (
			<CustomTokenSelectItem
				key={index}
				selectOption={selectOption}
				option={option}
			/>
		));
	};

	const CustomTokenControlItem = ({
		children,
		...props
	}: ControlProps<any, false>) => {
		return (
			<CustomControl>
				{nftPriceType && (
					<StatisticIcon
						alt=""
						src={`/coin-images/${nftPriceType.value.replace(/\//g, "")}.png`}
					/>
				)}
				{children}
			</CustomControl>
		);
	};

	// const CustomAuctionPeriodControlItem = ({
	//   children,
	//   ...props
	// }: ControlProps<any, false>) => {
	//   return (
	//     <CustomAuctionPeriodControl>
	//       <CalendarIcon />
	//       {children}
	//     </CustomAuctionPeriodControl>
	//   );
	// };

	return (
		<Wrapper isMobile={isMobile}>
			<MintVideoContainer>
				<TokenImageWrapper>
					<Image alt="" src={url} />
					<NFTItemImageDownloadIcon
						onClick={downloadImage}
						width="39"
						height="39"
						viewBox="0 0 39 39"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19.4912 0.00016266C30.0708 -0.0433684 38.8683 8.65621 38.9988 19.1178C39.1341 29.9892 30.5221 38.7986 19.8753 38.9964C9.0119 39.1989 0.205019 30.5343 0.00352952 19.8806C-0.201744 8.96944 8.57297 -0.00456897 19.4912 0.00016266ZM19.4827 3.82805C10.8196 3.82805 3.83372 10.7996 3.82899 19.451C3.82331 28.1061 10.7695 35.0975 19.2926 35.1893C27.9812 35.283 35.1667 28.212 35.161 19.6175C35.1544 10.8025 28.2376 3.82805 19.4827 3.82805Z"
							fill="#02e296"
						/>
						<path
							d="M19.1876 28.9908C17.1557 28.9908 15.1228 28.9804 13.0909 28.9994C12.6482 29.0031 12.4571 28.8801 12.4845 28.4155C12.5148 27.913 12.5129 27.4058 12.4845 26.9032C12.459 26.4528 12.6245 26.2919 13.0814 26.2967C14.7983 26.3156 16.5153 26.3042 18.2331 26.3033C18.375 26.3033 18.5169 26.308 18.6578 26.2985C18.7619 26.2919 18.901 26.3279 18.9464 26.1982C18.9908 26.0724 18.8603 26.009 18.7912 25.9304C18.708 25.8358 18.6143 25.7506 18.5254 25.6617C16.3866 23.522 14.2478 21.3824 12.1109 19.2408C12.0257 19.1547 11.8659 19.079 11.9046 18.9484C11.9557 18.7762 12.143 18.8349 12.2745 18.8339C12.9679 18.8273 13.6613 18.8122 14.3537 18.8358C14.786 18.85 14.9185 18.6891 14.9156 18.2586C14.8996 15.5322 14.9071 12.8058 14.9081 10.0795C14.9081 9.44447 14.9109 9.44069 15.5239 9.44069C17.9815 9.4388 20.4391 9.4388 22.8967 9.44069C23.5106 9.44069 23.5125 9.44542 23.5135 10.0785C23.5144 12.7888 23.5248 15.5 23.504 18.2103C23.5002 18.6816 23.6336 18.8604 24.1141 18.8377C24.7905 18.8065 25.4688 18.8273 26.1461 18.8339C26.2775 18.8349 26.4648 18.7762 26.5169 18.9475C26.5566 19.0781 26.3939 19.1519 26.3107 19.2408C26.1375 19.4244 25.9559 19.5986 25.7771 19.7774C23.8162 21.7391 21.8542 23.698 19.898 25.6645C19.7381 25.8254 19.4061 25.9834 19.495 26.1878C19.5981 26.4263 19.9472 26.2976 20.1865 26.2985C21.8722 26.308 23.5579 26.3023 25.2436 26.3042C25.9181 26.3052 25.9266 26.3165 25.9294 26.996C25.9313 27.4843 25.9105 27.9745 25.9342 28.4618C25.955 28.8811 25.7828 29.0013 25.3779 28.9984C23.3148 28.9823 21.2517 28.9908 19.1876 28.9908Z"
							fill="#02e296"
						/>
					</NFTItemImageDownloadIcon>
				</TokenImageWrapper>
				<NFTItemDescription>
					<NFTItemDescriptionHeader>
						<DescriptionIcon width={30} height={30} /> Description
					</NFTItemDescriptionHeader>
					<NFTItemDescriptionContent>
						{targetCollection.description}
					</NFTItemDescriptionContent>
				</NFTItemDescription>
			</MintVideoContainer>
			<NFTDetailContainer>
				<Text
					fontSize="28px"
					bold
					cursor="pointer"
					onClick={() =>
						history.push(`/collections/marketplace?id=${item.collectionId}`)
					}
				>
					{targetCollection.title}
				</Text>
				<Text margin="10px 0 15px">
					<Text>created by</Text>
					<Text color="#0057FF" margin="0 5px">
						{targetCollection.creator}
					</Text>
				</Text>
				<Text fontSize="28px" color="#02e296" bold>
					{item.token_id_display || item.token_id || ""}
				</Text>
				<Text margin="10px 0 15px" overflowWrap="anywhere">{`Owned: ${owner}${
					account?.address === owner ? " (YOU)" : ""
				}`}</Text>

				<RarityRankContainer>
					<Text margin="30px 0">
						<Text>Rarity Rank:</Text>
						{rarityRanks && (
							<Text
								margin="0 5px"
								color="#02e296"
							>{`#${rarityRanks.rank}`}</Text>
						)}
					</Text>
					<SocialLinkContainer>
						{SocialIcons.map((socialIcon, index) => (
							<SocialLinkIcon
								key={index}
								backgroundColor={socialIcon.backgroundColor}
								onClick={() =>
									window.open(
										targetCollection.socialLinks[
											socialIcon.link as keyof SocialLinks
										]
									)
								}
							>
								{socialIcon.Icon}
							</SocialLinkIcon>
						))}
					</SocialLinkContainer>
				</RarityRankContainer>
				<NFTItemPricePanel>
					<StyledInfoIcon data-for="tooltip" data-tip width={30} height={30} />
					{status !== "Sell" && (
						<>
							<Text margin="0 0 30px 0">Current Price: </Text>
							<DetailContent>
								<CoinIcon
									alt=""
									src={`/coin-images/${price.denom.replace(/\//g, "")}.png`}
								/>
								<MainPriceContainer>{`${+(price?.amount || 0) / 1e6} ${
									price.denom
										? `${(
												Object.keys(TokenType) as Array<keyof typeof TokenType>
										  )
												.filter((x) => TokenType[x] === price.denom)[0]
												?.toUpperCase()}`
										: ""
								}`}</MainPriceContainer>
								<UsdPriceContainer>
									{tokenPrice &&
										`(${((+(price?.amount || 0) / 1e6) * tokenPrice).toFixed(
											2
										)}$)`}
								</UsdPriceContainer>
							</DetailContent>
						</>
					)}
					{/* {status === "Sell" && (
            <Text
              style={{
                justifyContent: "center",
                gap: "10px",
                cursor: "pointer",
              }}
              color="#02e296"
            >
              Type
              <InfoIcon data-for="tooltip" data-tip width={30} height={30} />
            </Text>
          )} */}
					{status === "Sell" && (
						<>
							<div style={{ display: "flex" }}>
								<NFTItemPriceType>
									<ReactSelect
										onChange={handleChangePriceType}
										options={SelectOptions.map((option) => ({
											...option,
											label: option.text,
										}))}
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
											container: (provided, state) => ({
												...provided,
												// margin: "5px 10px",
												height: "100%",
												minWidth: 100,
											}),
											control: (provided, state) => ({
												...provided,
												minHeight: "unset",
												height: "100%",
												borderColor: "#02e296 !important",
												borderRadius: 10,
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
										components={{
											MenuList: CustomTokenMenuList,
											Control: CustomTokenControlItem,
										}}
									/>
								</NFTItemPriceType>
								<NFTItemPriceInputer
									placeholder="Maximum Price"
									width="200px"
									key={item.token_id || "maximum price inputer"}
									value={nftPrice}
									onChange={handleChangeNFTPrice}
								/>
								{/* <ReactSelect
                  value={auctionPeriod}
                  onChange={(value: any) => setAuctionPeriod(value)}
                  options={AuctionPeriodOptions}
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
                    container: (provided, state) => ({
                      ...provided,
                      // margin: "5px 10px",
                      height: "100%",
                      minWidth: 100,
                    }),
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: "unset",
                      height: "100%",
                      borderColor: "#02e296 !important",
                      borderRadius: 10,
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
                  components={{
                    Control: CustomAuctionPeriodControlItem,
                  }}
                /> */}
							</div>
						</>
					)}
					<NFTItemOperationContainer>
						{status !== "Sell" && (
							<NFTItemOperationButton onClick={handleNFTItem}>
								<WalletIcon width={30} height={30} /> {status} Now
							</NFTItemOperationButton>
						)}
						{status === "Sell" && (
							<>
								<NFTItemOperationButton colored onClick={handleNFTItem}>
									<WalletIcon width={30} height={30} /> Sell
								</NFTItemOperationButton>
							</>
						)}
						{status === "Buy" && (
							<NFTItemOperationButton
								colored
								data-for="makeOfferTooltip"
								data-tip
								data-event="click focus"
							>
								<OfferIcon width={30} height={30} /> Make Offer
							</NFTItemOperationButton>
						)}
					</NFTItemOperationContainer>
					{status === "Sell" && (
						<NFTItemOperationContainer hasDivider justifyContent="center">
							<NFTItemPriceInputer
								key="transfer target wallet address"
								placeholder="Destination Wallet"
								width="270px"
								value={transferAdd}
								onChange={handleChangeTransferAdd}
							/>
							<NFTItemOperationButton colored onClick={handleTransferNFT}>
								<TransferIcon width={30} height={30} fill="#2e7b31" /> Transfer
							</NFTItemOperationButton>
						</NFTItemOperationContainer>
					)}
				</NFTItemPricePanel>

				<FloorPriceContainer>
					<ReactSelect
						value={selectValue}
						onChange={(value: any) => setSelectValue(value)}
						options={SelectOptions}
						styles={{
							container: (provided, state) => ({
								...provided,
								margin: "5px 10px",
								minWidth: 100,
								border: "1px solid black",
								borderRadius: "5px",
							}),
							dropdownIndicator: (provided, state) => ({
								...provided,
								color: "black",
							}),
							menu: (provided, state) => ({
								...provided,
								backgroundColor: isDark ? "#838383" : "white",
								zIndex: 10,
							}),
						}}
						components={{
							MenuList: CustomMenuList,
							Control: CustomControlItem,
						}}
					/>
				</FloorPriceContainer>
			</NFTDetailContainer>
			<ReactTooltip
				id="tooltip"
				place="left"
				effect="float"
				arrowColor="#02e296"
			>
				<TooltipContainer>
					By accept <span style={{ fontWeight: "bold" }}>SELL</span> conditions,
					you choose a maximum price, and buyers can make offers. <br /> The
					seller can choose to{" "}
					<span style={{ fontWeight: "bold" }}>accept</span> it at any time, but
					the buyer will need the funds to create a{" "}
					<span style={{ fontWeight: "bold" }}>BID</span>. <br /> Making a bid
					on this kind of action is like making an offer on a fixed-price
					listing.
				</TooltipContainer>
			</ReactTooltip>
			<MakeOfferTooltip
				id="makeOfferTooltip"
				nftItem={item}
				collection={targetCollection}
			/>
		</Wrapper>
	);
};

export default NFTItemDetail;
