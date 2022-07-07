import React, { useState, useEffect, useRef } from "react";

const REFRESH_INTERVAL = 5000;
const FETCH_PRICE_INTERVAL = 60 * 60 * 1000;

const RefreshContext = React.createContext({ value: 0, price: 0 });

// Check if the tab is active in the user browser
const useIsBrowserTabActive = () => {
  const isBrowserTabActiveRef = useRef(true);

  useEffect(() => {
    const onVisibilityChange = () => {
      isBrowserTabActiveRef.current = !document.hidden;
    };

    window.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return isBrowserTabActiveRef;
};

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }: { children: any }) => {
  const [value, setValue] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const isBrowserTabActiveRef = useIsBrowserTabActive();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setValue((prev) => prev + 1);
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [isBrowserTabActiveRef]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setPriceValue((prev) => prev + 1);
      }
    }, FETCH_PRICE_INTERVAL);
    return () => clearInterval(interval);
  }, [isBrowserTabActiveRef]);

  return (
    <RefreshContext.Provider value={{ value, price: priceValue }}>
      {children}
    </RefreshContext.Provider>
  );
};

export { RefreshContext, RefreshContextProvider };
