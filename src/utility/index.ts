import { recipes } from '@/data'

export const fetchSingleRecipeData = (id: any) => {
  return recipes[id - 1]
}

export const AddMealToPlanner = async (reqObj: any) => {
  console.log(reqObj)
}
