import React from "react";

import { SubTitle as SubTitleWrapper } from "./styled";

interface SubTitleProps {
  subTitle: string;
}

const Subtitle: React.FC<SubTitleProps> = ({ subTitle }) => {
  return <SubTitleWrapper>{subTitle}</SubTitleWrapper>;
};

export default Subtitle;
