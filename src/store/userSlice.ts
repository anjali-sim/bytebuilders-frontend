import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import axiosInstance from '@/utility/api'
import { API_PATHS } from '@/constants/apiPaths'
<<<<<<< HEAD
import { Recipe } from '@/types'
=======
>>>>>>> feature/chat-bot

export interface Preferences {
  diet: string[]
  allergies: string[]
  cuisines: string[]
}
export interface UserState {
  username: string
  email: string
  token: string
  preferences: Preferences
  bookmarkRecipes: Recipe[]
}

const initialState: UserState = {
  username: '',
  email: '',
  token: '',
  bookmarkRecipes: JSON.parse(localStorage.getItem('bookmarkRecipes')!) || [],
  preferences: {
    diet: [],
    allergies: [],
    cuisines: []
  }
}

export const addPreferences = createAsyncThunk<Preferences, Preferences>(
export const addPreferences = createAsyncThunk(
  'user/addPreferences',
  async (preferences: Preferences, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.addPreferences,
        preferences
      )
      return response.data
    } catch (error: any) {
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const editPreferences = createAsyncThunk(
  'user/editPreferences',
  async (preferences: Preferences, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.editPreferences,
        preferences
      )
      return response.data
    } catch (error: any) {
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ username: string; email: string; token: string }>
    ) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
    },
    addBookmarkRecipe: (state, action: PayloadAction<Recipe>) => {
      state.bookmarkRecipes.push(action.payload)
      localStorage.setItem(
        'bookmarkRecipes',
        JSON.stringify(state.bookmarkRecipes)
      )
    },
    removeBookmarkRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.bookmarkRecipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      )
      state.bookmarkRecipes.splice(index, 1)
      action: PayloadAction<{ username: string; email: string }>
    ) => {
      state.username = action.payload.username
      state.email = action.payload.email
    },
    clearUser: (state) => {
      state.username = ''
      state.email = ''
      state.preferences = {
        diet: [],
        allergies: [],
        cuisines: []
      }
    },
    setPreferences: (state, action: PayloadAction<Preferences>) => {
      state.preferences = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPreferences.fulfilled, (state, action) => {
        state.preferences = action.payload
      })
      .addCase(addPreferences.rejected, (state, action) => {
        console.error('Failed to save preferences:', action.payload)
      })
  }
})

export const {
  setUser,
  clearUser,
  setPreferences,
  addBookmarkRecipe,
  removeBookmarkRecipe
} = userSlice.actions
export const { setUser, clearUser, setPreferences } = userSlice.actions

export default userSlice.reducer

export const selectUsername = (state: RootState) => state.user.username
export const selectEmail = (state: RootState) => state.user.email
export const selectPreferences = (state: RootState) => state.user.preferences
