import { BasicProps } from "../../constants/BasicTypes";

export interface TFlex extends BasicProps {
	justifyContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-around"
		| "space-between"
		| "space-evenly";
	alignItems?: "baseline" | "flex-start" | "flex-end" | "center";
	flexDirection?: "column" | "row";
	flexWrap?:
		| "nowrap"
		| "wrap"
		| "wrap-reverse"
		| "initial"
		| "inherit"
		| "revert"
		| "revert-layer";
	gap?: string;
	width?: string;
	margin?: string;
	padding?: string;
	backgroundColor?: string;
}
