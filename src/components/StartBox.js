import { tokens } from "../theme";
import { Box, useTheme, Typography } from "@mui/material";
import ProgresCircle from "./ProgresCircle";

const StartBox = ({ icon, title, subtitle, increase, DataArray, maxItems }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log(" valeur max items", maxItems);

  return (
    <Box width="100%" m="10px">
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {icon}

          <Typography variant="h7" sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
          <Typography
            variant="h7"
            fontStyle="italic"
            sx={{ color: colors.greenAccent[500] }}
          >
            {increase}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center">
            <ProgresCircle DataArray={DataArray} maxItems={maxItems} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StartBox;
