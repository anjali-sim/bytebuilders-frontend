import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import counterSlice from './counterSlice'
import authSlice from './authSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    auth: authSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
