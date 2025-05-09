import { Box } from "@mui/material";
import Headers from "../../components/Headers";
import Piechar from "../../components/PieChar";

const Pie = ({ ListPatient, ListPersonnels, ListAccount, ListDate }) => {
  return (
    <Box>
      <Headers title="Pie Chart" subtitle="pie" />

      <Box height="75vh">
        <Piechar
          ListPatient={ListPatient}
          ListPersonnels={ListPersonnels}
          ListDate={ListDate}
          ListAccount={ListAccount}
        />
      </Box>
    </Box>
  );
};

export default Pie;
