import React from "react";
import { TableBody, TableHeader, TableHeaderRow, Wrapper } from "./styled";
import Row from "./TableRow";
import { TTable } from "./type";

const Table = <T extends object>({
	data,
	columns,
	renderDetailRow,
	layout,
}: TTable<T>) => {
	return (
		<Wrapper columnsCount={columns.length} layout={layout}>
			<TableHeaderRow>
				{columns.map((column, index) => (
					<TableHeader key={index}>
						{column.title ?? column.name ?? ""}
					</TableHeader>
				))}
			</TableHeaderRow>
			<TableBody>
				{data.map((dataItem, dataIndex) => (
					<Row<T>
						key={dataIndex}
						columns={columns}
						renderDetailRow={renderDetailRow}
						data={dataItem}
						index={dataIndex}
					/>
				))}
			</TableBody>
		</Wrapper>
	);
};

export default Table;

export * from "./type";
