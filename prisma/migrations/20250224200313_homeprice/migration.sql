/*
  Warnings:

  - The `averageHomePrice` column on the `HomePrice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "HomePrice" DROP COLUMN "averageHomePrice",
ADD COLUMN     "averageHomePrice" INTEGER;
