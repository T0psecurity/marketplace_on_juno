import styled from "styled-components";

export const AdvertiseWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
`;

export const AdvertiseItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const AdvertiseImage = styled.img`
  // width: 100%;
  max-height: 200px;
  max-width: 80vw;
  /* background-size: contain;
  background-repeat: no-repeat;
  background-position: center; */
`;

export const AdvertiseFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const AdvertiseDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const AdvertiseDescription = styled.div``;
