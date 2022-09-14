export enum IDOIds {
  HOPERS = "hopers",
}

export interface IDOInterface {
  id: IDOIds;
  title: string;
  name: string;
  description: string;
  contract: string;
}

export const IDOs: IDOInterface[] = [
  {
    id: IDOIds.HOPERS,
    title: "HOPERS TOKEN",
    name: "$HOPERS",
    description:
      "HOPERS TOKEN is bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla...",
    contract: "juno12w5u9dtnmx07axcjlkvhmwwkuy6n427z0x2wvewaqcf5dwqn2jzsfrr0ac",
  },
];
