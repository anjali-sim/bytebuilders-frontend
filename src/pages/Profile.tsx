import { CardTitle, Card, CardDescription } from '@/components/ui/card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FaClock, FaFire } from 'react-icons/fa6'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from 'react'
import { editPreferences } from '@/store/userSlice'

const recipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    readyInMinutes: 30,
    servings: 4,
    calories: 600.5,
    image: 'https://example.com/images/spaghetti.jpg',
    imageType: 'jpg',
    cuisines: ['Italian'],
    dishTypes: ['Main Course'],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    veryPopular: true,
    sustainable: false,
    meta: {
      aggregateLikes: 150,
      instructions:
        'Cook spaghetti. Fry bacon. Mix eggs and cheese. Combine all.',
      analyzedInstructions:
        'Step 1: Cook spaghetti. Step 2: Fry bacon. Step 3: Mix eggs and cheese. Step 4: Combine all.',
      healthScore: 50,
      preparationMinutes: 10,
      cookingMinutes: 20,
      diets: ['Ketogenic'],
      occasions: ['Dinner'],
      extendedIngredients: 'Spaghetti, Bacon, Eggs, Cheese, Salt, Pepper'
    }
  },
  {
    id: 2,
    title: 'Vegetable Stir Fry',
    readyInMinutes: 20,
    servings: 2,
    calories: 250.0,
    image: 'https://example.com/images/stir_fry.jpg',
    imageType: 'jpg',
    cuisines: ['Chinese'],
    dishTypes: ['Main Course'],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    veryHealthy: true,
    veryPopular: false,
    sustainable: true,
    meta: {
      aggregateLikes: 200,
      instructions: 'Chop vegetables. Stir fry with sauce.',
      analyzedInstructions:
        'Step 1: Chop vegetables. Step 2: Stir fry with sauce.',
      healthScore: 80,
      preparationMinutes: 10,
      cookingMinutes: 10,
      diets: ['Vegan', 'Gluten Free'],
      occasions: ['Lunch'],
      extendedIngredients: 'Carrots, Bell Peppers, Soy Sauce, Garlic, Ginger'
    }
  }
]

const dummyPreferences = [
  { title: 'Diet', description: 'Your dietary preferences.' },
  { title: 'Food Allergies', description: 'Any food allergies you have.' },
  { title: 'Flavor Preferences', description: 'Your favorite flavors.' },
  { title: 'Favorite Cuisines', description: 'The cuisines you prefer.' },
  { title: 'Cooking Time', description: 'Preferred cooking times.' },
  { title: 'Meal Types', description: 'Types of meals you enjoy.' }
]

const options = {
  diet: ['Ketogenic', 'Vegan', 'Vegetarian', 'Lacto-Vegetarian', 'Gluten Free'],
  allergies: ['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy'],
  cuisines: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'Thai']
}

const Profile = () => {
  const { username, email } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [preferences, setPreferences] = useState({
    diet: [] as string[],
    allergies: [] as string[],
    cuisines: [] as string[]
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

  const handleEdit = async () => {
    try {
      await dispatch(editPreferences(preferences)).unwrap()
      toast.success('Preferences updated successfully!', {
        style: { backgroundColor: 'green', color: 'white' }
      })
    } catch (error) {
      toast.error('Failed to update preferences. Please try again.', {
        style: { backgroundColor: 'red', color: 'white' }
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 mt-4 w-full space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="bg-primary text-white p-4 rounded-lg">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold mb-1">Jhon Dow {username}</h1>
            <p className="font-base  mb-2">jhonedoe@gmail.com {email}</p>
          </div>
        </div>

        <Tabs defaultValue="userPreferences ">
          <TabsList className="grid  grid-cols-2 w-[300px]">
            <TabsTrigger value="userPreferences">User Preferences</TabsTrigger>
            <TabsTrigger value="bookmark">Bookmark</TabsTrigger>
          </TabsList>
          <TabsContent value="userPreferences">
            <Card className="p-3">
              <ul className="space-y-4">
                <div className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Your Preferences</DialogTitle>
                        <DialogDescription>
                          Make changes to your preferences here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>

                      <div>
                        <CardDescription className="text-md font-semibold mb-2">
                          Are you following any specific diet?
                        </CardDescription>
                        <div className="space-x-2 flex flex-wrap">
                          {options.diet.map((option) => (
                            <Button
                              key={option}
                              variant={
                                preferences.diet.includes(option)
                                  ? 'solid'
                                  : 'outline'
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
                        <CardDescription className="text-md font-semibold mb-2">
                          Do you have any food allergies?
                        </CardDescription>
                        <div className="space-x-2 flex flex-wrap">
                          {options.allergies.map((option) => (
                            <Button
                              key={option}
                              variant={
                                preferences.allergies.includes(option)
                                  ? 'solid'
                                  : 'outline'
                              }
                              className={`m-1 ${preferences.allergies.includes(option) ? 'bg-primary text-white' : ''}`}
                              onClick={() =>
                                handleOptionClick('allergies', option)
                              }
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <CardDescription className="text-md font-semibold mb-2">
                          What cuisines do you enjoy the most?
                        </CardDescription>
                        <div className="space-x-2 flex flex-wrap">
                          {options.cuisines.map((option) => (
                            <Button
                              key={option}
                              variant={
                                preferences.cuisines.includes(option)
                                  ? 'solid'
                                  : 'outline'
                              }
                              className={`m-1 ${preferences.cuisines.includes(option) ? 'bg-primary text-white' : ''}`}
                              onClick={() =>
                                handleOptionClick('cuisines', option)
                              }
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleEdit}>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                {dummyPreferences.map((preference, index) => (
                  <li key={index}>
                    <CardTitle>{preference.title}</CardTitle>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
          <TabsContent value="bookmark">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="w-full">
                  <img
                    className="w-full h-48 object-cover rounded-t-md"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 cursor-pointer">
                      {recipe.title}
                    </div>
                    <div className="flex gap-4 items-center text-sm mb-4">
                      <div className="flex items-center text-gray-400">
                        <FaClock className="mr-1" />
                        <span>{recipe.readyInMinutes} Minutes</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <FaFire className="mr-1" />
                        <span>{recipe.calories} Calories</span>
                      </div>
                    </div>
                    <Button
                      className="rounded-full w-full"
                      variant="outline"
                      // onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      View Recipe
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Card className="w-[300px]"></Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
