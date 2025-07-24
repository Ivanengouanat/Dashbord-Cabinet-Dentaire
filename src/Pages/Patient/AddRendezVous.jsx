import { Box, TextField, useMediaQuery, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import Headers from "../../components/Headers";
import { toast } from "react-toastify";
import { useState } from "react";

const AddRendezVous = ({ handleAddRendezVous, initialDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = (Values, { resetForm }) => {
    console.log("Add rendez vous", Values);

    handleAddRendezVous(Values);
    resetForm();
    if (initialDate) {
      toast.success("Mise à jour réussie !");
    } else {
      toast.success("Patient ajouté avec succès !");
    }
  };

  const initialValues = initialDate || {
    noms: "",
    prenoms: "",
    date: "",
    heure: "",
    tel: "",
    type: "",
  };

  const ValidTel = /^(69|65|62|67)[0-9]{7}$/;
  const ValidHeure =
    /^(((0)+[8-9]+(:)+[0-5]+[0-9])|((1)+[0-6]+(:)+[0-5]+[0-9]))$/;

  const userSchema = yup.object().shape({
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
    heure: yup
      .string()
      .matches(ValidHeure, "heure non pris en compte Ex: 08:00 a 16:59")
      .required("ce champs doit etre rempli"),
    tel: yup
      .string()
      .matches(ValidTel, "format incorrect Ex: 678134678")
      .required("ce champs doit etre rempli"),
    type: yup.string().required("ce champs doit etre rempli"),
  });

  return (
    <Box m="20px">
      <Box>
        <Headers
          title="Rendez Vous Patient"
          subtitle="Ajouter un Rendez Vous"
        />
      </Box>

      <Box>
        <Formik
          key={initialDate ? initialDate.id : "new"} // chaque fois que l'utilisateur bascule entre "édition" et "ajout", Formik recrée un nouvel état interne, forçant le formulaire à se réinitialiser en fonction des nouvelles valeurs initiales.
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="15px"
                gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Noms"
                  name="noms"
                  value={values.noms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.noms && !!errors.noms}
                  helperText={touched.noms && errors.noms}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Prenoms"
                  name="prenoms"
                  value={values.prenoms}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onBlur={handleBlur}
                  error={!!touched.prenoms && !!errors.prenoms}
                  helperText={touched.prenoms && errors.prenoms}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
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
                  variant="filled"
                  type="time"
                  label="Heure"
                  name="heure"
                  value={values.heure}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onBlur={handleBlur}
                  error={!!touched.heure && !!errors.heure}
                  helperText={touched.heure && errors.heure}
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
                  variant="filled"
                  type="text"
                  label="Numero de Telephone"
                  name="tel"
                  value={values.tel}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onBlur={handleBlur}
                  error={!!touched.tel && !!errors.tel}
                  helperText={touched.tel && errors.tel}
                  sx={{ gridColumn: "span 6" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="filled"
                  label="Type"
                  type="text"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onSubmit={handleSubmit}
                  error={!!touched.type && !!errors.type}
                  helperText={touched.type && errors.type}
                  sx={{
                    gridColumn: "span 2",
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
                  SelectProps={{ native: true }}
                >
                  <option value="">Select</option>
                  <option value="general">General</option>
                  <option value="consultation">Consultation</option>
                </TextField>
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    color: colors.grey[100],
                    backgroundColor: colors.greenAccent[500],
                    ["&:hover"]: {
                      transform: "translateX(-5px)",
                      transition: "0.3s ease-in-out",
                    },
                  }}
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting
                    ? "chargement..."
                    : initialDate
                    ? "mise a jour"
                    : "creer un rendez vous"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddRendezVous;
