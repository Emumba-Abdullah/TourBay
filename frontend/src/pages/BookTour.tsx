import { useForm } from 'react-hook-form';
import * as React from 'react';
import NavBar from '../components/NavBar';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import { AddBookingApiCall } from '../utils/apiUtils';
import { IBooking } from '../types/types';
import { FormContainer, StyledImage } from '../styles/commonFormStyles';


export default function BookTour() {
    const location = useLocation();
    const tourData = location.state;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

    const onSubmit = async (data:IBooking) => {
        try {
            data.tours = tourData._id;
            console.log(data);
            await AddBookingApiCall(data);
            setSnackbarMessage("Booking added successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            reset(); 
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage("Failed to add booking. Please try again.");
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: "50%", paddingRight: 10,
                        height: "80vh",
                        mt: "64px"
                    }}
                >
                    <Typography component="h1" variant="h4" sx={{ fontFamily: "poppins", fontWeight: 500 }}>
                        Confirm Your Booking
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <TextField
                            {...register('name', { required: true })}
                            margin="normal"
                            fullWidth
                            required
                            id="name"
                            label="Name"
                            autoFocus
                        />
                        <TextField
                            {...register('email', { required: true })}
                            margin="normal"
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            autoFocus
                            type="email"
                        />
                        <TextField
                            {...register('phoneNo', { required: true })}
                            margin="normal"
                            required
                            id="phone"
                            fullWidth
                            label="Phone Number"
                            type="phone"
                            autoFocus
                        />
                        <Box sx={{ display: "flex", flexDirection: 'row' }}>
                            <TextField
                                {...register('numOfAdults', { required: true })}
                                margin="normal"
                                required
                                id="adults"
                                fullWidth
                                label="Number of Adults"
                                type="number"
                                autoFocus
                            />
                            <TextField
                                {...register('numOfChilds', { required: true })}
                                margin="normal"
                                required
                                id="children"
                                fullWidth
                                label="Number of Children"
                                type="number"
                                autoFocus
                                sx={{ ml: 3 }}
                            />
                        </Box>
                        <TextField
                            {...register('paymentMethod', { required: true })}
                            margin="normal"
                            fullWidth
                            id="payment"
                            label="Payment Method"
                            autoFocus
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: "#F16B51" }}
                        >
                            Click To Confirm
                        </Button>
                    </Box>
                </Box>
                <StyledImage
                    src="https://source.unsplash.com/random"
                    style={{
                        width: "50%",
                        borderRadius: "8px",
                        marginTop: "64px",
                        height: "75vh",
                    }}
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
