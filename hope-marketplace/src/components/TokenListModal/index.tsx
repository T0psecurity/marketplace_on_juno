import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { TokenFullName, TokenType } from "../../types/tokens";
import { IModal } from "../Modal";
import {
	TokenImage,
	TokensTable,
	TokensTableBalanceContainer,
	TokensTableTokenName,
	TokensTableTokenNameContainer,
} from "./styled";
import {
	CommonTokenItem,
	CommonTokensContainer,
	SearchInputBox,
	StyledText as Text,
	Wrapper,
} from "./styled";

type TTokenListItem = {
	name: string;
	imageUrl: string;
	balance: number;
};

const CommonTokens: TokenType[] = [
	TokenType.JUNO,
	TokenType.ATOM,
	TokenType.HOPE,
];

const TokenListModal: React.FC<IModal> = ({ isOpen, onClose }) => {
	const [searchValue, setSearchValue] = useState("");
	const balances = useAppSelector((state) => state.balances);

	const tokenList: TTokenListItem[] = useMemo(() => {
		const result = (
			Object.keys(TokenType) as Array<keyof typeof TokenType>
		).map((key) => {
			const tokenType = TokenType[key];
			return {
				name: key as string,
				imageUrl: `/coin-images/${tokenType.replace(/\//g, "")}.png`,
				balance: +(balances?.[tokenType]?.amount || 0) / 1e6,
			};
		});
		return result;
	}, [balances]);

	const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchValue(value);
	};

	const handleClickToken = (tokenItem: TTokenListItem) => {
		console.log("token clicked", tokenItem);
	};

	return (
		<Wrapper isOpen={isOpen} onClose={onClose}>
			<Text bold color="black" fontSize="20px">
				Select a Token
			</Text>
			<SearchInputBox
				placeholder="Search name or paste address"
				value={searchValue}
				onChange={handleChangeSearchValue}
			/>
			<Text margin="20px 0">Common tokens</Text>
			<CommonTokensContainer>
				{CommonTokens.map((tokenType: TokenType, index: number) => {
					const tokenName = (
						Object.keys(TokenType) as Array<keyof typeof TokenType>
					).filter((key) => TokenType[key] === tokenType)[0];
					return (
						<CommonTokenItem key={index} title={TokenFullName[tokenType]}>
							<TokenImage
								alt=""
								src={`/coin-images/${tokenType.replace(/\//g, "")}.png`}
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
								onClick={() => handleClickToken(tokenItem)}
							>
								<TokensTableTokenName imgUrl={tokenItem.imageUrl} bold>
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
		</Wrapper>
	);
};

export default TokenListModal;
