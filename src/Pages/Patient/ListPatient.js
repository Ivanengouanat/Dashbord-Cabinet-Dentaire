import Headers from "../../components/Headers";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
  Box,
  useTheme,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useEffect, useState } from "react";
import Sidebars from "../../scenes/Sidebar";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

const ListPatients = ({
  ListPatient,
  handleEditPatient,
  handleDeletePatient,
  handleEditAccount,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isCollapsed = Sidebars;
  const navigate = useNavigate();
  const navigationToAddPatient = () => {
    navigate("/addpatient");
  };

  useEffect(() => {
    console.log("Updated ListPatient in ListPatients component: ", ListPatient);
  }, [ListPatient]);

  // Nouveaux états pour la boîte de dialogue
  const [open, setOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleOpenDialog = (id) => {
    setSelectedPatientId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedPatientId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedPatientId) {
      handleDeletePatient(selectedPatientId);
    }
    handleCloseDialog();
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 0.5,
    },
    {
      field: "noms",
      headerName: "Noms",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "prenoms", headerName: "Prenoms", flex: 1 },
    { field: "sexe", headerName: "Sexe", flex: 1 },
    { field: "age", headerName: "Age", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contact", headerName: "contact", flex: 1 },
    { field: "adresse", headerName: "Adresse", flex: 1 },
    {
      field: "diagnostic",
      headerName: "Diagnostic",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        const { row } = params || {};
        console.log("params dans renderCell:", params);
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <IconButton onClick={() => handleEditAccount(row)}>
              <AddIcon sx={{ height: "22px", width: "22px" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                console.log("Données envoyées à handleEditPatient :", row);
                handleEditPatient(row);
              }}
            >
              <UpdateIcon sx={{ height: "22px", width: "22px" }} />
            </IconButton>
            <IconButton onClick={() => handleOpenDialog(row.id)}>
              <DeleteIcon sx={{ height: "22px", width: "22px" }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {" "}
        <Headers title="Liste Des Patients" subtitle="Patients" />{" "}
        <Button
          onClick={navigationToAddPatient}
          sx={{
            color: colors.grey[100],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ["&:hover"]: {
              transform: "translateX(-5px)",
              transition: "0.7s ease-in-out",
              color: colors.greenAccent[400],
            },
          }}
        >
          <AddIcon sx={{ height: "20px", width: "20px" }} />
          <span sx={{ fontWeight: "600" }}>AddPatient</span>
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
          rows={ListPatient}
          columns={columns}
          rowHeight={40}
          slots={{ toolbar: GridToolbar }}
        />
        {/* Boîte de dialogue de confirmation */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer ce patient ? Cette action est
              irréversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ListPatients;
