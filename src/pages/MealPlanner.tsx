import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import AddMealModal from '@/components/AddMealForm'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { BsDashSquareDotted } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchMealPlanData } from '@/store/recipeSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { days } from '@/types'
import { toast } from 'sonner'

import Loading from '@/components/Loading'

const MealPlanner = () => {
  const mealData = useAppSelector((state) => state.recipe.mealplan)
  const isLoad = useAppSelector((state) => state.recipe.isLoading)
  const dispatch = useAppDispatch()
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek())

  function getCurrentWeek() {
    const now = new Date()
    const monday = new Date(now.setDate(now.getDate() - now.getDay() + 1))
    const sunday = new Date(monday)
    sunday.setDate(sunday.getDate() + 6)
    console.log(monday, sunday)

    return { monday, sunday }
  }

  const getNextWeek = () => {
    setCurrentWeek((prev) => {
      const nextMonday = new Date(prev.monday)
      nextMonday.setDate(nextMonday.getDate() + 7)
      const nextSunday = new Date(nextMonday)
      nextSunday.setDate(nextSunday.getDate() + 6)
      return { monday: nextMonday, sunday: nextSunday }
    })
  }

  const getPrevWeek = () => {
    setCurrentWeek((prev) => {
      const prevMonday = new Date(prev.monday)
      prevMonday.setDate(prevMonday.getDate() - 7)
      const prevSunday = new Date(prevMonday)
      prevSunday.setDate(prevSunday.getDate() + 6)
      return { monday: prevMonday, sunday: prevSunday }
    })
  }

  const handleDeleteMeal = () => {
    return true
  }

  const handleShoppingList = () => {
    toast.success(`Shopping List Genrated Successfully`, {
      style: { backgroundColor: 'green', color: 'white' }
    })
  }

  useEffect(() => {
    dispatch(fetchMealPlanData(currentWeek.monday.toISOString().split('T')[0]))
  }, [currentWeek.monday])

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  return (
    <div className="max-w-7xl mx-auto rounded-lg overflow-hidden my-10 ">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 border-b border-gray-200">
        <div className="flex gap-4 flex-wrap">
          <h2 className="text-lg font-bold text-gray-800">
            Weekly Meal Planner
          </h2>
        </div>
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger className="w-fit px-4 py-2 rounded-sm bg-primary text-sm text-white font-semibold">
              Add Meal
            </DialogTrigger>
            <DialogContent className="m-4">
              <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
                <DialogDescription>
                  Add your favorite meal to your slot of the day
                </DialogDescription>
              </DialogHeader>
              <AddMealModal />
            </DialogContent>
          </Dialog>
          <Button onClick={handleShoppingList}>Generate Shopping List</Button>
        </div>
      </div>
      <div className="p-4 space-x-2">
        <Button variant="outline" onClick={getPrevWeek}>
          Prev
        </Button>
        <Button variant="outline">
          {`${formatDate(currentWeek.monday)} - ${formatDate(
            currentWeek.sunday
          )}`}
        </Button>

        <Button variant="outline" onClick={getNextWeek}>
          Next
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 p-4">
        {!isLoad ? (
          mealData.map((day: any, dayIndex) => {
            const date = new Date(currentWeek.monday)
            date.setDate(date.getDate() + dayIndex)
            return (
              <div
                key={dayIndex}
                className="border rounded-lg shadow-sm bg-gray-50 min-h-[400px]"
              >
                <div
                  className={clsx('bg-gray-200 text-black text-center py-2')}
                >
                  <h3 className="text-md font-semibold">{days[dayIndex]}</h3>
                  <p className="text-gray-500 text-sm">{formatDate(date)}</p>
                </div>
                <div className="p-2 space-y-2">
                  <div className="bg-white border border-dashed border-gray-400 rounded-lg shadow-sm p-2 flex justify-between flex-col">
                    <p className="text-sm text-primary">Breakfast</p>
                    {day.breakfast.map((recipe: any) => (
                      <div className="bg-gray-200 rounded-sm p-2 flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={
                              'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            }
                            sizes="sm"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{recipe.title}</p>
                        <p className="text-sm">{recipe.name}</p>
                        <BsDashSquareDotted
                          className="hover:text-red-500 cursor-pointer"
                          onClick={() => handleDeleteMeal()}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="bg-white border border-dashed border-gray-400 rounded-lg shadow-sm p-2 flex justify-between flex-col  gap-1">
                    <p className="text-sm text-primary">Lunch</p>
                    {day.lunch.map((recipe: any) => (
                      <div className="bg-gray-200 rounded-sm p-2 flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={
                              'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            }
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{recipe.title}</p>
                        <BsDashSquareDotted
                          className="hover:text-red-500 cursor-pointer"
                          onClick={() => handleDeleteMeal()}
                        />
                        <p className="text-sm">{recipe.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white border border-dashed border-gray-400 rounded-lg shadow-sm p-2 flex justify-between flex-col gap-1">
                    <p className="text-sm text-primary">Snacks</p>
                    {day.snacks.map((recipe: any) => (
                      <div className="bg-gray-200 rounded-sm p-2 flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={
                              'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            }
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{recipe.title}</p>
                        <p className="text-sm">{recipe.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white border border-dashed border-gray-400 rounded-lg shadow-sm p-2 flex justify-between flex-col">
                    <p className="text-sm text-primary">Dinner</p>
                    {day.dinner.map((recipe: any) => (
                      <div className="bg-gray-200 rounded-sm p-2 flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={
                              'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            }
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{recipe.title}</p>
                        <BsDashSquareDotted
                          className="hover:text-red-500 cursor-pointer"
                          onClick={() => handleDeleteMeal()}
                        />
                        <p className="text-sm">{recipe.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default MealPlanner
