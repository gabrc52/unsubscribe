import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// TODO change
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(246, 91, 101)",
    },
    secondary: {
      main: "rgb(250, 199, 37)",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Montserrat, Roboto, -apple-system, Segoe UI, sans-serif",
  },
});

export default theme;
