import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BasicProps } from "../../constants/BasicTypes";
import { Title } from "../PageTitle";
import { Tab, Tabs } from "../Tab";
import { Wrapper } from "./styled";

interface ExploreHeaderProps extends BasicProps {
  title: string;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ title }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <Wrapper>
      <Title title={title} justifyContent="flex-start" />
      <Tabs>
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
      <div />
    </Wrapper>
  );
};

export default ExploreHeader;
