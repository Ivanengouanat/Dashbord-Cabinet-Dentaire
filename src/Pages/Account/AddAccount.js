import {
  Box,
  TextField,
  useTheme,
  Button,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import Headers from "../../components/Headers";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const AddAccount = ({ handleAddAccount, initialAccount }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Open, SetOpen] = useState(false);
  const [SelectDate, setSelectDate] = useState(null);

  function handleOpen(values) {
    SetOpen(true);
    setSelectDate(values);
  }

  function handleClose(resetForm) {
    SetOpen(false);
    if (resetForm) {
      resetForm({ values: initialValues }); // Réinitialise proprement
    }
  }

  function handleConfirme() {
    handleAddAccount({ ...SelectDate });
    toast.success(
      initialAccount ? "Mise à jour réussie !" : "Ajout effectué !"
    );
    SetOpen(false);
  }

  const initialValues = initialAccount || {
    id: "",
    noms: "",
    prenoms: "",
    mode: "",
    montant: "",
    date: "",
    status: "",
  };

  const userSchema = yup.object().shape({
    id: yup.string().required("ce champs doit etre rempli"),
    noms: yup
      .string()
      .min(7, "ce champs doit contenir plus de 7 caracteres")
      .max(20, "ce champs doit contenir moins de 20 caracteres")
      .required("ce champs doit etre rempli"),
    prenoms: yup
      .string()
      .min(4, "ce champs doit contenir plus de 4 caracteres")
      .max(8, "ce champs doit contenir moins de 8 caracteres")
      .required("ce champs doit etre rempli"),
    date: yup.string().required("ce champs doit etre rempli"),
    mode: yup.string().required("ce champs doit etre rempli"),
    montant: yup.string().required("ce champs doit etre rempli"),
    date: yup.string().required("ce champs doit etre rempli"),
    status: yup.string().required("ce champs doit etre rempli"),
  });

  function handleFormSubmit(values, { resetForm }) {
    console.log("donnees de Account patient");
    handleAddAccount(values);
    toast.success("Ajout effectue !");
    resetForm();
  }

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box m="20px">
      <Box>
        <Headers
          title="Solde Patient"
          subtitle="Ajouter les frais du patient"
        />
      </Box>
      <Box>
        <Formik
          key={initialAccount ? initialAccount.id : "new"} // chaque fois que l'utilisateur bascule entre "édition" et "ajout", Formik recrée un nouvel état interne, forçant le formulaire à se réinitialiser en fonction des nouvelles valeurs initiales.
          onSubmit={handleOpen}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
            resetForm,
          }) => {
            const handleClearForm = () => {
              // Effacer toutes les données du formulaire
              resetForm({
                values: {
                  id: "",
                  noms: "",
                  prenoms: "",
                  mode: "",
                  montant: "",
                  date: "",
                },
              });
            };
            return (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="15px"
                  gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 8",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    label="ID"
                    type="text"
                    value={values.id}
                    name="id"
                    onBlur={handleBlur}
                    error={!!touched.id && !!errors.id}
                    helperText={touched.id && errors.id}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    label="Noms"
                    type="text"
                    value={values.noms}
                    name="noms"
                    onBlur={handleBlur}
                    error={!!touched.noms && !!errors.noms}
                    helperText={touched.noms && errors.noms}
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Prenoms"
                    type="text"
                    value={values.prenoms}
                    name="prenoms"
                    onBlur={handleBlur}
                    error={!!touched.prenoms && !!errors.prenoms}
                    helperText={touched.prenoms && errors.prenoms}
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    fullWidth
                    select
                    variant="filled"
                    label="Mode de Payement"
                    type="text"
                    value={values.mode}
                    name="mode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.mode && !!errors.mode}
                    helperText={touched.mode && errors.mode}
                    sx={{
                      gridColumn: "span 4",
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
                    <option value="Orange Money">Orange Money</option>
                    <option value="Mtn Money">Mtn Money</option>
                    <option value="liquide">Liquide</option>
                  </TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Montant"
                    type="number"
                    value={values.montant}
                    name="montant"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.montant && !!errors.montant}
                    helperText={touched.montant && errors.montant}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">FCFA</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Date"
                    type="date"
                    value={values.date}
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0], // La date minimale pour "debut" est aujourd'hui
                    }}
                    sx={{
                      gridColumn: "span 4",
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
                    select
                    variant="filled"
                    label="Status"
                    type="text"
                    value={values.status}
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.status && !!errors.status}
                    helperText={touched.status && errors.status}
                    SelectProps={{ native: true }}
                    sx={{
                      gridColumn: "span 4",
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
                    <option value="">Select</option>
                    <option value="payer">Payer</option>
                    <option value="impayer">Impayer</option>
                  </TextField>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    variant="contained"
                    marginTop="20px"
                    sx={{
                      marginTop: "20px",
                      color: colors.grey[100],
                      backgroundColor: colors.greenAccent[500],
                      ["&:hover"]: {
                        transform: "translateX(-5px)",
                        transition: "0.3s ease-in-out",
                      },
                    }}
                    disabled={
                      !isValid ||
                      isSubmitting ||
                      (initialAccount &&
                        JSON.stringify(values) ===
                          JSON.stringify(initialAccount))
                    }
                  >
                    {isSubmitting ? "Traitement..." : "Ajouter Solde"}
                  </Button>
                </Box>
                <Dialog open={Open} onClose={handleClose}>
                  <DialogTitle>Verification de soumission</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Nous vous recommendons de verifie les donnees entrer avant
                      la soumission ! si vous l'avez deja fais cliquer sur
                      CONFIRME
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => handleClose(resetForm)}
                      color="primary"
                    >
                      ANNULER
                    </Button>
                    <Button onClick={handleConfirme} color="secondary">
                      CONFIRME
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddAccount;
