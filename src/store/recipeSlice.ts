import { API_PATHS } from '@/constants/apiPaths'
import axiosInstance from '@/utility/api'
import { MealPlan, Recipe } from '@/types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface RecipeState {
  recipes: Recipe[]
  mealplan: MealPlan[]
  isLoading: boolean
  FiltersState: any
}

const initialState: RecipeState = {
  recipes: JSON.parse(localStorage.getItem('recipe')!) || [],
  mealplan: JSON.parse(localStorage.getItem('meal-plan')!) || [],
  isLoading: false
}

// export const fetchRecipesData = createAsyncThunk<
//   Recipe[],
//   void,
//   { rejectValue: string }
// >('recipes/fetchRecipes', async (_, { rejectWithValue }) => {
//   // const response = await axiosInstance.get(API_PATHS.getRecipes)
//   // console.log(response)
//   // console.log(response)
//   try {
//     const response = await axiosInstance.get(API_PATHS.getRecipes)
//     console.log(response)
//     if (!response) {
//       throw new Error('Network response was not ok')
//     }
//     console.log(response)
//     const data = response.data.results
//     console.log(data)
//     if (!response.data.results) {
//       throw new Error('No meals found')
//     }
//     return response.data.results
//   } catch (error) {
//     console.error('Error fetching recipes:', error)
//     return rejectWithValue('Failed to fetch recipes')
//   }
// })

export const fetchRecipesData = createAsyncThunk<
  Recipe[],
  FiltersState,
  { rejectValue: string }
>('recipes/fetchRecipes', async (filters, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams()
    for (const category in filters) {
      filters[category as keyof FiltersState].forEach((value) => {
        params.append(category, value)
      })
    }
    const response = await axiosInstance.get(API_PATHS.getRecipes, { params })
    if (!response) {
      throw new Error('Network response was not ok')
    }
    const data = response.data.results
    if (!data.results) {
      throw new Error('No meals found')
    }
    localStorage.setItem('recipes', JSON.stringify(response.data.results))
    return response.data
    if (!response.data.results) {
      throw new Error('No meals found')
    }
    return response.data.results
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return rejectWithValue('Failed to fetch recipes')
  }
})

export const fetchMealPlanData = createAsyncThunk<
  MealPlan[],
  string,
  { rejectValue: string }
>('recipes/fetchMealPlan', async (startDate: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(API_PATHS.getMealPlan, {
      startDate
    })

    if (response.status !== 200) {
      throw new Error('Network response was not ok')
    }

    const mealPlannerData: MealPlan[] = response.data

    if (!mealPlannerData) {
      throw new Error('No meals found')
    }
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return mealPlannerData
  } catch (error) {
    console.error('Error fetching meal plan:', error)
    return rejectWithValue('Failed to fetch meal plan')
  }
})

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchRecipesData.fulfilled,
      (state, action: PayloadAction<Recipe[]>) => {
        state.recipes = action.payload
      }
    )
    builder.addCase(fetchMealPlanData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      fetchMealPlanData.fulfilled,
      (state, action: PayloadAction<MealPlan[]>) => {
        state.mealplan = action.payload
        state.isLoading = false
      }
    )
    builder.addCase(fetchMealPlanData.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const {} = recipeSlice.actions
export default recipeSlice.reducer
