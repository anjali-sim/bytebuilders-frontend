export interface Recipe {
  aggregateLikes: number
  cookingMinutes: number | null
  cuisines: string[]
  dairyFree: boolean
  diets: string[]
  dishTypes: string[]
  glutenFree: boolean
  healthScore: number
  occasions: string[]
  preparationMinutes: number | null
  readyInMinutes: number
  servings: number
  sustainable: boolean
  vegan: boolean
  vegetarian: boolean
  veryHealthy: boolean
  veryPopular: boolean
  id: number
  image: string
  imageType: string
  youtubeLink: string[]
}
export enum days {
  'Monday',
  'TuesDay',
  'Wednesday',
  'Thursday',
  'Frieday ',
  'Saturady',
  'Sunday'
}

export type MealPlan = [
  {
    day:
      | 'Monday'
      | 'TuesDay'
      | 'Wednesday'
      | 'Thursday'
      | 'Frieday '
      | 'Saturady'
      | 'Sunday'
    mealId: number
    breakfast: Recipe[]
    lunch: Recipe[]
    dinner: Recipe[]
    snacks: Recipe[]
  }
]
