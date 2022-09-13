import React, { ReactElement } from "react";
import { BasicProps } from "../../constants/BasicTypes";

import { Title as TitleWrapper } from "./styled";

interface TitleProps extends BasicProps {
  title: string;
  icon?: ReactElement;
  justifyContent?: string;
}

const Title: React.FC<TitleProps> = ({ title, icon, justifyContent }) => {
  return (
    <TitleWrapper justifyContent={justifyContent}>
      {title} {icon ? icon : null}
    </TitleWrapper>
  );
};

export default Title;
