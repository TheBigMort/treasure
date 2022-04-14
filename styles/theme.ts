import { createTheme } from "@mui/material/styles";
import {
  franklinGothicBold,
  franklinGothicHeavy,
  franklinGothicRegular
} from "@styles/fonts";
// import {
//   sofiaProBlack,
//   sofiaProBold,
//   sofiaProLight,
//   sofiaProMedium,
//   sofiaProRegular,
//   sofiaProSemiBold,
// } from '@styles/fonts';

// Create a theme instance.

export const defaultTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#313131",
      dark: "#0e1c56",
      // main: '#ff2e93',
    },
    secondary: {
      main: "#FF8F00",
      // main: '#00e6b3',
    },
    // twitter: {
    //   main: "#09a2d9",
    // },
    // discord: {
    //   main: "#6338fe",
    // },
  },
  typography: {
    fontFamily: [
      "Franklin Gothic",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        fontFamily: ["Franklin Gothic", "Roboto"].join(),
        "@font-face": [
          franklinGothicRegular,
          franklinGothicBold,
          franklinGothicHeavy,
        ],
      },
    },
  },
};

// @ts-ignore
const theme = createTheme({
  ...defaultTheme,
});

export default theme;
