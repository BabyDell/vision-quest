import { InfoIcon } from "lucide-react"
import Link from "next/link"

interface SalaryResultStepProps {
  goal: string
  cost: string
  calculateRequiredSalary: () => number
}

export function SalaryResultStep({ goal, cost, calculateRequiredSalary }: SalaryResultStepProps) {
  const requiredSalary = calculateRequiredSalary()

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mt-8 mb-10">Results</h1>
      <p className="text-lg text-center mb-6">
        To afford a {goal} costing ${Number(cost).toLocaleString()}, you need to make:
      </p>
      <p className="text-2xl font-bold text-center text-emerald-600">${requiredSalary.toLocaleString()} per year</p>
      <p className="text-xl text-center mt-4">${Math.round(requiredSalary / 12).toLocaleString()} per month</p>

      <div className="mt-5 text-center">
        <Link
          href="/calculations-explained"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
        >
          <InfoIcon className="w-5 h-5 mr-2" />
          Learn about our calculations and assumptions
        </Link>
      </div>
    </>
  )
}

