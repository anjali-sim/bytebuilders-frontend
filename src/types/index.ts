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
}
