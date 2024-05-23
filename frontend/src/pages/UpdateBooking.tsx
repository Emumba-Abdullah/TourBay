import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import { FormContainer, StyledBox, StyledImage } from '../styles/commonFormStyles';
import BookingForm from './../components/BookingForm';
import { getBookingByIdApiCall, updateBookingApiCall } from '../utils/apiUtils';
import { IBooking } from '../types/types';

const UpdateBooking: React.FC = () => {
  const location = useLocation();
  const { bookingId } = location.state;
  const [initialData, setInitialData] = React.useState<IBooking | undefined>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchBookingData = async () => {
      const data = await getBookingByIdApiCall(bookingId);
      setInitialData(data);
    };
    fetchBookingData();
  }, [bookingId]);

  const handleUpdateBooking = async (data: IBooking) => {
    data.tours = initialData?.tours;
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
          <BookingForm
            initialData={initialData}
            onSubmit={handleUpdateBooking}
            buttonText="Update Now"
            title="Update Your Booking"
          />
        <StyledImage
          src="https://source.unsplash.com/random"
        />
      </FormContainer>
    </Box>
  );
};

export default UpdateBooking;
