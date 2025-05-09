import { Box, useTheme, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Headers from "../../components/Headers";
import Sidebars from "../../scenes/Sidebar";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

const DatePatient = ({ ListDate, handleDeleteDate, handleEditDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isCollapsed = Sidebars;
  const navigate = useNavigate();
  const navigationToAddPatient = () => {
    navigate("/addrendezvous");
  };

  const columns = [
    { field: "id", headerName: "ID", fles: 1 },
    { field: "noms", headerName: "Noms", flex: 1 },
    { field: "prenoms", headerName: "Prenoms", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "heure", headerName: "Heure", flex: 1 },
    { field: "tel", headerName: "Contact", flex: 1 },
    {
      field: "type",
      headerName: "Type",
      flex: 2,
      renderCell: (params) => {
        const { row } = params || {};

        return (
          <Box
            width="100%"
            m="0 auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="10px"
            gap="4px"
            backgroundColor={
              row.type === "general"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {row.type === "consultation" && <AssignmentIcon />}
            {row.type === "general" && <ContactEmergencyIcon />}
            <Typography color={colors.grey[100]}>{row.type}</Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const { row } = params || {};
        console.log("params dans renderCell:", params);
        return (
          <Box display="flex" alignItems="center" gap="5px">
            <IconButton
              onClick={() => {
                console.log("Données envoyées à handleEditPatient :", row);
                handleEditDate(row);
              }}
            >
              <UpdateIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteDate(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Headers title="Date Patient" subtitle="Liste des Rendez Vous" />
        <Button
          onClick={navigationToAddPatient}
          sx={{
            color: colors.grey[100],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            ["&:hover"]: {
              transform: "translateX(-5px)",
              transition: "0.7s ease-in-out",
              color: colors.greenAccent[400],
            },
          }}
        >
          <AddIcon sx={{ height: "20px", width: "20px" }} />
          Ajouter un Rendez Vous
        </Button>
      </Box>

      <Box
        marginLeft={isCollapsed ? "50px" : "20px"}
        height="75vh"
        width={isCollapsed ? "calc(100% - 80px)" : "calc(100% - 250px)"}
        sx={{
          "& .MuiDataGrid-root": { border: "none", color: colors.primary[100] },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .name-column--cell": { color: colors.greenAccent[500] },
          "& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer  .MuiButton-text": {
            color: colors.grey[100],
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={ListDate}
          columns={columns}
          rowHeight={40}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DatePatient;
