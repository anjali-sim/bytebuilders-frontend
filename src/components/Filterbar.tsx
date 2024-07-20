import React, { useState } from 'react'
import { FaFilter } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'

type FilterOptions = {
  diet: string[]
  allergies: string[]
  cuisines: string[]
}

type FiltersState = {
  [key in keyof FilterOptions]: string[]
}

export const Filterbar: React.FC = () => {
  const location = useLocation()
  const queryparams = new URLSearchParams(location.search)

  const options: FilterOptions = {
    diet: [
      'Ketogenic',
      'Vegan',
      'Vegetarian',
      'Lacto-Vegetarian',
      'Gluten Free'
    ],
    allergies: ['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy'],
    cuisines: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'Thai']
  }

  const [filters, setFilters] = useState<FiltersState>({
    diet: [],
    allergies: [],
    cuisines: []
  })

  const handleCheckboxChange = (
    category: keyof FilterOptions,
    option: string
  ) => {
    setFilters((prevFilters) => {
      const isChecked = prevFilters[category].includes(option)
      if (isChecked) {
        return {
          ...prevFilters,
          [category]: prevFilters[category].filter((item) => item !== option)
        }
      } else {
        return {
          ...prevFilters,
          [category]: [...prevFilters[category], option]
        }
      }
    })
  }

  return (
    <div className="w-1/4 shadow-md bg-white rounded-lg p-4 h-full">
      <div className="flex gap-2 text-gray-400 items-center mb-2">
        <FaFilter />
        <h1 className="text-lg">Filter</h1>
      </div>
      <div className="relative w-full sm:w-auto flex-shrink-0 sm:flex-grow-0">
        {Object.keys(options).map((category) => (
          <div key={category}>
            <label
              htmlFor={category}
              className="block text-sm font-medium text-primary mb-1"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
            <div className="flex flex-wrap">
              {options[category as keyof FilterOptions].map((option, index) => (
                <label
                  key={index}
                  className="inline-flex items-center mr-4 mb-2"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox text-primary focus:ring-primary"
                    checked={filters[category as keyof FilterOptions].includes(
                      option
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        category as keyof FilterOptions,
                        option
                      )
                    }
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filterbar
