import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
    fontSize: "16px",
    padding: "20px",
    position: "relative",
    borderTop: "1px solid rgb(229,232,235)",
  },
  endIcon: {
    position: "absolute",
    right: "20px",
  },
  child: {
    padding: "20px",
    borderTop: "1px solid rgb(229,232,235)",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    transition: "height 100ms ease 0s",
    backgroundColor: "rgb(251,253,255)",
  },
}));
