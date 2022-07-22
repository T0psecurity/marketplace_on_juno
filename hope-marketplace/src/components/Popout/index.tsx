import React, { useCallback } from "react";

import { useContext } from "react";
import { PopoutContext } from "../../context/PopoutContext";

import { Wrapper, Logo, OperationButton } from "./styled";

interface QuickSwapProps {
  closeNewWindow: () => void;
  onClose: (param?: any) => any;
}

const QuickSwap: React.FC<QuickSwapProps> = ({ closeNewWindow, onClose }) => {
  const handleAccept = () => {
    onClose(100);
    closeNewWindow();
  };

  return (
    <Wrapper>
      <Logo />
      <OperationButton onClick={handleAccept}>Accept</OperationButton>
    </Wrapper>
  );
};

const usePopoutQuickSwap = () => {
  const { showNewWindow, closeNewWindow } = useContext(PopoutContext);

  const popoutQuickSwap = useCallback(
    (callback?: any) => {
      showNewWindow(
        <QuickSwap closeNewWindow={closeNewWindow} onClose={callback} />,
        {
          title: "Quick Swap",
          onClose: callback,
        }
      );
    },
    [closeNewWindow, showNewWindow]
  );
  return popoutQuickSwap;
};

export default usePopoutQuickSwap;
