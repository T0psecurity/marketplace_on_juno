import React, { useState } from "react";

import { StyledImage } from "./styled";

export interface ImageProps {
  onClick?: any;
  alt: string;
  src: string;
}

const Image: React.FC<ImageProps> = ({ onClick, alt, src }) => {
  const [logoSize, setLogoSize] = useState<{
    width?: string;
    height?: string;
  }>({});
  const [imageVisible, setImageVisible] = useState<boolean>(false);
  const handleOnClick = (e: any) => {
    if (onClick && typeof onClick === "function") onClick(e);
  };

  const handleOnLoadImage = (e: any) => {
    // console.log("e", e);
    const {
      target: { offsetHeight, offsetWidth },
    } = e;
    if (offsetHeight > offsetWidth) {
      setLogoSize({
        // height: "400px",
        height: "100%",
      });
    } else {
      setLogoSize({
        // width: "370px",
        width: "100%",
      });
    }
    setImageVisible(true);
  };

  return (
    <StyledImage
      onClick={handleOnClick}
      alt={alt}
      src={src}
      onLoad={handleOnLoadImage}
      width={logoSize.width}
      height={logoSize.height}
      imageVisible={imageVisible}
    />
  );
};

export default Image;
