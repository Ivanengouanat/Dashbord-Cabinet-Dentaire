import { Box } from "@mui/material";
import Headers from "../../components/Headers";
import LineChart from "../../components/Linechar";

const LineCharBar = ({ ListMateriels, ListProduits }) => {
  return (
    <Box overflow="hidden">
      <Headers title="Line Chart" subtitle="line" />

      <Box height="75vh">
        <LineChart ListMateriels={ListMateriels} ListProduits={ListProduits} />
      </Box>
    </Box>
  );
};

export default LineCharBar;
