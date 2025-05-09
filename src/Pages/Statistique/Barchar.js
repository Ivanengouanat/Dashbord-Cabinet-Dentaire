import { Box } from "@mui/material";
import Headers from "../../components/Headers";
import Barchart from "../../components/Barchar";

const Barchar = ({ ListProduits }) => {
  return (
    <Box>
      <Headers title="Bar Chart" subtitle="bar" />

      <Box height="75vh">
        <Barchart ListProduits={ListProduits} />
      </Box>
    </Box>
  );
};

export default Barchar;
