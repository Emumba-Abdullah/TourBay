import express, { Router } from "express";
import {
  addBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
  getBookingById,
} from "../controllers/bookingController";
import auth from "../middleware/auth";
const bookingRouter: Router = express.Router();

bookingRouter.post("/", auth, addBooking);
bookingRouter.get("/", auth, getAllBookings);
bookingRouter.get("/:id", auth, getBookingById);
bookingRouter.delete("/:id", auth, deleteBooking);
bookingRouter.put("/:id", auth, updateBooking);
export default bookingRouter;
