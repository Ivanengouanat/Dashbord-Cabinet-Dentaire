import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Headers from "../../components/Headers";
import { tokens } from "../../theme";
import Sidebars from "../../scenes/Sidebar";
import CachedIcon from "@mui/icons-material/Cached";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const SoldePatient = ({ ListAccount }) => {
  const isCollapsed = Sidebars;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");
  const allcolumns = [
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
    { field: "mode", headerName: "Mode de Payement", flex: 1 },
    {
      field: "montant",
      headerName: "Montant",
      flex: 0.5,
    },
    { field: "date", headerName: "Date", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
            gap="3px"
            backgroundColor={
              row.status === "payer"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {row.status === "payer" && (
              <DoneAllIcon sx={{ height: "20px", width: "20px" }} />
            )}
            {row.status === "impayer" && (
              <CachedIcon sx={{ height: "20px", width: "20px" }} />
            )}

            <Typography color={colors.grey[100]}>{row.status}</Typography>
          </Box>
        );
      },
    },
  ];

  const columns = isMobile
    ? allcolumns.filter(
        (col) => col.field === "noms" || col.field === "prenoms"
      )
    : allcolumns;

  return (
    <Box>
      <Box>
        <Headers title="Accounts" subtitle="Payments" />
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
          checkboxSelection
          rows={ListAccount}
          columns={columns}
          rowHeight={isMobile ? 60 : 40}
          density={isMobile ? "compact" : "standard"}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
        />
      </Box>
    </Box>
  );
};

export default SoldePatient;
