import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Headers from "../../components/Headers";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";

const AddProduit = (props) => {
  const { handleAddProduit, initialProduit } = props;

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = (values, { resetForm }) => {
    if (!values) {
      console.error("Values est indéfini :", values);
      return;
    }
    console.log(values);
    handleAddProduit({ ...values });
    resetForm();
    if (initialProduit) {
      toast.success("Mise à jour réussie !");
    } else {
      toast.success("Ajout effectue !");
    }
  };

  const initialValues = initialProduit || {
    noms: "",
    categorie: "",
    quantite: "",
    date: "",
    description: "",
  };

  const userSchema = yup.object().shape({
    noms: yup
      .string()
      .min(7, "le champs doit contenir plus de 7 caracteres")
      .max(20, "le champs doit contenir moins de 15 caracteres")
      .required("ce champ doit etre rempli"),
    categorie: yup.string().required("ce champ doit être rempli"),
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
      .required("ce champs doit etre rempli"),
    quantite: yup.string().required("ce champ doit être rempli"),
    description: yup.string().required("ce champ doit être rempli"),
  });

  return (
    <Box m="20px">
      <Headers
        title="Ajouter Des Produits"
        subtitle="Remplissez les Informations lies au produit"
      />

      <Formik
        key={initialProduit ? initialProduit.id : "new"} // chaque fois que l'utilisateur bascule entre "édition" et "ajout", Formik recrée un nouvel état interne, forçant le formulaire à se réinitialiser en fonction des nouvelles valeurs initiales.
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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
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
                sx={{ gridColumn: "span 3" }}
              />

              <TextField
                fullWidth
                select
                variant="filled"
                label="Categorie"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categorie}
                name="categorie"
                error={!!touched.categorie && !!errors.categorie}
                helperText={touched.categorie && errors.categorie}
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
                SelectProps={{ native: true }}
              >
                <option value="">Select</option>
                <option value="commercial">Commercial</option>
                <option value="non Commercial">Non Commercial</option>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantite"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantite}
                name="quantite"
                error={!!touched.quantite && !!errors.quantite} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.quantite && errors.quantite} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
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
                error={!!touched.date && !!errors.ddate} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.date && errors.date} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
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
                    // & .MuiInputLabel-shrink ajuste la position de l'étiquette lorsqu'elle est réduite.
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
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description} // touched.firstName : Indique si l'utilisateur a interagi avec le champ "First Name". touched est un objet géré par Formik qui contient des informations sur les champs que l'utilisateur a touchés.  errors.firstName : Contient le message d'erreur associé au champ "First Name" si une erreur de validation est présente. errors est un autre objet géré par Formik qui contient les messages d'erreur pour chaque champ du formulaire. !! (double négation) : Convertit une valeur en un booléen (true ou false). Par exemple, !!touched.firstName sera true si touched.firstName est défini et false s'il ne l'est pas.
                helperText={touched.description && errors.description} //  touched.firstName et errors.firstName sont les mêmes que précédemment.
                sx={{ gridColumn: "span 4" }}
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
                  : initialProduit
                  ? "Mettre à jour"
                  : "Ajouter Produit"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddProduit;
