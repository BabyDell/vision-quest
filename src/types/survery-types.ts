export interface FinancialSurveyProps {
  onBack: () => void;
  surveyType: string;
}

export type CarData = {
    carId: string
    make: string
    model: string
    year: string
    trim: string
    price: string
  }

export interface HomeData {
  regionid: string;
  regionName: string | null;
  stateName: string | null;
  averageHomePrice: number | null;
  affordabilityCategory: string;
  affordabilityRatio: number;
}
