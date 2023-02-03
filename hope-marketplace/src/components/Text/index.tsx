import React from "react";
import { TextProps } from "./type";
import { Wrapper } from "./styled";

const Text: React.FC<TextProps> = ({ children, title, ...rest }) => {
	return (
		<Wrapper title={title} {...rest}>
			{children}
		</Wrapper>
	);
};

export default Text;
