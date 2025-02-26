import { Card, CardContent } from "@/components/ui/card";
import { Car, Home, InfoIcon } from "lucide-react";
import type { CarData, HomeData } from "@/types/survery-types";
import { calculateAffordableAmount } from "@/utils/calculations";
import Link from "next/link";

interface ResultsStepProps {
  income: string;
  goal: string;
  affordableCars: CarData[];
  affordableHomes: HomeData[];
  isLoading: boolean;
}

export function ResultsStep({
  income,
  goal,
  affordableCars,
  affordableHomes,
  isLoading,
}: ResultsStepProps) {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mt-8 mb-10 font-Playfair">
        Results
      </h1>
      <p className="text-lg text-center mb-6">
        Based on your annual income of ${Number(income).toLocaleString()}, you
        can afford:
      </p>
      <div className="space-y-6">
        <p className="text-xl font-semibold capitalize">
          {goal}: Up to $
          {calculateAffordableAmount(goal, income).toLocaleString()}
        </p>

        {goal === "car" && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Cars you might like:</h2>
            {isLoading ? (
              <div className="text-center py-4">
                Loading car recommendations...
              </div>
            ) : affordableCars.length > 0 ? (
              <div className="grid gap-4">
                {affordableCars.map((car) => (
                  <Card key={car.carId} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-emerald-100 p-3 rounded-full">
                          <Car className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">
                            {car.year} {car.make} {car.model}
                          </h3>
                          <p className="text-muted-foreground">{car.trim}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-emerald-600">
                            ${Number(car.price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No matching cars found. Try adjusting your income.</p>
            )}
          </div>
        )}

        {goal === "house" && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Where you could live:
            </h2>
            {isLoading ? (
              <div className="text-center py-4">
                Loading home recommendations...
              </div>
            ) : affordableHomes.length > 0 ? (
              <div className="grid gap-4">
                {affordableHomes.map((home) => (
                  <Card key={home.regionid} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            home.affordabilityCategory === "high-end"
                              ? "bg-purple-100"
                              : home.affordabilityCategory === "average"
                              ? "bg-emerald-100"
                              : "bg-amber-100"
                          }`}
                        >
                          <Home
                            className={`h-6 w-6 ${
                              home.affordabilityCategory === "high-end"
                                ? "text-purple-600"
                                : home.affordabilityCategory === "average"
                                ? "text-emerald-600"
                                : "text-amber-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">
                            {home.regionName}
                          </h3>
                          <p className="text-muted-foreground">
                            {home.affordabilityCategory === "high-end"
                              ? "You can afford a high-end home here!"
                              : home.affordabilityCategory === "average"
                              ? "You can afford an average home here"
                              : "You can afford an entry-level home here"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-emerald-600">
                            ${home.averageHomePrice?.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Avg. price
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No matching locations found. Try adjusting your income.</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/calculations-explained"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
        >
          <InfoIcon className="w-5 h-5 mr-2" />
          Learn about our calculations and assumptions
        </Link>
      </div>
    </>
  );
}
