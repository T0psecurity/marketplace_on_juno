import React from "react";
import { BasicProps } from "../../constants/BasicTypes";

import { StyledButton } from "./styled";

interface ButtonProps extends BasicProps {
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	className,
	onClick,
	disabled,
	children,
}) => {
	const handleClick = (e: any) => {
		if (onClick && typeof onClick === "function") onClick(e);
	};

	return (
		<StyledButton
			className={className}
			onClick={handleClick}
			disabled={disabled}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
