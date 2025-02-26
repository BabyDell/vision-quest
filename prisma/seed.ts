import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

interface CarPrice {
  make: string;
  model: string;
  trim: string;
  year: string;
  price: string;
}

const results: CarPrice[] = [];

// Construct the absolute path to the CSV file
const csvFilePath = path.resolve(__dirname, 'car_prices.csv');

fs.createReadStream(csvFilePath)
  .pipe(csv({ separator: '\t' })) // Specify the tab delimiter
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    console.log(`Parsed ${results.length} rows from CSV`);

    try {
      const formattedData = results
        .map(row => ({
          make: row.make.trim(),
          model: row.model.trim(),
          trim: row.trim.trim(),
          year: row.year,
          price: row.price // Ensure price is an integer
        }))

      await prisma.carPrice.createMany({
        data: formattedData,
        skipDuplicates: true, // This will skip inserting any duplicate entries
      });

      console.log(`Successfully inserted ${formattedData.length} rows`);
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      await prisma.$disconnect();
    }
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });

console.log('Starting import process...');