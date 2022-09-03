import React from "react";
import { TabProps, TabsProps } from "./types";
import { TabsWrapper, TabWrapper } from "./styled";

export const Tabs: React.FC<TabsProps> = ({ className, children, ...rest }) => {
  return (
    <TabsWrapper className={className} {...rest}>
      {children}
    </TabsWrapper>
  );
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
