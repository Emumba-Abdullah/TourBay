import { Request, Response } from "express";
import Booking, { IBooking } from "../models/booking";
import getErrorMessage from "../utils/errorsUtil";
import { error } from "console";
import { CustomRequest } from "../middleware/auth";

const addBooking = async (req: CustomRequest, res: Response) => {
  try {
    const {
      name,
      email,
      phoneNo,
      numOfAdults,
      numOfChilds,
      paymentMethod,
      tours,
    } = req.body;
    const newBooking = await Booking.create({
      userId: req.user ? req.user.id : "",
      name,
      email,
      phoneNo,
      numOfAdults,
      numOfChilds,
      paymentMethod,
      tours,
      date: new Date().toISOString(),
    });
    res.status(200).send(newBooking);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getAllBookings = async (req: CustomRequest, res: Response) => {
  try {
    const data = await Booking.find({ userId: req.user ? req.user.id : 0 });
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const deleteBooking = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findById(id);
    const userId = req.user ? req.user.id : "";
    if (!booking) {
      return res.status(404).send({
        status: "Not Found",
        message: getErrorMessage(error),
      });
    }
    if (booking.userId == userId) {
      await Booking.deleteOne({ _id: booking._id });
    } else {
      return res.status(400).send({
        status: "Bad Request",
        message: "This booking doesn't belong to you",
      });
    }
    res.send(`Booking with ID ${id} has been deleted.`);
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
};

const updateBooking = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const userId = req.user ? req.user.id : "";
    const booking = await Booking.findById(id);
    if (booking && booking.userId == userId) {
      const result = await Booking.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return res.send(result);
    } else {
      return res.status(400).send({
        status: "Bad Request",
        message: "This booking doesn't belong to you",
      });
    }
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
};

const getBookingById = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (String(booking.userId) !== req.user?.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: This booking doesn't belong to you" });
    }
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export {
  addBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
  getBookingById,
};
