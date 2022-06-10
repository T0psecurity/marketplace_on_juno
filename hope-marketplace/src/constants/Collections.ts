export interface SocialLinks {
  discord: string;
  website: string;
  twitter: string;
}

export interface MarketplaceBasicInfo {
  imageUrl: string;
  backgroundUrl: string;
  logoUrl?: string;
  title: string;
  creator: string;
  collectionId: string;
  description: string;
  nftContract: string;
  marketplaceContract: [string];
  socialLinks: SocialLinks;
}
export interface MarketplaceMintInfo {
  totalNfts: number;
  royalties: string;
  price: string;
  mintImage: string;
  mintDate?: string;
}

export interface MarketplaceInfo extends MarketplaceBasicInfo {
  mintInfo?: MarketplaceMintInfo;
}

const Collections: MarketplaceInfo[] = [
  {
    title: "Juno Punks NFT",
    creator: "Juno Punks",
    imageUrl: "/backgrounds/juno_punks.png",
    backgroundUrl: "/marketplace-backgrounds/hopeBackground.png",
    logoUrl: "/logos/JunoPunks.gif",
    collectionId: "junopunks",
    nftContract: "",
    marketplaceContract: [""],
    socialLinks: {
      discord: "https://discord.gg/BfKPacc5jF",
      website: "https://hopers.io/",
      twitter: "https://twitter.com/JunoPunksNFT",
    },
    description:
      "Unique collectible PFP characters exclusively for the $JUNO community living on the #Cosmos | Free mint!",
    mintInfo: {
      totalNfts: 500,
      royalties: "7% + 3%",
      price: "FREE MINT • Max 1 x wallet",
      mintImage: "/mint-images/JunoPunks.gif",
    },
  },
  {
    title: "Juno Farming",
    creator: "Juno Farming",
    imageUrl: "/backgrounds/juno_farming.png",
    backgroundUrl: "/marketplace-backgrounds/hopeBackground.png",
    collectionId: "junofarming",
    nftContract: "",
    marketplaceContract: [""],
    socialLinks: {
      discord: "https://discord.gg/BfKPacc5jF",
      website: "https://hopers.io/",
      twitter: "https://twitter.com/JunoFarming",
    },
    description:
      "The first NFT collection on JUNO blockchain, who rewards the NFT stakers. This project will rewards 50% you on every MINT and ALL TRANSACTION from every SINGLE NFT.",
    mintInfo: {
      totalNfts: 2500,
      royalties: "50% + 3%",
      price: "8 JUNO",
      mintImage: "/mint-images/JunoFarming.png",
    },
  },
  {
    title: "Neta NOTs",
    creator: "NOTs",
    imageUrl: "/backgrounds/neta_nots.png",
    backgroundUrl: "/marketplace-backgrounds/hopeBackground.png",
    collectionId: "netanots",
    nftContract: "",
    marketplaceContract: [""],
    socialLinks: {
      discord: "https://t.co/6sfjxZD6U6",
      website: "https://t.co/eohk7QllPb",
      twitter: "https://twitter.com/NotsNfts",
    },
    description: "NetaNOTs are Space Warriors in the NOTs Universe",
    mintInfo: {
      totalNfts: 1950,
      royalties: "~% + 3%",
      price: "5 JUNO",
      mintImage: "/mint-images/NetaNOTs.png",
      mintDate: "20 June 2022",
    },
  },
  {
    title: "Hope Galaxy NFT - Collection 1",
    creator: "Hope Galaxy NFT",
    imageUrl: "/backgrounds/Mintpass.png",
    backgroundUrl: "/marketplace-backgrounds/hopeBackground.png",
    collectionId: "hopegalaxy1",
    nftContract:
      "juno1lqtavuw24dnnu56w79k7mefn8fhuz2w247dks2fes6hwd4rhpu2sumhhap",
    marketplaceContract: [
      "juno1m9rrvcdjatkvvdmly6pxq3yvxkp8ufaf23qkqvjcgzjgaxsef3ns6xe994",
    ],
    socialLinks: {
      discord: "https://discord.gg/BfKPacc5jF",
      website: "https://hopegalaxy.io",
      twitter: "https://twitter.com/HopeGalaxyNFT",
    },
    description:
      "HOPE GALAXY NFT holders will be able to access the HopeGalaxy dapp which will enable them to stake their NFT and receive monthly passive income generated by NFT trades which are paid out once a month.",
  },
  {
    title: "Hope Galaxy Mint Pass 1",
    creator: "Hope Galaxy NFT",
    imageUrl: "/backgrounds/Collection.png",
    backgroundUrl: "/marketplace-backgrounds/background.png",
    collectionId: "mintpass1",
    nftContract:
      "juno1ccl3kw74hl3ez4ljhx0qzwe7hl8egqcsc2mcjkgga3af86jjek0q9645r8",
    marketplaceContract: [
      "juno1adn5atr89yp8pmurtem882u3rwk0ug7p7d3pwp7g83glqyhfua8sq56z80",
    ],
    socialLinks: {
      discord: "https://discord.gg/BfKPacc5jF",
      website: "https://hopegalaxy.io",
      twitter: "https://twitter.com/HopeGalaxyNFT",
    },
    description:
      "This mint pass is the ticket for the minting of the Hope Galaxy NFT collection once it is launched",
  },
];

export const getCollectionById = (id: string): MarketplaceInfo => {
  return Collections.filter(
    (collection: MarketplaceInfo) => collection.collectionId === id
  )[0];
};

export default Collections;

// !Sample Object
// {
//   title: "",
//   creator: "",
//   imageUrl: "",
//   backgroundUrl: "",
//   collectionId: "",
//   nftContract: "",
//   marketplaceContract: [""],
//   socialLinks: {
//     discord: "",
//     website: "",
//     twitter: "",
//   },
//   mintInfo: {
//     totalNfts: 1950,
//     royalties: "",
//     price: "",
//     mintImage: "",
//     mintDate: "",
//   },
//   description: "",
// },
