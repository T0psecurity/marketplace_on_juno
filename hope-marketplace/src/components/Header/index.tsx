import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Collections from "../../constants/Collections";
// import { useKeplr } from "../../features/accounts/useKeplr";
import { setNFTs } from "../../features/nfts/nftsSlice";
import {
	AccountType,
	setKeplrAccount,
} from "../../features/accounts/accountsSlice";
// import useContract from "../../hook/useContract";
import useOnClickOutside from "../../hook/useOnClickOutside";
import useWindowSize from "../../hook/useWindowSize";
import {
	DiscordIcon,
	ListIcon,
	MediumIcon,
	TelegramIcon,
	TwitterIcon,
} from "../Icons";
import { MarketplaceInfo } from "../../constants/Collections";
import {
	HeaderWrapper,
	LogoContainer,
	HeaderLogo,
	// HeaderBackToHomeButton,
	ConnectWalletButton,
	DisconnectIcon,
	ButtonContainer,
	LinkButton,
	ProfileIcon,
	MenuIcon,
	MenuIconContainer,
	MenuContainer,
	MenuItem,
	MenuHeader,
	MenuFooter,
	MenuFooterLinkItem,
	// HeaderBackground,
	HorizontalDivider,
	LinkContainer,
	SubMenuContainer,
	WalletTypeModal,
	// Logo,
	Container,
	WalletImage,
	WalletItem,
	Wrapper,
} from "./styled";
import { coin } from "@cosmjs/proto-signing";
import useRefresh from "../../hook/useRefresh";
import { ChainConfigs, ChainTypes } from "../../constants/ChainTypes";
import ToggleThemeButton from "../ToogleThemeButton";
import {
	ActivityMenuIcon,
	EarnIcon,
	ExploreIcon,
	HomeIcon,
	HopersUserIcon,
	// LaunchpadIcon,
	MintIcon,
	NFTMenuIcon,
	ProfileIcon as ProfileMenuIcon,
	SwapIcon,
	WalletIcon,
} from "../SvgIcons";
import HopePriceDisplay from "../HopePriceDisplay";
import { toast } from "react-toastify";
import {
	ConnectedWalletTypeLocalStorageKey,
	WalletType,
} from "../../constants/BasicTypes";
import { CosmostationWalletContext } from "../../context/Wallet";
import Text from "../Text";
import HeaderBanner from "../HeaderBanner";
import {
	DiscordLink,
	MediumLink,
	TelegramLink,
	TwitterLink,
} from "../../constants/SocialLinks";
// import { useCosmodal } from "../../features/accounts/useCosmodal";

const HeaderLinks = [
	{
		title: "Swap",
		icon: SwapIcon,
		url: "/swap",
		selectedUrl: ["/swap", "/liquidity"],
		children: [
			{
				title: "Swap",
				url: "/swap",
				icon: SwapIcon,
			},
			{
				title: "Liquidity",
				url: "/liquidity",
				icon: SwapIcon,
			},
		],
	},
	{
		title: "Earn",
		url: "/bond",
		selectedUrl: ["/bond", "/stake", "/airdrop"],
		icon: EarnIcon,
	},
	{
		title: "NFT",
		url: "/collections/explore",
		icon: NFTMenuIcon,
		selectedUrl: [
			"/collections/explore",
			"/collections/marketplace",
			"/nft/detail",
			"/activity",
		],
		children: [
			{
				title: "Explore",
				url: "/collections/explore",
				icon: NFTMenuIcon,
			},
			{
				title: "Activity",
				url: "/activity",
				icon: ActivityMenuIcon,
			},
		],
	},
	{
		isDivider: true,
	},
	{ title: "Mint", url: "/collections/mint", icon: MintIcon },
	// {
	//   title: "Launchpad",
	//   url: "http://launchpad.hopers.io/",
	//   icon: LaunchpadIcon,
	// },
	{
		title: "IDO",
		url: "/ido",
		icon: ExploreIcon,
		selectedUrl: ["/ido", "/ido/detail"],
	},
];

const SocialIcons = [
	{ Icon: MediumIcon, link: MediumLink },
	{
		Icon: TwitterIcon,
		link: TwitterLink,
	},
	{
		Icon: TelegramIcon,
		link: TelegramLink,
		style: { backgroundColor: "white" },
	},
	{
		Icon: DiscordIcon,
		link: DiscordLink,
	},
];

