// React and React Hooks
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components
import NavBar from '../components/NavBar';

// Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// React Router
import { useLocation } from 'react-router-dom';

// Utilities and Libraries
import { AddBookingApiCall } from '../utils/apiUtils';

// Styles
import { FormContainer, StyledImage } from '../styles/commonFormStyles';

// Types
import { IBooking } from '../types/types';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNo: yup.string().required('Phone Number is required'),
  numOfAdults: yup.number().required('Number of Adults is required').min(1, 'Must be at least 1'),
  numOfChilds: yup.number().required('Number of Children is required').min(0, 'Cannot be negative'),
  paymentMethod: yup.string().required('Payment Method is required'),
});

export default function BookTour() {
  const location = useLocation();
  const tourData = location.state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const onSubmit = async (data: IBooking) => {
    try {
      data.tours = tourData._id;
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
            width: '50%',
            paddingRight: 10,
            height: '80vh',
            mt: '64px',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontFamily: 'poppins', fontWeight: 500 }}>
            Confirm Your Booking
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <TextField
              {...register('name')}
              margin="normal"
              fullWidth
              required
              id="name"
              label="Name"
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register('email')}
              margin="normal"
              fullWidth
              required
              id="email"
              label="Email"
              type="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('phoneNo')}
              margin="normal"
              required
              id="phone"
              fullWidth
              label="Phone Number"
              type="phone"
              autoFocus
              error={!!errors.phoneNo}
              helperText={errors.phoneNo?.message}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                {...register('numOfAdults')}
                margin="normal"
                required
                id="adults"
                fullWidth
                label="Number of Adults"
                type="number"
                autoFocus
                error={!!errors.numOfAdults}
                helperText={errors.numOfAdults?.message}
              />
              <TextField
                {...register('numOfChilds')}
                margin="normal"
                required
                id="children"
                fullWidth
                label="Number of Children"
                type="number"
                autoFocus
                sx={{ ml: 3 }}
                error={!!errors.numOfChilds}
                helperText={errors.numOfChilds?.message}
              />
            </Box>
            <TextField
              {...register('paymentMethod')}
              margin="normal"
              fullWidth
              id="payment"
              label="Payment Method"
              autoFocus
              required
              error={!!errors.paymentMethod}
              helperText={errors.paymentMethod?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#F16B51' }}
              disabled={!isDirty || !isValid}
            >
              Click To Confirm
            </Button>
          </Box>
        </Box>
        <StyledImage
          src="https://source.unsplash.com/random"
          style={{
            width: '50%',
            borderRadius: '8px',
            marginTop: '64px',
            height: '75vh',
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