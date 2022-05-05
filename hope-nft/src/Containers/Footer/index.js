import React from "react";
import { Box, Button } from "@mui/material";
import * as Icons from "../../assets";
import useStyles from "./styles";

const iconList = [
  {
    label: "BlogIcon",
    link: "https://www.hopegalaxy.io/",
  },
  {
    label: "DiscordIcon",
    link: "https://discord.gg/BfKPacc5jF",
  },
  {
    label: "InstagramIcon",
    link: "",
  },
  {
    label: "TwitterIcon",
    link: "https://twitter.com/HopeGalaxyNFT",
  },
  {
    label: "YoutubeIcon",
    link: "",
  },
];

export default function Footer() {
  const classes = useStyles();

  console.log("icons: ", Icons);
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.container}>
      <div style={{ width: "50%", padding: "0 20px" }}>
        <div className={classes.title}>Stay in the loop</div>
        <p>
          Join our mailing list to stay in the loop with our newest feature
          releases, NFT drops, and tips and tricks for navigating HopeGalaxy.io
        </p>
        {/* <div className={classes.inputArea}>
          <div className={classes.input}>
            <input style={{ outline: "none", border: "none" }} />
          </div>
          <Button
            variant="contained"
            color="success"
            className={classes.button}
          >
            Sign Up
          </Button>
        </div> */}
      </div>
      <div style={{ width: "50%", padding: "0 20px" }}>
        <div className={classes.title}>Join the community</div>
        <div className={classes.socials}>
          {iconList.map((icon) => {
            const Icon = Icons[icon.label];
            return (
              <a className={classes.socialBlock} href={icon.link}>
                <Icon className={classes.socialIcon} />
              </a>
            );
          })}
        </div>
      </div>
    </Box>
  );
}
