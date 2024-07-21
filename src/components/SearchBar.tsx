import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAppSelector } from '@/store'
import { Recipe } from '@/types'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  origin: 'meal-plan' | 'home'
  setSelectedMeal?: (recipe: Recipe) => void
}

const SearchBar = ({ origin, setSelectedMeal }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('')
  const recipeData = useAppSelector((state) => state.recipe.recipes)
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipeData)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    setFilteredRecipes(recipeData)
  }, [recipeData])

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const onchangeHandler = (val: string) => {
    setSearchValue(val)
    if (val === '') {
      setOpen(false)
      setFilteredRecipes(recipeData)
      return
    }

    const updatedData = recipeData.filter((r) =>
      r.title?.toLowerCase().includes(val.toLowerCase())
    )
    setFilteredRecipes(updatedData)
    setOpen(true)
  }

  const handleClick = (r: Recipe) => {
    if (origin === 'home') {
      navigate(`/recipe/${r.id}`)
    } else if (setSelectedMeal) {
      setSelectedMeal(r)
      setSearchValue(r.title)
      setOpen(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-4">
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
          <div
            ref={ref}
            className="max-w-7xl absolute bg-white rounded-b-lg shadow-lg w-full p-2 z-50"
          >
            <ScrollArea className="max-h-[400px] overflow-y-scroll w-full rounded-md">
              {filteredRecipes.map((r) => {
                return (
                  <div
                    key={r.id}
                    className="rounded-md p-4 flex items-center gap-2 mb-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleClick(r)}
                  >
                    <div></div>
                    <Avatar>
                      <AvatarImage src={r.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p>{r.title}</p>
                      <p className="text-gray-400">{}</p>
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
function setSelectedMeal(r: Recipe) {
  throw new Error('Function not implemented.')
}
