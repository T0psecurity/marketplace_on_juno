import React, { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BasicProps } from "../../constants/BasicTypes";
import { Title } from "../PageTitle";
import { Tab, Tabs } from "../Tab";
import { HorizontalDivider, Wrapper } from "./styled";

type TabType = {
	title: string;
	url?: string;
	selected?: (arg: any) => boolean;
	onClick?: (arg: any) => void;
	extend?: any;
};
interface ExploreHeaderProps extends BasicProps {
	title?: string;
	tabs?: TabType[];
	extra?: any;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({
	title,
	tabs,
	extra,
	className,
}) => {
	const history = useHistory();
	const { pathname } = useLocation();
	const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(
		null
	);

	const wrapperPadding = useMemo(() => {
		if (wrapperElement) {
			return wrapperElement.offsetLeft;
		}
		return 0;
	}, [wrapperElement]);

	return (
		<>
			<HorizontalDivider offset={wrapperPadding} />
			<Wrapper ref={(node) => setWrapperElement(node)} className={className}>
				{!!title ? (
					<Title title={title} justifyContent="flex-start" />
				) : (
					<div />
				)}
				{!!tabs && tabs.length > 0 ? (
					<Tabs>
						{tabs.map((tab, index) => (
							<Tab
								key={index}
								title={tab.title}
								selected={
									tab.selected ? tab.selected(tab) : pathname === tab.url
								}
								onClick={() =>
									tab.onClick ? tab.onClick(tab) : history.push(tab.url || "/")
								}
							/>
						))}
					</Tabs>
				) : (
					<div />
				)}
				{!!extra ? extra : <div />}
			</Wrapper>
			<HorizontalDivider offset={wrapperPadding} />
		</>
	);
};

export default ExploreHeader;

/**
 * <Tabs>
      <Tab
        selected={pathname === "/collections/explore"}
        onClick={() => history.push("/collections/explore")}
        title="Explore"
      />
      <Tab
        selected={pathname === "/activity"}
        onClick={() => history.push("/activity")}
        title="Activity"
      />
    </Tabs>
 * 
 */
