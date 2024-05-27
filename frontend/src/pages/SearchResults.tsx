import { useLocation } from 'react-router-dom';

// Material UI Components
import { Grid, Typography } from '@mui/material';

// Components
import NavBar from '../components/NavBar';
import DestinationCard from '../components/DestinationCard';
import NotFoundImage from "./../assets/notFoundImage.png";

// Styles
import { Container, Title, GridContainer, NoResultsContainer, NoResultsImage } from '../styles/searchResultsStyles';

export default function SearchResults() {
  const location = useLocation();
  const toursData = location.state;
  console.log(toursData)// Access the specific state data

  return (
    <>
      <NavBar />
      <Container>
        {Array.isArray(toursData) && toursData.length > 0 ? (
          <>
            <Title component="h1" variant="h4">
              Top Destinations at "{toursData[0]?.city}"
            </Title>
            <GridContainer>
              <Grid container spacing={2}>
                {toursData.map((tour) => (
                  <Grid item xs={6} md={4} lg={3} key={tour._id}>
                    <DestinationCard tourData={tour} />
                  </Grid>
                ))}
              </Grid>
            </GridContainer>
          </>
        ) : (
          <NoResultsContainer>
            <NoResultsImage src={NotFoundImage} />
            <Typography>Sorry, We didn’t find any tours right now.</Typography>
            {typeof toursData === 'string' ? (
              <Typography>at {toursData}</Typography>
            ) : (
              <Typography>at your selected location</Typography>
            )}
          </NoResultsContainer>
        )}
      </Container>
    </>
  );
}
