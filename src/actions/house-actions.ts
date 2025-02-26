"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export async function getAffordableHomes(affordableAmount: number) {
  try {
    // Get all home prices from the database
    const allHomes = await prisma.homePrice.findMany({
      select: {
        regionid: true,
        regionName: true,
        stateName: true,
        incomeNeeded: true,
        averageHomePrice: true,
      },
    })

    // Calculate affordability metrics for each region
    const homesWithAffordability = allHomes
      .filter((home) => home.averageHomePrice !== null && home.regionName !== null)
      .map((home) => {
        const averagePrice = home.averageHomePrice || 0
        const priceDifference = Math.abs(affordableAmount - averagePrice)
        const affordabilityRatio = affordableAmount / averagePrice

        // Determine affordability category
        let affordabilityCategory = "unaffordable"
        if (affordabilityRatio >= 1.5) {
          affordabilityCategory = "high-end" // Can afford high-end homes
        } else if (affordabilityRatio >= 1) {
          affordabilityCategory = "average" // Can afford average homes
        } else if (affordabilityRatio >= 0.8) {
          affordabilityCategory = "entry-level" // Can afford entry-level homes
        }

        return {
          ...home,
          priceDifference,
          affordabilityRatio,
          affordabilityCategory,
        }
      })

    // Sort by price difference (closest to affordableAmount first)
    const sortedHomes = homesWithAffordability.sort((a, b) => a.priceDifference - b.priceDifference)

    // Select homes for recommendation
    let selectedHomes = []

    // Always include the closest match
    if (sortedHomes.length > 0) {
      selectedHomes.push(sortedHomes[0])
    }

    // Categorize remaining homes
    const remainingHomes = sortedHomes.slice(1)
    const closeMatches = remainingHomes.filter(
      (home) => home.affordabilityRatio >= 0.9 && home.affordabilityRatio <= 1.1,
    )
    const otherOptions = remainingHomes.filter((home) => !closeMatches.includes(home))

    // Randomly select one close match if available
    if (closeMatches.length > 0) {
      selectedHomes.push(closeMatches[Math.floor(Math.random() * closeMatches.length)])
    }

    // Fill remaining slots with random selections from other options
    while (selectedHomes.length < 3 && otherOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherOptions.length)
      selectedHomes.push(otherOptions[randomIndex])
      otherOptions.splice(randomIndex, 1)
    }

    // Shuffle the final selection for randomness
    selectedHomes = shuffleArray(selectedHomes)

    // Remove calculated fields and return the result
    return selectedHomes.map((home) => ({
      regionid: home.regionid,
      regionName: home.regionName,
      stateName: home.stateName,
      averageHomePrice: home.averageHomePrice,
      affordabilityCategory: home.affordabilityCategory,
      affordabilityRatio: home.affordabilityRatio,
    }))
  } catch (error) {
    console.error("Error fetching affordable homes:", error)
    return []
  }
}

