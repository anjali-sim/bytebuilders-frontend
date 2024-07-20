import { recipes } from '@/data'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAppSelector } from '@/store'
import { Recipe } from '@/types'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const recipeData = useAppSelector((state) => state.recipe.recipes)
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipeData)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setFilteredRecipes(recipeData)
  }, [recipeData])

  const onchangeHandler = (val: string) => {
    setSearchValue(val)
    if (val === '') {
      setOpen(false)
      setFilteredRecipes(recipeData)
      return
    }

    const updatedData = recipeData.filter((r) =>
      r.title.toLowerCase().includes(val.toLowerCase())
    )
    setFilteredRecipes(updatedData)
    setOpen(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaMagnifyingGlass className="text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Recipe, Ingredients, or Cuisine ..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          value={searchValue}
          onChange={(e) => onchangeHandler(e.target.value)}
        />
        {open && (
          <div className="max-w-7xl absolute bg-white rounded-b-lg shadow-lg w-full p-2">
            <ScrollArea className="max-h-[400px] w-full rounded-md">
              {filteredRecipes.map((r) => {
                return (
                  <div
                    key={r.id}
                    className="rounded-md p-4 flex items-center gap-2 mb-2 hover:bg-accent cursor-pointer"
                    onClick={() => navigate(`/recipe/${r.id}`)}
                  >
                    <Avatar>
                      <AvatarImage src={r.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p>{r.title}</p>
                      <p className="text-gray-400">
                        dad, asdasd, asdasd,asdasd ,asdasd
                      </p>
                    </div>
                  </div>
                )
              })}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
