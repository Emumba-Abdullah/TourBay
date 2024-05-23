import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IBooking } from '../types/types';

interface BookingFormProps {
  initialData?: IBooking;
  onSubmit: SubmitHandler<IBooking>;
  buttonText: string;
  title: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNo: yup.string().required('Phone Number is required'),
  numOfAdults: yup.number().required('Number of Adults is required').min(1, 'Must be at least 1'),
  numOfChilds: yup.number().required('Number of Children is required').min(0, 'Cannot be negative'),
  paymentMethod: yup.string().required('Payment Method is required'),
});

const BookingForm: React.FC<BookingFormProps> = ({ initialData, onSubmit, buttonText, title }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors, isDirty, isValid } } = useForm<IBooking>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  React.useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof IBooking, initialData[key as keyof IBooking]);
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit: SubmitHandler<IBooking> = async (data) => {
    try {
      await onSubmit(data);
      setSnackbarMessage("Operation successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      reset();
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage("Operation failed. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: 10,
          height: '80vh',
          mt: '64px',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontFamily: 'poppins', fontWeight: 500 }}>
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>
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
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register('phoneNo')}
            margin="normal"
            required
            id="phoneNo"
            fullWidth
            label="Phone Number"
            type="tel"
            error={!!errors.phoneNo}
            helperText={errors.phoneNo?.message}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              {...register('numOfAdults')}
              margin="normal"
              required
              id="numOfAdults"
              fullWidth
              label="Number of Adults"
              type="number"
              error={!!errors.numOfAdults}
              helperText={errors.numOfAdults?.message}
            />
            <TextField
              {...register('numOfChilds')}
              margin="normal"
              required
              id="numOfChilds"
              fullWidth
              label="Number of Children"
              type="number"
              sx={{ ml: 3 }}
              error={!!errors.numOfChilds}
              helperText={errors.numOfChilds?.message}
            />
          </Box>
          <TextField
            {...register('paymentMethod')}
            margin="normal"
            fullWidth
            id="paymentMethod"
            label="Payment Method"
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
            {buttonText}
          </Button>
        </Box>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingForm;
