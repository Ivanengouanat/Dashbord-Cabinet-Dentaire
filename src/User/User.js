import { Box, useTheme, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Header from "./component/Header";

const User = () => {
  return (
    <Box>
      <Header title="Dr DJUINE SANDRINE" subtitle="Ortho-Dentiste" />

      <Routes></Routes>
    </Box>
  );
};

export default User;
