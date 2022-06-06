import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  padding: 0 100px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: left;
`;

export const StyledButton = styled.button<{ backgroundColor?: string }>`
  width: 132px;
  height: 45px;
  background-color: ${({ backgroundColor }) => backgroundColor || "#39C639"};
  border: 1px solid #000;
  border-radius: 4px;
  margin-right: 30px;
  font-size: 25px;
  font-weight: 700;
`;

export const MintDetailContainer = styled.div`
  display: grid;
  grid-template-columns: auto 640px;
  padding: 30px;
  margin-top: 110px;
  margin-bottom: 90px;
  border: 1px solid #d6d6d6;
`;

export const MintDetailInfo = styled.div`
  text-align: left;
`;

export const DetailTitle = styled.div<{ bold?: boolean }>`
  font-size: 25px;
  font-weight: ${({ bold }) => (bold ? "700" : "500")};
  margin-bottom: 25px;
`;

export const DetailInfo = styled.div`
  font-size: 25px;
  font-weight: 400;
  color: #797979;
`;

export const DetailBlockContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 95px 0 65px 0;
`;

export const DetailBlock = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  justify: center;
  align-items: center;
  font-size: 25px;
  padding: 10px;
  width: ${({ width }) => width ?? "275px"};
  border: 1px solid black;
`;

export const DetailBlockTitle = styled.div`
  text-align: center;
  color: #797979;
`;

export const DetailBlockContent = styled.div`
  text-align: center;
  margin-top: 15px;
`;

export const OperationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 30px;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MintButton = styled.button`
  background-color: #39c639;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 25px;
  font-weight: 700;
  width: 325px;
  height: 53px;
`;

export const MintImage = styled.img`
  width: 600px;
  margin-left: 20px;
`;
