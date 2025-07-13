import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Avatar,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { tokens } from "../theme";

const Notifications = ({ DataPanier, open, onClose, cartItems = [] }) => {
  console.log("Donnes du panier", DataPanier);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "75%", sm: 400 },
          padding: 2,
          background: colors.primary[400],
        },
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Notifications</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />{" "}
      {/* créer une ligne de séparation entre des éléments de votre interface utilisateur. */}
      {/* Liste des produits */}
      {cartItems.length === 0 ? (
        <Typography variant="body1">Aucune notification disponible.</Typography>
      ) : (
        cartItems.map((item, index) => (
          <NavLink
            key={index}
            to="notification" // <- la nouvelle route
            state={item} // <- on transmet tout l’objet
            style={{ textDecoration: "none" }}
            onClick={onClose}
          >
            <Box
              display="flex"
              gap={2}
              p={1}
              borderRadius={2}
              mb={1}
              sx={{
                backgroundColor: colors.greenAccent[500],
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: colors.greenAccent[800],
                },
              }}
            >
              <Avatar>
                <MailOutlineIcon />
              </Avatar>

              <Box>
                <Typography fontWeight="bold">{item.noms}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.email}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  <strong>Sujet:</strong> {item.subject}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                  sx={{ maxWidth: "250px" }}
                >
                  {item.message}
                </Typography>
              </Box>
            </Box>
          </NavLink>
        ))
      )}
    </Drawer>
  );
};

export default Notifications;
