/*
  Warnings:

  - Added the required column `trim` to the `CarPrice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `CarPrice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `CarPrice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CarPrice" ADD COLUMN     "trim" TEXT NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
