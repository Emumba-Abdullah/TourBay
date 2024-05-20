import { useForm } from 'react-hook-form';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import NavBar from '../components/NavBar';



import { AddTourApiCall } from '../utils/apiUtils';
import { images } from '../utils/helpers';
import { FormContainer, FormImage } from '../styles/commonFormStyles';
import { ITour } from '../types/types';



const AddTour = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

    const onSubmit = async (data:ITour) => {
        try {
            const newFormData = { ...data, images };
            console.log(newFormData);
            await AddTourApiCall(newFormData);
            setSnackbarMessage("Tour added successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            reset();
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage("Failed to add tour. Please try again.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
            console.log('Tour added process completed');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box>
            <NavBar />
            <FormContainer >
                <Box sx={{ width: "50%", paddingRight: 10 }}>
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
                        <Typography component="h1" variant="h4" sx={{ fontFamily: "Poppins", fontWeight: 500 }}>
                            ADD Tour Details Here!
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                            <TextField
                                {...register('name', { required: true })}
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                            <TextField
                                {...register('city', { required: true })}
                                margin="normal"
                                fullWidth
                                id="city"
                                label="City"
                                autoFocus
                            />
                            <Textarea
                                {...register('description', { required: true })}
                                id="description"
                                placeholder="Add Tour Description"
                                required
                                sx={{ mb: 1 }}
                            />
                            <TextField
                                {...register('price', { required: true })}
                                margin="normal"
                                required
                                id="price"
                                fullWidth
                                label="Tour price"
                                type="number"
                                autoFocus
                            />
                            <TextField
                                {...register('duration', { required: true })}
                                margin="normal"
                                required
                                id="duration"
                                fullWidth
                                label="Number of Days"
                                type="number"
                                autoFocus
                            />
                            <TextField
                                {...register('startDate', { required: true })}
                                margin="normal"
                                required
                                id="start-date"
                                fullWidth
                                type="date"
                                autoFocus
                            />
                            <TextField
                                {...register('endDate', { required: true })}
                                margin="normal"
                                required
                                id="end-date"
                                fullWidth
                                type="date"
                                autoFocus
                            />
                            <Textarea
                                {...register('facilities', { required: true })}
                                id="facilities"
                                placeholder="Add facilities"
                                required
                                sx={{ mb: 1 }}
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
                <FormImage
                    src="https://source.unsplash.com/random"
                />
            </FormContainer>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AddTour;
