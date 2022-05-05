import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  header: {
    background: "white",
    color: "black",
  },
  logo: {
    width: "60px",
  },
  logoTitle: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  search: {
    border: "1px solid rgb(229,232,255)",
    borderRadius: "10px",
  },
  menuText: {
    fontSize: "20px",
    fontWeight: "bold",
    width: "100%",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  containedButton: {
    height: "34px",
    width: "100px",
    margin: "10px !important",
  },
}));
