// import axios from 'axios'
// import { API_PATHS } from '../constants/apiPaths'
// import { getCookie } from '@/lib/getCookie'

// declare module 'axios' {
//   export interface AxiosRequestConfig {
//     withoutAuth?: boolean
//   }
// }

// const baseURL =
//   import.meta.env.VITE_API_URL || 'http://jsonplaceholder.typicode.com'

// const axiosInstance = axios.create({
//   baseURL,
//   withoutAuth: false,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// // Function to refresh the token
// const refreshAccessToken = async () => {
//   const refreshToken = getCookie('refresh_token')
//   if (refreshToken) {
//     try {
//       const response = await axiosInstance.post(
//         API_PATHS.refreshToken,
//         { refreshToken },
//         { withoutAuth: true }
//       )
//       const { accessToken, newRefreshToken } = response.data
//       document.cookie = `access_token=${accessToken};`
//       document.cookie = `refresh_token=${newRefreshToken};`
//       return accessToken
//     } catch (error) {
//       // console.error('Failed to refresh token:', error)
//       return null
//     }
//   }
//   return null
// }

// axiosInstance.interceptors.request.use(

//   async (config) => {
//     if (!config.withoutAuth) {
//       let token = getCookie('access_token')
//       if (!token) {
//         token = await refreshAccessToken()
//       }

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config

//     if (error.response?.status === 401 && !originalRequest.retry) {
//       originalRequest.retry = true
//       const newToken = await refreshAccessToken()
//       if (newToken) {
//         axios.defaults.headers.common.Authorization = `Bearer ${newToken}`
//         return axiosInstance(originalRequest)
//       }
//     }

//     return Promise.reject(error)
//   }
// )

// export default axiosInstance

import axios from 'axios'
import { getCookie } from '@/lib/getCookie'

const baseURL =
  import.meta.env.VITE_API_URL || 'http://jsonplaceholder.typicode.com'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.withoutAuth) {
      const token = getCookie('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
