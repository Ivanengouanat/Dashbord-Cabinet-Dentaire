import Headers from "../../components/Headers";
import {
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Sidebars from "../../scenes/Sidebar";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

const Permission = ({
  dataPermission,
  handleDeletePermission,
  handleEditPermission,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isCollapsed = Sidebars;
  const navigate = useNavigate();
  const navigationToAddPermission = () => {
    navigate("/admin/addpermission");
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  const allcolumns = [
    { field: "id", headerName: "ID" },
    { field: "noms", headerName: "Nom et Prenoms", flex: 1 },

    { field: "nbrjour", headerName: "Nombre de jours", flex: 1 },
    { field: "debut", headerName: "Date de Debut", flex: 0.5 },
    { field: "fin", headerName: "Date de Fin" },
    { field: "raison", headerName: "Raison", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
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
                handleEditPermission(row);
              }}
            >
              <UpdateIcon />
            </IconButton>
            <IconButton onClick={() => handleDeletePermission(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const columns = isMobile
    ? allcolumns.filter((col) => col.field === "noms" || col.field === "action")
    : allcolumns;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Headers title="Permissions" subtitle="list Permissionne" />
        <Box>
          <Button
            onClick={navigationToAddPermission}
            sx={{
              color: colors.grey[100],
              ["&:hover"]: {
                transform: "translateX(-5px)",
                color: colors.greenAccent[400],
                transition: "0.3s ease-in-out",
              },
            }}
          >
            {" "}
            <AddIcon />
            AddPermission
          </Button>
        </Box>
      </Box>

      <Box
        marginLeft={isMobile ? "0" : isCollapsed ? "50px" : "250px"}
        height="75vh"
        padding={isMobile ? " 10px" : undefined}
        width={
          isMobile
            ? "100%"
            : isCollapsed
            ? "calc(100% - 80px)"
            : "calc(100% - 250px)"
        }
        overflowX={isMobile ? "auto" : "unset"}
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
          rows={dataPermission}
          columns={columns}
          checkboxSelection
          rowHeight={isMobile ? 65 : 40}
        />
      </Box>
    </Box>
  );
};

export default Permission;
