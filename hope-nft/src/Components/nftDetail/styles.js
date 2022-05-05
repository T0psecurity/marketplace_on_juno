import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  container: {
    borderRadius: "10px",
    border: "1px solid rgb(229,232,235)",
    fontSize: "15px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
    fontSize: "16px",
    padding: "20px",
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
