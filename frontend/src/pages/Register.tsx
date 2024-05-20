import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import { registerUserApiCall } from '../utils/apiUtils';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data) => {
    try {
      await registerUserApiCall(data);
      setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setSnackbar({ open: true, message: 'Registration failed. Please try again.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <TextField
            {...register('email', { required: true })}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              startAdornment: (
                <PersonOutlineIcon
                  sx={{
                    color: 'action.active',
                    mr: 1,
                    my: 0.5,
                  }}
                />
              ),
            }}
          />
          <TextField
            {...register('password', { required: true })}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <LockOutlinedIcon
                  sx={{
                    color: 'action.active',
                    mr: 1,
                    my: 0.5,
                  }}
                />
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
