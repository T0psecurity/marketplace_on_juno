import React from "react";
import { useHistory } from "react-router-dom";
import { Card, StyledImg, Text, StyledButton } from "./styled";

export interface MarketplaceItemProps {
  imageUrl: string;
  title: string;
  linkUrl: string;
  description: string;
}

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({
  imageUrl,
  title,
  linkUrl,
  description,
}) => {
  const history = useHistory();
  return (
    <Card>
      <StyledImg imageUrl={imageUrl} />
      <Text marginTop="20px" fontWeight="bold">
        {title}
      </Text>
      <Text marginTop="10px" fontSize="16px" height="100px">
        {description}
      </Text>
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
