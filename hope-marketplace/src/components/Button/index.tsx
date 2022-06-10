import React from "react";

import { StyledButton } from "./styled";

interface ButtonProps {
  className?: string;
  onClick?: any;
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
