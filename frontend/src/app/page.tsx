"use client";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import ColorModeContext from "./core/contexts/colorMode.context";
import GAppBar from "./components/appBar.component";
import Grid from "@mui/material/Grid";
import ScrapFormComponent from "./components/scrapForm.component";
import ScrapResultComponent from "./components/scrapResult.componenet";

export default function Home() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [searching, setSearching] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light" ? {} : {}), //Adding app color palette for dark and light mode
        },
      }),
    [mode]
  );

  if (!hydrated) {
    return null;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          height={"100vh"}
          overflow={"auto"}
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <GAppBar />
          <Box component={"main"}>
            <Grid component={"div"} container>
              <Grid item xs={12} md={5}>
                <ScrapFormComponent
                  searching={searching}
                  setSearching={setSearching}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <ScrapResultComponent
                  searching={searching}
                  setSearching={setSearching}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
