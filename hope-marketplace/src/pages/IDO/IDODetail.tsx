import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IDOIds, getIDOById } from "../../constants/IDOs";
import useIDOStatus from "./useIDOStatus";
import {
	Button,
	DetailHeader,
	DetailTitle,
	Flex,
	IDODetailWrapper as Wrapper,
	IDOItemSocialLinkContainer,
	PresaleStatus,
	ProgressBar,
	ProjectDetail,
	ProjectDetailContent,
	ProjectDetailContentTable,
	ProjectDetailContentTableRow,
	ProjectDetailHeader,
	ProjectDetailTitle,
	StatusContent,
	TokenLogo,
	VestingDetailClaimed,
	VestingDetailContainer,
	VestingDetailItem,
	VestingPeriodItem,
} from "./styled";
import Text from "../../components/Text";
import { FilterButtonOptions, AvailableTokens, PresaleState } from "./type";
import {
	ArrowLeftIcon,
	DiscordIcon,
	GlobeIcon,
	ListIcon,
	TwitterIcon,
} from "../../components/SvgIcons";
import moment from "moment";
import useContract from "../../hook/useContract";
import { useAppSelector } from "../../app/hooks";
import SwapAmountInput from "./SwapAmountInput";
import CountDown from "../../components/CountDown";
import { toast } from "react-toastify";
import useWindowSize from "../../hook/useWindowSize";

const VestingPeriods = [
	{
		period: "IDO end",
		amount: "10%,",
	},
	{
		period: "30 Days",
		amount: "15%,",
	},
	{
		period: "60 Days",
		amount: "15%,",
	},
	{
		period: "90 Days",
		amount: "15%,",
	},
	{
		period: "120 Days",
		amount: "15%,",
	},
	{
		period: "150 Days",
		amount: "15%,",
	},
	{
		period: "180 Days",
		amount: "15%,",
	},
];

