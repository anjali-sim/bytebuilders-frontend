import {
  createBrowserRouter,
  RouteObject,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
// import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './pages/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import RecipePage from './components/RecipePage'
import MealPlanner from './pages/MealPlanner'

function App() {
  const routes: RouteObject[] = [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/',
      element: (
        // <ProtectedRoute>
        <Layout />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/recipe/:id',
          element: <RecipePage />
        },
        {
          path: '/meal-plan',
          element: <MealPlanner />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ]

  const router = createBrowserRouter(routes)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
