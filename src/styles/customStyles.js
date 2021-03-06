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
  test: { color: "green" },
  defaultPadding: { padding: 6 },
  centerChildElements: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  displayBlock: {
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
  relative: {
    position: "relative",
  },
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  childPositionRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  postPreviewSize: {
    height: "150px",
  },
  centerText: { textAlign: "center" },
  marginAutoItem: {
    margin: "auto",
  },
  centerChildElementsVertically: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  hyperlinkFormat: {
    textDecoration: "none" /* no underline */,
    color: "inherit",
  },
  warningButton: {
    color: "red",
  },
}));

export default useStyles;
