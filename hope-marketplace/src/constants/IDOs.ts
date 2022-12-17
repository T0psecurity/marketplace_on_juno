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
			"Hopers token is the utility token of the all-in-one platform hopers.io. It powers the ecosystem to allow you to be part of our growth and gives you access to staking, syrup pool, early IDO opportunities, yield farming, and liquidity.",
		contract: "juno1rtzpsz2ane0vfy99enny0gkaac3kjmg4vc640y7nn0jf0q4jnfzq44lxuf",
		// juno19778adwcy8r5ermj678dyhsn7aj4fpar375jmhuwezc9uxed7tnqxwvcv3
	},
];

export const getIDOById = (id: IDOIds): IDOInterface => {
	return IDOs.filter((ido: IDOInterface) => ido.id === id)[0] || {};
};
