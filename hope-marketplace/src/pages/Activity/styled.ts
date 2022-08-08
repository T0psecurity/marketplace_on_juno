import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 50px;
`;

export const Logo = styled.div`
  background: url(${({ theme }) =>
    theme.isDark ? "/others/logoHopers_dark.png" : "/others/logoHopers.png"});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 15vw;
  min-height: 70px;
  max-height: 150px;
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin: 30px;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const SearchWrapper = styled.div`
  width: 50%;
  min-width: 350px;
  max-width: 700px;
  margin: 20px auto;
  @media (max-width: 375px) {
    width: 100%;
    min-width: unset;
  }
`;

export const FilterContainer = styled.div`
  position: relative;
  margin: 20px 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 700px) {
    margin: 20px auto;
  }
`;

export const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const CoinIcon = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

export const SearchContainer = styled.div`
  width: 180px;
  position: absolute;
  left: 100%;
  @media (max-width: 700px) {
    position: relative;
    left: unset;
  }
`;

export const HistoryContainer = styled.div`
  margin: 20px 50px;
  @media (max-width: 400px) {
    margin: 20px 0;
  }
`;
