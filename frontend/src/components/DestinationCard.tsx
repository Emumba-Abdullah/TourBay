import * as React from "react";
import { css } from "@emotion/react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { deleteBookingApiCall } from "../utils/apiUtils";
import { IDestinationCardProps } from "../types/types";
import {
  StyledCard,
  StyledCardMedia,
  TitleTypography,
  DescriptionTypography,
  StyledButton,
} from "../styles/destinationCardStyles";

export default function DestinationCard({
  tourData,
  fromMyTours,
  bookingId,
}: IDestinationCardProps) {

  const navigate = useNavigate();
  const [hovered, setHovered] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleHover = () => {
    setHovered(!hovered);
  };

  const { name, description, price, duration, images, startDate } = tourData;

  const handleCardClick = () => {
    navigate("/TourDetail", { state: tourData });
  };

  const handleDelete = async () => {
    const currentDate = new Date();
    const startDateObj = new Date(tourData.startDate);
    const timeDifference = startDateObj.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference <= 3) {
      setSnackbarMessage(
        "Cannot delete the booking as the start date is within 3 days.",
      );
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await deleteBookingApiCall(bookingId);
      console.log(response);
      navigate("/tours");
    } catch (error) {
      console.error("Failed to delete booking:", error);
      setSnackbarMessage(
        error.response?.data.message || "Failed to delete booking",
      );
      setSnackbarOpen(true);
    }
  };

  const handleUpdateBooking = () => {
    navigate("/updateBooking", { state: { bookingId, tourData, startDate } });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <StyledCard onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <StyledCardMedia image={images[0]} title="Image" />
      <CardContent>
        <TitleTypography gutterBottom variant="h5" component="div">
          {name}
        </TitleTypography>
        <DescriptionTypography variant="body2" color="text.secondary">
          {description}
        </DescriptionTypography>
      </CardContent>
      <CardActions>
        {hovered ? (
          fromMyTours ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <IconButton
                size="small"
                aria-label="delete"
                onClick={handleDelete}
                css={css`
                  color: red;
                `}
              >
                <DeleteIcon />
              </IconButton>
              <StyledButton
                size="small"
                variant="contained"
                onClick={handleCardClick}
              >
                View Details
              </StyledButton>
              <StyledButton
                size="small"
                variant="contained"
                onClick={handleUpdateBooking}
              >
                Update
              </StyledButton>
            </Box>
          ) : (
            <StyledButton
              fullWidth
              size="small"
              variant="contained"
              onClick={handleCardClick}
              css={css`
                padding: 10px 20px;
                border-radius: 20px;
              `}
            >
              View Details
            </StyledButton>
          )
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" aria-label="price">
              <AttachMoneyIcon />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                marginRight: "8px",
              }}
            >
              {price}
            </Typography>
            <IconButton size="small" aria-label="duration">
              <ScheduleIcon />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
              }}
            >
              {duration}
            </Typography>
          </Box>
        )}
      </CardActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledCard>
  );
}
