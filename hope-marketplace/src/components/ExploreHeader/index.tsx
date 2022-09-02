import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BasicProps } from "../../constants/BasicTypes";
import { Title } from "../PageTitle";
import { Tab, Tabs } from "../Tab";
import { HorizontalDivider, Wrapper } from "./styled";

interface ExploreHeaderProps extends BasicProps {
  title?: string;
  tabs?: { title: string; url: string }[];
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ title, tabs }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <>
      <HorizontalDivider />
      <Wrapper>
        {!!title ? (
          <Title title={title} justifyContent="flex-start" />
        ) : (
          <div />
        )}
        {!!tabs && tabs.length > 0 ? (
          <Tabs>
            {tabs.map((tab, index) => (
              <Tab
                title={tab.title}
                selected={pathname === tab.url}
                onClick={() => history.push(tab.url)}
              />
            ))}
          </Tabs>
        ) : (
          <div />
        )}
        <div />
      </Wrapper>
      <HorizontalDivider />
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
