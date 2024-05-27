import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Material UI Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Material UI Icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface AuthFormProps {
  schema: yup.ObjectSchema;
  onSubmit: SubmitHandler<any>;
  buttonText: string;
  navigateLink: () => void;
  navigateText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ schema, onSubmit, buttonText, navigateLink, navigateText }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    try {
      await onSubmit(data);
      setSnackbar({ open: true, message: `${buttonText} successful!`, severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `${buttonText} failed. Please try again.`, severity: 'error' });
    }
  };

  return (
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
        {buttonText}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>
        <TextField
          {...register('email')}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          error={!!errors.email}
          helperText={errors.email?.message}
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
          {...register('password')}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message}
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
          {buttonText}
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={navigateLink}
          sx={{ mt: 1 }}
        >
          {navigateText}
        </Button>
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
    </Box>
  );
};

export default AuthForm;
