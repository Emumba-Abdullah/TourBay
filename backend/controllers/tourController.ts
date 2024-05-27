import { Request, Response } from "express";
import Tour, { ITour } from "../models/tour";
import getErrorMessage from "../utils/errorsUtil";
import { filterChoosedTours } from "../utils/helperUtils";

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

export const getFilteredTours = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, city, priceRange } = req.query as {
      startDate?: string;
      endDate?: string;
      city?: string;
      priceRange?: string;
    };

    const tours = await Tour.find();

    const filteredResult = filterChoosedTours(
      { startDate, endDate, city, priceRange },
      tours
    );
    res.status(200).json(filteredResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
