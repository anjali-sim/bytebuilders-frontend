import { recipes } from '@/data'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'

const SearchBar = () => {
  const [serachValue, setSearchValue] = useState('')
  const [filterValue, setFilterData] = useState('')
  const [open, setOpen] = useState(false)

  const onchangeHandler = (val: string) => {
    console.log(val)

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
          placeholder="Search by Recipe Title, Ingredients, or Cuisine ..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          value={serachValue}
          onChange={(e) => onchangeHandler(e.target.value)}
        />
        {open && (
          <div className="max-w-7xl absolute bg-white rounded-b-lg shadow-lg w-full p-2">
            <ScrollArea className="h-[400px] w-full rounded-md space-y-2">
              {recipes.map((r) => {
                return (
                  <div
                    key={r.id}
                    className="border border-gray-300 rounded-md p-4"
                  >
                    <img src={r.image} alt="" />
                    <p>{r.title}</p>
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
