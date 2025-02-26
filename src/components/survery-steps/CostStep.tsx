import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface CostStepProps {
  cost: string
  setCost: (value: string) => void
}

export function CostStep({ cost, setCost }: CostStepProps) {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mt-8 mb-10 font-Playfair">How much does it cost?</h1>
      <div className="space-y-4">
        <Label className="text-base sm:text-lg" htmlFor="cost">
          Cost
        </Label>
        <Input
          id="cost"
          type="number"
          placeholder="500,000"
          className="bg-neutral-200"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>
    </>
  )
}

