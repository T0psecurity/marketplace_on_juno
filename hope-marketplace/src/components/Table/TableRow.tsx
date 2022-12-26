import React, { useState } from "react";
import {
	TableContent,
	TableDetailRow,
	TableRow,
	TableRowMainContent,
} from "./styled";
import { ColumnTypes, TRow } from "./type";

const AnimationTime = 500; // in ms

const Row = <T extends object>({
	renderDetailRow,
	columns,
	index,
	data,
}: TRow<T>) => {
	const [expanded, setExpanded] = useState<boolean | undefined>(undefined);
	const [finishedExpanding, setFinishedExpanding] = useState<boolean>(false);
	const [element, setElement] = useState<HTMLDivElement | null>(null);

	const handleClickRow = () => {
		if (!renderDetailRow) {
			return;
		}
		if (expanded) {
			setTimeout(() => setFinishedExpanding(false), AnimationTime);
		} else {
			setFinishedExpanding(true);
		}
		setExpanded((prev) => !prev);
	};

	const detailRowHeight = element?.scrollHeight || 0;

	// const height = useMemo(() => element?.scrollHeight || 0, [element]);

	return (
		<TableRow
			expanded={expanded}
			finishedExpanded={finishedExpanding}
			detailRowHeight={detailRowHeight}
			animationTime={AnimationTime}
		>
			<TableRowMainContent onClick={() => handleClickRow()}>
				{columns.map((column, columnIndex) => {
					const defaultValue = column.type === ColumnTypes.NUMBER ? 0 : "";
					const value = column.name
						? data[column.name] || defaultValue
						: defaultValue;
					return (
						<TableContent key={columnIndex}>
							{column.render ? column.render(value, data) : value}
						</TableContent>
					);
				})}
			</TableRowMainContent>
			{renderDetailRow && (
				<TableDetailRow
					ref={(node: HTMLDivElement | null) => setElement(node)}
					columnsCount={columns.length}
					index={index}
				>
					{renderDetailRow(data)}
				</TableDetailRow>
			)}
		</TableRow>
	);
};

export default Row;
