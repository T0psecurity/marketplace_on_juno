import * as React from "react";
import useStyles from "./styles";
import { Box, Grid, Card, CardHeader } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function TokenCard({ src, price, favorite }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src={src} alt="HopeNFT" className={classes.tokenImage} />
      <div className={classes.tokenDetail}>
        <div>
          <p>Hope Galaxy Token</p>
          <p>SnapShots #2329</p>
        </div>
        <div>
          <p>Price</p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
}
