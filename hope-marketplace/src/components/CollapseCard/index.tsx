import React, { useState, useEffect } from "react";

import { Wrapper, CartTitle, Icon, ContentContainer } from "./styled";

interface CollapseCardProps {
  title: string;
  expanded?: boolean;
  onClick?: any;
  maxHeight?: string;
  className?: string;
}

const CollapseCard: React.FC<CollapseCardProps> = ({
  children,
  title,
  onClick,
  expanded,
  maxHeight,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    setIsExpanded(expanded || isExpanded);
  }, [isExpanded, expanded]);

  const handleClickHeader = (e: any) => {
    if (onClick && typeof onClick === "function") {
      const result = onClick(e);
      if (!result) return;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <Wrapper className={className}>
      <CartTitle onClick={handleClickHeader}>
        {title}
        <Icon expanded={isExpanded} />
      </CartTitle>
      <ContentContainer expanded={isExpanded} maxHeight={maxHeight}>
        {children}
      </ContentContainer>
    </Wrapper>
  );
};

export default CollapseCard;
