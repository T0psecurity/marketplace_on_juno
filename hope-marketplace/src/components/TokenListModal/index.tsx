import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import useContract from "../../hook/useContract";
import { TokenFullName, TokenStatus, TokenType } from "../../types/tokens";
import { IModal } from "../Modal";
import { ArrowLeftIcon, CancelIcon, CheckIcon } from "../SvgIcons";
import {
	AddedTokenStatusItem,
	AddedTokenStatusPanel,
	AddTokenButton,
	ButtonContainer,
	CommonTokenItem,
	CommonTokensContainer,
	SearchInputBox,
	StyledButton as Button,
	StyledText as Text,
	TokenImage,
	TokensTable,
	TokensTableBalanceContainer,
	TokensTableTokenName,
	TokensTableTokenNameContainer,
	Wrapper,
} from "./styled";
import ToggleButton from "../ToggleButton";

interface ITokenListModal extends IModal {
	onSelectToken: (token: TokenType) => void;
}

type TTokenListItem = {
	token: TokenType;
	name: string;
	imageUrl: string;
	balance: number;
	contract: string;
};

type TAddedTokenStatus = {
	name?: string;
	pool?: string;
	err?: string;
};

const CommonTokens: TokenType[] = [
	TokenType.JUNO,
	TokenType.ATOM,
	TokenType.HOPE,
	TokenType.HOPERS,
];

