import React, { useState } from "react";
import ReactSelect, { ControlProps, components } from "react-select";
import Flex from "../../components/Flex";
import PoolImage from "../../components/PoolImage";
import { DropDownIcon } from "../../components/SvgIcons";
import Text from "../../components/Text";
import { TempLiquidities, TPool } from "../../types/pools";
import { getTokenName } from "../../types/tokens";

import {
	AddRemoveLiquidityActionButton,
	AddRemoveLiquidityFooter,
	AddRemoveLiquidityWrapper,
	LiquidityList,
	ListBody,
	ListHeader,
	RemoveAmountAutoInput,
	RemovePoolName,
	RemovePoolTotalValueContainer,
	SelectPoolContainer,
	SelectRemovePoolContainer,
	SelectRemovePoolItem,
} from "./styled";
import { IBasicModal, ModalType } from "./type";

const RemoveAutoInputValues = [0.25, 0.5, 0.75, 1];

const RemoveLiquidity: React.FC<IBasicModal> = ({ onChangeModalType }) => {
	const [pool, setPool] = useState<TPool>(TempLiquidities[0]);
	const [removeAmountAuto, setRemoveAmountAuto] = useState<number>(0);

	const handleChangePool = (item: any) => {
		setPool(item);
	};

	const handleSetRemoveAutoAmount = (amount: number) => {
		setRemoveAmountAuto((prev) => (prev === amount ? 0 : amount));
	};

	const CustomPoolSelectItem = ({ ...props }) => {
		const { selectOption, option, checked } = props;
		if (!option) return null;
		return (
			<SelectRemovePoolItem
				onClick={() => {
					if (selectOption) selectOption(option);
				}}
				checked={checked}
			>
				<PoolImage token1={option.token1} token2={option.token2} size="40px" />
				<RemovePoolName>{`${getTokenName(option.token1)}-${getTokenName(
					option.token2
				)}`}</RemovePoolName>
			</SelectRemovePoolItem>
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
					Remove Liquidity
				</Text>
				<Text justifyContent="flex-start" color="black">
					Receive LP tokens and earn trading fees
				</Text>
				<Text
					className="remove-button"
					onClick={() => onChangeModalType(ModalType.ADD)}
				>
					Add Liquidity
				</Text>
			</ListHeader>
			<ListBody>
				<AddRemoveLiquidityWrapper>
					<Text color="#787878" bold margin="5px 0">
						CHOOSE A PAIR
					</Text>
					<SelectRemovePoolContainer>
						<ReactSelect
							value={pool}
							onChange={handleChangePool}
							options={TempLiquidities}
							isSearchable={false}
							styles={{
								indicatorsContainer: (provided, state) => ({
									...provided,
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
								ValueContainer: () => null,
								IndicatorSeparator: () => null,
							}}
						/>
						<RemovePoolTotalValueContainer>
							<Text color="#787878">Total Pool Value</Text>
							<Text color="black" bold>
								1.2k $
							</Text>
						</RemovePoolTotalValueContainer>
					</SelectRemovePoolContainer>
					<Flex
						margin="10px 20px"
						width="100%"
						justifyContent="space-between"
						alignItems="center"
					>
						{RemoveAutoInputValues.map((value, index) => (
							<RemoveAmountAutoInput
								key={index}
								checked={value === removeAmountAuto}
								onClick={() => handleSetRemoveAutoAmount(value)}
							>{`${value * 100}%`}</RemoveAmountAutoInput>
						))}
					</Flex>
					<Text gap="20px">
						<Text color="#787878">Total Remove Value</Text>
						<Text color="black" bold fontSize="22px">
							0.6k $
						</Text>
					</Text>
					{/* !!Todo: One UI part is missed here!! */}
					<AddRemoveLiquidityFooter>
						<AddRemoveLiquidityActionButton>
							Remove Liquidity
						</AddRemoveLiquidityActionButton>
					</AddRemoveLiquidityFooter>
				</AddRemoveLiquidityWrapper>
			</ListBody>
		</LiquidityList>
	);
};

export default RemoveLiquidity;
