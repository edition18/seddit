import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#62727b",
      main: "#37474f",
      dark: "#62727b",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#e2f1f8",
      main: "#b0bec5",
      dark: "#808e95",
      contrastText: "#000000",
    },
  },
  props: {
    // Style sheet name ⚛️
    MuiTextField: {
      // Name of the rule
      required: true,
    },
  },
});

export default theme;
