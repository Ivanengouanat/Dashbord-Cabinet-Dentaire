import Headers from "../../components/Headers";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
  Box,
  useTheme,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Face3Icon from "@mui/icons-material/Face3";
import { useState } from "react";
import Sidebars from "../../scenes/Sidebar";

const Employers = ({
  ListPersonnels,
  handleDeleteDocteur,
  handleEditPersonnel,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isCollapsed = Sidebars;

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
      handleDeleteDocteur(selectedPatientId);
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
      field: "poste",
      headerName: "Poste",
      flex: 2,
      renderCell: (params) => {
        const { row } = params || {};
        console.log("row dans renderCell:", row);
        return (
          <Box
            width="100%"
            m="0 auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="10px"
            backgroundColor={
              row.poste === "Docteur"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {row.poste === "Docteur" && (
              <HealthAndSafetyIcon sx={{ height: "20px", width: "20px" }} />
            )}
            {row.poste === "Secretaire" && <Face3Icon />}
            {row.poste === "CM" && <EngineeringIcon />}
            <Typography color={colors.grey[100]}>{row.poste}</Typography>
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
                console.log("Données envoyées à handleEditPersonnel :", row);
                handleEditPersonnel(row);
              }}
            >
              <UpdateIcon />
            </IconButton>
            <IconButton onClick={() => handleOpenDialog(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Headers title="Liste Des Employers" subtitle="Employers" />

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
          rows={ListPersonnels}
          columns={columns}
          rowHeight={40}
          slots={{ toolbar: GridToolbar }}
        />
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer ce menbre du personnel ? Cette
              action est irréversible.
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

export default Employers;
