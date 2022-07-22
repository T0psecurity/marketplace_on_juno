import ReactDOM from "react-dom";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactElement,
} from "react";

type WindowOption = {
  title?: string;
  onClose?: any;
};

interface RenderInWindowProps {
  option?: WindowOption;
  onClose: any;
  children: any;
}

const copyStyles = (src: any, dest: any) => {
  Array.from(src.styleSheets).forEach((styleSheet: any) => {
    const styleElement = styleSheet.ownerNode.cloneNode(true);
    styleElement.href = styleSheet.href;
    dest.head.appendChild(styleElement);
  });
  Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
};

const RenderInWindow = ({ option, onClose, children }: RenderInWindowProps) => {
  const [container, setContainer] = useState<any>(null);
  const newWindow: any = useRef(null);

  useEffect(() => {
    // Create container element on client-side
    setContainer(document.createElement("div"));
  }, []);

  useEffect(() => {
    // When container is ready
    if (container) {
      // Create window
      newWindow.current = window.open(
        "",
        option?.title || "",
        "width=600,height=400,left=200,top=200"
      );
      // Append container
      newWindow?.current.document.body.appendChild(container);
      newWindow.current.addEventListener("beforeunload", () => {
        if (!newWindow.current.alreadyPrompted) onClose();
        newWindow.current.alreadyPrompted = true;
      });
      copyStyles(window.document, newWindow.current.document);

      // Save reference to window for cleanup
      const curWindow: any = newWindow.current;

      // Return cleanup function
      return () => {
        curWindow.close();
      };
    }
  }, [container, option, onClose]);

  return container && ReactDOM.createPortal(children, container);
};

interface WindowChildren extends ReactElement {}

declare global {
  interface Window {
    promptedClosing: any;
  }
}

const PopoutContext = React.createContext({
  showNewWindow: (component: WindowChildren, options?: WindowOption) => {},
  closeNewWindow: (params?: any) => {},
});

const PopoutContextProvider = ({ children }: { children: any }) => {
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const [windowOption, setWindowOption] = useState<WindowOption>();
  const [windowChildren, setWindowChildren] = useState<WindowChildren>();

  const closeNewWindow = useCallback(
    (params?: any) => {
      setShowWindow(false);
      if (windowOption?.onClose && !window.promptedClosing) {
        windowOption.onClose(params);
      }
      window.promptedClosing = true;
    },
    [windowOption]
  );

  const showNewWindow = useCallback(
    (component: WindowChildren, options?: WindowOption) => {
      setWindowOption(options);
      setWindowChildren(component);
      setShowWindow(true);
      window.promptedClosing = false;
    },
    []
  );

  return (
    <PopoutContext.Provider value={{ showNewWindow, closeNewWindow }}>
      {children}
      {showWindow && (
        <RenderInWindow onClose={closeNewWindow} option={windowOption}>
          {windowChildren}
        </RenderInWindow>
      )}
    </PopoutContext.Provider>
  );
};

export { PopoutContext, PopoutContextProvider };
