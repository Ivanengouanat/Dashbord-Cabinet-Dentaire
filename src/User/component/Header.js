import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import skye from "./skye.png";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        position: "sticky", //position: sticky fixe le header en haut uniquement après un certain scroll.

        top: 0, // top: 0 garantit qu'il reste collé au bord supérieur dès que l'utilisateur scrolle.
        backgroundColor: colors.primary[400],
        padding: "15px",
        zIndex: 1000, // Assure qu'il reste au-dessus des autres éléments
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box>
          <img src={skye} alt="skye" />
        </Box>
        <Box>
          <Typography variant="h4" color={colors.redAccent[500]}>
            {title}
          </Typography>
          <Typography variant="h7" color={colors.grey[100]}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" justifyContent="center">
          <NavLink
            to="/acceuil"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? colors.redAccent[500] : colors.grey[100],
            })}
          >
            <Typography variant="h6">Acceuil</Typography>
          </NavLink>
          <NavLink
            to="/docteur"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? colors.redAccent[500] : colors.grey[100],
            })}
          >
            <Typography variant="h6">Docteur</Typography>
          </NavLink>
          <NavLink
            to="/soins dentaire"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? colors.redAccent[500] : colors.grey[100],
            })}
          >
            <Typography variant="h6">Soins Dentaire</Typography>
          </NavLink>
          <NavLink
            to="/actualite"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? colors.redAccent[500] : colors.grey[100],
            })}
          >
            <Typography variant="h6">Actualite</Typography>
          </NavLink>
          <NavLink
            to="/galerie"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? colors.redAccent[500] : colors.grey[100],
            })}
          >
            <Typography variant="h6">Galerie</Typography>
          </NavLink>
          <NavLink
            to="/contact"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? colors.redAccent[500] : colors.grey[100],
            })}
          >
            <Typography variant="h6">Contact</Typography>
          </NavLink>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton>
            <InstagramIcon color={colors.redAccent[500]} />
          </IconButton>
          <IconButton>
            <FacebookIcon color={colors.redAccent[500]} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
