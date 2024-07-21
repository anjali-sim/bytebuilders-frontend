import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../utility/api'
import { API_PATHS } from '../constants/apiPaths'
import { RootState } from './index'
import { clearUser } from './userSlice'

interface SignupData {
  username: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

export interface AuthState {
  loading: boolean
  error: string | null
  success: boolean
  message: string
  username: string | null
  email: string | null
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  message: '',
  username: null,
  email: null
}

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.signup,
        userData
        // { withoutAuth: true }
      )
      const message = response.data.message
      console.log(message)
      // const { accessToken, userInfo } = response.data.data
      // const { message } = response.data.message
      // dispatch(setUser(userInfo))
      const { username, email } = response.data.data // Adjust according to your API response
      return { message, username, email }
      // return { message }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } }
      const errorMessage = error.response?.data?.message || 'Signup failed'
      return rejectWithValue(errorMessage)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_PATHS.login, loginData, {
        // withoutAuth: true
      })
      // const { accessToken, userInfo } = response.data.data

      // document.cookie = `access_token=${accessToken}; path=/;`
      // dispatch(setUser(userInfo))
      // return { userInfo }
      const message = response.data.message
      console.log(message)
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } }
      const errorMessage = error.response?.data?.message || 'Login failed'
      return rejectWithValue(errorMessage)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      document.cookie =
        'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      dispatch(clearUser())
      return { message: 'Logout successful' }
    } catch (err) {
      return rejectWithValue('Logout failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
      state.message = ''
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.message = action.payload.message
      state.username = action.payload.username
      state.email = action.payload.email
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(login.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
      state.message = ''
    })
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false
      state.success = true
      state.message = 'Login successful'
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false
      state.success = true
      state.message = 'Logout successful'
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  }
})

export const { resetState } = authSlice.actions

export default authSlice.reducer

export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectAuthError = (state: RootState) => state.auth.error
export const selectAuthSuccess = (state: RootState) => state.auth.success
export const selectAuthMessage = (state: RootState) => state.auth.message
