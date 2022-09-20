import styled, { css, keyframes } from "styled-components";

export const HeaderBackground = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  width: 100vw;
`;

export const HeaderWrapper = styled.div`
  /* width: 100vw; */
  min-height: 70px;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  display: flex;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 48px);
  z-index: 2;

  /* @media (min-width: 600px) {
    min-height: 64px;
  }
  @media (max-width: 425px) {
    padding-left: 30px;
  }
  @media (max-width: 375px) {
    padding-left: 10px;
  } */
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-size: 30px;
  font-weight: bold;
`;

export const HeaderLogo = styled.div<{ isMobile: boolean }>`
  /* background: url("/logo.png"); */
  background: url(${({ theme }) =>
    theme.isDark
      ? "/others/hopeHeaderLogo_dark.png"
      : "/others/hopeHeaderLogo.png"});
  background-size: cover;
  background-position: center;
  width: ${({ isMobile }) => (isMobile ? "205px" : "248px")};
  height: ${({ isMobile }) => (isMobile ? "50px" : "60px")};
  cursor: pointer;
`;

export const ProfileIcon = styled.div`
  background: url("/others/user-hopers.png");
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  width: 40px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0;
  gap: 10px;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  &: last-child {
    justify-content: space-between;
  }
`;

export const LinkButton = styled.div<{ selected: boolean }>`
  cursor: pointer;
  font-size: 20px;
  background: none;
  font-weight: bold;
  margin: 0 10px;
  color: ${({ theme }) => theme.colors.fontColor};
  padding: 5px 10px;
  ${({ selected }) =>
    selected &&
    css`
      background: rgba(2, 226, 150, 0.2);
      border: 0.5px solid #02e296;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-decoration: underline #02e296 4px;
      text-underline-offset: 6px;
    `}
`;

export const HorizontalDivider = styled.div`
  width: 2px;
  height: 23px;
  margin: 0 5px;
  background-color: ${({ theme }) => theme.colors.fontColor};
`;

export const WalletTypeModal = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  padding: 10px;
  border: 3px solid #02e296;
  border-radius: 10px;
  opacity: 0;
  transition: 0.5s opacity;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

export const Logo = styled.div`
  background: url("/others/hopeHeaderLogo.png");
  background-size: cover;
  background-position: center;
  width: 124px;
  height: 30px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 30px;
`;

export const WalletImage = styled.img`
  height: 80px;
  cursor: pointer;
  transform: scale(0.8);
  transition: 0.5s transform;
  &:hover {
    transform: scale(1);
  }
`;

export const ConnectWalletButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  /* width: 200px; */
  width: max-content;
  max-width: 200px;
  padding: 6px 16px;
  color: black;
  /* background-color: #2e7d32; */
  background: linear-gradient(90deg, #02e296 0%, rgba(2, 226, 150, 0) 114.55%);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-color: white;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover {
    text-decoration: none;
    /* background-color: #1b5e20; */
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    ${WalletTypeModal} {
      opacity: 1;
    }
  }
`;

export const DisconnectIcon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;

export const MenuIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const MenuIcon = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  & > svg {
    rect {
      fill: ${({ theme }) => theme.colors.fontColor};
    }
  }
`;

export const MenuContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(2, 226, 150, 0.5) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  color: ${({ theme }) => theme.colors.fontColor};
  /* color: ${({ theme }) => (theme.isDark ? "white" : "#686868")}; */
  border: 1px solid #02e296;
  border-radius: 10px;
  box-shadow: 0px 5px 5px -3px rgb(${({ theme }) =>
            theme.isDark ? "255 255 255" : "0 0 0"} / 20%),
    0px 8px 10px 1px
      rgb(${({ theme }) => (theme.isDark ? "255 255 255" : "0 0 0")} / 14%),
    0px 3px 14px 2px
      rgb(${({ theme }) => (theme.isDark ? "255 255 255" : "0 0 0")} / 12%);
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 8px;
  z-index: 2;
`;

export const MenuItem = styled.div<{ lastElement?: boolean }>`
  text-align: left;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 1rem;
  line-height: 1.5;
  /* width: max-content; */
  letter-spacing: 0.00938rem;
  border-top: 1px solid #02e296;
  background: linear-gradient(
    180deg,
    rgba(2, 226, 150, 0.1) 0%,
    rgba(2, 226, 150, 0) 99.99%,
    rgba(2, 226, 150, 0) 100%
  );
  ${({ lastElement }) =>
    lastElement &&
    css`
      border-bottom: 1px solid #02e296;
    `}
  svg {
    path {
      fill: ${({ theme }) => theme.colors.fontColor};
      /* fill: ${({ theme }) => (theme.isDark ? "white" : "#686868")}; */
    }
    .black-path {
      fill: ${({ theme }) => (theme.isDark ? "white" : "black")};
    }
    .white-path {
      fill: ${({ theme }) => (theme.isDark ? "black" : "white")};
    }
  }
`;

const expandSubMenuAnimation = keyframes`
  from {
    height: 0;
    border-top-color: transparent;
  }
  to {
    height: 37px;
    border-top-color: #02e296;
  }
`;

const collapseSubMenuAnimation = keyframes`
  from {
    height: 37px;
    border-top-color: #02e296;
  }
  to {
    height: 0;
    border-top-color: transparent;
  }
`;

export const SubMenuContainer = styled.div<{
  expanded: boolean;
  loaded: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 0 10px;
  background: linear-gradient(
    180deg,
    rgba(2, 226, 150, 0.1) 0%,
    rgba(2, 226, 150, 0) 99.99%,
    rgba(2, 226, 150, 0) 100%
  );
  border-top: 1px solid #02e296;
  ${({ expanded, loaded }) =>
    expanded
      ? css`
          animation: ${expandSubMenuAnimation} ${loaded ? "500ms" : "0ms"}
            linear forwards;
        `
      : css`
          animation: ${collapseSubMenuAnimation} ${loaded ? "500ms" : "0ms"}
            linear forwards;
        `};
  ${MenuItem} {
    width: 50%;
    border-top: none;
    &:first-child {
      border-right: 1px solid #02e296;
    }
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const MenuFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 0;
`;

export const MenuFooterLinkItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #2e7d32; */
  background-color: green;
  margin: 10px;
  border-radius: 40px;
  cursor: pointer;
`;
