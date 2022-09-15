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
    contract: "juno19778adwcy8r5ermj678dyhsn7aj4fpar375jmhuwezc9uxed7tnqxwvcv3",
  },
];

export const getIDOById = (id: IDOIds): IDOInterface => {
  return IDOs.filter((ido: IDOInterface) => ido.id === id)[0] || {};
};
