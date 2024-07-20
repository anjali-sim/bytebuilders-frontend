import { useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import SearchBar from './SearchBar'

const AddMealModal = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const timeSlots = ['Breakfast', 'Lunch', 'Snacks', 'Dinner']

  const handleMealSlote = () => {
    const obj = {
      date: date,
      slote: selectedSlot,
      recipe: {}
    }
  }

  return (
    <div className="p-4">
      <div>
        <label
          htmlFor="searchRecipe"
          className="block text-sm font-medium text-gray-700"
        >
          Search Recipe
        </label>
        <SearchBar />
      </div>
      <div className="mb-4">
        <label
          htmlFor="searchRecipe"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Choose Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[240px] justify-start text-left font-normal ',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Choose Time Slot
        </label>
        <div className="mt-2 flex flex-wrap">
          {timeSlots.map((slot) => (
            <Button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`mr-2 mb-2 px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition ${
                selectedSlot === slot
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
              }`}
            >
              {slot}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Add</Button>
      </div>
    </div>
  )
}

export default AddMealModal
