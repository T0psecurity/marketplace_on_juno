import React from "react";
import { BasicProps } from "../../constants/BasicTypes";
import { Wrapper } from "./styled";

interface PageWrapperProps extends BasicProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PageWrapper;
