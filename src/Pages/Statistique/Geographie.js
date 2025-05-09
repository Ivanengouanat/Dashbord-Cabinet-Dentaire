import { Box } from "@mui/material";
import Headers from "../../components/Headers";
import GeographyChart from "../../components/GeographyChart";
import Sidebars from "../../scenes/Sidebar";

const Geographie = () => {
  const isCollapsed = Sidebars;
  return (
    <Box>
      <Headers title="Geographie" subtitle="map" />

      <Box
        height="75vh"
        width={isCollapsed ? "calc(100% - 80px)" : "calc(100% - 250px)"}
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geographie;
