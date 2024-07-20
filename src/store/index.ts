import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authSlice, { AuthState } from './authSlice'
import userSlice, { UserState } from './userSlice'
import preferenceSlice, { PreferencesState } from './preferenceSlice'
import recipeSlice, { RecipeState } from './recipeSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    preferences: preferenceSlice,
    recipe: recipeSlice
  }
})

export type RootState = {
  user: UserState
  auth: AuthState
  preferences: PreferencesState
  recipe: RecipeState
}

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
