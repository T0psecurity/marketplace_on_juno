import React, { ReactElement } from "react";
import { BasicProps } from "../../constants/BasicTypes";
import { TabsWrapper, TabWrapper } from "./styled";

interface TabsProps extends BasicProps {}

interface TabProps extends BasicProps {
  selected: boolean;
  title: string | ReactElement;
  onClick?: () => void;
}

export const Tabs: React.FC<TabsProps> = ({ className, children }) => {
  return <TabsWrapper className={className}>{children}</TabsWrapper>;
};

export const Tab: React.FC<TabProps> = ({
  className,
  title,
  selected,
  onClick,
}) => {
  return (
    <TabWrapper
      className={className}
      selected={selected}
      onClick={onClick || (() => {})}
    >
      {title}
    </TabWrapper>
  );
};
