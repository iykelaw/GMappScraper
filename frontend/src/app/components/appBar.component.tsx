import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import ColorModeContext from "../core/contexts/colorMode.context";
import { Brightness4, Brightness5, Menu } from "@mui/icons-material";

export default function GAppBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography
            // color={"text.primary"}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            GMap Scraper
          </Typography>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? <Brightness5 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
