export enum IDOIds {
  HOPERS = "hopers",
}

export interface IDOInterface {
  id: IDOIds;
  name: string;
  symbol: string;
  description: string;
  contract: string;
}

export const IDOs: IDOInterface[] = [
  {
    id: IDOIds.HOPERS,
    name: "HOPERS TOKEN",
    symbol: "$HOPERS",
    description:
      "HOPERS TOKEN is bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla...",
    contract: "juno12w5u9dtnmx07axcjlkvhmwwkuy6n427z0x2wvewaqcf5dwqn2jzsfrr0ac",
  },
];

export const getIDOById = (id: IDOIds): IDOInterface => {
  return IDOs.filter((ido: IDOInterface) => ido.id === id)[0] || {};
};
