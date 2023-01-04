type TTableOption = {
	emptyString?: string;
};

export interface TTable<T extends object> {
	data: T[];
	columns: TColumns<T>[];
	layout?: string;
	option?: TTableOption;
	renderDetailRow?: TRenderDetailRow<T>;
}

export interface TRow<T extends object> {
	data: T;
	renderDetailRow?: TRenderDetailRow<T>;
	columns: TColumns<T>[];
	index: number;
}

export type TRenderDetailRow<T extends object> = (
	param: T
) => JSX.Element | null;

export type TColumns<T extends object> = {
	[K in keyof T]: {
		name: K | "";
		type?: ColumnTypes;
		title?: string;
		sort?: boolean | ((data1: T, data2: T, direction: "up" | "down") => number);
		render?: (value: T[K] | "" | 0, data: T) => JSX.Element | null;
	};
}[keyof T];

export type TSortDirection = {
	field: string;
	direction: "up" | "down";
};

export enum ColumnTypes {
	NUMBER,
	STRING,
	DATE,
}
