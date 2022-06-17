import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import {
  getCollectionById,
  MarketplaceBasicInfo,
} from "../../constants/Collections";
import { Card, StyledImg, Text } from "./styled";
import { convertDateToString } from "../../util/date";

const MarketplaceItem: React.FC<MarketplaceBasicInfo> = ({
  imageUrl,
  title,
  collectionId,
  description,
}) => {
  const history = useHistory();

  const targetCollection = getCollectionById(collectionId);

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
        disabled={!!targetCollection.mintInfo?.mintDate}
        onClick={() => {
          history.push(`/collections/marketplace?id=${collectionId}`);
        }}
      >
        {targetCollection.mintInfo?.mintDate
          ? convertDateToString(targetCollection.mintInfo.mintDate)
          : "View Collection"}
      </Button>
    </Card>
  );
};

export default MarketplaceItem;
