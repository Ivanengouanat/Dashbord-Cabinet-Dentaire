import { Box } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { colorModeContext, useMode } from "./theme";
import Topbar from "./scenes/Topbar";
import Sidebars from "./scenes/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Dashbord from "./Pages/Dashbord";
import Doctor from "./Pages/Cabinet/Doctor";
import Attendance from "./Pages/Cabinet/Attendance";
import Employers from "./Pages/Cabinet/Employer";
import Permission from "./Pages/Cabinet/Permission";
import Salaire from "./Pages/Cabinet/Salaire";
import AddPersonnel from "./Pages/Cabinet/AddPersonnel";
import AddPermission from "./Pages/Cabinet/AddPermission";

import SoldePatient from "./Pages/Account/SoldePatient";
import ListMateriel from "./Pages/Inventaire/ListMateriel";
import ListProduit from "./Pages/Inventaire/ListProduit";
import AddRendezVous from "./Pages/Patient/AddRendezVous";
import Calandrier from "./Pages/Cabinet/calendrier";
import AddAccount from "./Pages/Account/AddAccount";

import DatePatient from "./Pages/Patient/DatePatient";
import ListPatients from "./Pages/Patient/ListPatient";
import Parametre from "./Pages/Parametre";
import AddPatient from "./Pages/Patient/AddPatient";

import LineCharBar from "./Pages/Statistique/LineCharBar";
import Pie from "./Pages/Statistique/PieCharBar";
import Barchar from "./Pages/Statistique/Barchar";
import Geographie from "./Pages/Statistique/Geographie";

import AddProduit from "./Pages/Inventaire/AddProduit";
import AddMateriel from "./Pages/Inventaire/AddMateriel";

import NotificationDetail from "./components/NotificationsDetails";
import { v4 as uuidv4 } from "uuid";

import User from "./User/User";

