// src/scenes/Settings.jsx
import {
  Box,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button,
  TextField,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { colorModeContext, tokens } from "../theme";

const Parametre = () => {
  /* -------------------------------------------------------------------- */
  /*  state & helpers                                                     */
  /* -------------------------------------------------------------------- */
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  const isDesktop = useMediaQuery("(min-width:900px)");

  const [tab, setTab] = useState(0);

  /* Profil */
  const [avatar, setAvatar] = useState(null); // preview URL
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "admin@example.com",
  });

  /* Sécurité */
  const [pwdData, setPwdData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  /* Notifications */
  const [notif, setNotif] = useState({
    email: true,
    push: false,
  });

  /* -------------------------------------------------------------------- */
  /*  callbacks : à remplacer par tes appels API                          */
  /* -------------------------------------------------------------------- */
  const onSaveProfile = () => {
    console.log("SAVE PROFILE", { avatar, ...profileData });
  };
  const onSavePassword = () => {
    console.log("SAVE PASSWORD", pwdData);
  };
  const onSaveNotif = () => {
    console.log("SAVE NOTIF", notif);
  };

  /* -------------------------------------------------------------------- */
  /*  sous-composants pour ne pas alourdir le rendu                        */
  /* -------------------------------------------------------------------- */

  const SectionWrapper = ({ children }) => (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: colors.primary[400],
        borderRadius: 2,
      }}
    >
      {children}
    </Box>
  );

  const ProfileSection = () => (
    <SectionWrapper>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={avatar}
          sx={{
            width: 72,
            height: 72,
            border: `2px solid ${colors.grey[300]}`,
          }}
        />
        <Button
          startIcon={<PhotoCamera />}
          variant="contained"
          component="label"
        >
          Changer
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAvatar(URL.createObjectURL(file));
            }}
          />
        </Button>
      </Box>

      <TextField
        label="Nom complet"
        fullWidth
        value={profileData.name}
        onChange={(e) =>
          setProfileData((s) => ({ ...s, name: e.target.value }))
        }
      />
      <TextField
        label="Adresse e-mail"
        type="email"
        fullWidth
        value={profileData.email}
        onChange={(e) =>
          setProfileData((s) => ({ ...s, email: e.target.value }))
        }
      />

      <Button
        sx={{ alignSelf: "flex-end" }}
        variant="contained"
        onClick={onSaveProfile}
      >
        Enregistrer
      </Button>
    </SectionWrapper>
  );

  const SecuritySection = () => (
    <SectionWrapper>
      <TextField
        label="Mot de passe actuel"
        type="password"
        fullWidth
        value={pwdData.current}
        onChange={(e) => setPwdData((s) => ({ ...s, current: e.target.value }))}
      />
      <TextField
        label="Nouveau mot de passe"
        type="password"
        fullWidth
        value={pwdData.new}
        onChange={(e) => setPwdData((s) => ({ ...s, new: e.target.value }))}
      />
      <TextField
        label="Confirmer le mot de passe"
        type="password"
        fullWidth
        value={pwdData.confirm}
        onChange={(e) => setPwdData((s) => ({ ...s, confirm: e.target.value }))}
      />
      <Button
        sx={{ alignSelf: "flex-end" }}
        variant="contained"
        onClick={onSavePassword}
      >
        Mettre à jour
      </Button>
    </SectionWrapper>
  );

  const AppearanceSection = () => (
    <SectionWrapper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Thème sombre</Typography>
        <Switch
          checked={theme.palette.mode === "dark"}
          onChange={colorMode.toggleColor}
        />
      </Box>
    </SectionWrapper>
  );

  const NotifSection = () => (
    <SectionWrapper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Notifications e-mail</Typography>
        <Switch
          checked={notif.email}
          onChange={(e) => setNotif((s) => ({ ...s, email: e.target.checked }))}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Notifications push</Typography>
        <Switch
          checked={notif.push}
          onChange={(e) => setNotif((s) => ({ ...s, push: e.target.checked }))}
        />
      </Box>
      <Button
        sx={{ alignSelf: "flex-end" }}
        variant="contained"
        onClick={onSaveNotif}
      >
        Enregistrer
      </Button>
    </SectionWrapper>
  );

  /* -------------------------------------------------------------------- */
  /*  Rendu : Tabs/Desktop  -  Accordions/Mobile                          */
  /* -------------------------------------------------------------------- */

  if (isDesktop) {
    /* --------------------------   VERSION DESKTOP   ------------------ */
    return (
      <Box sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ mb: 3 }}
        >
          <Tab label="Profil" />
          <Tab label="Sécurité" />
          <Tab label="Apparence" />
          <Tab label="Notifications" />
        </Tabs>

        {tab === 0 && <ProfileSection />}
        {tab === 1 && <SecuritySection />}
        {tab === 2 && <AppearanceSection />}
        {tab === 3 && <NotifSection />}
      </Box>
    );
  }

  /* ------------------------------   MOBILE   --------------------------- */
  return (
    <Box sx={{ p: 1 }}>
      <Accordion disableGutters sx={{ background: colors.primary[400] }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Profil</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProfileSection />
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters sx={{ background: colors.primary[400] }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Sécurité</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SecuritySection />
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters sx={{ background: colors.primary[400] }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Apparence</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AppearanceSection />
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters sx={{ background: colors.primary[400] }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Notifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NotifSection />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Parametre;
