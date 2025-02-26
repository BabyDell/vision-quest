export function calculateRequiredSalary(goal: string, cost: string): number {
    const itemCost = Number.parseInt(cost)
    let requiredSalary = 0
  
    switch (goal) {
      case "car":
        requiredSalary =
          (itemCost * ((0.00583333 * Math.pow(1 + 0.00583333, 72)) / (Math.pow(1 + 0.00583333, 72) - 1)) * 12) / 0.1
        break
      case "house":
        requiredSalary =
          ((itemCost - itemCost * 0.1) *
            ((0.00583333 * Math.pow(1 + 0.00583333, 360)) / (Math.pow(1 + 0.00583333, 360) - 1)) *
            12) /
          0.25
        break
    }
  
    return Math.ceil(requiredSalary)
  }
  
  export function calculateAffordableAmount(category: string, income: string): number {
    const houseInterest = 0.00583333
    const carInterest = 0.00583333
    const monthlyIncome = Number.parseInt(income) / 12
  
    let affordableAmount = 0
  
    switch (category) {
      case "car":
        affordableAmount =
          0.1 * monthlyIncome * ((Math.pow(1 + carInterest, 72) - 1) / (carInterest * Math.pow(1 + carInterest, 72)))
        break
      case "house":
        affordableAmount =
          monthlyIncome *
          0.25 *
          ((Math.pow(1 + houseInterest, 360) - 1) / (houseInterest * Math.pow(1 + houseInterest, 360))) *
          1.1 // Assuming 10 percent down payment
        break
      case "savings":
        // Add savings calculation if needed
        break
    }
  
    return Math.ceil(affordableAmount)
  }
  