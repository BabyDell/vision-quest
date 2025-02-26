interface GoalStepProps {
  goal: string
  setGoal: (value: string) => void
}

export function GoalStep({ goal, setGoal }: GoalStepProps) {
  const options = ["car", "house"]

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-8 mb-10 font-Playfair">What do you want to afford?</h1>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={option}>
            <button
            key={index}
              onClick={() => setGoal(option) }
              className={`w-full p-4 text-center border rounded-lg transition-colors text-xl font-semibold
                ${
                  goal === option
                    ? "border-emerald-800 bg-emerald-600 text-emerald-70 text-white"
                    : "border-gray-200 hover:border-emerald-500"
                }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
           
          </div>
        ))}
      </div>
    </>
  )
}

