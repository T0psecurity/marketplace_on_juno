import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  container: {
    bottom: 0,
    background: "#39c639",
    color: "white",
    width: "100%",
    padding: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    borderRadius: "10px",
    border: "1px solid rgh(229,232,235)",
    margin: "5px",
    padding: "12px",
    width: "100%",
  },
  inputArea: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  button: {
    width: "200px",
    margin: "5px !important",
  },
  socials: {
    display: "flex",
    flexDirection: "row",
  },
  socialBlock: {
    width: "54px",
    height: "54px",
    marginTop: "18px",
    marginRight: "12px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2e7d32",
    borderRadius: "10px",
    justifyContent: "center",
  },
  socialIcon: {
    color: "white",
  },
}));
