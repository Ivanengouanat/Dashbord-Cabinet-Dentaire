import Headers from "../../components/Headers";
import { Box, useTheme, Typography, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import ImageComponent from "../../scenes/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

const Doctor = ({ DataDocteur, handleDeleteDocteur, handleEditPersonnel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Headers title="Docteurs" subtitle="list Docteur" />

      <Box display="flex" gap="20px">
        {DataDocteur.map((Values) => (
          <Box
            key={Values.id}
            className="block"
            sx={{
              borderRadius: "8px",
              backgroundColor: colors.primary[400],
              transition: "0.3s ease-in-out",
              boxShadow: "4px 4px 5px colors.greenAccent[100]",
              ["&:hover"]: { transform: "translateX(-5px)" },
              width: "260px",
              height: "220px",
              paddingTop: "10px",
            }}
          >
            <div
              className="block-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageComponent />
            </div>
            <div
              className="block-body"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                color={colors.grey[100]}
                sx={{ ["&:hover"]: { color: colors.greenAccent[400] } }}
              >
                {Values.noms}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h8" color={colors.grey[100]}>
                {Values.prenoms}
              </Typography>
            </div>
            <div
              className="block-footer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <IconButton
                onClick={() => handleEditPersonnel(Values)}
                sx={{ border: "1px solid green" }}
              >
                <UpdateIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteDocteur(Values.id)}
                sx={{ border: "1px solid red" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Doctor;
