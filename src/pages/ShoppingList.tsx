import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ShoppingList = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="space-y-1 mb-4">
        <h1 className="text-4xl font-semibold">Shopping List</h1>
        <p className="text-gray-500">
          Here We have generated shopping list for you based on your meal plan
        </p>
      </div>
      <div>
        <h3 className="text-xl mb-3">17-07-2024, Monday</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full">
                <Avatar>
                  <AvatarImage
                    src={
                      'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="text-primary">Chicken Rice</p>
                <p className="text-gray-400">200 grams</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full">
                <Avatar>
                  <AvatarImage
                    src={
                      'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="text-primary">Chicken Rice</p>
                <p className="text-gray-400">200 grams</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full">
                <Avatar>
                  <AvatarImage
                    src={
                      'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="text-primary">Chicken Rice</p>
                <p className="text-gray-400">200 grams</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full">
                <Avatar>
                  <AvatarImage
                    src={
                      'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="text-primary">Chicken Rice</p>
                <p className="text-gray-400">200 grams</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full">
                <Avatar>
                  <AvatarImage
                    src={
                      'https://images.unsplash.com/photo-1475856033578-76b4a228f5c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="text-primary">Chicken Rice</p>
                <p className="text-gray-400">200 grams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingList
