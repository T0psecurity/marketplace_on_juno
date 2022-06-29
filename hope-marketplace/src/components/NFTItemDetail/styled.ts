import styled, { css } from "styled-components";

export const MintVideoContainer = styled.div`
  width: 50vw;
  /* height: 300px; */
  margin-right: 30px;
  position: relative;
`;

export const MintVideo = styled.video`
  width: 100%;
`;

export const NFTDetailContainer = styled.div`
  text-align: left;
  font-size: 20px;
`;

export const DetailTitle = styled.div`
  font-weight: bold;
`;

export const DetailContent = styled.div`
  margin-bottom: 10px;
  overflow-wrap: anywhere;
`;

export const NFTItemImage = styled.img`
  cursor: pointer;
  height: 300px;
  border-radius: 30px;
`;

export const Wrapper = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: 50vw auto;
  grid-gap: 20px;
  ${({ isMobile }) =>
    isMobile &&
    css`
      grid-template-columns: auto;
      justify-items: center;
      ${MintVideoContainer} {
        margin: 0;
        width: 300px;
        margin-bottom: 10px;
      }
      ${NFTDetailContainer} {
        margin: 10px;
      }
    `}
`;

export const NFTItemImageDownloadIcon = styled.svg`
  position: absolute;
  right: 7px;
  top: 10px;
  cursor: pointer;
`;
