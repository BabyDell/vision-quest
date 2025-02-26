-- CreateTable
CREATE TABLE "HomePrice" (
    "regionid" TEXT NOT NULL,
    "regionName" TEXT NOT NULL,
    "stateName" TEXT NOT NULL,
    "incomeNeeded" TEXT,
    "averageHomePrice" TEXT,

    CONSTRAINT "HomePrice_pkey" PRIMARY KEY ("regionid")
);

-- CreateTable
CREATE TABLE "CarPrice" (
    "carId" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "CarPrice_pkey" PRIMARY KEY ("carId")
);
