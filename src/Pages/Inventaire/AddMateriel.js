import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Headers from "../../components/Headers";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import { useState } from "react";

const AddMateriel = (props) => {
  const { handleAddMateriel, initialMateriel } = props;

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = (values, { resetForm }) => {
    if (!values) {
      console.error("Values est indéfini :", values);
      return;
    }
    console.log("Nouveau matériel :", values);
    handleAddMateriel(values);
    resetForm();
    if (initialMateriel) {
      toast.success("Mise à jour réussie !");
    } else {
      toast.success("Ajout effectue !");
    }
  };

  const initialValues = initialMateriel || {
    noms: "",
    categorie: "",
    quantite: "",
    date: "",
    description: "",
  };

  const userSchema = yup.object().shape({
    noms: yup.string().required("ce champ doit etre rempli"),
    categorie: yup.string().required("ce champ doit être rempli"),
    quantite: yup.string().required("ce champ doit etre rempli"),
    date: yup
      .string()
      .test(
        "valid-year",
        "L’année ne doit pas dépasser 4 chiffres",
        (value) => {
          if (!value) return false;
          const year = new Date(value).getFullYear();
          return year <= 9999;
        }
      )
      .required("ce champ doit être rempli"),
    description: yup.string(), // Facultatif si généré automatiquement
  });

  const categoriesToNames = {
    "Matériel médical et dentaire": [
      "Fauteuils dentaires",
      "Lampes de soins dentaires",
      "Appareils de radiographie",
      "Stérilisateurs",
      "Scalers ultrasoniques",
      "Pièces à main",
    ],
    "Consommables dentaires": [
      "Gants",
      "Masques chirurgicaux",
      "Aiguilles et seringues",
      "Ciment dentaire",
      "Résines composites",
      "Produits de nettoyage",
    ],
    "Produits d'hygiène dentaire": [
      "Brossettes interdentaires",
      "Fils dentaires",
      "Dentifrices",
      "Bain de bouche professionnel",
    ],
    "Matériel de laboratoire": [
      "Modèles en plâtre",
      "Matériaux pour empreintes",
      "Articulateurs dentaires",
      "Polisseurs",
    ],
  };

  const namesToDescriptions = {
    // Matériel médical et dentaire
    "Fauteuils dentaires":
      "Chaise ergonomique pour les soins dentaires, avec réglages pour le confort du patient.",
    "Lampes de soins dentaires":
      "Lampe puissante utilisée pour éclairer la cavité buccale pendant les traitements.",
    "Appareils de radiographie":
      "Dispositifs pour réaliser des radiographies dentaires, comme les radios panoramiques.",
    Stérilisateurs:
      "Équipements pour stériliser les outils dentaires et prévenir les infections.",
    "Scalers ultrasoniques":
      "Outils utilisés pour retirer le tartre des dents à l’aide d’ultrasons.",
    "Pièces à main":
      "Instruments rotatifs comme les turbines et les contre-angles pour les traitements dentaires.",

    // Consommables dentaires
    Gants:
      "Protection essentielle pour éviter les contaminations entre le patient et le praticien.",
    "Masques chirurgicaux":
      "Barrière pour limiter la transmission des particules pendant les traitements.",
    "Aiguilles et seringues":
      "Utilisées pour administrer des anesthésiques lors des interventions.",
    "Ciment dentaire":
      "Matériau utilisé pour fixer les restaurations dentaires comme les couronnes.",
    "Résines composites":
      "Matériaux de remplissage pour restaurer la forme des dents.",
    "Produits de nettoyage":
      "Solutions désinfectantes pour stériliser les surfaces et les équipements.",

    // Produits d'hygiène dentaire
    "Brossettes interdentaires":
      "Accessoires pour nettoyer entre les dents où la brosse classique ne passe pas.",
    "Fils dentaires":
      "Fil pour enlever la plaque et les débris alimentaires entre les dents.",
    Dentifrices:
      "Produits utilisés pour nettoyer et protéger les dents contre les caries.",
    "Bain de bouche professionnel":
      "Solution liquide pour compléter l’hygiène bucco-dentaire avec des propriétés antiseptiques.",

    // Matériel de laboratoire
    "Modèles en plâtre":
      "Modèles dentaires réalisés en plâtre pour les études ou les traitements prothétiques.",
    "Matériaux pour empreintes":
      "Substances comme l’alginate utilisées pour créer des moulages de la dentition.",
    "Articulateurs dentaires":
      "Appareils pour reproduire les mouvements mandibulaires à des fins d'étude.",
    Polisseurs: "Instruments pour lisser et polir les restaurations dentaires.",
  };

  const handleDateChange = (e, setFieldValue) => {
    const selectedDate = new Date(e.target.value);
    const mois = selectedDate.toLocaleString("fr-FR", { month: "long" }); // Extrait le mois en toutes lettres
    const annee = selectedDate.getFullYear(); // Extrait l'année
    console.log(`Mois: ${mois}, Année: ${annee}`);
    setFieldValue("mois", mois);
    setFieldValue("annee", annee);
  };

  return (
    <Box m="20px">
      <Headers
        title="Ajouter Du Materiel"
        subtitle="Remplissez les Informations lies au materiel"
      />

      <Formik
        key={initialMateriel ? initialMateriel.id : "new"} // chaque fois que l'utilisateur bascule entre "édition" et "ajout", Formik recrée un nouvel état interne, forçant le formulaire à se réinitialiser en fonction des nouvelles valeurs initiales.
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values, // Contient les valeurs de tous les champs du formulaire.
          errors, // Contient les messages d'erreur de validation pour chaque champ.
          touched, // indique si un champ a été touché (interagi avec).
          handleChange, // fonction pour gérer les changements de valeur dans les champs du formulaire.
          handleBlur, // Fonction pour gérer les événements de perte de focus.
          handleSubmit, // Fonction pour gérer la soumission du formulaire.
          isSubmitting, // Indique si le formulaire est en cours de soumission.
          isValid,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              <TextField
                fullWidth
                select
                variant="filled"
                label="Categorie"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e); // Met à jour la valeur dans Formik
                  setFieldValue("noms", ""); // Réinitialise le champ Noms
                }}
                value={values.categorie}
                name="categorie"
                error={!!touched.categorie && !!errors.categorie}
                helperText={touched.categorie && errors.categorie}
                SelectProps={{ native: true }}
                sx={{
                  gridColumn: "span 1",
                  "& .MuiInputBase-root": {
                    // & .MuiInputBase-root ajuste la hauteur du champ de saisie.
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": {
                    // & .MuiInputLabel-root ajuste la taille et la position de l'étiquette.
                    fontSize: "18px",
                    transform: "translate(2px, -1px) scale(0.75)",
                  },
                  "& .MuiInputLabel-shrink": {
                    // & .MuiInputLabel-shrink ajuste la position de l'étiquette lorsqu'elle est réduite.
                    transform: "translate(0, 1.5px) scale(0.75)",
                  },
                }}
              >
                <option value="">-- Sélectionnez une catégorie --</option>
                {Object.keys(categoriesToNames).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                select
                label="Noms"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e); // Met à jour la valeur de "noms" dans Formik
                  setFieldValue(
                    "description",
                    namesToDescriptions[e.target.value] || ""
                  ); // Met à jour la description associée
                }}
                value={values.noms}
                name="noms"
                disabled={!values.categorie} // Désactive le champ si aucune catégorie sélectionnée
                error={!!touched.noms && !!errors.noms} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.noms && errors.noms} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
                sx={{ gridColumn: "span 3" }}
              >
                <MenuItem value="">-- Sélectionnez un nom --</MenuItem>
                {values.categorie &&
                  categoriesToNames[values.categorie]?.map((noms) => (
                    <MenuItem key={noms} value={noms}>
                      {noms}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label={`Quantité`}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantite}
                name="quantite"
                error={!!touched.quantite && !!errors.quantite}
                helperText={touched.quantite && errors.quantite}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                inputProps={{
                  min: values.debut || new Date().toISOString().split("T")[0], // "fin" ne peut pas être avant "debut"
                }}
                error={!!touched.date && !!errors.ddate}
                helperText={touched.date && errors.date}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    // & .MuiInputBase-root ajuste la hauteur du champ de saisie.
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": {
                    // & .MuiInputLabel-root ajuste la taille et la position de l'étiquette.
                    fontSize: "18px",
                    transform: "translate(2px, -1px) scale(0.75)",
                  },
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(0, 1.5px) scale(0.75)",
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={5}
                disabled={!values.noms}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={!isValid || isSubmitting} // Désactivation si le formulaire est invalide ou en cours de soumission
              >
                {isSubmitting
                  ? "Chargement..."
                  : initialMateriel
                  ? "Mettre à jour"
                  : "Ajouter Materiel"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddMateriel;
