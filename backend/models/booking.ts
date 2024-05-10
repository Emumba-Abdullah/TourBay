import { Schema, model, Document, Model, HydratedDocument } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phoneNo: string;
  price: string;
  numOfAdults: string;
  numOfChilds: string;
  paymentMethod: string;
  tours?: Schema.Types.ObjectId | string;
  userId?: Schema.Types.ObjectId | string;
}

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

const Booking = model<IBooking>("Booking", bookingSchema);
export default Booking;
