import { makeStyles } from "@material-ui/core/styles";
import theme from "./theme";

const useStyles = makeStyles(() => ({
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // border: 0,
    // borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    // color: "white",
    // height: 48,
    // padding: "0 30px",
  },
  textFields: { color: theme.palette.primary.dark },
  centerText: { textAlign: "center" },
  container: { padding: 9 },
  marginAutoItem: {
    margin: "auto",
  },
  centerChildElements: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alignLeftChildElementsAsBlock: {
    display: "block",
  },
  disabledButton: {
    backgroundColor: theme.palette.secondary.dark,
  },
  autofitImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
}));

export default useStyles;
