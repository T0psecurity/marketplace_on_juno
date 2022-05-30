import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 650px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const MintVideoContainer = styled.div`
  width: 40%;
  margin-right: 30px;
  @media (max-width: 650px) {
  width: 80%;
  margin: 30px;
  }
`;

export const MintVideo = styled.video`
  width: 100%;
`;

export const NFTDetailContainer = styled.div`
  text-align: left;
  font-size: 20px;
  @media (max-width: 650px) {
    margin: 30px;
  }
`;

export const DetailTitle = styled.div`
  font-weight: bold;
`;

export const DetailContent = styled.div`
  margin-bottom: 10px;
  overflow-wrap: break-word;
`;
export const NFTItemImage = styled.img`
  cursor: pointer;
  height: 300px;
  border-radius: 30px;
`;