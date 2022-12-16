import React from "react";
import { IPoolName } from "./type";
import { Wrapper } from "./styled";
import { getTokenName } from "../../types/tokens";

const PoolName: React.FC<IPoolName> = ({ pool }) => {
	return (
		<Wrapper poolId={pool.id}>{`${getTokenName(pool.token1)}-${getTokenName(
			pool.token2
		)}`}</Wrapper>
	);
};

export default PoolName;
