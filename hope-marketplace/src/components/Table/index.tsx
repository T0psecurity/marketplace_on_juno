import React, { useMemo, useState } from "react";
import {
	EmptyRow,
	SortHeaderIcon,
	TableBody,
	TableHeader,
	TableHeaderContent,
	TableHeaderRow,
	Wrapper,
} from "./styled";
import Row from "./TableRow";
import { ColumnTypes, TSortDirection, TTable } from "./type";

const Table = <T extends object>({
	data,
	columns,
	renderDetailRow,
	layout,
	option,
}: TTable<T>) => {
	const [sortDirections, setSortDirections] = useState<TSortDirection>(
		{} as TSortDirection
	);

	const handleClickSortDirectionButton = (columnName: string) => {
		if (!columnName) return;

		setSortDirections((prev) => ({
			field: columnName,
			direction: prev?.direction === "up" ? "down" : "up",
		}));
	};

	const sortedData = useMemo(() => {
		if (!sortDirections?.field) return data;
		const sortedColumn = columns.find((column) =>
			((column?.name || column?.title || "") as string).includes(
				sortDirections.field
			)
		);
		if (!sortedColumn || !sortedColumn.sort) return data;
		return data.sort((data1, data2) => {
			const defaultValue = sortedColumn.type === ColumnTypes.NUMBER ? 0 : "";
			const value1 = sortedColumn.name
				? data1[sortedColumn.name] || defaultValue
				: defaultValue;
			const value2 = sortedColumn.name
				? data2[sortedColumn.name] || defaultValue
				: defaultValue;
			if (typeof sortedColumn.sort === "boolean") {
				return sortDirections.direction === "up"
					? value1 > value2
						? 1
						: -1
					: value2 > value1
					? 1
					: -1;
			}
			return sortedColumn.sort
				? sortedColumn.sort(data1, data2, sortDirections.direction)
				: 0;
		});
	}, [columns, data, sortDirections]);

	return (
		<Wrapper columnsCount={columns.length} layout={layout}>
			<TableHeaderRow>
				{columns.map((column, index) => {
					const directionKey = (column.name || column.title) as string;
					const sortedDirection =
						sortDirections.field === directionKey
							? sortDirections.direction
							: "";
					return (
						<TableHeader key={index}>
							<TableHeaderContent>
								{column.title ?? column.name ?? ""}
								{column.sort && (
									<SortHeaderIcon
										className={`fa fa-sort${
											sortedDirection ? `-${sortedDirection}` : ""
										}`}
										visible={sortedDirection}
										onClick={() => handleClickSortDirectionButton(directionKey)}
									/>
								)}
							</TableHeaderContent>
						</TableHeader>
					);
				})}
			</TableHeaderRow>
			<TableBody>
				{sortedData.map((dataItem, dataIndex) => (
					<Row<T>
						key={dataIndex}
						columns={columns}
						renderDetailRow={renderDetailRow}
						data={dataItem}
						index={dataIndex}
					/>
				))}
				{!data?.length && (
					<EmptyRow columnsCount={columns.length}>
						{option?.emptyString || "No Data"}
					</EmptyRow>
				)}
			</TableBody>
		</Wrapper>
	);
};

export default Table;

export * from "./type";
