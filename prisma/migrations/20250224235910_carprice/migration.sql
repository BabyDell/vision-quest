-- AlterTable
ALTER TABLE "CarPrice" ALTER COLUMN "year" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "HomePrice" ALTER COLUMN "regionName" DROP NOT NULL,
ALTER COLUMN "stateName" DROP NOT NULL;
