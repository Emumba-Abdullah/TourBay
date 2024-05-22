// React and React Hooks
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// React Router
import { useLocation, useNavigate } from 'react-router-dom';

// Material UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Components
import NavBar from '../components/NavBar';

// Utilities
import { getBookingByIdApiCall, updateBookingApiCall } from '../utils/apiUtils';

// Styles
import { FormContainer, StyledBox, StyledImage } from '../styles/commonFormStyles';

// Types
import { IBooking } from '../types/types';


const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNo: yup.string().required('Phone number is required'),
  numOfAdults: yup.number().required('Number of adults is required').positive().integer(),
  numOfChilds: yup.number().required('Number of children is required').positive().integer(),
  paymentMethod: yup.string().required('Payment method is required')
});

export default function UpdateBooking() {
  const location = useLocation();
  const { bookingId } = location.state;
  const [initialData, setInitialData] = useState<IBooking | undefined>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      const data = await getBookingByIdApiCall(bookingId);
      setInitialData(data);
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('phoneNo', data.phoneNo);
      setValue('numOfAdults', data.numOfAdults);
      setValue('numOfChilds', data.numOfChilds);
      setValue('paymentMethod', data.paymentMethod);
    };
    fetchBookingData();
  }, [bookingId, setValue]);

  const onSubmit = async (data: IBooking) => {
    data.tours = initialData?.tours;
    console.log(data);
    await updateBookingApiCall(bookingId, data);
    navigate('/myTours');
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <NavBar />
      <FormContainer>
        <StyledBox>
          <Typography component="h1" variant="h4" sx={{ fontFamily: "poppins", fontWeight: 500 }}>
            Update Your Booking
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
              id="phoneNo"
              fullWidth
              label="Phone Number"
              type="tel"
              autoFocus
              error={!!errors.phoneNo}
              helperText={errors.phoneNo?.message}
            />
            <Box sx={{ display: "flex", flexDirection: 'row' }}>
              <TextField
                {...register('numOfAdults')}
                margin="normal"
                required
                id="numOfAdults"
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
                id="numOfChilds"
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
              id="paymentMethod"
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
              sx={{ mt: 3, mb: 2, bgcolor: "#F16B51" }}
            >
              Update Now
            </Button>
          </Box>
        </StyledBox>
        <StyledImage
          src="https://source.unsplash.com/random"
        />
      </FormContainer>
    </Box>
  );
}
