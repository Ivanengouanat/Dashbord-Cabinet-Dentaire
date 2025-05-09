import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Headers = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box margin="5px 5px 10px 20px">
      <Box>
        <Typography variant="h5" sx={{ color: colors.grey[100] }}>
          {title}
        </Typography>
        <Typography variant="h7" sx={{ color: colors.grey[100] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Headers;
