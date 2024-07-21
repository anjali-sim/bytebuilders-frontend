import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authSlice, { AuthState } from './authSlice'
import userSlice, { UserState } from './userSlice'
import recipeSlice, { RecipeState } from './recipeSlice'
import botSlice, { BotState } from './botSlice'
import loadingSlice, { LoadingState } from './loadingSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    loading: loadingSlice,
    recipe: recipeSlice,
    bot: botSlice
  }
})

export type RootState = {
  user: UserState
  auth: AuthState
  recipe: RecipeState
  loading: LoadingState
  bot: BotState
}

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
