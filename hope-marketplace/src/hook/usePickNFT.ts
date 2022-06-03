import { useCallback, useMemo } from "react";
import { useAppSelector } from "../app/hooks";

const usePickNFT = () => {
  const unlistedNFTs = useAppSelector((state) => state.nfts.unlistedNFTs);
  const listedNFTs = useAppSelector((state) => state.nfts.listedNFTs);
  const marketplaceNFTs = useAppSelector((state) => state.nfts.marketplaceNFTs);

  const totalNFTs = useMemo(() => {
    return [...unlistedNFTs, ...listedNFTs, ...marketplaceNFTs];
  }, [listedNFTs, unlistedNFTs, marketplaceNFTs]);

  const pickNFTByTokenId = useCallback(
    (id: string) => {
      let targetNFT = {};
      for (let i = 0; i < totalNFTs.length; i++) {
        const crrNFT: any = totalNFTs[i];
        if (crrNFT.token_id === id) {
          console.log("pickNFTByTokenId", crrNFT);
          targetNFT = crrNFT;
          break;
        }
      }
      console.log("targetNFT", targetNFT);
      return targetNFT;
    },
    [totalNFTs]
  );

  return { pickNFTByTokenId };
};

export default usePickNFT;
