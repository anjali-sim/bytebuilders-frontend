import { Recipe } from '@/types'
import { fetchSingleRecipeData } from '@/utility'
import { useEffect, useState } from 'react'
import { FaBookmark, FaClock, FaFire } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import { Button } from './ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const RecipePage = () => {
  const [recipe, setRecipeInfo] = useState<Recipe>()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const data: Recipe = fetchSingleRecipeData(id)
    console.log(data)
    setRecipeInfo(data)
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Recipe</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {!loading ? (
        <div>
          <img
            src={
              'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={recipe?.title}
            className="w-full h-[400px] object-cover rounded-md mb-4"
          />
          <div className="flex justify-between mb-4">
            <h1 className="text-4xl font-bold">{recipe?.title}</h1>
            <FaBookmark className="cursor-pointer text-gray-400 hover:text-primary h-10 items-center mr-5" />
          </div>
          <div className="flex flex-wrap mb-4 text-gray-400">
            <span className="mr-4 text-lg flex items-center">
              <span>
                <FaClock className="mr-1 text-primary" />
              </span>
              {recipe?.readyInMinutes} minutes
            </span>
            <span className="mr-4 text-lg flex items-center">
              <span>
                <FaFire className="mr-1 text-primary" />
              </span>
              {recipe?.calories} Calories
            </span>
          </div>
          <div className="flex flex-wrap mb-4">
            {recipe?.vegetarian && (
              <span className="mr-4 text-green-600">Vegetarian</span>
            )}
            {recipe?.vegan && (
              <span className="mr-4 text-green-600">Vegan</span>
            )}
            {recipe?.glutenFree && (
              <span className="mr-4 text-green-600">Gluten Free</span>
            )}
            {recipe?.dairyFree && (
              <span className="mr-4 text-green-600">Dairy Free</span>
            )}
            {recipe?.veryHealthy && (
              <span className="mr-4 text-green-600">Very Healthy</span>
            )}
            {recipe?.sustainable && (
              <span className="mr-4 text-green-600">Sustainable</span>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
            {['Carrots', 'Bell Peppers', 'Soy Sauce', 'Garlic', 'Ginger'].map(
              (i) => {
                return <Button className="rounded-full mr-2">{i}</Button>
              }
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Instructions</h2>
            {[
              '1. Cook the carrots',
              '2. Add the bell peppers',
              '3. Mix them'
            ].map((i) => {
              return <p className="mb-2">{i}</p>
            })}
          </div>
          <div className="flex flex-wrap mb-4">
            <span className="mr-4 text-lg">
              <strong>Likes:</strong> {recipe?.meta?.aggregateLikes}
            </span>
            <span className="mr-4 text-lg">
              <strong>Health Score:</strong> {recipe?.meta?.healthScore}
            </span>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default RecipePage