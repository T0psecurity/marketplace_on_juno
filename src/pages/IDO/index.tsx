import React from "react";
import ExploreHeader from "../../components/ExploreHeader";

import { Wrapper } from "./styled";
// enum FILTER_TYPE {
//   LIVE,
//   FINISHED,
//   SCHEDULED,
//   ALL,
// }

// const FilterButtonOptions: {
//   [key in FILTER_TYPE]: {
//     title: string;
//     backgroundColor?: string;
//     color?: string;
//   };
// } = {
//   [FILTER_TYPE.LIVE]: {
//     title: "Live",
//   },
//   [FILTER_TYPE.FINISHED]: {
//     title: "Sold out",
//     backgroundColor: "#C63939",
//     color: "white",
//   },
//   [FILTER_TYPE.SCHEDULED]: {
//     title: "Scheduled",
//     backgroundColor: "#FCFF5C",
//   },
//   [FILTER_TYPE.ALL]: {
//     title: "All",
//     backgroundColor: "white",
//   },
// };

const IDO: React.FC = () => {
  return (
    <Wrapper>
      <ExploreHeader
        title="IDO"
        tabs={[
          {
            title: "Live",
          },
        ]}
      />
    </Wrapper>
  );
};

export default IDO;
