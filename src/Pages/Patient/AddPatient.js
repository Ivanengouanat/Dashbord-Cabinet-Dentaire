import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Headers from "../../components/Headers";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";

const AddPatient = (props) => {
  const { handleAddPatient, initialPatient } = props;

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    handleAddPatient({ ...values });
    resetForm();
    if (initialPatient) {
      toast.success("Mise à jour réussie !");
    } else {
      toast.success("Patient ajouté avec succès !");
    }
  };

  const initialValues = initialPatient || {
    noms: "",
    prenoms: "",
    sexe: "",
    age: "",
    email: "",
    contact: "",
    adresse: "",
    diagnostic: "",
  };

  const emailValid = /^[a-zA-Z0-9]+@gmail\.com$/;

  const ageValid = /^(150|1[0-4][0-9]|[1-9]?[0-9])$/;

  const contactValid = /^(69|65|62|67)[0-9]{7}$/;

  // ^ : Indique le début de la chaîne.
  //  (69|65|62) : La chaîne doit commencer par l'une de ces séquences : 69, 65 ou 62.
  // [0-9]{7} : Les 7 caractères suivants doivent être des chiffres, ce qui donne un total de 9 chiffres.
  // $ : Indique la fin de la chaîne.

  const userSchema = yup.object().shape({
    noms: yup
      .string()
      .min(7, "le champs doit contenir plus de 7 caracteres")
      .max(20, "le champs doit contenir moins de 15 caracteres")
      .required("ce champ doit etre rempli"),
    prenoms: yup
      .string()
      .min(4, "le champs doit contenir plus de 4 caracteres")
      .max(15, "le champs doit contenir moins de 7 caracteres")
      .required("ce champ doit etre rempli"),
    sexe: yup.string().required("ce champ doit être rempli"),
    age: yup
      .string()
      .matches(ageValid, "age non pris en compte")
      .required("ce champ doit etre rempli"),
    email: yup
      .string()
      .matches(emailValid, "format invalide Ex: exemple@gmail.com")
      .required("ce champ doit etre rempli"),
    contact: yup
      .string()
      .matches(contactValid, "format incorrect Ex:678134678")
      .required("ce champ doit etre rempli"),
    adresse: yup.string().required("ce champ doit etre rempli"),
    diagnostic: yup.string().required("ce champ doit être rempli"),
  });

  return (
    <Box m="20px">
      <Headers title="Ajouter Patient" subtitle="information du patient" />

      <Formik
        key={initialPatient ? initialPatient.id : "new"} // chaque fois que l'utilisateur bascule entre "édition" et "ajout", Formik recrée un nouvel état interne, forçant le formulaire à se réinitialiser en fonction des nouvelles valeurs initiales.
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(8, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Noms"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noms}
                name="noms"
                error={!!touched.noms && !!errors.noms} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.noms && errors.noms} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidthcarrie
                dentaire
                variant="filled"
                type="text"
                label="Prenoms"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.prenoms}
                name="prenoms"
                error={!!touched.prenoms && !!errors.prenoms} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.prenoms && errors.prenoms} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
                sx={{ gridColumn: "span 4" }}
              />{" "}
              <TextField
                fullWidth
                select
                variant="filled"
                label="Sexe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sexe}
                name="sexe"
                error={!!touched.sexe && !!errors.sexe}
                helperText={touched.sexe && errors.sexe}
                sx={{ gridColumn: "span 3" }}
                SelectProps={{ native: true }}
              >
                <option value=""></option>

                <option value="Masculin">Masculin</option>
                <option value="Femini">Feminin</option>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.age && errors.age} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.contact && errors.contact} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.email && errors.email} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adresse"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adresse}
                name="adresse"
                error={!!touched.adresse && !!errors.adresse} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.adresse && errors.adresse} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Diagnostic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.diagnostic}
                name="diagnostic"
                error={!!touched.diagnostic && !!errors.diagnostic}
                helperText={touched.diagnostic && errors.diagnostic}
                sx={{ gridColumn: "span 8" }}
                multiline
                rows={5}
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
                  : initialPatient
                  ? "Mettre à jour"
                  : "Ajouter Patient"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddPatient;
