import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  Badge,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "../components/Notifications";
import ProfileMenu from "../components/ProfileMenu";
import { useNavigate } from "react-router-dom";
import { tokens, colorModeContext } from "../theme";
import { useContext, useState } from "react";

const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);

  const { handleSetCollapsed } = props;

  const isMobile = useMediaQuery("(max-width: 600px)");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const fakeCartItems = [
    {
      email: "ngouanativan@gmail.com",
      noms: "Ngouanat Ivan",
      subject: " suggestion pour le cabinet",
      message: "je souhaiterais des toilette",
    },
    {
      email: "madoumtioarlette@gmail.com",
      noms: "Madoumtio Arlette",
      subject: " suggestion pour le cabinet",
      message: "je souhaiterais des friendisse",
    },
  ];

  const [IsConnect, setIsConnect] = useState(false);

  const navigate = useNavigate();

  return (
    <Box p="10px" display="flex" justifyContent="space-between">
      <Box display="flex" alignitems="center" justifyContent="space-between">
        <IconButton onClick={() => handleSetCollapsed()}>
          <MenuIcon />
        </IconButton>
        {!isMobile && (
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
        )}
      </Box>
      <Box display="flex" alignitems="center" justifyContent="space-between">
        <IconButton onClick={colorMode.tooglecolor}>
          {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <IconButton onClick={() => setDrawerOpen(true)}>
          <Badge
            badgeContent={fakeCartItems.length}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: colors.redAccent[500], // Couleur personnalisée
                color: "white",
                right: 0,
                top: 0,
                transform: "scale(1) translate(50%, -50%)",
              },
            }}
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Notifications
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          cartItems={fakeCartItems}
        />

        {!isMobile && (
          <IconButton onClick={() => navigate("parametre")}>
            <SettingsIcon />
          </IconButton>
        )}

        {IsConnect ? (
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <ProfileMenu />
        )}
      </Box>
      {/*<Box p="10px" display="flex" justifyContent="space-between">
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
        <IconButton onClick={() => setDrawerOpen(true)}>
          <Badge
            badgeContent={fakeCartItems.length}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: colors.redAccent[500], // Couleur personnalisée
                color: "white",
                right: 0,
                top: 0,
                transform: "scale(1) translate(50%, -50%)",
              },
            }}
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Box>*/}
    </Box>
  );
};

export default Topbar;
