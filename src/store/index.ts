import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authSlice from './authSlice'
import recipeSlice from './recipeSlice'
import loadingSlice from './loadingSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    recipe: recipeSlice,
    loading: loadingSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
