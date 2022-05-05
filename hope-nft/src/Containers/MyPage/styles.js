import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  container: {
    maxWidth: "100%",
    padding: "8px 8px 16px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  trading: {
    width: "fit-content",
    alignItems: "center",
    borderRadius: "10px",
    flexWrap: "wrap",
    border: "1px solid rgb(229,232,235)",
    display: "flex",
    flexDirection: "row",
  },
  subtrading: {
    alignItems: "center",
    width: "144px",
    height: "88px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderLeft: "1px solid rgb(229,232,235)",
  },
  filter: {
    borderRight: "1px solid rgb(229,232,235)",
  },
  filterTitle: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    fontWeight: "bold",
  },
}));
