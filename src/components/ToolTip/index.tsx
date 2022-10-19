import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import useOnClickOutside from "../../hook/useOnClickOutside";

const ToolTip: React.FC<any> = ({ ...props }) => {
  const { children, ...rest } = props;
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const handleClickOutsideTooltip = () => {
    ReactTooltip.hide();
  };

  useOnClickOutside(ref, handleClickOutsideTooltip);
  return (
    <ReactTooltip {...rest}>
      <div ref={(node) => setRef(node)}>{children}</div>
    </ReactTooltip>
  );
};

export default ToolTip;
