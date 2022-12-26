export interface TTable<T extends object> {
	data: T[];
	columns: TColumns<T>[];
	layout?: string;
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
		render?: (value: T[K] | "" | 0, data: T) => JSX.Element | null;
	};
}[keyof T];

export enum ColumnTypes {
	NUMBER,
	STRING,
	DATE,
}
