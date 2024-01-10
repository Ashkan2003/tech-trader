"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import { useAppSelectore } from "./GlobalRedux/store";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

// this is a provider for providing DarkMode and direction: "rtl" and fontFamily: "var(--font-IranSansWeb)",
export default function CustomThemeProvider(props: any) {
  const thememode = useAppSelectore((state) => state.darkModeReducer.mode);

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: "rtl",
        typography: {
          fontFamily: "var(--font-IranSansWeb)",
        },
        palette: {
          mode: thememode,
          ...(thememode === "light"
            ? {
                // palette value for light mode
                primary: {
                  main: "#5D6E88",
                },
                secondary: {
                  main: "#D8E4F0",
                },
              }
            : {
                // palette value for dark mode
                primary: {
                  main: "#2D3E4A",
                },
              }),
        },
      }),
    [thememode]
  );

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

// primary:{
//   main:"#5D6E88"
// },
// secondary:{
//   main:"#46566E"
// }
