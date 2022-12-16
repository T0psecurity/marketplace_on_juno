import React, { useState } from "react";
import Flex from "../../components/Flex";
import { MinusInGreenCircleIcon } from "../../components/SvgIcons";
import Text from "../../components/Text";
import { TokenType } from "../../types/tokens";

import {
	AddRemoveLiquidityActionButton,
	AddRemoveLiquidityFooter,
	AddRemoveLiquidityWrapper,
	LiquidityList,
	ListBody,
	ListHeader,
} from "./styled";
import TokenAmountInputer from "./TokenAmountInputer";
import { IBasicModal, ModalType, TAddAmount, TCreateInfo } from "./type";

const CreateLiquidity: React.FC<IBasicModal> = ({ onChangeModalType }) => {
	const [createInfo, setCreateInfo] = useState<TCreateInfo>();
	const [addAmount, setAddAmount] = useState<TAddAmount>({} as TAddAmount);

	const handleSelectToken = (token: TokenType, type: keyof TAddAmount) => {
		setCreateInfo(
			(prev) =>
				({
					...prev,
					[type]: token,
				} as TCreateInfo)
		);
	};

	const handleChangeAddAmount = (value: string, type: keyof TAddAmount) => {
		if (!isNaN(Number(value))) {
			setAddAmount(
				(prev) =>
					({
						...prev,
						[type]: value,
					} as TAddAmount)
			);
		}
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
					<MinusInGreenCircleIcon
						onClick={() => onChangeModalType(ModalType.ADD)}
					/>
					<Text color="#787878" bold margin="5px 0">
						CHOOSE A NEW VALID PAIR
					</Text>
					<Flex alignItems="center" gap="10px">
						<TokenAmountInputer
							hasSelect
							token={createInfo?.token1}
							amount={addAmount.token1}
							onAmountChange={(amount) =>
								handleChangeAddAmount(amount, "token1")
							}
							onSelectToken={(token) => handleSelectToken(token, "token1")}
						/>
						<TokenAmountInputer
							hasSelect
							token={createInfo?.token2}
							amount={addAmount.token2}
							onAmountChange={(amount) =>
								handleChangeAddAmount(amount, "token2")
							}
							onSelectToken={(token) => handleSelectToken(token, "token2")}
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

export default CreateLiquidity;
