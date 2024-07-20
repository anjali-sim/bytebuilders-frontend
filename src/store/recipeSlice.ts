import { recipes } from '@/data'
import { Recipe } from '@/types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface RecipeState {
  recipes: Recipe[]
}

const initialState: RecipeState = {
  recipes: []
}
export const fetchRecipesData = createAsyncThunk<
  Recipe[],
  void,
  { rejectValue: string }
>('recipes/fetchRecipes', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://172.16.3.68:8000/api/recipe/all')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    if (!data.results) {
      throw new Error('No meals found')
    }

    return recipes
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return rejectWithValue('Failed to fetch recipes')
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
  }
})

export const {} = recipeSlice.actions
export default recipeSlice.reducer
