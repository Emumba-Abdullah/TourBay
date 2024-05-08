import { Request, Response } from "express";
import Tour, { ITour } from "../models/tour";
import getErrorMessage from "../utils/errorsUtil";

export const createTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getTourById = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const updateTourById = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteTourById = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
