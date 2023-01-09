import React from "react";
import { TextProps } from "./type";
import { Wrapper } from "./styled";

const Text: React.FC<TextProps> = ({ children, ...rest }) => {
	return <Wrapper {...rest}>{children}</Wrapper>;
};

export default Text;
