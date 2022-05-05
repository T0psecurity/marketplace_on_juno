import * as React from "react";
import useStyles from "./styles";
import { Box, Grid, Card, CardHeader } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ElevenMpIcon from "@mui/icons-material/ElevenMp";
import Collapsable from "../collapsable";
export default function NFTDetail() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ListIcon /> &nbsp;Description
      </div>
      <div className={classes.child}>
        <div>Created by SomethingToken</div>
        <p>
          Your token for exclusive access and discounts on the Americana
          Marketplace.
        </p>
      </div>
      <Collapsable icon={<EqualizerIcon />} title="About Something Token">
        sdfsdfsdf
      </Collapsable>
      <Collapsable icon={<ElevenMpIcon />} title="Details">
        sdfsdfsdf
      </Collapsable>
    </div>
  );
}
