// import RecipeCard from './RecipeCard'
// import { Recipe } from '@/types'
// import { useAppDispatch, useAppSelector } from '@/store'
// import { useEffect } from 'react'
// import { fetchRecipesData } from '@/store/recipeSlice'

// const RecipeList = () => {
//   const dispatch = useAppDispatch()
//   const recipeData = useAppSelector((state) => state.recipe.recipes)

//   useEffect(() => {
//     dispatch(fetchRecipesData())
//   }, [dispatch])

//   return (
//     <div className="max-w-7xl mx-auto px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
//         {recipeData.length > 0 ? (
//           recipeData.map((recipe: Recipe) => {
//             return <RecipeCard key={recipe.id} recipe={recipe} />
//           })
//         ) : (
//           <div>Loading... </div>
//         )}
//         {/* {recipeData} */}
//       </div>
//     </div>
//   )
// }

// export default RecipeList



import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RecipeCard from './RecipeCard'
import { Recipe } from '@/types'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchRecipesData } from '@/store/recipeSlice'

const RecipeList = () => {
  const dispatch = useAppDispatch()
  const recipes = useAppSelector((state) => state.recipe.recipes)
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const filters = {
      diet: queryParams.getAll('diet'),
      allergies: queryParams.getAll('allergies'),
      cuisines: queryParams.getAll('cuisines')
    }
    dispatch(fetchRecipesData(filters))
  }, [dispatch, location.search])

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {recipes.length > 0 ? (
          recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div>No recipes found</div>
        )}
      </div>
    </div>
  )
}

export default RecipeList
