import { Box, useTheme, Typography, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { tokens } from "../theme";
import { useState } from "react";
import ImageComponent from "./Image";

import OIP from "./OIP.jpeg";
import junior from "./junior.jpg";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BadgeIcon from "@mui/icons-material/Badge";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import MapIcon from "@mui/icons-material/Map";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";

const Sidebars = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isCollapsed, handleSetCollapsed } = props;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        isCollapsed={isCollapsed}
        theme={theme}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: colors.primary[400],
            width: isCollapsed ? "80px" : "250px",
            transition: "width 0.3s",
            display: "flex",
            flexDirection: "column",
          },
        }}
        collapsed={isCollapsed}
      >
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "50px",
                }}
              >
                {" "}
                dentistry{" "}
              </span>
              <Typography
                variant="h4"
                color={colors.grey[100]}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "200",
                }}
              >
                Sky Dental
              </Typography>
            </Box>
          )}
          <Box mt="10px" height="100%">
            <MenuItem
              component={<NavLink to="/" />}
              icon={<DashboardIcon />}
              style={{ marginBottom: "10px" }}
            >
              {" "}
              Tableau de bord
            </MenuItem>
            <SubMenu label="Cabinet" icon={<LocalHospitalIcon />}>
              <MenuItem
                component={<NavLink to="/doctor" />}
                icon={<PersonIcon />}
              >
                Docteur
              </MenuItem>
              <MenuItem
                component={<NavLink to="/employer" />}
                icon={<GroupIcon />}
              >
                Employers
              </MenuItem>
              <MenuItem
                component={<NavLink to="/attendance" />}
                icon={<WorkspacePremiumIcon />}
              >
                Attendance
              </MenuItem>
              <MenuItem
                component={<NavLink to="/permission" />}
                icon={<AccessibilityIcon />}
              >
                Permissions
              </MenuItem>
              <MenuItem
                component={<NavLink to="/salaire" />}
                icon={<MonetizationOnIcon />}
              >
                {" "}
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
                component={<NavLink to="/listpatient" />}
                icon={<ListAltIcon />}
              >
                {" "}
                List Patients
              </MenuItem>
              <MenuItem
                component={<NavLink to="/addpatient" />}
                icon={<PersonAddAlt1Icon />}
              >
                {" "}
                Ajouter Patient
              </MenuItem>
              <MenuItem
                component={<NavLink to="/datepatient" />}
                icon={<DateRangeIcon />}
              >
                Patient rendez-vous
              </MenuItem>
              <MenuItem
                component={<NavLink to="/addrendezvous" />}
                icon={<ReceiptIcon />}
              >
                Ajouter un rendez-vous
              </MenuItem>
              <MenuItem
                component={<NavLink to="/calendrier" />}
                icon={<DateRangeIcon />}
              >
                Calendrier
              </MenuItem>
            </SubMenu>
            <SubMenu label="Account" icon={<AccountBalanceIcon />}>
              <MenuItem
                component={<NavLink to="/soldepatient" />}
                icon={<AccountCircleIcon />}
              >
                Solvabilite Patient
              </MenuItem>
            </SubMenu>

            <SubMenu label="inventaire" icon={<InventoryIcon />}>
              <MenuItem
                component={<NavLink to="/listproduit" />}
                icon={<ProductionQuantityLimitsIcon />}
              >
                {" "}
                List produit
              </MenuItem>
              <MenuItem
                component={<NavLink to="/addproduit" />}
                icon={<PlaylistAddCircleIcon />}
              >
                {" "}
                Ajouter un produit
              </MenuItem>
              <MenuItem
                component={<NavLink to="/listmateriel" />}
                icon={<MedicalInformationIcon />}
              >
                List Materielle
              </MenuItem>
              <MenuItem
                component={<NavLink to="/addmateriel" />}
                icon={<PlaylistAddCircleIcon />}
              >
                {" "}
                Ajouter un Materiel
              </MenuItem>
            </SubMenu>
            <SubMenu label="Statistique" icon={<BarChartIcon />}>
              <MenuItem
                component={<NavLink to="/piecharbar" />}
                icon={<PieChartIcon />}
              >
                Diagramme Pie
              </MenuItem>
              <MenuItem
                component={<NavLink to="/linecharbar" />}
                icon={<TimelineIcon />}
              >
                Diagramme Line
              </MenuItem>
              <MenuItem
                component={<NavLink to="/barchar" />}
                icon={<BarChartIcon />}
              >
                Diagramme Barchar
              </MenuItem>
              <MenuItem
                component={<NavLink to="/geographie" />}
                icon={<MapIcon />}
              >
                Geographie
              </MenuItem>
            </SubMenu>

            <MenuItem
              component={<NavLink to="/parametre" />}
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
          <Typography variant="h7" sx={{ color: colors.grey[100] }}>
            Ortho-Dentiste
          </Typography>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default Sidebars;
