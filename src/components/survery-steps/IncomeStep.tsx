import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface IncomeStepProps {
  income: string
  setIncome: (value: string) => void
}

export function IncomeStep({ income, setIncome }: IncomeStepProps) {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mt-8 mb-10 font-Playfair">How much do you make?</h1>
      <div className="space-y-4">
        <Label className="text-base sm:text-lg" htmlFor="income">
          Annual Income
        </Label>
        <Input
          id="income"
          type="number"
          placeholder="Enter your annual income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>
    </>
  )
}
