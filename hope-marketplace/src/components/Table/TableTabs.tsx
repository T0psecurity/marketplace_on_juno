import React, { useEffect, useState } from "react";
import { TableTab, TableTabContainer } from "./styled";
import { ITableTab } from "./type";

const TableTabs: React.FC<ITableTab> = ({ tabs }) => {
	const [selectedTab, setSelectedTab] = useState<string>(tabs[0] || "");
	const [highLightElementInfo, setHighLightElementInfo] = useState({
		width: 0,
		left: 0,
	});

	useEffect(() => {
		const selectedTabElement = document.getElementById(
			`table-tab-${selectedTab}`
		);
		setHighLightElementInfo({
			left: selectedTabElement?.offsetLeft || 0,
			width: selectedTabElement?.offsetWidth || 0,
		});
	}, [selectedTab]);

	return (
		<TableTabContainer
			left={highLightElementInfo.left}
			width={highLightElementInfo.width}
		>
			{tabs.map((tab, index) => (
				<TableTab
					id={`table-tab-${tab}`}
					key={index}
					checked={selectedTab === tab}
					onClick={() => setSelectedTab(tab)}
				>
					{tab}
				</TableTab>
			))}
		</TableTabContainer>
	);
};

export default TableTabs;
