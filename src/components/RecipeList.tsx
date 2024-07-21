import RecipeCard from './RecipeCard'
import { Recipe } from '@/types'
import { useAppSelector } from '@/store'

const RecipeList = () => {
  const recipeData = useAppSelector((state) => state.recipe.recipes)
  console.log(recipeData)

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {recipeData.length > 0 ? (
          recipeData.map((recipe: Recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />
          })
        ) : (
          <div>No recipes found</div>
        )}
      </div>
    </div>
  )
}

export default RecipeList
