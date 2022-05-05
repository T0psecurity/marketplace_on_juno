import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgb(229,232,235)",
    borderRadius: "10px",
    position: "relative",
    margin: "10px",
  },
  tokenImage: {
    height: "308px",
    width: "308px",
  },
  tokenDetail: {
    display: "flex",
    padding: "12px",
    justifyContent: "space-between",
  },
}));
