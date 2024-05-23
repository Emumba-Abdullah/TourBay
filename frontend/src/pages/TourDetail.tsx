// React and React Router
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import NavBar from "../components/NavBar";
import WeatherCard from "../components/WeatherCard";
import TourFeaturesTable from "../components/TourFeaturesTable";

// Material UI Components and Icons
import { Typography, Grid, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// Styles
import {
  Container,
  TourTitle,
  DetailsBox,
  IconText,
  Image,
  GalleryImage,
  DescriptionText,
  BookButton,
} from "./../styles/TourDetailsStyle";

// Types
import { ITour } from "../types/types";

// Utils
import { getTourById } from "../utils/apiUtils";

const MyTours = () => {
  const [tourData, setTourData] = useState<ITour | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const tourId = location.state;

  useEffect(() => {
    if (tourId) {
      fetchTourDataById();
    }
  }, [tourId]);

  const fetchTourDataById = async () => {
    try {
      const fetchedData = await getTourById(tourId);
      setTourData(fetchedData);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  const handleBookButtonClick = () => {
    navigate("/BookTour", { state: tourData });
  };

  if (!tourData) {
    return null; 
  }

  return (
    <>
      <NavBar />
      <Container>
        <TourTitle variant="h4">{tourData.name}</TourTitle>
        <DetailsBox>
          <IconText>
            <IconButton>
              <LocationOnIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography variant="body1">{tourData.city}</Typography>
          </IconText>
          <IconText>
            <IconButton>
              <AttachMoneyIcon />
            </IconButton>
            <Typography variant="body1">{tourData.price}</Typography>
          </IconText>
          <IconText>
            <IconButton>
              <CalendarTodayIcon />
            </IconButton>
            <Typography variant="body1">{tourData.duration} days</Typography>
          </IconText>
        </DetailsBox>

        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "50vh", mt: 2 }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              src="https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Tour"
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid
              container
              spacing={2}
              sx={{ height: "100%", maxWidth: "100%" }}
            >
              {[1, 2, 3, 4].map((item) => (
                <Grid
                  key={item}
                  item
                  xs={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <GalleryImage
                    src="https://source.unsplash.com/random"
                    alt={`Image ${item}`}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <DescriptionText variant="body1">
          {tourData.description}
        </DescriptionText>

        <Typography variant="h3" sx={{ mb: 7 }}>
          What's Included?
        </Typography>
        <TourFeaturesTable tourData={tourData} />

        <Typography variant="h3" sx={{ mb: 7, mt: 7 }}>
          Itinerary Schedule
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <WeatherCard temperature={10} day={1} />
          </Grid>
          <Grid item xs={12} md={4}>
            <WeatherCard temperature={20} day={2} />
          </Grid>
          <Grid item xs={12} md={4}>
            <WeatherCard temperature={30} day={3} />
          </Grid>
        </Grid>

        <BookButton
          variant="contained"
          size="large"
          onClick={handleBookButtonClick}
        >
          Book now
        </BookButton>
      </Container>
    </>
  );
};

export default MyTours;
