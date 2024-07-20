import { Recipe } from '@/types'
import { Card } from './ui/card'
import { FaClock, FaFire } from 'react-icons/fa6'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate()
  return (
    <Card className="w-[300px]">
      <img
        className="w-full h-48 object-cover rounded-t-md"
        src={recipe.image}
        alt={'asd'}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 cursor-pointer">
          {recipe.title}
        </div>
        <div className="flex gap-4 items-center text-sm mb-4">
          <div className="flex items-center  text-gray-400">
            <FaClock className="mr-1" />
            <span>{recipe.readyInMinutes} Minutes</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FaFire className="mr-1" />
            <span>{recipe.calories} Calories</span>
          </div>
        </div>
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
