import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Components
import NavBar from "../components/NavBar";

// Utilities and Libraries
import { AddTourApiCall } from "../utils/apiUtils";
import { images } from "../utils/helpers";

// Styles
import { FormContainer, FormImage } from "../styles/commonFormStyles";

// Types
import { ITour } from "../types/types";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  city: yup.string().required("City is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(60, "Price must be greater than $60"),
  startDate: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be later than start date"),
  facilities: yup.string().required("Facilities are required"),
});

const AddTour = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const onSubmit = async (data: ITour) => {
    try {
      const newFormData = { ...data, images };
      newFormData.facilities = data.facilities.split(",");
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      newFormData.duration = duration;

      await AddTourApiCall(newFormData);
      setSnackbarMessage("Tour added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      reset({
        name: "",
        city: "",
        description: "",
        price: "",
        startDate: "",
        endDate: "",
        facilities: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to add tour. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <NavBar />
      <FormContainer>
        <Box sx={{ width: "50%", paddingRight: 10 }}>
          <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontFamily: "Poppins", fontWeight: 500 }}
            >
              ADD Tour Details Here!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <TextField
                {...register("name")}
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                autoFocus
              />
              <TextField
                {...register("city")}
                margin="normal"
                fullWidth
                id="city"
                label="City"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
              <TextField
                {...register("description")}
                margin="normal"
                fullWidth
                id="description"
                label="Add Tour Description"
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                required
              />
              <TextField
                {...register("price")}
                margin="normal"
                fullWidth
                id="price"
                label="Tour price"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                required
              />
              <TextField
                {...register("startDate")}
                margin="normal"
                fullWidth
                id="start-date"
                label="Start Date"
                type="date"
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                {...register("endDate")}
                margin="normal"
                fullWidth
                id="end-date"
                label="End Date"
                type="date"
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                {...register("facilities")}
                margin="normal"
                fullWidth
                id="facilities"
                label="Add facilities"
                helperText={errors.facilities?.message}
                error={!!errors.facilities}
                required
                InputLabelProps={{ shrink: true }}
                multiline
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#F16B51" }}
                disabled={!isDirty || !isValid}
              >
                Add Tour
              </Button>
            </Box>
          </Box>
        </Box>
        <FormImage src="https://source.unsplash.com/random" />
      </FormContainer>  
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTour;