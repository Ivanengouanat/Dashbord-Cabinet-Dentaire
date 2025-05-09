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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CancelIcon from "@mui/icons-material/Cancel";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Face3Icon from "@mui/icons-material/Face3";
import { useState } from "react";
import Sidebars from "../../scenes/Sidebar";

const ListMateriel = ({
  ListMateriels,
  handleDeleteMateriel,
  handleEditMateriel,
  handleChangeQuantite,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isCollapsed = Sidebars;

  // Nouveaux états pour la boîte de dialogue
  const [open, setOpen] = useState(false);
  const [selectedMaterielId, setSelectedMaterielId] = useState(null);

  const handleOpenDialog = (id) => {
    setSelectedMaterielId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedMaterielId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedMaterielId) {
      handleDeleteMateriel(selectedMaterielId);
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
    {
      field: "categorie",
      headerName: "Categorie",
      flex: 2,
      renderCell: (params) => {
        const { row } = params || {};
        return (
          <Box
            width="100%"
            m="3px auto"
            height="75%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} variant="h">
              {row.categorie}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "quantite",
      headerName: "Quantité",
      flex: 0.5,
    },

    { field: "description", headerName: "Description", flex: 2 },
    { field: "date", headerName: "Date", flex: 0.5 },
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
                console.log("Données envoyées à handleEditProduit :", row);
                handleEditMateriel(row);
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
      <Headers title="Liste Du Materiel" subtitle="Materiel" />

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
          rows={ListMateriels}
          columns={columns}
          rowHeight={40}
          slots={{ toolbar: GridToolbar }}
        />
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer ce material ? Cette action est
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

export default ListMateriel;
