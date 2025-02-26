"use client"

import { MoveVertical } from "lucide-react"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import WhatCanIAffordOption from "./whatCanIAffordOption"
import { motion, AnimatePresence } from "framer-motion"

export default function CreditCardSurvey() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showSurvey, setShowSurvey] = useState(false)
  const [direction, setDirection] = useState(1)

  const options = ["What salary do I need to afford this?", "With this salary, what can I afford?"]

  const handleNext = () => {
    setDirection(1)
    setShowSurvey(true)
  }

  const handleBack = () => {
    setDirection(-1)
    setSelectedOption(null)
    setShowSurvey(false)
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!showSurvey ? (
        <motion.div
          key="opener"
          initial={{ opacity: 0, x: direction * -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * 20 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto p-6 space-y-8"
        >
          <Progress value={0} className="h-2.5 bg-gray-100" />

          <h1 className="text-3xl font-bold text-center mt-8 mb-10 text-emerald-800 font-Playfair">Explore Your Needs And Wants</h1>

          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={option}>
                <button
                  onClick={() => setSelectedOption(option)}
                  className={`w-full p-4 text-center border rounded-lg transition-colors text-xl font-semibold
                    ${
                      selectedOption === option
                        ? "border-emerald-800 bg-emerald-600 text-emerald-70 text-white"
                        : "border-gray-200 hover:border-emerald-500"
                    }`}
                >
                  {option}
                </button>
                {index < options.length - 1 && (
                  <div className="flex justify-center my-3">
                    <MoveVertical className="text-emerald-800" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Button className="w-1/2 py-6 text-xl bg-gray-300 hover:bg-gray-400 text-gray-800" disabled={true}>
              Back
            </Button>
            <Button
              className="w-1/2 py-6 text-xl bg-emerald-500 hover:bg-emerald-600"
              disabled={!selectedOption}
              onClick={handleNext}
            >
              Next
              <span className="ml-2">›</span>
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="survey"
          initial={{ opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ duration: 0.3 }}
        >
          <WhatCanIAffordOption onBack={handleBack} surveyType={selectedOption!} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

