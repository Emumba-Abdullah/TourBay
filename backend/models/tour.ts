import { Schema, model, Document, Model, HydratedDocument } from "mongoose";

export interface ITour extends Document {
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

const tourSchema = new Schema<ITour>({
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
  images: [{ type: String, required: true }],
});

const Tour = model<ITour>("Tour", tourSchema);
export default Tour;
