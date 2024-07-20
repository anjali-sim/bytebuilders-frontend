import { recipes } from '@/data'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const SearchBar = () => {
  const [serachValue, setSearchValue] = useState('')
  const [filterValue, setFilterData] = useState('')
  const [open, setOpen] = useState(false)

  const onchangeHandler = (val: string) => {
    if (val === '') {
      setSearchValue('')
      setOpen(false)
      return
    }
    setOpen(true)
    setSearchValue(val)
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
          value={serachValue}
          onChange={(e) => onchangeHandler(e.target.value)}
        />
        {open && (
          <div className="max-w-7xl absolute bg-white rounded-b-lg shadow-lg w-full p-2">
            <ScrollArea className="h-[400px] w-full rounded-md">
              {recipes.map((r) => {
                return (
                  <div
                    key={r.id}
                    className="rounded-md p-4 flex items-center gap-2 mb-2 hover:bg-accent"
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