function App() {
  const [colorMode, theme] = useMode();
  const navigate = useNavigate();
  {
    /* plie pour la sidebar */
  }
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleSetCollapsed() {
    setIsCollapsed(!isCollapsed);
  }

  {
    /* Tableau qui conserve les donnees du formulaire addpatient et pour gerer account */
  }
  const [ListPatient, setListPatient] = useState([]);

  function handleAddPatient(Values) {
    if (EditPatient) {
      const updatedPatient = ListPatient.map((e) =>
        e.id === EditPatient.id ? { ...Values, id: EditPatient.id } : e
      );
      setListPatient(updatedPatient);
      setEditPatient(null);
    } else {
      console.log("liste patient", ListPatient);
      Values.id = ListPatient.length + 1; // Assigner un ID unique à chaque patient
      Values.action = "";
      setListPatient([...ListPatient, Values]);
    }
    navigate("/listpatient");
  }

  {
    /* fonctions pour  supprimer un patient */
  }

  function handleDeletePatient(id) {
    setListPatient(ListPatient.filter((e) => e.id !== id));
  }

  {
    /* variable d'etat pour editer un patient */
  }

  const [EditPatient, setEditPatient] = useState(null);

  function hadleEditPatient(e) {
    console.log("Donnees du patient a edite", e);
    setEditPatient(e);
    navigate("/addpatient");
  }

  {
    /* gestion des accounts */
  }
  const [ListAccount, setListAccount] = useState([]);

  function handleAddAccount(values) {
    console.log("fonction d'ajout des soldes", values);

    const patientExists = ListAccount.some(
      // La méthode .some() vérifie si au moins un élément dans ListAccount a un champ id identique à celui de values.id.
      (patient) => patient.id === values.id
    );

    if (patientExists) {
      // Met à jour les informations existantes
      const updatedListAccount = ListAccount.map((patient) =>
        patient.id === values.id ? { ...patient, ...values } : patient
      );
      setListAccount(updatedListAccount);
      console.log(
        "Les informations du patient ont été mises à jour :",
        updatedListAccount
      );
    } else {
      // Ajoute un nouveau solde
      setListAccount([...ListAccount, values]);
      console.log("Nouveau solde ajouté :", values);
    }
    navigate("/soldepatient");
  }

  const [EditAccount, seteditAccount] = useState(null);

  function handleEditAccount(patient) {
    const patientExists = ListAccount.some(
      (account) => account.id === patient.id
    );

    if (patientExists) {
      // Pré-remplit les données pour mise à jour
      const existingAccount = ListAccount.find(
        (account) => account.id === patient.id
      );
      console.log("Patient déjà existant dans SoldePatient :", existingAccount);
      seteditAccount(existingAccount); // Passe les données au formulaire AddAccount
    } else {
      // Initialise un nouveau solde
      console.log(
        "Aucun solde existant pour ce patient. Création d'un nouveau."
      );
      seteditAccount({
        id: patient.id,
        noms: patient.noms,
        prenoms: patient.prenoms,
      });
    }

    navigate("/addaccount");
  }

  {
    /* Tableau qui conserve les donnees de AddPersonnel */
  }
  const [ListPersonnels, setListpersonnels] = useState([]);

  function handleAddPersonnel(values) {
    if (!values) {
      console.error("values est indéfini :", values);
      return;
    }
    console.log("EditPersonnel:", EditPersonnel);
    console.log("Values lors de l'appel à handleAddPersonnel:", values);
    if (EditPersonnel) {
      // mettre à jour l'employé existant
      const updatedPersonnels = ListPersonnels.map((e) =>
        e.id === EditPersonnel.id ? { ...values, id: EditPersonnel.id } : e
      );
      setListpersonnels(updatedPersonnels);
      // Si l'employé existait dans DataDocteur et n'est plus docteur
      if (EditPersonnel.poste === "Docteur" && values.poste !== "Docteur") {
        setDataDocteur(DataDocteur.filter((e) => e.id !== EditPersonnel.id));
      }
      // Si l'employé n'était pas docteur et devient docteur
      else if (
        values.poste === "Docteur" &&
        EditPersonnel.poste !== "Docteur"
      ) {
        setDataDocteur([...DataDocteur, { ...values, id: EditPersonnel.id }]);
      }

      setEditPersonnel(null);
    } else {
      console.log("list Personnels", ListPersonnels);
      values.id = uuidv4();
      values.action = "";
      setListpersonnels([...ListPersonnels, values]);

      if (values.poste == "Docteur") {
        console.log("Tableau Docteur", DataDocteur);
        setDataDocteur([...DataDocteur, values]);
      }
    }
    navigate("/employer");
  }

  /* Tableau qui conserve les donnees de Docteur */
  const [DataDocteur, setDataDocteur] = useState([]);

  /*  function pour supprimer un Docteur */
  function handleDeleteDocteur(id) {
    console.log("Tableau Docteur", DataDocteur);
    setDataDocteur(DataDocteur.filter((Values) => Values.id !== id));
    setListpersonnels(ListPersonnels.filter((Values) => Values.id !== id));
  }

  /* Gestion de l'etat de la mise a jour d'employer */
  const [EditPersonnel, setEditPersonnel] = useState(null);

  function handleEditPersonnel(e) {
    if (!e || !e.id) {
      console.error("e est indéfini :", e);
      return;
    }
    console.log("Valeurs reçues pour édition:", e);
    setEditPersonnel(e);
    navigate("/addpersonnel");
  }

  //  tableau des permission

  const [dataPermission, setDataPermission] = useState([]);

  function handlePermission(Values) {
    if (EditPermission) {
      const updatePermission = dataPermission.map((e) =>
        e.id === EditPermission.id ? { ...Values, id: EditPermission.id } : e
      );
      setDataPermission(updatePermission);
      setEditPermission(null);
    } else {
      console.log("Tableau permission", dataPermission);
      Values.action = "";
      setDataPermission([...dataPermission, Values]);
    }
    navigate("/permission");
  }

  // fonction pour supprimer les permission
  function handleDeletePermission(id) {
    setDataPermission(dataPermission.filter((e) => e.id !== id));
  }

  // etat pour editer une permission
  const [EditPermission, setEditPermission] = useState(null);

  function handleEditPermission(e) {
    console.log("donnes a edite", e);
    setEditPermission(e);
    navigate("/addpermission");
  }

  // ajouter un rendez vous
  const [ListDate, setListDate] = useState([]);
  function handleAddRendezVous(Values) {
    console.log("donnees en cour d'edition", EditDate);
    if (EditDate) {
      setListDate(
        ListDate.map((e) =>
          e.id === EditDate.id ? { ...Values, id: EditDate.id } : e
        )
      );
      setEditDate(null);
    } else {
      Values.id = ListDate.length + 1;
      setListDate([...ListDate, Values]);
    }
    navigate("/datepatient");
  }

  // fonction pour supprimer un rendez vous
  function handleDeleteDate(id) {
    console.log("id de l'element a supprimer ", id);
    setListDate(ListDate.filter((e) => e.id !== id));
  }

  // gestion de l'edition
  const [EditDate, setEditDate] = useState(null);

  function handleEditDate(e) {
    console.log("element a edit est", e);
    setEditDate(e);
    navigate("/addrendezvous");
  }

  // gestion des produits
  const [ListProduits, setListProduit] = useState([]);
  const [EditProduit, setEditProduit] = useState(null);

  function handleAddProduit(values) {
    console.log("objet produit", values);
    values.id = uuidv4();
    values.action = "";
    if (EditProduit) {
      setListProduit(
        ListProduits.map((e) =>
          e.id === EditProduit.id ? { ...values, id: EditProduit.id } : e
        )
      );
      setEditProduit(null);
    } else {
      setListProduit([...ListProduits, values]);
      console.log("tableau de produit", ListProduit);
    }
    navigate("/listproduit");
  }

  function handleDeleteProduit(id) {
    console.log("l'elemet a supprimer", id);
    setListProduit(ListProduits.filter((e) => e.id !== id));
  }

  function handleEditProduit(e) {
    console.log("l'element a editer", e);
    setEditProduit(e);
    navigate("/addproduit");
  }
  function handleChangeQuantite(id, value) {
    setListProduit((PrevListProduits) =>
      PrevListProduits.map((e) => (e.id === id ? { ...e, quantite: value } : e))
    );
  }

  // gestion du composant Materiel
  const [ListMateriels, setListMateriel] = useState([]);
  const [EditMateriel, setEditMateriel] = useState(null);

  function handleAddMateriel(values) {
    console.log("valeurs du formulaire AddMateriel", values);
    values.id = uuidv4();
    values.action = "";
    if (EditMateriel) {
      setListMateriel(
        ListMateriels.map((e) =>
          e.id === EditMateriel.id ? { ...values, id: EditMateriel.id } : e
        )
      );
      setEditMateriel(null);
    } else {
      setListMateriel([...ListMateriels, values]);
      console.log("tableau de Materiel", ListMateriels);
    }
    navigate("/listmateriel");
  }

  function handleDeleteMateriel(id) {
    console.log("materiel a supprimer", id);
    setListMateriel(ListMateriels.filter((e) => e.id !== id));
  }

  function handleEditMateriel(e) {
    console.log("materiel a edite", e);
    setEditMateriel(e);
    navigate("/addmateriel");
  }

  /* Tableau de coche de l'attendance */
  const columns = [
    { Header: "Employee", accessor: "employeeName" },
    { Header: " 1", accessor: "jour1" },
    { Header: " 2", accessor: "jour2" },
    { Header: " 3", accessor: "jour3" },
    { Header: " 4", accessor: "jour4" },
    { Header: "5", accessor: "jour5" },
    { Header: " 6", accessor: "jour6" },
    { Header: " 7", accessor: "jour7" },
    { Header: " 8", accessor: "jour8" },
    { Header: " 9", accessor: "jour9" },
    { Header: " 10", accessor: "jour10" },
    { Header: " 11", accessor: "jour11" },
    { Header: " 12", accessor: "jour12" },
    { Header: " 13", accessor: "jour13" },
    { Header: " 14", accessor: "jour14" },
    { Header: " 15", accessor: "jour15" },
    { Header: " 16", accessor: "jour16" },
    { Header: " 17", accessor: "jour17" },
    { Header: " 18", accessor: "jour18" },
    { Header: " 19", accessor: "jour19" },
    { Header: " 20", accessor: "jour20" },
    { Header: " 21", accessor: "jour21" },
    { Header: " 22", accessor: "jour22" },
    { Header: " 23", accessor: "jour23" },
    { Header: " 24", accessor: "jour24" },
    { Header: " 25", accessor: "jour25" },
    { Header: " 26", accessor: "jour26" },
    { Header: " 27", accessor: "jour27" },
    { Header: " 28", accessor: "jour28" },
    { Header: " 29", accessor: "jour29" },
    { Header: " 30", accessor: "jour30" },
    // Ajouter plus de colonnes pour chaque jour
  ];

  const data = [
    {
      employeeName: "Albina Simonis",
      jour1: "",
      jour2: "",
      jour3: "",
      jour4: "",
      jour5: "",
      jour6: "",
      jour7: "",
      jour8: "",
      jour9: "",
      jour10: "",
      jour11: "",
      jour12: "",
      jour13: "",
      jour14: "",
      jour15: "",
      jour16: "",
      jour17: "",
      jour18: "",
      jour19: "",
      jour20: "",
      jour21: "",
      jour22: "",
      jour23: "",
      jour24: "",
      jour25: "",
      jour26: "",
      jour27: "",
      jour28: "",
      jour29: "",
      jour30: "",
    },
    // Ajouter plus d'employés
  ];

  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* ToastContainer pour afficher les notifications globalement */}
        {/*  Dans votre fichier App.js, vous pouvez ajouter le composant ToastContainer à un niveau global pour qu'il soit disponible partout dans votre application. Un bon emplacement serait dans le retour principal de votre fonction App, juste avant vos routes. Cela garantit que les notifications peuvent être déclenchées de n'importe quelle partie de votre application. */}
        <ToastContainer // Ce composant est requis pour afficher les notifications. Il doit être placé dans un endroit global (comme ici, après CssBaseline) pour qu'il soit accessible dans toutes vos pages et composants.
          position="top-right" // position : Définit la position des notifications (top-right, bottom-left, etc.).
          autoClose={5000} // autoClose : Temps avant que la notification disparaisse automatiquement (en millisecondes)
          hideProgressBar={false} // hideProgressBar : Si true, masque la barre de progression
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover // pauseOnHover : Met en pause l'auto-fermeture lorsque l'utilisateur survole la notification.
          theme="light"
        />
        <div className="app">
          <Sidebars
            isCollapsed={isCollapsed}
            handleSetCollapsed={handleSetCollapsed}
          />
          <main className="content">
            <Topbar handleSetCollapsed={handleSetCollapsed} />

            <Routes>
              <Route
                path="/"
                element={
                  <Dashbord
                    ListPatient={ListPatient}
                    ListPersonnels={ListPersonnels}
                    ListDate={ListDate}
                    ListAccount={ListAccount}
                    ListMateriels={ListMateriels}
                    ListProduits={ListProduits}
                  />
                }
              />
              <Route
                path="/doctor"
                element={
                  <Doctor
                    DataDocteur={DataDocteur}
                    handleDeleteDocteur={handleDeleteDocteur}
                    handleEditPersonnel={handleEditPersonnel}
                  />
                }
              />
              <Route
                path="/attendance"
                element={<Attendance columns={columns} data={data} />}
              />
              <Route
                path="/employer"
                element={
                  <Employers
                    ListPersonnels={ListPersonnels}
                    handleDeleteDocteur={handleDeleteDocteur}
                    handleEditPersonnel={handleEditPersonnel}
                  />
                }
              />
              <Route
                path="/permission"
                element={
                  <Permission
                    dataPermission={dataPermission}
                    handlePermission={handlePermission}
                    handleEditPermission={handleEditPermission}
                    handleDeletePermission={handleDeletePermission}
                  />
                }
              />
              <Route path="/salaire" element={<Salaire />} />
              <Route
                path="/soldepatient"
                element={<SoldePatient ListAccount={ListAccount} />}
              />
              <Route
                path="/addpersonnel"
                element={
                  <AddPersonnel
                    handleAddPersonnel={handleAddPersonnel}
                    initialPersonnel={EditPersonnel}
                  />
                }
              />
              <Route
                path="/addpermission"
                element={
                  <AddPermission
                    handlePermission={handlePermission}
                    initialPermission={EditPermission}
                  />
                }
              />
              <Route
                path="/listpatient"
                element={
                  <ListPatients
                    ListPatient={ListPatient}
                    isCollapsed={isCollapsed}
                    handleDeletePatient={handleDeletePatient}
                    handleEditPatient={hadleEditPatient}
                    handleEditAccount={handleEditAccount}
                  />
                }
              />
              <Route
                path="/addaccount"
                element={
                  <AddAccount
                    handleAddAccount={handleAddAccount}
                    initialAccount={EditAccount}
                  />
                }
              />
              <Route
                path="/addrendezvous"
                element={
                  <AddRendezVous
                    handleAddRendezVous={handleAddRendezVous}
                    initialDate={EditDate}
                  />
                }
              />
              <Route
                path="/calendrier"
                element={
                  <Calandrier
                    ListDate={ListDate}
                    setListDate={handleAddRendezVous}
                  />
                }
              />
              <Route
                path="/datepatient"
                element={
                  <DatePatient
                    ListDate={ListDate}
                    handleDeleteDate={handleDeleteDate}
                    handleEditDate={handleEditDate}
                  />
                }
              />
              <Route
                path="/listmateriel"
                element={
                  <ListMateriel
                    handleEditMateriel={handleEditMateriel}
                    handleDeleteMateriel={handleDeleteMateriel}
                    ListMateriels={ListMateriels}
                  />
                }
              />
              <Route
                path="/listproduit"
                element={
                  <ListProduit
                    ListProduits={ListProduits}
                    handleDeleteProduit={handleDeleteProduit}
                    handleEditProduit={handleEditProduit}
                    handleChangeQuantite={handleChangeQuantite}
                  />
                }
              />
              <Route
                path="/addpatient"
                element={
                  <AddPatient
                    handleAddPatient={handleAddPatient}
                    initialPatient={EditPatient}
                  />
                }
              />
              <Route path="/parametre" element={<Parametre />} />
              <Route
                path="/piecharbar"
                element={
                  <Pie
                    ListPatient={ListPatient}
                    ListPersonnels={ListPersonnels}
                    ListDate={ListDate}
                    ListAccount={ListAccount}
                  />
                }
              />
              <Route
                path="/barchar"
                element={<Barchar ListProduits={ListProduits} />}
              />
              <Route
                path="/linecharbar"
                element={
                  <LineCharBar
                    ListMateriels={ListMateriels}
                    ListProduits={ListProduits}
                  />
                }
              />
              <Route path="/geographie" element={<Geographie />} />
              <Route
                path="/addproduit"
                element={
                  <AddProduit
                    initialProduit={EditProduit}
                    handleAddProduit={handleAddProduit}
                  />
                }
              />
              <Route path="notification" element={<NotificationDetail />} />
              <Route
                path="/addmateriel"
                element={
                  <AddMateriel
                    initialMateriel={EditMateriel}
                    handleAddMateriel={handleAddMateriel}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </colorModeContext.Provider>
  );
}

export default App;
