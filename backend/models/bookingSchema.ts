import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  numOfAdults: {
    type: Number,
    required: true,
  },
  numOfChilds: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  tours: {
    type: Schema.Types.ObjectId,
    ref: "tours",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

export const Tours = model("Bookings", bookingSchema);
