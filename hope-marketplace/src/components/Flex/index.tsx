import React from "react";
import { Wrapper } from "./styled";
import { TFlex } from "./type";

const Flex: React.FC<TFlex> = ({ children, ...props }) => {
	return <Wrapper {...props}>{children}</Wrapper>;
};

export default Flex;