const Header: React.FC = () => {
	// const [headerHeight, setHeaderHeight] = useState(0);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [openedSubMenu, setOpenedSubMenu] = useState<any>({});
	// const [runningFetch, setRunningFetch] = useState(false);
	const [ref, setRef] = useState<HTMLDivElement | null>(null); // TODO: must use useRef
	const mobileMenuContainer = useRef(null);
	const dispatch = useAppDispatch();
	const account = useAppSelector((state) => state.accounts.keplrAccount);
	const config = ChainConfigs[ChainTypes.JUNO];
	// const { connect } = useKeplr();
	// const { connect: connectWithCosmodal } = useCosmodal();
	const {
		connect: connectKeplr,
		disconnect: disconnectKeplr,
		connectedWallet,
	} = useWalletManager();
	const { connect: connectCosmostation, disconnect: disconnectCosmostation } =
		useContext(CosmostationWalletContext);
	const { pathname } = useLocation();
	const history = useHistory();
	// const { initContracts } = useContract();
	const { refresh } = useRefresh();

	const { isMobile } = useWindowSize(900);

	useEffect(() => {
		refresh();
		// initContracts();
		return () => {
			dispatch(setKeplrAccount());
			Collections.forEach((collection: MarketplaceInfo) =>
				setNFTs([collection.collectionId, []])
			);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!account) {
			Collections.forEach((collection: MarketplaceInfo) =>
				setNFTs([collection.collectionId, []])
			);
		}
	}, [account]);

	useEffect(() => {
		if (!connectedWallet) {
			dispatch(setKeplrAccount());
		} else {
			const { name: label, address } = connectedWallet;
			dispatch(
				setKeplrAccount({
					label,
					address,
					type: AccountType.Keplr,
					balance: coin(0, config["microDenom"]),
				})
			);
		}
	}, [connectedWallet, dispatch, config, refresh]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	// useEffect(() => {
	// 	const headerElement = document.getElementById("header");
	// 	const headerElementHeight = headerElement?.clientHeight || 0;
	// 	if (headerElementHeight !== headerHeight)
	// 		setHeaderHeight(headerElementHeight);
	// });

	const clickWalletButton = (walletType: WalletType | null) => {
		if (!account) {
			if (!walletType) return;
			localStorage.setItem(ConnectedWalletTypeLocalStorageKey, walletType);
			if (walletType === WalletType.KEPLR) {
				connectKeplr();
			} else if (walletType === WalletType.COSMOSTATION) {
				connectCosmostation();
			}
			// connectWithCosmodal();
		} else {
			const ConnectedWalletType = localStorage.getItem(
				ConnectedWalletTypeLocalStorageKey
			);
			localStorage.setItem(ConnectedWalletTypeLocalStorageKey, "");
			if (ConnectedWalletType === (WalletType.COSMOSTATION as string)) {
				disconnectCosmostation();
			} else {
				disconnectKeplr();
			}
		}
	};

	const handleClickLink = (url: string) => {
		if (!url) return;
		if (url === "soon") {
			toast.info("Coming Soon!");
			return;
		}
		setIsOpenMenu(false);
		setOpenedSubMenu({});
		if (url.includes("http:")) {
			window.open(url);
		} else {
			history.push(url);
		}
	};

	const handleToggleSubMenu = (title: string) => {
		setOpenedSubMenu((prev: any) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	const handleClickMenuItem = (menuItem: any) => {
		if (menuItem.children && menuItem.children.length) {
			handleToggleSubMenu(menuItem.title);
		} else {
			handleClickLink(menuItem.url || "/");
		}
	};

	const handleOpenMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};

	const handleClickOutsideMenuIcon = () => {
		setIsOpenMenu(false);
	};

	const openNewUrl = (url: string) => {
		window.open(url);
	};

	useOnClickOutside(ref, handleClickOutsideMenuIcon);

	const ConnectButton = () => (
		<ConnectWalletButton
			onClick={account ? () => clickWalletButton(null) : undefined}
			title={account?.label || ""}
		>
			{account ? (
				<>
					<span>{account.label}</span>
					<DisconnectIcon alt="" src="/others/logout.png" />
				</>
			) : (
				<>
					<WalletIcon width={20} height={15} />
					<span style={{ marginLeft: 5 }}>Connect Wallet</span>
					<WalletTypeModal>
						{/* <Logo /> */}
						<Text bold fontSize="18px">
							Choose Wallet Type
						</Text>
						<Container>
							<WalletItem onClick={() => clickWalletButton(WalletType.KEPLR)}>
								<WalletImage
									src="/wallet-images/keplr-wallet-extension.png"
									alt=""
								/>
								<Text bold fontSize="20px">
									Keplr
								</Text>
							</WalletItem>
							<WalletItem
								onClick={() => clickWalletButton(WalletType.COSMOSTATION)}
							>
								<WalletImage
									src="/wallet-images/cosmostation-wallet-extension.png"
									alt=""
								/>
								<Text bold fontSize="18px">
									Cosmostation
								</Text>
							</WalletItem>
						</Container>
					</WalletTypeModal>
				</>
			)}
		</ConnectWalletButton>
	);

	return (
		<Wrapper>
			{/* <HeaderBackground height={headerHeight} /> */}
			{!isMobile && <HeaderBanner />}
			<HeaderWrapper id="header">
				<LogoContainer>
					<HeaderLogo
						isMobile={isMobile}
						onClick={() => handleClickLink("/")}
					/>
					{/* Hopers.io */}
				</LogoContainer>
				{isMobile ? (
					<MenuIconContainer ref={(node) => setRef(node)}>
						<MenuIcon onClick={handleOpenMenu}>{ListIcon}</MenuIcon>
						{isOpenMenu && (
							<MenuContainer
								ref={mobileMenuContainer}
								onClick={(e) => e.preventDefault()}
							>
								<MenuHeader>
									<ConnectButton />
									<ToggleThemeButton />
								</MenuHeader>
								<HopePriceDisplay />
								<MenuItem onClick={() => handleClickLink("/")}>
									<HomeIcon width={20} height={20} />
									Home
								</MenuItem>
								{HeaderLinks.map((linkItem, linkIndex) =>
									linkItem.isDivider ? null : (
										<>
											<MenuItem
												key={linkIndex}
												onClick={() => handleClickMenuItem(linkItem)}
											>
												{linkItem.icon && (
													<linkItem.icon width={20} height={20} />
												)}
												{linkItem.title}
											</MenuItem>
											{linkItem.children && linkItem.children.length > 0 && (
												<SubMenuContainer
													expanded={openedSubMenu[linkItem.title]}
													loaded={!!mobileMenuContainer?.current}
												>
													{linkItem.children.map(
														(subLinkItem, subLinkIndex) => (
															<MenuItem
																key={`${linkIndex}-${subLinkIndex}`}
																onClick={() => handleClickMenuItem(subLinkItem)}
															>
																{subLinkItem.icon && (
																	<subLinkItem.icon width={20} height={20} />
																)}
																{subLinkItem.title}
															</MenuItem>
														)
													)}
												</SubMenuContainer>
											)}
										</>
									)
								)}
								<MenuItem
									onClick={() => handleClickLink("/profile")}
									lastElement
								>
									<ProfileMenuIcon width={20} height={20} />
									My Profile
								</MenuItem>
								<MenuFooter>
									{SocialIcons.map((icon, index) => (
										<MenuFooterLinkItem
											style={icon.style ?? {}}
											key={index}
											onClick={() => openNewUrl(icon.link)}
										>
											{icon.Icon}
										</MenuFooterLinkItem>
									))}
								</MenuFooter>
							</MenuContainer>
						)}
					</MenuIconContainer>
				) : (
					<ButtonContainer isMobile={isMobile}>
						<LinkContainer>
							{HeaderLinks.map((linkItem, linkIndex) =>
								linkItem.isDivider ? (
									<HorizontalDivider key={linkIndex} />
								) : (
									<LinkButton
										key={linkIndex}
										onClick={() => handleClickLink(linkItem.url || "/")}
										selected={
											linkItem.selectedUrl && linkItem.selectedUrl.length > 0
												? !!linkItem.selectedUrl.reduce(
														(result, crrItem) =>
															result || pathname.includes(crrItem),
														false
												  )
												: pathname === linkItem.url
										}
									>
										{linkItem.title}
									</LinkButton>
								)
							)}
						</LinkContainer>
						<LinkContainer>
							<HopePriceDisplay />
							<div style={{ display: "flex", alignItems: "center" }}>
								{/* <ProfileIcon onClick={() => handleClickLink("/profile")} /> */}
								<ProfileIcon onClick={() => handleClickLink("/profile")}>
									<HopersUserIcon />
								</ProfileIcon>
								<ToggleThemeButton />
								<ConnectButton />
							</div>
						</LinkContainer>
					</ButtonContainer>
				)}
			</HeaderWrapper>
		</Wrapper>
	);
};

export default Header;
