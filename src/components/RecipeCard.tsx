import { Recipe } from '@/types'
import { Card } from './ui/card'
import { FaBookmark, FaClock, FaFire } from 'react-icons/fa6'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { addBookmarkRecipe, removeBookmarkRecipe } from '@/store/userSlice'

interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const bookmarkRecipe = useAppSelector((state) => state.user.bookmarkRecipes)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  console.log(recipe)

  const onBookMark = (recipe: Recipe) => {
    if (bookmarkRecipe.filter((br) => br.id === recipe.id))
      dispatch(addBookmarkRecipe(recipe))
    else {
      const id = recipe.id
      console.log(id)

      // dispatch(removeBookmarkRecipe())
    }
  }

  return (
    <Card className="w-[300px] ">
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-md"
          src={recipe.image}
          alt={'asd'}
        />
        <FaBookmark
          className="absolute text-black shadow-lg top-0 right-0 m-4 hover:text-primary cursor-pointer hover:h-5 hover:w-5"
          onClick={() => onBookMark(recipe)}
        />
      </div>
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
            <span>{recipe.healthScore}% Helthy</span>
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
