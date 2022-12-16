import React, { useMemo } from "react";
import ReactSelect, { components, ControlProps } from "react-select";
import { useAppSelector } from "../../app/hooks";
import Flex from "../../components/Flex";
import Text from "../../components/Text";
import { addSuffix } from "../../util/string";
import { getTokenName, TokenType } from "../../types/tokens";
import {
	TokenAmountInput,
	TokenAmountInputerWrapper,
	TokenImage,
} from "./styled";
import { DropDownIcon } from "../../components/SvgIcons";

interface TTokenAmountInputer {
	token?: TokenType;
	hasSelect?: boolean;
	amount?: any;
	onSelectToken?: (token: TokenType) => void;
	onAmountChange?: (amount: string) => void;
}

const AutoInputers = [25, 50, 75, 100];

const SelectOptions = (
	Object.keys(TokenType) as Array<keyof typeof TokenType>
).map((key) => {
	return { value: TokenType[key], title: TokenType[key] };
});

const TokenImageItem = ({ ...props }) => {
	const { selectOption, token, horizontalName } = props;
	if (!token) return null;
	return (
		<TokenImage
			horizontalName={horizontalName}
			onClick={() => {
				if (selectOption) selectOption(token);
			}}
		>
			<img alt="" src={`/coin-images/${token.replace(/\//g, "")}.png`} />
			{getTokenName(token)}
		</TokenImage>
	);
};

const TokenAmountInputer: React.FC<TTokenAmountInputer> = ({
	token,
	amount,
	onAmountChange,
	hasSelect,
	onSelectToken,
}) => {
	const balances = useAppSelector((state) => state.balances);
	const tokenPrices = useAppSelector((state) => state.tokenPrices);

	const { tokenPriceInUsd, balance } = useMemo(() => {
		const balanceInRaw = token ? (balances[token]?.amount || 0) / 1e6 : 0;
		const tokenPriceInRaw = token
			? tokenPrices[token]?.market_data?.current_price?.usd || 0
			: 0;
		return {
			tokenPriceInUsd: addSuffix(balanceInRaw * tokenPriceInRaw),
			balance: addSuffix(balanceInRaw),
		};
	}, [balances, token, tokenPrices]);

	const handleChangeToken = (item: any) => {
		if (onSelectToken) onSelectToken(item);
	};

	const CustomMenuList = (props: any) => {
		const { options, selectOption } = props;
		return options.map((option: any, index: number) => (
			<TokenImageItem
				key={index}
				horizontalName
				selectOption={selectOption}
				token={option.value}
			/>
		));
	};

	const CustomControl = ({ children, ...props }: ControlProps<any, false>) => {
		return (
			<Flex>
				<TokenImageItem token={token} />
				{children}
			</Flex>
		);
	};

	return (
		<TokenAmountInputerWrapper>
			<Flex alignItems="center" gap="10px">
				{AutoInputers.map((inputer, index) => (
					<Text
						key={index}
						color="#787878"
						cursor="pointer"
						onClick={() =>
							onAmountChange && onAmountChange(`${(+balance * inputer) / 100}`)
						}
					>{`${inputer}%`}</Text>
				))}
			</Flex>
			<TokenAmountInput>
				{hasSelect ? (
					<ReactSelect
						value={token ? { value: token, title: token } : undefined}
						onChange={handleChangeToken}
						options={SelectOptions}
						isSearchable={false}
						styles={{
							indicatorsContainer: (provided, state) => ({
								...provided,
								cursor: "pointer",
							}),
							menu: (provided, state) => ({
								...provided,
								padding: "10px",
								backgroundColor: "#d9fbef",
								border: "1px solid black",
								borderRadius: "15px",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								overflow: "hidden",
								width: "max-content",
								zIndex: 10,
							}),
						}}
						components={{
							MenuList: CustomMenuList,
							Control: CustomControl,
							DropdownIndicator: (props) => {
								return (
									<components.DropdownIndicator {...props}>
										<DropDownIcon fill="black" />
									</components.DropdownIndicator>
								);
							},
							IndicatorSeparator: () => null,
							...(token && { ValueContainer: () => null }),
						}}
					/>
				) : (
					<TokenImageItem token={token} />
				)}
				<input
					value={amount ?? ""}
					onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
				/>
			</TokenAmountInput>
			<Flex alignItems="center" justifyContent="space-between" width="100%">
				<Text color="#787878" cursor="pointer">
					Balance
				</Text>
				<Text color="#787878" cursor="pointer">
					{`${balance}($${tokenPriceInUsd})`}
				</Text>
			</Flex>
		</TokenAmountInputerWrapper>
	);
};

export default TokenAmountInputer;
