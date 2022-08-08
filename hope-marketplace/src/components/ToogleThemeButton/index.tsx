import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { SlashIcon } from "../SvgIcons";
import { StyledMoonIcon, StyledSunIcon, Wrapper } from "./styled";

const ToggleThemeButton: React.FC = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <StyledSunIcon onClick={() => toggleTheme(false)} />
      <SlashIcon />
      <StyledMoonIcon onClick={() => toggleTheme(true)} />
    </Wrapper>
  );
};

export default ToggleThemeButton;
