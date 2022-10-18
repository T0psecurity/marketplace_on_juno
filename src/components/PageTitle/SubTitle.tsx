import React from "react";

import { SubTitle as SubTitleWrapper } from "./styled";

interface SubTitleProps {
  subTitle: string;
  textAlign?: string;
}

const Subtitle: React.FC<SubTitleProps> = ({ subTitle, textAlign }) => {
  return <SubTitleWrapper textAlign={textAlign}>{subTitle}</SubTitleWrapper>;
};

export default Subtitle;
