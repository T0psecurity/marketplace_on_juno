import React, { useState } from "react";
import ExploreHeader from "../../components/ExploreHeader";
import Text from "../../components/Text";
import { IDOs } from "../../constants/IDOs";
import IDOItem from "./IDOItem";

import { Wrapper } from "./styled";
enum FILTER_TYPE {
  LIVE,
  FINISHED,
  SCHEDULED,
}

export enum PresaleState {
  BEFORE,
  PRESALE,
  ENDED,
}

export const FilterButtonOptions: {
  [key in PresaleState]: {
    title: string;
    backgroundColor: string;
    color?: string;
  };
} = {
  [PresaleState.PRESALE]: {
    title: "Live",
    backgroundColor: "#02E296",
  },
  [PresaleState.BEFORE]: {
    title: "Scheduled",
    backgroundColor: "#F7ED51",
  },
  [PresaleState.ENDED]: {
    title: "Finished",
    backgroundColor: "#FF0000",
    color: "white",
  },
};

const IDO: React.FC = () => {
  const [selectedFilterType, setSelectedFilterType] = useState(
    FILTER_TYPE.LIVE
  );

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
      {IDOs.map((ido, index) => (
        <IDOItem key={index} idoInfo={ido} />
      ))}
    </Wrapper>
  );
};

export default IDO;
