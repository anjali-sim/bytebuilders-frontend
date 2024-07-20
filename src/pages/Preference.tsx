import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
// import { useAppDispatch } from '@/store'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const options = {
  diet: ['Keto', 'Vegan', 'Vegetarian', 'Paleo', 'Mediterranean'],
  allergies: ['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy'],
  flavors: ['Sweet', 'Savory', 'Spicy', 'Sour', 'Bitter'],
  cuisines: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
  cookingTime: ['< 30 minutes', '30-60 minutes', '> 60 minutes'],
  meals: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
}

function Preferences() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const [preferences, setPreferences] = useState({
    diet: [] as string[],
    allergies: [] as string[],
    flavors: [] as string[],
    cuisines: [] as string[],
    cookingTime: [] as string[],
    meals: [] as string[]
  })


  const handleOptionClick = (
    category: keyof typeof preferences,
    option: string
  ) => {
    setPreferences((prevPreferences) => {
      const currentOptions = prevPreferences[category]
      if (currentOptions.includes(option)) {
        return {
          ...prevPreferences,
          [category]: currentOptions.filter((item) => item !== option)
        }
      } else {
        return {
          ...prevPreferences,
          [category]: [...currentOptions, option]
        }
      }
    })
  }

  const handleSkip = () => {
    navigate("/home")
  }

  const handleSubmit = () => {
    toast.success("User Preferences saved successfully!", {
      style: { backgroundColor: 'green', color: 'white' }
    })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-8 w-full max-w-3xl space-y-8">
        <CardTitle className="text-2xl font-bold mb-4 text-center">
          Preferences
        </CardTitle>

        <div>
          <CardDescription className="text-lg font-semibold mb-2">
            Are you following any specific diet?
          </CardDescription>
          <div className="space-x-2 flex flex-wrap">
            {options.diet.map((option) => (
              <Button
                key={option}
                variant={
                  preferences.diet.includes(option) ? 'solid' : 'outline'
                }
                className={`m-1 ${preferences.diet.includes(option) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('diet', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <CardDescription className="text-lg font-semibold mb-2">
            Do you have any food allergies?
          </CardDescription>
          <div className="space-x-2 flex flex-wrap">
            {options.allergies.map((option) => (
              <Button
                key={option}
                variant={
                  preferences.allergies.includes(option) ? 'solid' : 'outline'
                }
                className={`m-1 ${preferences.allergies.includes(option) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('allergies', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <CardDescription className="text-lg font-semibold mb-2">
            What kind of flavor are you into?
          </CardDescription>
          <div className="space-x-2 flex flex-wrap">
            {options.flavors.map((option) => (
              <Button
                key={option}
                variant={
                  preferences.flavors.includes(option) ? 'solid' : 'outline'
                }
                className={`m-1 ${preferences.flavors.includes(option) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('flavors', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <CardDescription className="text-lg font-semibold mb-2">
            What cuisines do you enjoy the most?
          </CardDescription>
          <div className="space-x-2 flex flex-wrap">
            {options.cuisines.map((option) => (
              <Button
                key={option}
                variant={
                  preferences.cuisines.includes(option) ? 'solid' : 'outline'
                }
                className={`m-1 ${preferences.cuisines.includes(option) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('cuisines', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <CardDescription className="text-lg font-semibold mb-2">
            How much time do you usually have for cooking?
          </CardDescription>
          <div className="space-x-2 flex flex-wrap">
            {options.cookingTime.map((option) => (
              <Button
                key={option}
                variant={
                  preferences.cookingTime.includes(option) ? 'solid' : 'outline'
                }
                className={`m-1 ${preferences.cookingTime.includes(option) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('cookingTime', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <CardDescription className="text-lg font-semibold mb-2">
            What kind of meal are you looking for?
          </CardDescription>
          <div className="space-x-2 flex flex-wrap">
            {options.meals.map((option) => (
              <Button
                key={option}
                variant={
                  preferences.meals.includes(option) ? 'solid' : 'outline'
                }
                className={`m-1 ${preferences.meals.includes(option) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('meals', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={handleSkip}>Skip</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Card>
    </div>
  )
}

export default Preferences
