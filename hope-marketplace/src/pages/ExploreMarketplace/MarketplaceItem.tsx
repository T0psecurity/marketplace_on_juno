import React from "react";
import { useHistory } from "react-router-dom";
// import Button from "../../components/Button";
import {
  // getCollectionById,
  MarketplaceBasicInfo,
} from "../../constants/Collections";
import { Card, CollectionTitle, LogoImage, StyledImg } from "./styled";
// import { compareDate, convertDateToString } from "../../util/date";

const MarketplaceItem: React.FC<MarketplaceBasicInfo> = ({
  imageUrl,
  title,
  collectionId,
  description,
  logoUrl,
}) => {
  const history = useHistory();

  // const targetCollection = getCollectionById(collectionId);
  // const mintDate = targetCollection.mintInfo?.mintDate
  //   ? new Date(targetCollection.mintInfo.mintDate)
  //   : new Date();
  // const now = new Date();
  // const isLive = compareDate(now, mintDate) !== -1;

  return (
    <Card
      onClick={() => {
        history.push(`/collections/marketplace?id=${collectionId}`);
      }}
    >
      <StyledImg imageUrl={imageUrl} />
      {logoUrl && <LogoImage imageUrl={logoUrl} />}
      <CollectionTitle hasLogo={!!logoUrl}>{title}</CollectionTitle>
      {/* <Text marginTop="20px" fontWeight="bold">
        {title}
      </Text> */}
      {/* <Text marginTop="10px" fontSize="16px" height="100px">
        {description}
      </Text>
      <Button
        disabled={
          !targetCollection.isLaunched ||
          (!!targetCollection.mintInfo?.mintDate && !isLive)
        }
        onClick={() => {
          history.push(`/collections/marketplace?id=${collectionId}`);
        }}
      >
        {targetCollection.isLaunched &&
        (!targetCollection.mintInfo?.mintDate || isLive)
          ? "View Collection"
          : targetCollection?.mintInfo?.mintDate
          ? convertDateToString(targetCollection.mintInfo.mintDate)
          : "View Soon"}
      </Button> */}
    </Card>
  );
};

export default MarketplaceItem;
