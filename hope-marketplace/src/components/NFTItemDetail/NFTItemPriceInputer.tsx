import React, { memo } from "react";
import { NFTItemPriceInputer as NFTItemPriceInputerWrapper } from "./styled";

interface NFTItemPriceInputerProps {
  placeholder: any;
  value: any;
  onChange: any;
  key?: any;
  width: any;
}

const NFTItemPriceInputer: React.FC<NFTItemPriceInputerProps> = ({
  placeholder,
  value,
  onChange,
  key,
  width,
}) => {
  return (
    <NFTItemPriceInputerWrapper
      key={key}
      width={width}
      hidePlaceholder={!!value}
    >
      <input value={value} onChange={onChange} />
      <span>{placeholder}</span>
    </NFTItemPriceInputerWrapper>
  );
};

export default memo(NFTItemPriceInputer);
