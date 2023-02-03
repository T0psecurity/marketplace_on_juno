import React from "react";
import { useHistory } from "react-router-dom";
import { FilterButtonOptions, PresaleState } from "./type";
import CountDown from "../../components/CountDown";
import {
	DiscordIcon,
	GlobeIcon,
	ListIcon,
	TwitterIcon,
} from "../../components/SvgIcons";
import Text from "../../components/Text";
import { BasicProps } from "../../constants/BasicTypes";
import { IDOInterface } from "../../constants/IDOs";
import SwapAmountInput from "./SwapAmountInput";
import useIDOStatus from "./useIDOStatus";
import useWindowSize from "../../hook/useWindowSize";

import {
	Button,
	ClearDiv,
	IDOItemContent,
	IDOItemHeader,
	IDOItemSocialLinkContainer,
	IDOItemWrapper as Wrapper,
	OtherInfoContainer,
	PresaleStatus,
	RememberMe,
	TokenLogo,
	TokenLogoContainer,
	TokenOperationPanel,
	TokenPercentageSoldValue,
	TokenSoldStatus,
	TokenSoldStatusItem,
} from "./styled";

interface IDOItemProps extends BasicProps {
	idoInfo: IDOInterface;
}

const IDOItem: React.FC<IDOItemProps> = ({ idoInfo }) => {
	const { idoStatus } = useIDOStatus(idoInfo.id);
	// console.log("debug idoStatus: ", idoStatus, idoInfo);
	const history = useHistory();
	const { isMobile } = useWindowSize(600);

	const Logo = () => (
		<TokenLogoContainer>
			<TokenLogo src={`/token-logos/${idoInfo.image}`} alt="" />
			<Button
				color="white"
				onClick={() => history.push(`/ido/detail?id=${idoInfo.id}`)}
			>
				Details
			</Button>
		</TokenLogoContainer>
	);

	const Description = () => (
		<Text justifyContent="flex-start" textAlign="left">
			{idoInfo.description}
		</Text>
	);

	return (
		<Wrapper>
			<IDOItemHeader>
				<Text justifyContent="flex-start" fontSize="20px" bold>
					{`${idoInfo.name} | ${idoInfo.symbol}`}
					<PresaleStatus
						style={{ marginLeft: 10 }}
						backgroundColor={
							FilterButtonOptions[idoStatus.crrState].backgroundColor
						}
					>
						{FilterButtonOptions[idoStatus.crrState].title}
					</PresaleStatus>
				</Text>
				<IDOItemSocialLinkContainer>
					<TwitterIcon height={20} />
					<DiscordIcon height={20} />
					<GlobeIcon height={20} />
					<ListIcon height={20} />
				</IDOItemSocialLinkContainer>
			</IDOItemHeader>
			<IDOItemContent>
				{isMobile ? (
					<>
						<Description />
						<Logo />
					</>
				) : (
					<>
						<Logo />
						<Description />
					</>
				)}
				<TokenOperationPanel>
					<TokenSoldStatus>
						<TokenSoldStatusItem>
							<Text>Number of Tokens in Presale</Text>
							{/* <Text bold>{`${idoStatus.total} ${idoInfo.symbol}`}</Text> */}
							<Text bold>{`${idoStatus.total} ${idoInfo.symbol}`}</Text>
						</TokenSoldStatusItem>
						{!idoInfo.visibleOption?.hideSoldAmount && <TokenSoldStatusItem>
							<Text>Percentage Sold</Text>
							<TokenPercentageSoldValue
								bold
								percentage={idoStatus.percentageSold}
							>{`${idoStatus.percentageSold}%`}</TokenPercentageSoldValue>
						</TokenSoldStatusItem>}
					</TokenSoldStatus>
					<SwapAmountInput idoInfo={idoInfo} isMobile={isMobile} />
				</TokenOperationPanel>
				<ClearDiv />
				<OtherInfoContainer>
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
					<RememberMe>
						<Text>Remember me...</Text>
						<input placeholder="Email Alert" />
					</RememberMe>
				</OtherInfoContainer>
			</IDOItemContent>
		</Wrapper>
	);
};

export default IDOItem;
