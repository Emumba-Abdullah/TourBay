// React and React Hooks
import { useEffect, useState } from 'react';

// Utilities and Libraries
import { getAllBookingsApiCall, getTourById } from '../utils/apiUtils';

// Material UI Components
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

// Components
import DestinationCard from '../components/DestinationCard';
import NavBar from '../components/NavBar';

// Types
import { ITour } from '../types/types';



export default function Tours() {
  const [bookingsData, setBookingsData] = useState([]);
  const [toursData, setToursData] = useState<ITour[]>([]);

  useEffect(() => {
    fetchToursData();
  }, []);

  const fetchToursData = async () => {
    const response = await getAllBookingsApiCall();
    setBookingsData(response);
    const tours = await Promise.all(response.map(getTourDetail));
    setToursData(tours);
  };

  const getTourDetail = async (booking) => {
    const newTour = await getTourById(booking.tours);
    return newTour;
  };

  const getBookingId = (id:string) => {
     const booking = bookingsData.find(booking => booking.tours === id);
     return booking ? booking._id : null;
  }

  const handleUiChanges = (tourId: string) => {
    setToursData(prevToursData => prevToursData.filter(tour => tour._id !== tourId));
  };
  return (
    <>
    <NavBar/>
     <Box sx={{width:"100vw", paddingLeft:"12%",paddingRight:"12%", mb:14 , paddingTop:10}}>
      {toursData.length > 0 && (
        <Grid container spacing={2}>
          {toursData.map((tour) => (
            <Grid item xs={6} md={4} lg={3} key={tour._id}>
              <DestinationCard tourData={tour} fromMyTours={true} bookingId={getBookingId(tour._id)} handleUiChanges={ handleUiChanges} />
            </Grid>
          ))}
        </Grid>
      )}
      </Box>
      </>
  );
}
