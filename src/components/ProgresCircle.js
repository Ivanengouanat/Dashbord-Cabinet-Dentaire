import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";

const ProgresCircle = ({ DataArray = [], size = "40", maxItems }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Calculez le pourcentage en fonction du nombre d'éléments
  const progress = Math.min(DataArray.length / maxItems, 1); // Limite à 100%
  const angle = progress * 360; // angle : Convertit ce pourcentage en degrés pour le gradient conique.
  console.log("max items", maxItems);
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55% , transparent 56%),  
                    conic-gradient(transparent 0deg  ${angle}deg, ${colors.blueAccent[500]}  ${angle}deg  360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
    // radial-gradient : Crée un gradient radial avec colors.primary[400] au centre (55%) et transparent au-delà (56%).
    // conic-gradient : Crée un gradient conique basé sur l'angle de progression calculé. La partie colorée utilise colors.blueAccent[500] et le reste utilise transparent.
  );
};

export default ProgresCircle;
