export interface Recipe {
  details: {
    aggregateLikes: number
    cookingMinutes: number | null
    cuisines: string[]
    dairyFree: boolean
    diets: string[]
    dishTypes: string[]
    glutenFree: boolean
    healthScore: number
    id: number
    image: string
    imageType: string
    occasions: string[]
    preparationMinutes: number | null
    readyInMinutes: number
    servings: number
    sustainable: boolean
    title: string
    vegan: boolean
    vegetarian: boolean
    veryHealthy: boolean
    veryPopular: boolean
  }
  id: number
  title: string
  image: string
  imageType: string
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
