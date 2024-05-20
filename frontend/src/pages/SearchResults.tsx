import {  Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import DestinationCard from '../components/DestinationCard';
import { getChoosedTours } from '../utils/helpers';
import { useEffect, useState } from 'react';
import NotFoundImage from "./../assets/notFoundImage.png";
import { Container,Title,GridContainer,NoResultsContainer,NoResultsImage } from '../styles/searchResultsStyles';
interface ITour {
    _id: string;
    name: string;
    city: string;
    description: string;
    price: string;
    duration: string;
    startDate: string;
    endDate: string;
    facilities: string[];
    images: string[];
}

export default function SearchResults() {
  const location = useLocation();
  const searchData = location.state;
  const [toursData, setToursData] = useState<ITour[]>([]);

  useEffect(() => {
    if (searchData) {
      fetchToursData();
    }
  }, [searchData]);

  const fetchToursData = async () => {
    const response = await getChoosedTours(searchData);
    setToursData(response);
    console.log(searchData)
  };

  return (
    <>
      <NavBar />
      <Container>
        <Title component="h1" variant="h4">
          Top Destinations at "{searchData.location}"
        </Title>
        <GridContainer>
          {toursData && toursData.length > 0 ? (
            <Grid container spacing={2}>
              {toursData.map((tour) => (
                <Grid item xs={6} md={4} lg={3} key={tour._id}>
                  <DestinationCard tourData={tour} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoResultsContainer>
              <NoResultsImage src={NotFoundImage} />
              <Typography>Sorry, We didn’t find any tour right now</Typography>
              <Typography>at {searchData.location}</Typography>
            </NoResultsContainer>
          )}
        </GridContainer>
      </Container>
    </>
  );
}
