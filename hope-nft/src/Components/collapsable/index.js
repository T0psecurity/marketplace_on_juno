import * as React from "react";
import useStyles from "./styles";
import { Box, Grid, Card, CardHeader } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function Collapsable({ icon, title, children }) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <>
      <div
        className={classes.header}
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {icon} &nbsp; {title}
        {collapsed ? (
          <ExpandLessIcon className={classes.endIcon} />
        ) : (
          <ExpandMoreIcon className={classes.endIcon} />
        )}
      </div>
      {collapsed && <div className={classes.child}>{children}</div>}
    </>
  );
}
