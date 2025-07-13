import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useLocation, useNavigate } from "react-router-dom";

const NotificationDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // ← l’objet passé depuis le Drawer
  const isMobile = useMediaQuery("(max-width:600px)");

  // Si l’utilisateur arrive ici sans state (ex : refresh), on le renvoie à l’accueil
  if (!state) {
    navigate("/", { replace: true });
    return null;
  }

  const { noms, email, subject, message } = state;

  return (
    <Box
      maxWidth={800}
      margin="auto"
      p={isMobile ? 2 : 4}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Notification</Typography>
      </Box>

      <Divider />

      {/* Auteur */}
      <Box display="flex" gap={2} alignItems="center">
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <MailOutlineIcon />
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {noms}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </Box>
      </Box>

      {/* Sujet & Message */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Sujet&nbsp;: <strong>{subject}</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationDetail;
