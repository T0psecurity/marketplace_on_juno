import React, { useState } from "react";
import ReactSelect, { ControlProps, components } from "react-select";
import Flex from "../../components/Flex";
import PoolImage from "../../components/PoolImage";
import PoolName from "../../components/PoolName";
import { DropDownIcon, PlusInGreenCircleIcon } from "../../components/SvgIcons";
import Text from "../../components/Text";
import { TempLiquidities, TPool } from "../../types/pools";

import {
	AddRemoveLiquidityActionButton,
	AddRemoveLiquidityFooter,
	AddRemoveLiquidityWrapper,
	LiquidityList,
	ListBody,
	ListHeader,
	SelectAddPoolItem,
	SelectPoolContainer,
} from "./styled";
import TokenAmountInputer from "./TokenAmountInputer";
import { IBasicModal, ModalType, TAddAmount } from "./type";

const AddLiquidity: React.FC<IBasicModal> = ({ onChangeModalType }) => {
	const [pool, setPool] = useState<TPool>(TempLiquidities[0]);
	const [addAmount, setAddAmount] = useState<TAddAmount>({} as TAddAmount);

	const handleChangePool = (item: any) => {
		setPool(item);
		if (addAmount.token1) {
			setAddAmount((prev) => ({
				...prev,
				token2: Number(prev.token1) * (item.ratio || 0),
			}));
		}
	};

	const handleChangeAddAmount = (value: string, type: keyof TAddAmount) => {
		if (!isNaN(Number(value))) {
			setAddAmount({
				[type]: value,
				[type === "token1" ? "token2" : "token1"]:
					type === "token1"
						? Number(value) * pool.ratio
						: Number(value) / pool.ratio,
			} as TAddAmount);
		}
	};

	const CustomPoolSelectItem = ({ ...props }) => {
		const { selectOption, option, checked } = props;
		if (!option) return null;
		return (
			<SelectAddPoolItem
				onClick={() => {
					if (selectOption) selectOption(option);
				}}
				checked={checked}
			>
				<PoolImage token1={option.token1} token2={option.token2} />
				<PoolName pool={option} />
			</SelectAddPoolItem>
		);
	};

	const CustomPoolsList = (props: any) => {
		const { options, selectOption } = props;
		return options.map((option: any, index: number) => (
			<CustomPoolSelectItem
				key={index}
				selectOption={selectOption}
				option={option}
				checked={option.token1 === pool.token1 && option.token2 === pool.token2}
			/>
		));
	};

	const CustomPoolItem = ({ children, ...props }: ControlProps<any, false>) => {
		return (
			<SelectPoolContainer>
				<CustomPoolSelectItem option={pool} />
				{children}
			</SelectPoolContainer>
		);
	};

	return (
		<LiquidityList>
			<ListHeader>
				<Text justifyContent="flex-start" color="black" bold fontSize="20px">
					Add Liquidity
				</Text>
				<Text justifyContent="flex-start" color="black">
					Receive LP tokens and earn trading fees
				</Text>
				<Text
					className="remove-button"
					onClick={() => onChangeModalType(ModalType.REMOVE)}
				>
					Remove Liquidity
				</Text>
			</ListHeader>
			<ListBody>
				<AddRemoveLiquidityWrapper>
					<PlusInGreenCircleIcon
						onClick={() => onChangeModalType(ModalType.CREATE)}
					/>
					<Text color="#787878" bold margin="5px 0">
						CHOOSE A VALID PAIR
					</Text>
					<ReactSelect
						value={pool}
						onChange={handleChangePool}
						options={TempLiquidities}
						isSearchable={false}
						styles={{
							container: (provided, state) => ({
								...provided,
								margin: "5px 10px",
								minWidth: 100,
								border: "1px solid black",
								borderRadius: "15px",
								background: "rgba(2, 226, 150, 0.15)",
							}),
							indicatorsContainer: (provided, state) => ({
								...provided,
								padding: "10px",
								cursor: "pointer",
							}),
							menu: (provided, state) => ({
								...provided,
								backgroundColor: "#d9fbef",
								border: "1px solid black",
								borderRadius: "15px",
								boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
								overflow: "hidden",
								zIndex: 10,
							}),
						}}
						components={{
							MenuList: CustomPoolsList,
							Control: CustomPoolItem,
							DropdownIndicator: (props) => (
								<components.DropdownIndicator {...props}>
									<DropDownIcon fill="black" />
								</components.DropdownIndicator>
							),
							IndicatorSeparator: () => null,
						}}
					/>
					<Flex alignItems="center" gap="10px">
						<TokenAmountInputer
							token={pool.token1}
							amount={addAmount.token1}
							onAmountChange={(amount) =>
								handleChangeAddAmount(amount, "token1")
							}
						/>
						<TokenAmountInputer
							token={pool.token2}
							amount={addAmount.token2}
							onAmountChange={(amount) =>
								handleChangeAddAmount(amount, "token2")
							}
						/>
					</Flex>
					<AddRemoveLiquidityFooter>
						<AddRemoveLiquidityActionButton>
							Add Liquidity
						</AddRemoveLiquidityActionButton>
					</AddRemoveLiquidityFooter>
				</AddRemoveLiquidityWrapper>
			</ListBody>
		</LiquidityList>
	);
};

export default AddLiquidity;
