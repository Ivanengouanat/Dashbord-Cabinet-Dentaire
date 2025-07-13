import { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Icon } from "@iconify/react";
import ProfileImage from "../scenes/junior.jpg";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      id: 1,
      title: "View Profile",
      icon: "material-symbols:account-circle-outline",
    },
    {
      id: 2,
      title: "Account Settings",
      icon: "material-symbols:settings-account-box-outline-rounded",
    },
    {
      id: 3,
      title: "Notifications",
      icon: "ic:outline-notifications-none",
    },
    {
      id: 4,
      title: "Switch Account",
      icon: "material-symbols:switch-account-outline",
    },
    {
      id: 5,
      title: "Help Center",
      icon: "material-symbols:help-outline",
    },
    {
      id: 6,
      title: "Logout",
      icon: "material-symbols:logout",
    },
  ];

  return (
    <>
      <ButtonBase
        onClick={handleProfileClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        disableRipple
      >
        <Avatar
          src={ProfileImage}
          sx={{
            height: 40,
            width: 40,
            bgcolor: "primary.main",
          }}
        />
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        sx={{
          mt: 1.5,
          "& .MuiList-root": {
            p: 0,
            width: 230,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box p={1}>
          <MenuItem
            onClick={handleProfileMenuClose}
            sx={{ "&:hover": { bgcolor: "info.dark" } }}
          >
            <Avatar src={ProfileImage} sx={{ mr: 1, height: 42, width: 42 }} />
            <Stack direction="column">
              <Typography variant="body2" color="text.primary" fontWeight={600}>
                Jason Statham
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={400}
              >
                jason@example.com
              </Typography>
            </Stack>
          </MenuItem>
        </Box>

        <Divider sx={{ my: 0 }} />

        <Box p={1}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              onClick={handleProfileMenuClose}
              sx={{ py: 1 }}
            >
              <ListItemIcon
                sx={{
                  mr: 1,
                  color: "text.secondary",
                  fontSize: "h5.fontSize",
                }}
              >
                <Icon icon={item.icon} />
              </ListItemIcon>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                {item.title}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
