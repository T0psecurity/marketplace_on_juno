import React from "react";

import { StyledButton } from "./styled";

interface ButtonProps {
  className?: string;
  onClick?: any;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, children }) => {
  const handleClick = (e: any) => {
    if (onClick && typeof onClick === "function") onClick(e);
  };

  return (
    <StyledButton className={className} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
