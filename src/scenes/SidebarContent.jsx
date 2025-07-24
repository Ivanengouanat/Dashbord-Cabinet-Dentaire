// components/SidebarContent.jsx
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Icon, IconButton, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { tokens } from "../theme";
import ImageComponent from "./Image";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import BadgeIcon from "@mui/icons-material/Badge";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

const SidebarContent = ({ isCollapsed, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              transition: "0.3s ease-in-out",
              transform: "translateX(10px)",
              color: colors.greenAccent[400],
            },
            [`&:first-of-type:hover`]: {
              backgroundColor: colors.primary[400],
            },
            [`&:hover`]: {
              color: colors.greenAccent[400],
              transform: "translateX(-5px)",
              transition: "0.5s ease-in-out",
            },
            height: "24px",
            width: "94%",
          },
        }}
      >
        {!isCollapsed && (
          <Box
            m="10px 3px 50px  3px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 50 }}
            >
              dentistry
            </span>
            <Typography variant="h5" color={colors.grey[100]} fontWeight={200}>
              THE SKYE
            </Typography>
            <IconButton>
              <CloseIcon onClick={onClose} />
            </IconButton>
          </Box>
        )}

        <Box mt="10px" height="100%">
          <MenuItem
            component={<NavLink to="/" />}
            icon={<DashboardIcon />}
            style={{ marginBottom: "10px" }}
          >
            Tableau de bord
          </MenuItem>

          <SubMenu label="Cabinet" icon={<LocalHospitalIcon />}>
            <MenuItem component={<NavLink to="doctor" />} icon={<PersonIcon />}>
              Docteur
            </MenuItem>
            <MenuItem
              component={<NavLink to="employer" />}
              icon={<GroupIcon />}
            >
              Employers
            </MenuItem>
            <MenuItem
              component={<NavLink to="attendance" />}
              icon={<WorkspacePremiumIcon />}
            >
              Attendance
            </MenuItem>
            <MenuItem
              component={<NavLink to="permission" />}
              icon={<AccessibilityIcon />}
            >
              Permissions
            </MenuItem>
            <MenuItem
              component={<NavLink to="salaire" />}
              icon={<MonetizationOnIcon />}
            >
              Salaire
            </MenuItem>
            <MenuItem
              component={<NavLink to="addpersonnel" />}
              icon={<PersonAddAlt1Icon />}
            >
              Ajouter Personnel
            </MenuItem>
            <MenuItem
              component={<NavLink to="addpermission" />}
              icon={<BadgeIcon />}
            >
              Ajouter permission
            </MenuItem>
          </SubMenu>

          <SubMenu label="Patient" icon={<Diversity1Icon />}>
            <MenuItem
              component={<NavLink to="listpatient" />}
              icon={<ListAltIcon />}
            >
              List Patients
            </MenuItem>
            <MenuItem
              component={<NavLink to="addpatient" />}
              icon={<PersonAddAlt1Icon />}
            >
              Ajouter Patient
            </MenuItem>
            <MenuItem
              component={<NavLink to="datepatient" />}
              icon={<DateRangeIcon />}
            >
              Patient rendez-vous
            </MenuItem>
            <MenuItem
              component={<NavLink to="addrendezvous" />}
              icon={<ReceiptIcon />}
            >
              Ajouter un rendez-vous
            </MenuItem>
            <MenuItem
              component={<NavLink to="calendrier" />}
              icon={<DateRangeIcon />}
            >
              Calendrier
            </MenuItem>
          </SubMenu>

          <SubMenu label="Account" icon={<AccountBalanceIcon />}>
            <MenuItem
              component={<NavLink to="soldepatient" />}
              icon={<AccountCircleIcon />}
            >
              Solvabilite Patient
            </MenuItem>
          </SubMenu>

          <SubMenu label="Inventaire" icon={<InventoryIcon />}>
            <MenuItem
              component={<NavLink to="listproduit" />}
              icon={<ProductionQuantityLimitsIcon />}
            >
              List produit
            </MenuItem>
            <MenuItem
              component={<NavLink to="addproduit" />}
              icon={<PlaylistAddCircleIcon />}
            >
              Ajouter un produit
            </MenuItem>
            <MenuItem
              component={<NavLink to="listmateriel" />}
              icon={<MedicalInformationIcon />}
            >
              List Materiel
            </MenuItem>
            <MenuItem
              component={<NavLink to="addmateriel" />}
              icon={<PlaylistAddCircleIcon />}
            >
              Ajouter un Materiel
            </MenuItem>
          </SubMenu>

          <SubMenu label="Statistique" icon={<BarChartIcon />}>
            <MenuItem
              component={<NavLink to="piecharbar" />}
              icon={<PieChartIcon />}
            >
              Diagramme Pie
            </MenuItem>
            <MenuItem
              component={<NavLink to="linecharbar" />}
              icon={<TimelineIcon />}
            >
              Diagramme Line
            </MenuItem>
            <MenuItem
              component={<NavLink to="barchar" />}
              icon={<BarChartIcon />}
            >
              Diagramme Bar
            </MenuItem>
            <MenuItem
              component={<NavLink to="geographie" />}
              icon={<MapIcon />}
            >
              Geographie
            </MenuItem>
          </SubMenu>

          <MenuItem
            component={<NavLink to="parametre" />}
            icon={<SettingsIcon />}
          >
            Parametre
          </MenuItem>
        </Box>
      </Menu>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="auto"
        mb="20px"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <ImageComponent />
        </Box>
        <Typography variant="h6" sx={{ color: colors.grey[100] }}>
          Djuine Sandrine
        </Typography>
        <Typography variant="subtitle2" sx={{ color: colors.grey[100] }}>
          Ortho-Dentiste
        </Typography>
      </Box>
    </>
  );
};

export default SidebarContent;
