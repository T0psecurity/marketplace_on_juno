import React from "react";

import { StyledImage } from "./styled";

export interface ImageProps {
  onClick?: any;
  alt: string;
  src: string;
}

const Image: React.FC<ImageProps> = ({ onClick, alt, src }) => {
  const handleOnClick = (e: any) => {
    if (onClick && typeof onClick === "function") onClick(e);
  };

  return <StyledImage onClick={handleOnClick} alt={alt} src={src} />;
};

export default Image;
