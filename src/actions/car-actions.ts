"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAffordableCars(affordableAmount: number) {
  // Convert affordableAmount to a number to ensure proper comparison
  const priceTarget = Number(affordableAmount);

  try {
    // Get all cars from the database
    const allCars = await prisma.carPrice.findMany({
      select: {
        carId: true,
        make: true,
        model: true,
        year: true,
        trim: true,
        price: true,
      },
    });

    // Convert string prices to numbers and calculate the difference from target price
    const carsWithPriceDiff = allCars.map((car) => ({
      ...car,
      numericPrice: Number(car.price), // Convert price to number
      priceDifference: Math.abs(Number(car.price) - priceTarget), // Convert price to number before arithmetic
    }));

    // Sort by price difference (closest to target price first)
    const sortedCars = carsWithPriceDiff.sort(
      (a, b) => a.priceDifference - b.priceDifference
    );

    // Get cars that are close to the target price (within a reasonable range)
    const closeMatchCars = sortedCars.filter(
      (car) => car.priceDifference < priceTarget * 0.2 // Within 20% of target price
    );

    // If we have more than 3 close matches, randomly select 3
    let selectedCars;
    if (closeMatchCars.length > 3) {
      // Shuffle the close matches and take 3
      selectedCars = shuffleArray(closeMatchCars).slice(0, 3);
    } else if (closeMatchCars.length > 0) {
      // If we have 1-3 close matches, use all of them
      selectedCars = closeMatchCars;
    } else {
      // If no close matches, just take the 3 closest cars
      selectedCars = sortedCars.slice(0, 3);
    }

    // Return the selected cars without the calculated fields
    return selectedCars.map((car) => ({
      carId: car.carId,
      make: car.make,
      model: car.model,
      year: car.year,
      trim: car.trim,
      price: car.price,
    }));
  } catch (error) {
    console.error("Error fetching affordable cars:", error);
    return [];
  }
}

// Helper function to shuffle an array (Fisher-Yates algorithm)
interface Car {
  carId: string 
  make: string 
  model: string 
  year: string 
  trim: string 
  price: string 
}

interface CarWithPriceDiff extends Car {
  numericPrice: number;
  priceDifference: number;
}

function shuffleArray(array: CarWithPriceDiff[]): CarWithPriceDiff[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
