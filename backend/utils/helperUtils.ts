import dayjs from "dayjs";

interface IChoices {
  priceRange?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
}

interface ITour {
  _id: string;
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

export const filterChoosedTours = (
  choices: IChoices,
  toursData: ITour[]
): ITour[] => {
  console.log("Choices:", choices);

  // Parse the price range
  const priceRange = choices.priceRange?.split("-");
  const minPrice = priceRange ? parseInt(priceRange[0].replace("$", "")) : 0;
  const maxPrice = priceRange
    ? parseInt(priceRange[1].replace("$", ""))
    : Infinity;

  console.log("Parsed Price Range:", { minPrice, maxPrice });

  // Parse the start and end dates
  const startDate = choices.startDate
    ? dayjs(choices.startDate).format("YYYY-MM-DD")
    : null;
  const endDate = choices.endDate
    ? dayjs(choices.endDate).format("YYYY-MM-DD")
    : null;

  console.log("Parsed Dates:", { startDate, endDate });

  // Filter the tours
  const result = toursData.filter((tour) => checkMatchedTours(tour));

  function checkMatchedTours(tour: ITour): boolean {
    const tourStartDate = dayjs(tour.startDate).format("YYYY-MM-DD");
    const tourEndDate = dayjs(tour.endDate).format("YYYY-MM-DD");
    const tourPrice = parseInt(tour.price.replace("$", ""));

    const isWithinDateRange =
      (!startDate || tourStartDate >= startDate) &&
      (!endDate || tourEndDate <= endDate);
    const isWithinPriceRange = tourPrice >= minPrice && tourPrice <= maxPrice;
    const isCityMatch = choices.city
      ? tour.city.toLowerCase() === choices.city.toLowerCase()
      : true;

    return isWithinDateRange && isWithinPriceRange && isCityMatch;
  }

  return result;
};
