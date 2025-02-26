import Link from "next/link"

export default function CalculationsExplained() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Calculations and Assumptions Explained</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Car Affordability</h2>
        <p>For car affordability, we use the following assumptions:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Loan term: 6 years (72 months)</li>
          <li>Interest rate: 7% APR</li>
          <li>Monthly car payment: 10% of monthly income</li>
          <li>No down payment considered</li>
        </ul>
        <p className="mt-4">
          The calculation uses the formula for monthly payments on an amortizing loan, solving for the principal (car
          price) that results in a monthly payment equal to 10% of monthly income.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Home Affordability</h2>
        <p>For home affordability, we use the following assumptions:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Mortgage term: 30 years (360 months)</li>
          <li>Interest rate: 7% APR</li>
          <li>Monthly mortgage payment: 25% of monthly income</li>
          <li>10% down payment</li>
          <li>Property taxes, insurance, and other costs are not included in the calculation</li>
        </ul>
        <p className="mt-4">
          The calculation uses the formula for monthly payments on an amortizing loan, solving for the principal (home
          price) that results in a monthly payment equal to 25% of monthly income. The result is then adjusted to
          account for the 10% down payment.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>These calculations are simplified and meant for general guidance only.</li>
          <li>
            Actual affordability may vary based on individual circumstances, credit score, and other financial
            obligations.
          </li>
          <li>We recommend consulting with a financial advisor for personalized advice.</li>
          <li>
            Car and home prices, as well as interest rates, are subject to change and may vary by location and other
            factors.
          </li>
        </ul>
      </section>

      <div className="mt-12">
        <Link href="/" className="text-emerald-600 hover:text-emerald-700">
          ← Back to the survey
        </Link>
      </div>
    </div>
  )
}

