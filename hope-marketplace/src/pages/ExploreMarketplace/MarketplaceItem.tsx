import React from "react";
import { useHistory } from "react-router-dom";
import { Card, StyledImg, Text, StyledButton } from "./styled";

export interface MarketplaceItemProps {
  imageUrl: string;
  title: string;
  linkUrl: string;
}

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({
  imageUrl,
  title,
  linkUrl,
}) => {
  const history = useHistory();
  return (
    <Card>
      <StyledImg src={imageUrl} alt="collection" />
      <Text>{title}</Text>
      <StyledButton
        onClick={(e) => {
          history.push(linkUrl);
        }}
      >
        View Collection
      </StyledButton>
    </Card>
  );
};

export default MarketplaceItem;
