import React, { ReactElement } from "react";

import { Title as TitleWrapper } from "./styled";

interface TitleProps {
  title: string;
  icon?: ReactElement;
}

const Title: React.FC<TitleProps> = ({ title, icon }) => {
  return (
    <TitleWrapper>
      {title} {icon ? icon : null}
    </TitleWrapper>
  );
};

export default Title;
