import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

export const ThemeContext = React.createContext({
  toggleTheme: (isDark: boolean) => {},
  isDark: false,
});

type ThemeType = {
  colors: {
    backgroundColor: string;
    fontColor: string;
  };
};

const THEMES: { LIGHT: ThemeType; DARK: ThemeType } = {
  LIGHT: {
    colors: {
      backgroundColor: "white",
      fontColor: "black",
    },
  },
  DARK: {
    colors: {
      backgroundColor: "#313131",
      fontColor: "white",
    },
  },
};

export const ThemeContextProvider = ({ children }: { children: any }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  const toggleTheme = (isDark: boolean) => {
    setIsDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      <ThemeProvider theme={{ isDark, ...THEMES[isDark ? "DARK" : "LIGHT"] }}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
