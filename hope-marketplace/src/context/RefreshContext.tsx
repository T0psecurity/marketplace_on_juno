import React, { useState, useEffect, useRef, useCallback } from "react";

const REFRESH_INTERVAL = 1000 * 10;
const FETCH_PRICE_INTERVAL = 60 * 60 * 1000;

const RefreshContext = React.createContext({
  value: 0,
  price: 0,
  refreshAll: () => {},
});

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

  const refreshAll = useCallback(() => {
    setValue((prev) => prev + 1);
    setPriceValue((prev) => prev + 1);
  }, []);

  return (
    <RefreshContext.Provider value={{ value, price: priceValue, refreshAll }}>
      {children}
    </RefreshContext.Provider>
  );
};

export { RefreshContext, RefreshContextProvider };
