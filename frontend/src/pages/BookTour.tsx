import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import { FormContainer, StyledImage } from '../styles/commonFormStyles';
import BookingForm from './../components/BookingForm';
import { AddBookingApiCall } from '../utils/apiUtils';
import { IBooking } from '../types/types';

const BookTour: React.FC = () => {
  const location = useLocation();
  const tourData = location.state;

  const handleBookTour = async (data: IBooking) => {
    data.tours = tourData._id;
    await AddBookingApiCall(data);
  };

  return (
    <Box>
      <NavBar />
      <FormContainer>
        
        <BookingForm
          onSubmit={handleBookTour}
          buttonText="Click To Confirm"
          title="Confirm Your Booking"
        />
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
    </Box>
  );
};

export default BookTour;