const IDODetail: React.FC = () => {
	const [userInfo, setUserInfo] = useState<{
		totalClaimAmount: number;
		claimedAmount: number;
		claimableAmount: number;
		claimedPercent: string;
		claimablePercent: string;
		claimableTime: Date | null;
	}>({
		totalClaimAmount: 0,
		claimedAmount: 0,
		claimableAmount: 0,
		claimedPercent: "0%",
		claimablePercent: "0%",
		claimableTime: null,
	});
	const { search } = useLocation();
	const { isMobile } = useWindowSize();
	const history = useHistory();
	const idoId = new URLSearchParams(search).get("id") as IDOIds;

	const idoInfo = getIDOById(idoId);

	const account = useAppSelector((state) => state?.accounts.keplrAccount);
	const { idoStatus } = useIDOStatus(idoId);
	const { runQuery, runExecute } = useContract();

	const fetchUserInfo = useCallback(async () => {
		if (!idoInfo?.contract || !account) return;
		const userInfoResult = await runQuery(idoInfo.contract, {
			get_user_info: {
				address: account.address,
			},
		});
		const claimableAmountResult = await runQuery(idoInfo.contract, {
			get_claimable_amount: {
				address: account.address,
			},
		});
		const claimableTimeResult = await runQuery(idoInfo.contract, {
			get_claimable_time: {
				address: account.address,
			},
		});
		const totalClaimAmount =
			Number(userInfoResult.user_info?.total_claim_amount || 0) / 1e6;
		const claimedAmount =
			Number(userInfoResult.user_info?.claimed_amount || 0) / 1e6;
		const claimedPercent = (claimedAmount / totalClaimAmount) * 100;
		const claimableAmount = Number(claimableAmountResult || 0) / 1e6;
		const claimablePercent = (claimableAmount / totalClaimAmount) * 100;
		setUserInfo({
			totalClaimAmount,
			claimedAmount,
			claimableAmount,
			claimedPercent:
				claimedPercent.toLocaleString("en-Us", {
					maximumFractionDigits: 2,
				}) + "%",
			claimablePercent:
				claimablePercent.toLocaleString("en-Us", {
					maximumFractionDigits: 2,
				}) + "%",
			claimableTime: claimableTimeResult.claimable_time
				? new Date(claimableTimeResult.claimable_time * 1000)
				: null,
		});
	}, [account, idoInfo.contract, runQuery]);

	useEffect(() => {
		if (idoInfo.contract && account) {
			fetchUserInfo();
		}
	}, [account, fetchUserInfo, idoInfo.contract, runQuery]);

	const handleClaim = async () => {
		if (userInfo.claimableAmount > 0) {
			try {
				await runExecute(idoInfo.contract, {
					claim_token: {},
				});
				toast.success("Claimed Successfully");
				fetchUserInfo();
			} catch (e) {
				toast.error("Claim Failed");
			}
		}
	};

	return (
		<Wrapper>
			<DetailTitle onClick={() => history.push("/ido")}>
				<ArrowLeftIcon height={22} /> IDO
			</DetailTitle>
			<DetailHeader>
				<Flex flexDirection="column" gap="20px" alignItems="flex-start">
					<Text
						style={{ gap: 20 }}
						justifyContent="space-between"
						align-items="center"
						fontSize="20px"
						bold
					>
						{idoInfo.symbol}
						<IDOItemSocialLinkContainer>
							<TwitterIcon height={20} />
							<DiscordIcon height={20} />
							<GlobeIcon height={20} />
							<ListIcon height={20} />
						</IDOItemSocialLinkContainer>
						<PresaleStatus
							backgroundColor={
								FilterButtonOptions[idoStatus.crrState].backgroundColor
							}
						>
							{FilterButtonOptions[idoStatus.crrState].title}
						</PresaleStatus>
					</Text>
					<Text justifyContent="flex-start" textAlign="left">
						{idoInfo.description}
					</Text>
				</Flex>
				<Flex style={{ width: "100%" }} flexDirection="column" gap="20px">
					<Flex gap="20px" justifyContent="space-evenly">
						<StatusContent>
							<Text>{`Status: ${
								FilterButtonOptions[idoStatus.crrState].title
							}`}</Text>
							<Text>{`Presale progress: ${idoStatus.percentageSold}%`}</Text>
							<Text>{`${idoStatus.totalSold} / ${idoStatus.total}`}</Text>
						</StatusContent>
						<TokenLogo
							style={{ height: 100, width: "unset" }}
							src={`/token-logos/${idoInfo.id}.png`}
							alt=""
						/>
					</Flex>
					<ProgressBar value={idoStatus.percentageSold}>
						<Text>{`${idoStatus.percentageSold}%`}</Text>
					</ProgressBar>
				</Flex>
			</DetailHeader>
			<ProjectDetail>
				<ProjectDetailHeader>
					<ProjectDetailTitle>Project Detail</ProjectDetailTitle>
				</ProjectDetailHeader>
				<ProjectDetailContent>
					<Flex width="100%" gap="50px" flexDirection="column">
						<ProjectDetailContentTable>
							<ProjectDetailContentTableRow>
								Pool Information
							</ProjectDetailContentTableRow>
							<ProjectDetailContentTableRow>
								<Text>Opens</Text>
								<Text>{`${moment(idoStatus.startTime).format(
									"YYYY-MM-DD hh:mm:ss"
								)} CEST`}</Text>
							</ProjectDetailContentTableRow>
							<ProjectDetailContentTableRow>
								<Text>Closes</Text>
								<Text>{`${moment(idoStatus.endTime).format(
									"YYYY-MM-DD hh:mm:ss"
								)} CEST`}</Text>
							</ProjectDetailContentTableRow>
							<ProjectDetailContentTableRow>
								<Text>Swap Rate</Text>
								<Flex flexDirection="column" gap="10px">
									{(
										Object.keys(AvailableTokens) as Array<
											keyof typeof AvailableTokens
										>
									).map((key) => (
										<Text
											key={key}
										>{`1 ${AvailableTokens[key].symbol} = ${idoStatus.costs[key]} ${idoInfo.symbol}`}</Text>
									))}
								</Flex>
							</ProjectDetailContentTableRow>
							<ProjectDetailContentTableRow
								style={{ padding: 0, overflowX: "auto" }}
							>
								<Text margin="5px 10px">Vesting Period</Text>
								<Flex gap="0px">
									{VestingPeriods.map((vestingPeriodItem, index) => (
										<VestingPeriodItem key={index}>
											<Text style={{ fontSize: "0.7em" }}>
												{vestingPeriodItem.period}
											</Text>
											<Text>{vestingPeriodItem.amount}</Text>
										</VestingPeriodItem>
									))}
								</Flex>
							</ProjectDetailContentTableRow>
							<ProjectDetailContentTableRow>
								<Text>Access Type</Text>
								<Text>PUBLIC</Text>
							</ProjectDetailContentTableRow>
						</ProjectDetailContentTable>
						{!isMobile && (
							<Flex width="100%" justifyContent="space-between">
								<VestingDetailContainer>
									<VestingDetailItem border>Your Allocation</VestingDetailItem>
									<VestingDetailItem border>Claimable</VestingDetailItem>
									<VestingDetailItem border>Claimed</VestingDetailItem>
									<VestingDetailItem bold>{`${
										userInfo.totalClaimAmount || 0
									} $HOPERS`}</VestingDetailItem>
									<VestingDetailItem bold>
										{userInfo.claimablePercent}
									</VestingDetailItem>
									<VestingDetailClaimed percent={userInfo.claimedPercent} bold>
										<span>{userInfo.claimedPercent}</span>
									</VestingDetailClaimed>
								</VestingDetailContainer>
								<Flex flexDirection="column" gap="10px">
									<Text>Vesting</Text>
									<Button
										background={userInfo.claimableAmount > 0 ? null : "#E20202"}
										color={userInfo.claimableAmount > 0 ? "black" : "white"}
										onClick={handleClaim}
									>
										{userInfo.claimableAmount > 0
											? "Claimable"
											: "Not claimable"}
									</Button>
								</Flex>
							</Flex>
						)}
					</Flex>
					<Flex
						width="100%"
						gap="50px"
						flexDirection="column"
						alignItems="center"
					>
						<ProjectDetailContentTable>
							<ProjectDetailContentTableRow>
								Token Information
							</ProjectDetailContentTableRow>
							<ProjectDetailContentTableRow>
								<Text>Name</Text>
								<Text>{idoInfo.name}</Text>
							</ProjectDetailContentTableRow>
							<ProjectDetailContentTableRow>
								<Text>Token Symbol</Text>
								<Text>{idoInfo.symbol}</Text>
							</ProjectDetailContentTableRow>
							<ProjectDetailContentTableRow>
								<Text>Total Supply</Text>
								<Text>{idoStatus.total}</Text>
							</ProjectDetailContentTableRow>
						</ProjectDetailContentTable>
						<SwapAmountInput idoInfo={idoInfo} buyCallback={fetchUserInfo} />
						<CountDown
							title={
								idoStatus.crrState === PresaleState.BEFORE
									? "Presale starts in"
									: idoStatus.crrState === PresaleState.PRESALE
									? "Presale ends in"
									: ""
							}
							time={
								idoStatus.crrState === PresaleState.BEFORE
									? idoStatus.startTime
									: idoStatus.endTime
							}
							completedString="Presale ended"
						/>
					</Flex>
					{isMobile && (
						<Flex
							width="100%"
							justifyContent="space-between"
							flexDirection="column"
							gap="30px"
						>
							<VestingDetailContainer>
								<VestingDetailItem border>Your Allocation</VestingDetailItem>
								<VestingDetailItem border>Claimable</VestingDetailItem>
								<VestingDetailItem border>Claimed</VestingDetailItem>
								<VestingDetailItem bold>{`${
									userInfo.totalClaimAmount || 0
								} $HOPERS`}</VestingDetailItem>
								<VestingDetailItem bold>
									{userInfo.claimablePercent}
								</VestingDetailItem>
								<VestingDetailClaimed percent={userInfo.claimedPercent} bold>
									<span>{userInfo.claimedPercent}</span>
								</VestingDetailClaimed>
							</VestingDetailContainer>
							<Flex flexDirection="column" gap="10px">
								<Text>Vesting</Text>
								<Button
									background={userInfo.claimableAmount > 0 ? null : "#02E296"}
									color={userInfo.claimableAmount > 0 ? "black" : "white"}
									onClick={handleClaim}
								>
									{userInfo.claimableAmount > 0 ? "Claimable" : "Not claimable"}
								</Button>
							</Flex>
						</Flex>
					)}
				</ProjectDetailContent>
			</ProjectDetail>
		</Wrapper>
	);
};

export default IDODetail;
