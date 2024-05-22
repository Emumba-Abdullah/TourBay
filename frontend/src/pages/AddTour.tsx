// React and React Hooks
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

// Joy UI Components
import Textarea from "@mui/joy/Textarea";

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
    .positive("Price must be positive"),
  duration: yup
    .number()
    .required("Duration is required")
    .positive("Duration must be positive")
    .integer("Duration must be an integer"),
  startDate: yup.date().required("Start date is required"),
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
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const onSubmit = async (data: ITour) => {
    try {
      const newFormData = { ...data, images };
      console.log(newFormData);
      await AddTourApiCall(newFormData);
      setSnackbarMessage("Tour added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      reset({
        name: "",
        city: "",
        description: "",
        price: "",
        duration: "",
        startDate: "",
        endDate: "",
        facilities: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to add tour. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      console.log("Tour added process completed");
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
                autoFocus
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Add Tour Description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    required
                    sx={{ mb: 1 }}
                  />
                )}
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
                autoFocus
              />
              <TextField
                {...register("duration")}
                margin="normal"
                fullWidth
                id="duration"
                label="Number of Days"
                type="number"
                error={!!errors.duration}
                helperText={errors.duration?.message}
                required
                autoFocus
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
                autoFocus
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
                autoFocus
              />
              <Controller
                name="facilities"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="facilities"
                    placeholder="Add facilities"
                    error={!!errors.facilities}
                    helperText={errors.facilities?.message}
                    required
                    sx={{ mb: 1 }}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#F16B51" }}
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
