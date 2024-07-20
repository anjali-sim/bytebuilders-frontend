import Filterbar from '@/components/Filterbar'
import RecipeList from '@/components/RecipeList'
import SearchBar from '@/components/SearchBar'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchRecipesData } from '@/store/recipeSlice'
import { useEffect } from 'react'

const Home = () => {
  const recipeData = useAppSelector((state) => state.recipe.recipes)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (recipeData.length === 0) dispatch(fetchRecipesData())
  }, [])

  return (
    <div>
      <SearchBar origin="home" />
      <div className="max-w-7xl mx-auto flex">
        <Filterbar />
        <RecipeList />
      </div>
    </div>
  )
}

export default Home
