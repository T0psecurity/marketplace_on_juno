import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const HopeName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const HopePrice = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const PercentageChange = styled.div<{ isNegative: boolean }>`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  ${({ isNegative }) =>
    isNegative
      ? css`
          color: #e15241;
          & > svg {
            transform: rotate(180deg);
            path {
              fill: #e15241;
            }
          }
        `
      : css`
          color: #02e296;
          & > svg {
            path {
              fill: #02e296;
            }
          }
        `}
`;
