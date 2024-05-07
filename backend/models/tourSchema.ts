import { Schema, model } from "mongoose";

const tourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  facilities: [{ type: String, required: true }],
});

export const Tours = model("Tours", tourSchema);
