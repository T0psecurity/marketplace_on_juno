import React from "react";

import { Title as TitleWrapper } from "./styled";

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <TitleWrapper>{title}</TitleWrapper>;
};

export default Title;
