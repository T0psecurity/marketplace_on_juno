import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import NFTContainer from "../../components/NFTContainer";
import NFTIntroduction from "../../components/NFTIntroduction";
import { NFTItemStatus } from "../../components/NFTItem";
import { Title } from "../../components/PageTitle";
import useFetch from "../../hook/useFetch";
import {
  Wrapper,
  HorizontalDivider,
  SortButtonContainer,
  SortButton,
} from "./styled";

const Marketplace: React.FC = () => {
  const { fetchListedNFTs } = useFetch();
  const [isAscending, setIsAscending] = React.useState(true);
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const marketplaceNFTs = useAppSelector((state) => state.nfts.marketplaceNFTs);
  const hopeMarketplaceNFTs: any = [];
  marketplaceNFTs.forEach((item: any) => {
    if (item.token_id.includes("Hope")) hopeMarketplaceNFTs.push(item);
  });
  const handleSort = () => {
    setIsAscending(!isAscending);
  };
  useEffect(() => {
    if (account && account.address) {
      fetchListedNFTs();
    }
  }, [account, fetchListedNFTs]);
  return (
    <Wrapper>
      <NFTIntroduction backgroundImage="/others/background.png" />
      <Title title="Mint Pass Hope Galaxy NFT - Collection 1" />
      <HorizontalDivider />
      <SortButtonContainer>
        <SortButton onClick={handleSort}>
          Sort By Price {!isAscending ? "Ascending" : "Descending"}
        </SortButton>
      </SortButtonContainer>
      <NFTContainer
        nfts={hopeMarketplaceNFTs}
        status={NFTItemStatus.BUY}
        sort={isAscending ? "as" : "des"}
      />
    </Wrapper>
  );
};

export default Marketplace;
