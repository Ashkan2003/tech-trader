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


  // const colorMode = React.useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  //     },
  //   }),
  //   []
  // );

  // console.log(colorMode,"ggggg")

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: "rtl",
        typography: {
          fontFamily: "var(--font-IranSansWeb)",
        },
        palette: {
          mode: thememode,
        },
      }),
    [thememode]
  );

  return (
    <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
  );
}
