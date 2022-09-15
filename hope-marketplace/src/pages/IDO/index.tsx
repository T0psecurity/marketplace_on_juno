import React, { useEffect, useState } from "react";
import ExploreHeader from "../../components/ExploreHeader";
import Text from "../../components/Text";
import { IDOIds, IDOs } from "../../constants/IDOs";
import useContract from "../../hook/useContract";
import IDOItem from "./IDOItem";

import { Wrapper } from "./styled";
import { PresaleState } from "./type";
enum FILTER_TYPE {
  LIVE,
  FINISHED,
  SCHEDULED,
}

type IDOStatuses = {
  [key in IDOIds]: PresaleState;
};

const IDOStatusByFilterType = {
  [FILTER_TYPE.LIVE]: PresaleState.PRESALE,
  [FILTER_TYPE.FINISHED]: PresaleState.ENDED,
  [FILTER_TYPE.SCHEDULED]: PresaleState.BEFORE,
};

const IDO: React.FC = () => {
  const [selectedFilterType, setSelectedFilterType] = useState(
    FILTER_TYPE.LIVE
  );
  const [idoStatuses, setIdoStatuses] = useState<IDOStatuses>(
    {} as IDOStatuses
  );

  const { runQuery } = useContract();

  useEffect(() => {
    const queries = IDOs.map((ido) =>
      runQuery(ido.contract, {
        get_state_info: {},
      })
    );
    Promise.all(queries).then((queryResults) => {
      let idoStatusesResult: IDOStatuses = {} as IDOStatuses;
      queryResults.forEach((queryResult, index) => {
        const startTime = queryResult?.presale_start
          ? new Date(queryResult.presale_start * 1000)
          : new Date();
        const endTime = new Date(
          Number(startTime) + (queryResult.presale_period || 0) * 1000
        );
        const now = new Date();
        const crrState =
          Number(now) < Number(startTime)
            ? PresaleState.BEFORE
            : Number(now) < Number(endTime)
            ? PresaleState.PRESALE
            : PresaleState.ENDED;
        idoStatusesResult[IDOs[index].id] = crrState;
      });
      setIdoStatuses(idoStatusesResult);
    });
  }, [runQuery]);

  return (
    <Wrapper>
      <ExploreHeader
        title="IDO"
        tabs={[
          {
            title: "Live",
            onClick: () => setSelectedFilterType(FILTER_TYPE.LIVE),
            selected: () => selectedFilterType === FILTER_TYPE.LIVE,
          },
          {
            title: "Scheduled",
            onClick: () => setSelectedFilterType(FILTER_TYPE.SCHEDULED),
            selected: () => selectedFilterType === FILTER_TYPE.SCHEDULED,
          },
          {
            title: "Finished",
            onClick: () => setSelectedFilterType(FILTER_TYPE.FINISHED),
            selected: () => selectedFilterType === FILTER_TYPE.FINISHED,
          },
        ]}
      />
      <Text fontSize="24px" bold justifyContent="flex-start">
        Buy New CW20 Token in presale
      </Text>
      {IDOs.map((ido, index) =>
        idoStatuses[ido.id] === IDOStatusByFilterType[selectedFilterType] ? (
          <IDOItem key={index} idoInfo={ido} />
        ) : null
      )}
    </Wrapper>
  );
};

export default IDO;
