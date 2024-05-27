import express from "express";
import {
  createTour,
  getAllTours,
  getTourById,
  updateTourById,
  deleteTourById,
  getFilteredTours,
} from "../controllers/tourController";

const tourRouter = express.Router();

tourRouter.post("/", createTour);
tourRouter.get("/", getAllTours);
tourRouter.get("/filtered", getFilteredTours);
tourRouter.get("/:id", getTourById);
tourRouter.put("/:id", updateTourById);
tourRouter.delete("/:id", deleteTourById);

export default tourRouter;
