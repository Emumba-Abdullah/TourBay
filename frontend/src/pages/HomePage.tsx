// React and React Hooks
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Material UI Components
import { Box, Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";

// Material UI Icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// Utilities and Libraries
import dayjs from "dayjs";

// Components
import NavBar from "../components/NavBar";
import SelectPlace from "../components/SelectPlace";
import SelectPrice from "../components/SelectPrice";
import SelectDate from "../components/SelectDate";

// Helpers and Utils
import { getChoosedTours, popularSearches } from "../utils/helpers";


import {
  BackgroundBox,
  FormContainer,
  SectionBox,
  CalendarBox,
  Item,
  DatePickerContainer,
} from "../styles/HomePageStyles";

export default function HomePage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    getChoosedTours(data);
    navigate("/searchResults", { state: data });
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    setDateRange([
      dayjs(startDate).format("YYYY/MM/DD"),
      dayjs(endDate).format("YYYY/MM/DD"),
    ]);
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <BackgroundBox>
        <NavBar />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormContainer elevation={5}>
              <SectionBox>
                <IconButton sx={{ display: "inline-block" }}>
                  <LocationOnRoundedIcon />
                </IconButton>
                <Typography variant="h6" sx={{ display: "inline-block" }}>
                  Choose location
                </Typography>
                <SelectPlace />
              </SectionBox>

              <CalendarBox>
                <IconButton sx={{ display: "inline-block" }}>
                  <CalendarMonthIcon />
                </IconButton>
                <Typography variant="h6" sx={{ display: "inline-block" }}>
                  Choose dates
                </Typography>
                <Box
                  sx={{
                    ml: 1,
                    mt: 1,
                    color: "gray",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {dateRange.length > 0 ? (
                    <Typography sx={{ fontSize: 16, color: "black" }}>
                      {dateRange[0]}--{dateRange[1]}
                    </Typography>
                  ) : (
                    <Typography>Choose from here</Typography>
                  )}
                  <IconButton onClick={toggleCalendar}>
                    {isCalendarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                {isCalendarOpen && (
                  <DatePickerContainer>
                    <SelectDate handleDateSelect={handleDateSelect} />
                  </DatePickerContainer>
                )}
              </CalendarBox>

              <SectionBox>
                <IconButton sx={{ display: "inline-block" }}>
                  <AttachMoneyIcon />
                </IconButton>
                <Typography variant="h6" sx={{ display: "inline-block" }}>
                  Select the Price
                </Typography>
                <SelectPrice />
              </SectionBox>

              <Button
                sx={{ bgcolor: "#F16B51", color: "white", ml: 2 }}
                type="submit"
              >
                <SearchRoundedIcon sx={{ fontSize: 30 }} />
              </Button>
            </FormContainer>
          </form>
        </FormProvider>
        <Box sx={{ width: "50%", mt: 8, ml: "auto", mr: "auto" }}>
          <Grid container spacing={2}>
            {popularSearches.map((item, index) => (
              <Grid key={index} lg={2} md={4} sm={6} xs={12}>
                <Item>
                  {item}
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </BackgroundBox>
    </Box>
  );
}
