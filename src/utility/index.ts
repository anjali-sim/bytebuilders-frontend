import { recipes } from '@/data'
import axios from 'axios'
import axiosInstance from './api'
import { API_PATHS } from '@/constants/apiPaths'

export const fetchSingleRecipeData = async (id: any) => {
  try {
    const res = await axiosInstance.get(`${API_PATHS.getSingleRecipe}/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const AddMealToPlanner = async (reqObj: any) => {
  console.log(reqObj)
}
