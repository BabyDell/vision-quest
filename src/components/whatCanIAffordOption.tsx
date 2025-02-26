"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { getAffordableCars } from "@/actions/car-actions"
import { getAffordableHomes } from "@/actions/house-actions"
import type { FinancialSurveyProps, CarData, HomeData } from "@/types/survery-types"
import { calculateAffordableAmount, calculateRequiredSalary } from "@/utils/calculations"
import { IncomeStep } from "./survery-steps/IncomeStep"
import { GoalStep } from "./survery-steps/GoalStep"
import { ResultsStep } from "./survery-steps/Results"
import { PurchaseTypeStep } from "./survery-steps/PurchaseTypeStep"
import { CostStep } from "./survery-steps/CostStep"
import { SalaryResultStep } from "./survery-steps/SalaryResultStep"

export default function WhatCanIAffordOption({ onBack, surveyType }: FinancialSurveyProps) {
  const [step, setStep] = useState(1)
  const [income, setIncome] = useState("")
  const [goal, setGoal] = useState("")
  const [cost, setCost] = useState("")
  const [direction, setDirection] = useState(1)
  const [affordableCars, setAffordableCars] = useState<CarData[]>([])
  const [affordableHomes, setAffordableHomes] = useState<HomeData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const totalSteps = 3

  useEffect(() => {
    if (step === 3 && surveyType === "With this salary, what can I afford?") {
      const fetchOptions = async () => {
        setIsLoading(true)
        try {
          if (goal === "car") {
            const affordableAmount = calculateAffordableAmount("car", income)
            const cars = await getAffordableCars(affordableAmount)
            setAffordableCars(cars)
          } else if (goal === "house") {
            const affordableAmount = calculateAffordableAmount("house", income)
            const homes = await getAffordableHomes(affordableAmount)
            setAffordableHomes(homes)
          }
        } catch (error) {
          console.error("Error fetching options:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchOptions()
    }
  }, [step, goal, surveyType, income])

  const handleNext = () => {
    if (step < totalSteps) {
      setDirection(1)
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1)
      setStep(step - 1)
    } else {
      onBack()
    }
  }

  const renderStep = () => {
    if (surveyType === "What salary do I need to afford this?") {
      switch (step) {
        case 1:
          return <PurchaseTypeStep goal={goal} setGoal={setGoal} />
        case 2:
          return <CostStep cost={cost} setCost={setCost} />
        case 3:
          return (
            <SalaryResultStep
              goal={goal}
              cost={cost}
              calculateRequiredSalary={() => calculateRequiredSalary(goal, cost)}
            />
          )
        default:
          return null
      }
    } else {
      switch (step) {
        case 1:
          return <IncomeStep income={income} setIncome={setIncome} />
        case 2:
          return <GoalStep goal={goal} setGoal={setGoal} />
        case 3:
          return (
            <ResultsStep
              income={income}
              goal={goal}
              affordableCars={affordableCars}
              affordableHomes={affordableHomes}
              isLoading={isLoading}
            />
          )
        default:
          return null
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 px-4 space-y-8">
      <Progress value={(step / totalSteps) * 100} className="h-2.5 bg-gray-100" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 mt-8">
        <Button className="w-1/2 py-6 text-xl bg-gray-300 hover:bg-gray-400 text-gray-800" onClick={handleBack}>
          Back
        </Button>
        {step < totalSteps ? (
          <Button
            className="w-1/2 py-6 text-xl bg-emerald-500 hover:bg-emerald-600"
            onClick={handleNext}
            disabled={
              (surveyType === "What salary do I need to afford this?" &&
                ((step === 1 && !goal) || (step === 2 && !cost))) ||
              (surveyType === "With this salary, what can I afford?" &&
                ((step === 1 && !income) || (step === 2 && !goal)))
            }
          >
            Next
            <span className="ml-2">›</span>
          </Button>
        ) : (
          <Button className="w-1/2 py-6 text-xl bg-emerald-500 hover:bg-emerald-600" onClick={onBack}>
            Start Over
          </Button>
        )}
      </div>
    </div>
  )
}

