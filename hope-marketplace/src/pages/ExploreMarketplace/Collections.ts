import Mintpass from "../../assets/images/Mintpass.png";
import JunoPunks from "../../assets/images/juno_punks.png";
import Collection from "../../assets/images/Collection.png";
import { MarketplaceItemProps } from "./MarketplaceItem";

export const Collections: MarketplaceItemProps[] = [
  {
    title: "JUNO PUNKS",
    imageUrl: JunoPunks,
    linkUrl: "/collections/junopunks",
  },
  {
    title: "Hope Galaxy NFT - Collection 1",
    imageUrl: Mintpass,
    linkUrl: "/collections/hopegalaxy1",
  },
  {
    title: "Hope Galaxy Mint Pass 1",
    imageUrl: Collection,
    linkUrl: "/collections/mintpass1",
  },
];
