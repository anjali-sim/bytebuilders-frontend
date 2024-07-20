import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppDispatch } from '@/store'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { addPreferences } from '@/store/userSlice'

const options = {
  diet: ['Ketogenic', 'Vegan', 'Vegetarian', 'Lacto-Vegetarian', 'Gluten Free'],
  allergies: ['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy'],
  cuisines: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'Thai']
}

function Preferences() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [preferences, setPreferences] = useState({
    diet: [] as string[],
    allergies: [] as string[],
    cuisines: [] as string[]
  })

  const handleOptionClick = (
    category: keyof typeof preferences,
    // option: string
    index: number
  ) => {
    setPreferences((prevPreferences) => {
      const currentOptions = prevPreferences[category]
      if (currentOptions.includes(index)) {
        return {
          ...prevPreferences,
          [category]: currentOptions.filter((item) => item !== index)
        }
      } else {
        return {
          ...prevPreferences,
          [category]: [...currentOptions, index]
        }
      }
    })
  }

  const handleSubmit = async () => {
    try {
      await dispatch(addPreferences(preferences)).unwrap()
      toast.success('User Preferences saved successfully!', {
        style: { backgroundColor: 'green', color: 'white' }
      })
      navigate('/')
    } catch (error) {
      toast.error('Failed to save preferences. Please try again.', {
        style: { backgroundColor: 'red', color: 'white' }
      })
    }
  }

  const handleSkip = () => {
    navigate('/home')
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-8 w-full max-w-3xl space-y-8 m-4">
        <CardTitle className="text-2xl font-bold mb-4 text-center">
          Preferences
        </CardTitle>

        <div>
          <CardDescription className="text-lg font-semibold mb-2">
            Are you following any specific diet?
          </CardDescription>
          <div className="space-x-2 flex flex-wrap">
            {options.diet.map((option, index) => (
              <Button
                key={index}
                variant={
                  preferences.diet.includes(index + 1) ? 'solid' : 'outline'
                }
                className={`m-1 ${preferences.diet.includes(index + 1) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('diet', index + 1)}
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
            {options.allergies.map((option, index) => (
              <Button
                key={index}
                variant={
                  preferences.allergies.includes(index + 1)
                    ? 'solid'
                    : 'outline'
                }
                className={`m-1 ${preferences.allergies.includes(index + 1) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('allergies', index + 1)}
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
            {options.cuisines.map((option, index) => (
              <Button
                key={index}
                variant={
                  preferences.cuisines.includes(index + 1) ? 'solid' : 'outline'
                }
                className={`m-1 ${preferences.cuisines.includes(index + 1) ? 'bg-primary text-white' : ''}`}
                onClick={() => handleOptionClick('cuisines', index + 1)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={handleSkip}>
            Skip
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Card>
    </div>
  )
}

export default Preferences
