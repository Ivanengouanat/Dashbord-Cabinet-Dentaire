import Headers from "../components/Headers";
import { tokens } from "../theme";
import { Box, useTheme, Typography, Button } from "@mui/material";
import Piechar from "../components/PieChar";
import DownloadIcon from "@mui/icons-material/Download";
import StartBox from "../components/StartBox";
import Person2Icon from "@mui/icons-material/Person2";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { useState, useEffect } from "react";
import useIncrease from "../components/useIncrease";
import LineChart from "../components/Linechar";
import GeographyChart from "../components/GeographyChart";
import Barchart from "../components/Barchar";

const Dashbord = ({
  ListPatient,
  ListPersonnels,
  ListAccount,
  ListDate,
  ListMateriels,
  ListProduits,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  var max;
  // Utilisez le hook pour calculer les augmentations dynamiques
  const lastIncrease = useIncrease(ListPatient, (max = "100"));
  const lastIncreasePersonnel = useIncrease(ListPersonnels, (max = "10"));
  const lastIncreaseSolde = useIncrease(ListAccount, (max = "50"));
  const lastIncreaseDate = useIncrease(ListDate, (max = "75"));

  return (
    <Box
      sx={{
        height: "90vh", // Garde le conteneur dans les limites de l'écran
        overflow: "hidden", // Empêche l'apparition de la scrollbar
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Headers title="Tableau de Bord" subtitle="Catalogue" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadIcon sx={{ mr: "10px" }} />
            Download
          </Button>
        </Box>
      </Box>

      {/* block patient, consultation... */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="70px"
        gap="20px"
        padding="0 20px"
      >
        {/* Row1 */}
        <Box
          sx={{
            gridColumn: "span 3",
            cursor: "pointer",
            ["&:hover"]: {
              transform: "translateY(-5px)",
              transition: "0.3s ease-in-out",
            },
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb="-5px"
        >
          <StartBox
            title={ListPatient.length}
            increase={`+${lastIncrease}%`}
            subtitle="Total Patients"
            DataArray={ListPatient}
            maxItems="100"
            icon={
              <Person2Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: "span 3",
            cursor: "pointer",
            ["&:hover"]: {
              transform: "translateY(-5px)",
              transition: "0.3s ease-in-out",
            },
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb="-5px"
        >
          <StartBox
            title={ListPersonnels.length}
            increase={`+${lastIncreasePersonnel}%`}
            subtitle=" Total Personnels"
            DataArray={ListPersonnels}
            maxItems={10}
            icon={
              <ManageAccountsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: "span 3",
            cursor: "pointer",
            ["&:hover"]: {
              transform: "translateY(-5px)",
              transition: "0.3s ease-in-out",
            },
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb="-5px"
        >
          <StartBox
            title={ListAccount.length}
            increase={`+${lastIncreaseSolde}%`}
            subtitle="Registre Payement"
            DataArray={ListAccount}
            maxItems={50}
            icon={
              <Person2Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: "span 3",
            cursor: "pointer",
            ["&:hover"]: {
              transform: "translateY(-5px)",
              transition: "0.3s ease-in-out",
            },
          }}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb="-5px"
        >
          <StartBox
            title={ListDate.length}
            increase={`+${lastIncreaseDate}%`}
            subtitle="Rendez-Vous"
            DataArray={ListDate}
            maxItems={75}
            icon={
              <ContactPhoneIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Row 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="5px"
          sx={{
            cursor: "pointer",
            ["&:hover"]: {
              transform: "translateY(-5px)",
              transition: "0.3s ease-in-out",
            },
          }}
        >
          <Box mb="-5px" display="flex" justifyContent="space-between">
            <Typography variant="h7" fontWeight="600" color={colors.grey[100]}>
              Virsualisation du Materiel
            </Typography>
            <Typography
              variant="h8"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              {ListMateriels.length} Materiel enregistre
            </Typography>
          </Box>
          <Box height="180px" position="relative" top="-20px" left="-10px">
            <LineChart isDashboard={true} ListMateriels={ListMateriels} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="0 3px"
          sx={{
            cursor: "pointer",
            ["&:hover"]: {
              transform: "translateY(-5px)",
              transition: "0.3s ease-in-out",
            },
          }}
        >
          <Typography variant="h6" color={colors.grey[100]}>
            Stat Cabinet
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="116px"
          >
            <Piechar
              ListPatient={ListPatient}
              ListPersonnels={ListPersonnels}
              ListAccount={ListAccount}
              ListDate={ListDate}
              isDashboard={true}
            />
          </Box>
        </Box>

        {/* Row 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="5px"
          mb="-40px"
          sx={{
            cursor: "pointer",
            ["&:hover"]: {
              transform: "translateY(-5px)",
              transition: "0.3s ease-in-out",
            },
          }}
        >
          <Typography variant="h7" fontWeight="600">
            Carte Du Monde
          </Typography>
          <Box height="150px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          mb="-40px"
          sx={{
            cursor: "pointer",
            ["&:hover"]: {
              transform: "translateY(-5px)",
              transition: "0.3s ease-in-out",
            },
          }}
        >
          <Box display="flex" justifyContent="space-between" p="0 5px">
            <Typography
              variant="h7"
              fontWeight="600"
              sx={{ padding: "5px 5px 0 5px" }}
            >
              Visualisation des produits
            </Typography>
            <Typography
              variant="h8"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              {ListProduits.length} produits enregistre
            </Typography>
          </Box>

          <Box height="200px">
            <Barchart isDashboard={true} ListProduits={ListProduits} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashbord;
