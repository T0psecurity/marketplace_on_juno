import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import { MarketplaceBasicInfo } from "../../constants/Collections";
import { Card, StyledImg, Text } from "./styled";

const MarketplaceItem: React.FC<MarketplaceBasicInfo> = ({
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
      <Button
        onClick={() => {
          history.push(linkUrl);
        }}
      >
        View Collection
      </Button>
    </Card>
  );
};

export default MarketplaceItem;
