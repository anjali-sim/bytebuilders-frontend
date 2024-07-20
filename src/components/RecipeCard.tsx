import { Recipe } from '@/types'
import { Card } from './ui/card'
import { FaBookmark, FaClock, FaFire } from 'react-icons/fa6'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate()
  console.log(recipe)
  return (
    <Card className="w-[300px] ">
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-md"
          src={recipe.image}
          alt={'asd'}
        />
        <FaBookmark className="absolute text-black shadow-lg top-0 right-0 m-4 hover:text-primary cursor-pointer hover:h-5 hover:w-5" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 cursor-pointer">
          {recipe.details.title}
        </div>
        <div className="flex gap-4 items-center text-sm mb-4">
          <div className="flex items-center  text-gray-400">
            <FaClock className="mr-1" />
            <span>{recipe.details.readyInMinutes} Minutes</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FaFire className="mr-1" />
            <span>{recipe.details.healthScore}% Helthy</span>
          </div>
        </div>
      </div>
      <div className="px-6 pb-4">
        <Button
          className="rounded-full w-full"
          variant="outline"
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
          View Recipe
        </Button>
      </div>
    </Card>
  )
}

export default RecipeCard
