import moment from "moment";
import React, { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import Image from "../../components/Image";
import Collections, {
  CollectionIds,
  getCollectionById,
} from "../../constants/Collections";
import { getCustomTokenId, getTokenIdNumber } from "../../hook/useFetch";
import { TokenType } from "../../types/tokens";
import useMatchBreakpoints from "../../hook/useMatchBreakpoints";
import { addSuffix } from "../../util/string";

import {
  SaleHistoryWrapper,
  HistoryItemBlock,
  SaleHistoryItem,
  HistoryItemImage,
  HistoryItemToken,
  HistoryItemText,
  CoinIcon,
  HistoryItemTokenName,
  HistoryItemAddress,
  StyledSvg,
  LoadMoreButton,
  NoHistoryWrapper,
} from "./styled";
import { HistoryIcon } from "../SvgIcons";
import { useHistory } from "react-router-dom";

interface ActivityListProps {
  filterFunc?: any;
  collectionId?: CollectionIds;
  user?: string;
}

const INITIAL_RENDER_COUNT = 50;

const CartIcon = () => (
  <StyledSvg
    width="60"
    height="51"
    viewBox="0 0 60 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M52.49 31.4L59.53 9.08C59.77 8.31 59.63 7.47 59.16 6.82C58.68 6.17 57.92 5.79 57.12 5.79L13.9 5.8L11.87 1.15C11.7 0.77 11.33 0.53 10.92 0.53H2.83C2.53 0.21 2.11 0 1.63 0C0.73 0 0 0.73 0 1.64C0 2.54 0.73 3.27 1.63 3.27C2.17 3.27 2.65 3.01 2.94 2.6H10.23L22.9 31.64C22.93 31.71 22.98 31.76 23.01 31.82L20.97 36.82C20.68 36.78 20.39 36.76 20.1 36.76C16.39 36.76 13.38 39.78 13.38 43.49C13.38 47.2 16.4 50.21 20.1 50.21C23.46 50.21 26.24 47.74 26.74 44.52H43.66C44.16 47.74 46.94 50.21 50.3 50.21C54.01 50.21 57.02 47.19 57.02 43.49C57.02 39.78 54 36.76 50.3 36.76C50 36.76 49.71 36.79 49.43 36.82L47.95 33.17H50.07C51.18 33.17 52.15 32.46 52.49 31.4ZM27.85 9.79H31.93V17.32H39.64V9.79H43.74V29.53H39.64V20.72H31.93V29.53H27.85V9.79ZM43.67 42.45H26.76C26.41 40.22 24.97 38.35 22.99 37.41L24.74 33.1C24.9 33.13 25.07 33.17 25.24 33.17H45.71L47.44 37.41C45.46 38.35 44.02 40.21 43.67 42.45Z"
      fill="black"
    />
  </StyledSvg>
);

const filterActivitiesByUser = (activities: any[], user?: string) => {
  if (!user) return activities;
  const result: any = [];
  activities.forEach((activity) => {
    if (activity.from === user || activity.to === user) {
      result.push(activity);
    }
  });
  return result;
};

const ActivityList: React.FC<ActivityListProps> = ({
  filterFunc,
  collectionId,
  user,
}) => {
  const [renderCount, setRenderCount] = useState<number>(INITIAL_RENDER_COUNT);
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const collectionStates = useAppSelector((state) => state.collectionStates);
  const totalTokenRarityRanks = useAppSelector((state) => state.rarityRank);
  const history = useHistory();

  useEffect(() => {
    setRenderCount(INITIAL_RENDER_COUNT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterFunc]);

  const activityHistory = useMemo(() => {
    let result: any = [];
    if (collectionId) {
      result = filterActivitiesByUser(
        (collectionStates[collectionId]?.saleHistory || []).map(
          (item: any) => ({ ...item, collectionId })
        ),
        user
      );
    } else {
      Collections.forEach((collection) => {
        const saleHistory =
          collectionStates[collection.collectionId]?.saleHistory;
        result = [
          ...result,
          ...filterActivitiesByUser(
            (saleHistory || []).map((item: any) => ({
              ...item,
              collectionId: collection.collectionId,
            })),
            user
          ),
        ];
      });
    }
    if (filterFunc) {
      result = filterFunc(result);
    } else {
      result = result
        .slice()
        .sort((history1: any, history2: any) =>
          history1?.time < history2.time ? 1 : -1
        );
    }
    return result.slice(0, renderCount);
  }, [collectionId, collectionStates, filterFunc, renderCount, user]);

  if (!activityHistory || !activityHistory.length) {
    return (
      <NoHistoryWrapper>
        <HistoryIcon width={50} height={50} /> No Activities
      </NoHistoryWrapper>
    );
  }

  return (
    <>
      <SaleHistoryWrapper>
        {activityHistory.map((historyItem: any, index: number) => {
          const collectionState =
            collectionStates[historyItem.collectionId as CollectionIds] || {};
          const tokenRarityRanks =
            totalTokenRarityRanks[historyItem.collectionId as CollectionIds] ||
            [];
          const targetCollection =
            getCollectionById(historyItem.collectionId || "") || {};
          let url = "";
          if (historyItem.collectionId === "mintpass1") {
            url = "/others/mint_pass.png";
          } else if (historyItem.collectionId === "mintpass2") {
            url = "/others/mint_pass2.png";
          } else if (historyItem.collectionId === "hopegalaxy1") {
            url = `https://hopegalaxy.mypinata.cloud/ipfs/QmP7jDG2k92Y7cmpa7iz2vhFG1xp7DNss7vuwUpNaDd7xf/${getTokenIdNumber(
              historyItem.token_id
            )}.png`;
          } else if (collectionState.imageUrl) {
            url = `${collectionState.imageUrl}${getTokenIdNumber(
              historyItem.token_id
            )}.png`;
          }
          const time = new Date(historyItem.time * 1000);
          const tokenPrice =
            tokenPrices[historyItem.denom as TokenType]?.market_data
              .current_price?.usd || 0;
          const tokenIdNumber = Number(
            getTokenIdNumber(historyItem.token_id) || 0
          );
          const tokenRarityRank = tokenRarityRanks[tokenIdNumber];
          return (
            <SaleHistoryItem key={index} isMobile={isMobile} forUser={!!user}>
              {!!user && (
                <HistoryItemText minWidth="" fontSize="16px" textAlign="end">
                  {historyItem.from === user ? "Sell" : "Buy"}
                </HistoryItemText>
              )}
              {!isMobile && <CartIcon />}
              <HistoryItemBlock isMobile={isMobile}>
                <HistoryItemImage>
                  <Image alt="" src={url} />
                </HistoryItemImage>
                <HistoryItemTokenName>
                  <HistoryItemText
                    fontSize="18px"
                    fontWeight="bold"
                    onClick={() => {
                      history.push(
                        `/collections/marketplace?id=${targetCollection.collectionId}`
                      );
                    }}
                  >
                    {targetCollection.title}
                  </HistoryItemText>
                  <HistoryItemText
                  // onClick={() =>
                  //   history.push(
                  //     `/detail?token_id=${escapeSpecialForUrl(
                  //       historyItem.token_id
                  //     )}`
                  //   )
                  // }
                  >
                    {targetCollection.customTokenId
                      ? getCustomTokenId(
                          historyItem.token_id,
                          targetCollection.customTokenId
                        )
                      : historyItem.token_id}
                  </HistoryItemText>
                  {tokenRarityRank && (
                    <HistoryItemText
                      margin="5px 0 0 0"
                      color="#39C639"
                    >{`Rank#${tokenRarityRank.rank}`}</HistoryItemText>
                  )}
                </HistoryItemTokenName>
              </HistoryItemBlock>
              <HistoryItemToken>
                <CoinIcon
                  alt=""
                  src={`/coin-images/${historyItem.denom.replace(
                    /\//g,
                    ""
                  )}.png`}
                />
                <div>
                  <HistoryItemText>
                    {(+historyItem.amount / 1e6).toLocaleString("en-Us", {
                      maximumFractionDigits: 2,
                    })}
                  </HistoryItemText>
                  <HistoryItemText>
                    {`(${addSuffix(
                      Number(
                        (
                          (+(historyItem?.amount || 0) / 1e6) *
                          (tokenPrice || 0)
                        ).toLocaleString("en-Us", { maximumFractionDigits: 2 })
                      ),
                      1
                    )}$)`}
                  </HistoryItemText>
                </div>
              </HistoryItemToken>
              <HistoryItemBlock isMobile={isMobile}>
                <HistoryItemAddress title={historyItem.from}>
                  {historyItem.from === user ? "You" : historyItem.from}
                </HistoryItemAddress>
                <HistoryItemAddress title={historyItem.to}>
                  {historyItem.to === user ? "You" : historyItem.to}
                </HistoryItemAddress>
              </HistoryItemBlock>
              <HistoryItemText>
                {moment(moment(time).toISOString(true)).fromNow()}
              </HistoryItemText>
            </SaleHistoryItem>
          );
        })}
        <LoadMoreButton
          onClick={() => setRenderCount((prev) => Math.min(prev + 15))}
        >
          Load More Activities...
        </LoadMoreButton>
      </SaleHistoryWrapper>
    </>
  );
};

export default ActivityList;
