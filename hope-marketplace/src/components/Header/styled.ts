import styled from "styled-components";

export const HeaderWrapper = styled.div`
  /* width: 100vw; */
  height: 70px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: static;

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

export const HeaderLogo = styled.div`
  background: url("/logo.png");
  background-size: cover;
  background-position: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

export const ProfileIcon = styled.div`
  background: url("/others/user-hopers.jpg");
  background-size: cover;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkButton = styled.div`
  cursor: pointer;
  font-size: 20px;
  background: none;
  font-weight: bold;
  margin: 0 10px;
`;

export const ConnectWalletButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  padding: 6px 16px;
  color: #fff;
  background-color: #2e7d32;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    text-decoration: none;
    background-color: #1b5e20;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
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
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
`;

export const MenuIcon = styled.div``;

export const MenuContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const MenuItem = styled.div`
  text-align: left;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5;
  width: max-content;
  letter-spacing: 0.00938rem;
`;
