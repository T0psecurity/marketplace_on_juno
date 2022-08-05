import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin: 150px 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

export const Title = styled.div`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.fontColor};
  margin: 20px 0;
  text-align: center;
`;

export const PriceStatisticContainer = styled.div`
  margin: auto;
  /* display: table; */
`;

export const PriceStatisticItem = styled.div`
  /* display: table-row; */
  display: grid;
  grid-template-columns: 70px auto 50px 50px 50px 50px;
  grid-gap: 20px;
  align-items: center;
  @media (max-width: 450px) {
    grid-template-columns: 60px auto 50px 50px 50px 50px;
    grid-gap: 5px;
  }
`;

export const PriceStatisticContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const TokenName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
`;

export const CoinImage = styled.div<{ coinType: string }>`
  width: 50px;
  height: 50px;
  margin: 10px;
  background: url(${({ coinType }) =>
    `/coin-images/${coinType.replace(/\//g, "")}.png`});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  @media (max-width: 450px) {
    width: 40px;
    height: 40px;
  }
`;

export const Span = styled.span<{
  color?: string;
  fontSize?: string;
  fontWeight?: string;
}>`
  display: inline-block;
  color: ${({ color }) => color ?? ""};
  font-size: ${({ fontSize }) => fontSize ?? ""};
  font-weight: ${({ fontWeight }) => fontWeight ?? ""};
`;
