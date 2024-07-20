import { recipes } from '@/data'

export const fetchSingleRecipeData = (id: any) => {
  return recipes[id - 1]
}
