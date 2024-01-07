"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

// this is a context api for providing DarkMode and direction: "rtl" and fontFamily: "var(--font-IranSansWeb)",
export default function CustomThemeProvider(props: any) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: "rtl",
        typography: {
          fontFamily: "var(--font-IranSansWeb)",
        },
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
