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
import { Card } from './ui/card'

const RecipePage = () => {
  const [recipe, setRecipeInfo] = useState<Recipe | undefined>()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data: Recipe = await fetchSingleRecipeData(id)
      console.log(data)

      setLoading(false)
      setRecipeInfo(data)
    }
    fetchData()
  }, [id])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Recipes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              <span className="text-primary">{id}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {!loading ? (
        <div>
          <img
            src={recipe?.image}
            alt={recipe?.title}
            className="w-full h-[600px] object-cover rounded-md mb-4"
          />
          <div className="flex justify-between mb-4">
            <h1 className="text-4xl font-bold">{recipe?.title}</h1>
            <FaBookmark className="cursor-pointer text-gray-400 hover:text-primary h-10 items-center mr-5" />
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex flex-wrap mb-4 text-gray-400">
                <span className="mr-4 text-2xl flex items-center">
                  <span>
                    <FaClock className="mr-1 text-primary" />
                  </span>
                  {recipe?.preparationMinutes} minutes
                </span>
                <span className="mr-4 text-2xl flex items-center">
                  <span>
                    <FaFire className="mr-1 text-primary" />
                  </span>
                  {recipe?.healthScore}% Healthy
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
                {[
                  'Carrots',
                  'Bell Peppers',
                  'Soy Sauce',
                  'Garlic',
                  'Ginger'
                ].map((i, index) => {
                  return (
                    <Button key={index} className="rounded-full mr-2">
                      {i}
                    </Button>
                  )
                })}
              </div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Instructions</h2>
                {[
                  '1. Cook the carrots',
                  '2. Add the bell peppers',
                  '3. Mix them'
                ].map((i, index) => {
                  return (
                    <p key={index} className="mb-2">
                      {i}
                    </p>
                  )
                })}
              </div>
              <div className="flex flex-wrap mb-4">
                {/* <span className="mr-4 text-lg">
              <strong>Likes:</strong> {recipe?.meta?.aggregateLikes}
            </span>
            <span className="mr-4 text-lg">
              <strong>Health Score:</strong> {recipe?.meta?.healthScore}
            </span> */}
              </div>
            </div>
            {/* Youtube Cards */}
            <div className="flex flex-col gap-2 w-2/5">
              {recipe?.youtubeLink?.map((i: string, index: number) => {
                return (
                  <Card key={index} className="w-full">
                    <iframe
                      width="560"
                      height="315"
                      src={i}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default RecipePage
