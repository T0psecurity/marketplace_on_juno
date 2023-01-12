import React, { memo } from "react";
import PoolImage from "../../components/PoolImage";
import PoolName from "../../components/PoolName";
import { SelectAddPoolItem } from "./styled";

const CustomPoolSelectItem: React.FC<any> = ({ ...props }) => {
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

export default memo(CustomPoolSelectItem);
