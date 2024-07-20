import Filterbar from '@/components/Filterbar'
import Loading from '@/components/Loading'
import RecipeList from '@/components/RecipeList'
import SearchBar from '@/components/SearchBar'
import { useAppDispatch, useAppSelector } from '@/store'
import { setLoading } from '@/store/loadingSlice'
import { fetchRecipesData } from '@/store/recipeSlice'
import { useEffect } from 'react'

const Home = () => {
  const recipeData = useAppSelector((state) => state.recipe.recipes)
  const isLoad = useAppSelector((state) => state.loading.isLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (recipeData.length === 0) {
      dispatch(setLoading(true))
      dispatch(fetchRecipesData())
      dispatch(setLoading(false))
    }
  }, [])

  return (
    <div>
      <SearchBar />
      <div className="max-w-7xl mx-auto flex">
        <Filterbar />
        {!isLoad ? <RecipeList /> : <Loading />}
      </div>
    </div>
  )
}

export default Home
