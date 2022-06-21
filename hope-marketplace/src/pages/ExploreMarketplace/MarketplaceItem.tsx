import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import {
  getCollectionById,
  MarketplaceBasicInfo,
} from "../../constants/Collections";
import { Card, StyledImg, Text } from "./styled";
import { compareDate, convertDateToString } from "../../util/date";

const MarketplaceItem: React.FC<MarketplaceBasicInfo> = ({
  imageUrl,
  title,
  collectionId,
  description,
}) => {
  const history = useHistory();

  const targetCollection = getCollectionById(collectionId);
  const mintDate = targetCollection.mintInfo?.mintDate
    ? new Date(targetCollection.mintInfo.mintDate)
    : new Date();
  const now = new Date();
  const isLive = compareDate(now, mintDate) !== -1;

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
        disabled={!!targetCollection.mintInfo?.mintDate && !isLive}
        onClick={() => {
          history.push(`/collections/marketplace?id=${collectionId}`);
        }}
      >
        {!targetCollection.mintInfo?.mintDate || isLive
          ? "View Collection"
          : convertDateToString(targetCollection.mintInfo.mintDate)}
      </Button>
    </Card>
  );
};

export default MarketplaceItem;
