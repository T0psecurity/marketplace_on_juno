import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

export const ThemeContext = React.createContext({
  toggleTheme: (isDark: boolean) => {},
  isDark: false,
});

export const ThemeContextProvider = ({ children }: { children: any }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = (isDark: boolean) => {
    setIsDark(isDark);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      <ThemeProvider theme={{ isDark }}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
