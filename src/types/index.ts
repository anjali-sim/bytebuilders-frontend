export interface Recipe {
  id: number
  title: string
  readyInMinutes: number
  servings: number
  calories: number
  image: string
  imageType: string
  cuisines: string[]
  dishTypes: string[]
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  dairyFree: boolean
  veryHealthy: boolean
  veryPopular: boolean
  sustainable: boolean
  meta: {
    aggregateLikes: number
    instructions: string
    analyzedInstructions: string
    healthScore: number
    preparationMinutes: number
    cookingMinutes: number
    diets: string[]
    occasions: string[]
    extendedIngredients: string
  }
}