const TokenListModal: React.FC<ITokenListModal> = ({
	isOpen,
	onClose,
	onSelectToken,
}) => {
	const [searchValue, setSearchValue] = useState("");
	const [addedTokenAddress, setAddedTokenAddress] = useState("");
	const [addedTokenStatus, setAddedTokenStatus] = useState<TAddedTokenStatus>(
		{}
	);
	const [hideZeroAssets, setHideZeroAssets] = useState(false);
	const [showSecond, setShowSecond] = useState(false);
	const balances = useAppSelector((state) => state.balances);
	const { runQuery } = useContract();

	const tokenList: TTokenListItem[] = useMemo(() => {
		const result = (Object.keys(TokenType) as Array<keyof typeof TokenType>)
			.map((key) => {
				const tokenType = TokenType[key];
				return {
					name: key as string,
					token: TokenType[key],
					imageUrl: `/coin-images/${tokenType.replace(
						/\//g,
						""
					)}.png`,
					balance:
						+(balances?.[tokenType]?.amount || 0) /
						Math.pow(10, TokenStatus[tokenType].decimal || 6),
					contract: TokenStatus[tokenType].contractAddress || "",
				};
			})
			.filter((item) => !hideZeroAssets || item.balance > 0);
		return searchValue
			? result.filter(
					(item) =>
						item.name
							.toLowerCase()
							.includes(searchValue.toLowerCase()) ||
						item.contract === searchValue
			  )
			: result;
	}, [balances, hideZeroAssets, searchValue]);

	const handleOnClose = () => {
		setTimeout(() => {
			setShowSecond(false);
		}, 300);
		onClose();
	};

	const handleChangeSearchValue = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.target;
		setSearchValue(value);
	};

	const handleChangeAddedTokenAddress = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.target;
		setAddedTokenAddress(value);
	};

	const handleClickToken = (token: TokenType) => {
		onSelectToken(token);
		handleOnClose();
	};

	const handleImportToken = async () => {
		let alreadyImported = false;
		(Object.keys(TokenStatus) as Array<keyof typeof TokenStatus>).forEach(
			(key) => {
				const tokenStatus = TokenStatus[key];
				if (addedTokenAddress === tokenStatus.contractAddress) {
					alreadyImported = true;
				}
			}
		);
		if (alreadyImported) {
			setAddedTokenStatus({
				name: "",
				pool: "",
				err: "Already imported",
			});
			return;
		}
		const regExpForJunoAddress = /juno1[a-z,0-9]{58}/;
		if (!regExpForJunoAddress.test(addedTokenAddress)) {
			setAddedTokenStatus({
				name: "",
				pool: "",
				err: "Invalid address",
			});
			return;
		}
		try {
			const tokenStatus = await runQuery(addedTokenAddress, {
				token_info: {},
			});
			setAddedTokenStatus({
				name: tokenStatus?.name || "",
				pool: "",
				err: "",
			});
		} catch (e) {
			console.log("token status error", e);
		}
	};

	const renderTokenList = () => (
		<>
			<Text bold color="black" fontSize="20px">
				Select a Token
			</Text>
			<SearchInputBox
				placeholder="Search name or paste address"
				value={searchValue}
				onChange={handleChangeSearchValue}
			/>
			<Text
				margin="20px 0"
				alignItems="center"
				justifyContent="space-between"
			>
				Common tokens
				<ToggleButton
					label={{ title: "Hide 0 Balances:" }}
					onChange={(checked) => setHideZeroAssets(checked)}
				/>
			</Text>
			<CommonTokensContainer>
				{CommonTokens.map((tokenType: TokenType, index: number) => {
					const tokenName = (
						Object.keys(TokenType) as Array<keyof typeof TokenType>
					).filter((key) => TokenType[key] === tokenType)[0];
					return (
						<CommonTokenItem
							key={index}
							title={TokenFullName[tokenType]}
							onClick={() => handleClickToken(tokenType)}
						>
							<TokenImage
								alt=""
								src={`/coin-images/${tokenType.replace(
									/\//g,
									""
								)}.png`}
							/>
							<Text bold>{tokenName}</Text>
						</CommonTokenItem>
					);
				})}
			</CommonTokensContainer>
			<TokensTable>
				<TokensTableTokenNameContainer>
					<Text style={{ width: 100 }}>Token</Text>
				</TokensTableTokenNameContainer>
				<TokensTableBalanceContainer>
					<Text>Balance</Text>
				</TokensTableBalanceContainer>
				{React.Children.toArray(
					tokenList.map((tokenItem) => (
						<>
							<TokensTableTokenNameContainer
								onClick={() =>
									handleClickToken(tokenItem.token)
								}
							>
								<TokensTableTokenName
									imgUrl={tokenItem.imageUrl}
									bold
								>
									{tokenItem.name}
								</TokensTableTokenName>
							</TokensTableTokenNameContainer>
							<TokensTableBalanceContainer>
								<Text style={{ alignItems: "center" }}>
									{tokenItem.balance}
								</Text>
							</TokensTableBalanceContainer>
						</>
					))
				)}
			</TokensTable>
			<Text
				bold
				color="black"
				margin="50px 0 0 0"
				justifyContent="center"
				cursor="pointer"
				onClick={() => setShowSecond(true)}
			>
				Add Tokens
			</Text>
		</>
	);

	const renderAddToken = () => (
		<>
			<Text
				bold
				color="black"
				alignItems="center"
				cursor="pointer"
				onClick={() => setShowSecond(false)}
			>
				<ArrowLeftIcon width={30} /> Add Tokens
			</Text>
			<Text justifyContent="center" margin="40px 0 20px">
				Paste Token address
			</Text>
			<SearchInputBox
				placeholder="juno1..."
				value={addedTokenAddress}
				onChange={handleChangeAddedTokenAddress}
			/>
			<ButtonContainer>
				<Button onClick={handleImportToken}>Import Token</Button>
			</ButtonContainer>
			<AddedTokenStatusPanel>
				{addedTokenStatus?.err ? (
					<Text justifyContent="center" color="red">
						{addedTokenStatus.err}
					</Text>
				) : (
					<>
						<AddedTokenStatusItem>
							<Text alignItems="center" gap="30px">
								{`Token "${addedTokenStatus.name}"`}{" "}
								<CheckIcon />
							</Text>
							<AddTokenButton>Add Token</AddTokenButton>
						</AddedTokenStatusItem>
						<AddedTokenStatusItem>
							<Text alignItems="center" gap="30px">
								{`Pool "${
									addedTokenStatus.pool || "Not Found"
								}"`}{" "}
								{addedTokenStatus.pool ? (
									<CheckIcon />
								) : (
									<CancelIcon />
								)}
							</Text>
							<AddTokenButton>Create a Pool +</AddTokenButton>
						</AddedTokenStatusItem>
					</>
				)}
			</AddedTokenStatusPanel>
		</>
	);

	return (
		<Wrapper isOpen={isOpen} onClose={handleOnClose}>
			{showSecond ? renderAddToken() : renderTokenList()}
		</Wrapper>
	);
};

export default TokenListModal;
