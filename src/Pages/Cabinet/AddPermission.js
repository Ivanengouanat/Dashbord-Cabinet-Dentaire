import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Headers from "../../components/Headers";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import useCalculateDays from "../../components/useCalculateDays";
import { toast } from "react-toastify";

const AddPermissionForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isSubmitting,
  isValid,
  initialPermission,
}) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  useCalculateDays(values.debut, values.fin, setFieldValue);
  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="ID"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.id}
          name="id"
          error={!!touched.id && !!errors.id} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
          helperText={touched.id && errors.id} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Noms et Prenoms"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.noms}
          name="noms"
          error={!!touched.noms && !!errors.noms} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
          helperText={touched.noms && errors.noms} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
          sx={{ gridColumn: "span 3" }}
        />

        <TextField
          fullWidth
          variant="filled"
          type="date"
          label="Date Debut"
          onBlur={handleBlur}
          onChange={(event) => {
            handleChange(event);
            setFieldValue("fin", ""); // Réinitialise "fin" si "debut" est modifié
          }}
          inputProps={{
            min: new Date().toISOString().split("T")[0], // La date minimale pour "debut" est aujourd'hui
          }}
          value={values.debut}
          name="debut"
          error={!!touched.debut && !!errors.debut} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
          helperText={touched.debut && errors.debut} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
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
        />
        <TextField
          fullWidth
          variant="filled"
          type="date"
          label="Date de Fin"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.fin}
          name="fin"
          error={!!touched.fin && !!errors.fin} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
          helperText={touched.fin && errors.fin} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
          inputProps={{
            min: values.debut || new Date().toISOString().split("T")[0], // "fin" ne peut pas être avant "debut"
          }}
          sx={{
            gridColumn: "span 1",
            "& .MuiInputBase-root": {
              height: "56px",
            },
            "& .MuiInputLabel-root": {
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
          type="number"
          label="Nombre de jours"
          onBlur={handleBlur}
          value={values.nbrjour}
          name="nbrjour"
          error={!!touched.nbrjour && !!errors.nbrjour}
          helperText={touched.nbrjour && errors.nbrjour}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Raison"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.raison}
          name="raison"
          error={!!touched.raison && !!errors.raison} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
          helperText={touched.raison && errors.raison} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
          sx={{
            gridColumn: "span 4",
          }}
          multiline // permet de manipuler la taille des lignes
          rows={5} // donne la valeur de la taille de ligne NB: il marche de paire avec multiline
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
            : initialPermission
            ? "Mettre à jour"
            : "Ajouter un demande"}
        </Button>
      </Box>
    </form>
  );
};

const AddPermission = ({ handlePermission, initialPermission }) => {
  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    if (!values.id) {
      console.error("L'ID est indéfini");
      return;
    }
    handlePermission(values);
    resetForm();

    if (initialPermission) {
      toast.success("Mise à jour réussie !");
    } else {
      toast.success("Ajout effectue !");
    }
  };

  const validId = /^(cm-sky-)+(20)+[1-2]+[0-5]+(-)+[0-9]{4}$/;

  const initialValues = initialPermission || {
    id: "",
    noms: "",
    nbrjour: "",
    debut: "",
    fin: "",
    raison: "",
  };

  const userSchema = yup.object().shape({
    id: yup
      .string()
      .matches(validId, "format invalid EX: cm-sky-2023-0000")
      .required("ce champs doit etre rempli"),
    noms: yup
      .string()
      .min(10, "le champs doit contenir plus de 10 caracteres")
      .max(50, "le champs doit contenir moins de 15 caracteres")
      .required("ce champ doit etre rempli"),
    nbrjour: yup
      .number()
      .required("remplissez date debut et date fin pour complete ce champs "),
    debut: yup.date().required("ce champ doit etre rempli"),
    fin: yup.date().required("ce champ doit etre rempli"),
    raison: yup.string().required("ce champ doit etre rempli"),
  });

  return (
    <Box m="20px">
      <Headers
        title="Demande une Permission"
        subtitle="information permission"
      />

      <Formik
        key={initialPermission ? initialPermission.id : "new"} // chaque fois que l'utilisateur bascule entre "édition" et "ajout", Formik recrée un nouvel état interne, forçant le formulaire à se réinitialiser en fonction des nouvelles valeurs initiales.
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {/*  {({
          values, // Contient les valeurs de tous les champs du formulaire.
          errors, // Contient les messages d'erreur de validation pour chaque champ.
          touched, // indique si un champ a été touché (interagi avec).
          handleChange, // fonction pour gérer les changements de valeur dans les champs du formulaire.
          handleBlur, // Fonction pour gérer les événements de perte de focus.
          handleSubmit, // Fonction pour gérer la soumission du formulaire.
          isSubmitting, // Indique si le formulaire est en cours de soumission.
          /* and other goodies */
        /*  setFieldValue,
        }) => {
          useCalculateDays(values.debut, values.fin, setFieldValue);
         
        }} */}
        {(props) => <AddPermissionForm {...props} />}
      </Formik>
    </Box>
  );
};

export default AddPermission;
