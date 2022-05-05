import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  container: {
    maxWidth: "100%",
    padding: "8px 8px 16px",
    "@media (min-width:1024px)": {
      paddingLeft: "0px",
      paddingRight: "0px",
      width: "1280px",
    },
    margin: "0 auto",
  },
  article: {
    borderRadius: "10px",
    border: "1px solid rgb(229,232,235)",
    display: "flex",
    flexDirection: "column",
  },
  articleHeader: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    height: "42px",
    width: "100%",
  },
  normalText: {
    display: "flex",
    alignItems: "center",
    opacity: "0.6",
  },
  mainFunction: {
    borderRadius: "10px",
    border: "1px solid rgb(229,232,235)",
    overflow: "hidden",
  },
  mainName: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
  mainContent: {
    padding: "20px",
    borderTop: "1px solid rgb(229,232,235)",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    transition: "height 100ms ease 0s",
    backgroundColor: "rgb(251,253,255)",
  },
  containedButton: {
    height: "54px",
    width: "200px",
    margin: "10px !important",
  },
  outlinedButton: {
    height: "54px",
    width: "200px",
    margin: "10px !important",
  },
  collapseContainer: {
    margin: "10px 0",
    border: "1px solid rgb(229,232,235)",
    borderRadius: "10px",
  },
}));
