import * as React from "react";
import useStyles from "./styles";
import { Box, Grid, Card, CardHeader, Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import DiscountIcon from "@mui/icons-material/Discount";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import NFTDetail from "../../Components/nftDetail";
import Collapsable from "../../Components/collapsable";
import main from "../../assets/main.png";
import logo from "../../assets/logo.png";

export default function HomePage() {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className={classes.article}>
            <div className={classes.articleHeader}></div>
            <img src={main} alt="main" width="100%" />
          </div>
          {/* <NFTDetail /> */}
        </Grid>
        <Grid item xs={8}>
          <h1 className={classes.title}>HOPE GALAXY NFT - collection 1</h1>
          <div className={classes.normalText}>
            Owned by mbmknft
            {/* <RemoveRedEyeIcon fontSize="sm" /> 383 views{" "}
            <FavoriteIcon fontSize="sm" /> 10 favorites */}
          </div>
          <div className={classes.mainFunction}>
            <div className={classes.mainName}>
              {/* <AccessTimeIcon /> Sale ends May 22, 2022 at 8:58pm CEST */}
              Price
            </div>
            <div className={classes.mainContent}>
              <p>Current price</p>
              <h1>
                <img src={logo} alt="main" width="20px" /> 8
                <span style={{ fontSize: "20px", opacity: "0.6" }}>
                  ($2369104)
                </span>
              </h1>
              <div>
                <Button
                  variant="contained"
                  className={classes.containedButton}
                  color="success"
                >
                  Buy now
                </Button>
                {/* <Button
                  variant="outlined"
                  className={classes.outlinedButton}
                  color="success"
                >
                  Make offer
                </Button> */}
              </div>
            </div>
          </div>
          {/* <div className={classes.collapseContainer}>
            <Collapsable icon={<LineAxisIcon />} title="Price History">
              chart
            </Collapsable>
          </div>
          <div className={classes.collapseContainer}>
            <Collapsable icon={<DiscountIcon />} title="Listings">
              listings
            </Collapsable>
          </div>
          <div className={classes.collapseContainer}>
            <Collapsable icon={<FormatListBulletedIcon />} title="Offers">
              offers
            </Collapsable>
          </div> */}
        </Grid>
      </Grid>
      {/* <div className={classes.collapseContainer}>
        <Collapsable icon={<RocketLaunchOutlinedIcon />} title="Item Activity">
          Item Acitivity
        </Collapsable>
      </div> */}
      {/* <div className={classes.collapseContainer}>
        <Collapsable
          icon={<ViewModuleIcon />}
          title="More From This Collection"
        >
          Collection
        </Collapsable>
      </div> */}
    </Box>
  );
}
