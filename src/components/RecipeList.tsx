import { recipes } from '@/data/index'
import RecipeCard from './RecipeCard'
import { Recipe } from '@/types'

const RecipeList = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
      {recipes.map((recipe: Recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />
      })}
    </div>
  )
}

export default RecipeList
