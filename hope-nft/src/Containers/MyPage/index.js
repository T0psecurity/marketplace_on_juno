import * as React from "react";
import useStyles from "./styles";
import { Box, Grid, Card, CardHeader, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Collapsable from "../../Components/collapsable";
import TokenCard from "../../Components/tokenCard";

export default function MyPage() {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.container}>
      <div className={classes.header}>
        <h1>Hope Galaxy NFTs</h1>
        <h3>NFTs in My Wallet</h3>
        {/* <div className={classes.trading}>
          <div className={classes.subtrading}>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>777</div>
            <div style={{ fontSize: "14px", marginTop: "8px" }}>items</div>
          </div>
          <div className={classes.subtrading}>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>478</div>
            <div style={{ fontSize: "14px", marginTop: "8px" }}>owners</div>
          </div>
          <div className={classes.subtrading}>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>0.087</div>
            <div style={{ fontSize: "14px", marginTop: "8px" }}>
              floor price
            </div>
          </div>
          <div className={classes.subtrading}>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>70.5</div>
            <div style={{ fontSize: "14px", marginTop: "8px" }}>
              volume traded
            </div>
          </div>
        </div> */}
        {/* <p style={{ maxWidth: "800px" }}>
          The Meta Maid Genesis is a collection of 777 Maids living in the
          Ethereum blockchain. The first and the key to opening the World of
          Arterra. A brand-new art collective of prominent artists diving into
          web3 with their own unique perspective.
        </p> */}
      </div>
      {/* <Grid container style={{ borderTop: "1px solid rgb(229,232,235)" }}> */}
      {/* <Grid item xs={3} className={classes.filter}>
          <div className={classes.filterTitle}>
            <FilterListIcon /> Filter
          </div>
          <Collapsable title={"Status"}>Status</Collapsable>
          <Collapsable title={"Price"}>Price</Collapsable>
          <Collapsable title={"Chains"}>Chains</Collapsable>
          <Collapsable title={"On Sale In"}>On Sale In</Collapsable>
        </Grid> */}
      <Grid
        container
        // item
        // xs={9}
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-around",
          borderBottom: "1px solid rgb(229,232,235)",
        }}
      >
        <TokenCard />
        <TokenCard />
        <TokenCard />
        <TokenCard />
        <TokenCard />
      </Grid>
      <h3 style={{ textAlign: "center" }}>My NFTs in Market Place</h3>
      <Grid
        container
        // item
        // xs={9}
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-around",
          borderBottom: "1px solid rgb(229,232,235)",
        }}
      >
        <TokenCard />
        <TokenCard />
        <TokenCard />
        <TokenCard />
        <TokenCard />
      </Grid>
      {/* </Grid> */}
    </Box>
  );
}
