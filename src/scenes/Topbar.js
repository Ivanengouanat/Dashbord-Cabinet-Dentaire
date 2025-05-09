import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { tokens, colorModeContext } from "../theme";
import { useContext, useState } from "react";

const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);

  const { handleSetCollapsed } = props;

  return (
    <Box p="10px" display="flex" justifyContent="space-between">
      <Box display="flex" alignitems="center" justifyContent="space-between">
        <IconButton onClick={() => handleSetCollapsed()}>
          <MenuIcon />
        </IconButton>
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={colors.primary[400]}
          borderRadius="19px"
          height="30px"
          mt="5px"
        >
          <InputBase sx={{ ml: "5px" }} placeholder="SEARCH" />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" alignitems="center" justifyContent="space-between">
        <IconButton onClick={colorMode.tooglecolor}>
          {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
