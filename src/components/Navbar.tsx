import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="bg-white shadow-lg sticky w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-primary">DeliCook</span>
          </div>

          {/* Right side navigation links and profile avatar */}
          <div className="flex sm:ml-6 sm:flex sm:space-x-4 items-center">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 ">
              <Link
                to="/"
                className={clsx(
                  'inline-flex items-center px-2 pt-1 text-sm font-medium text-black hover:text-primary',
                  pathname === '/' && 'text-primary'
                )}
              >
                Recipe Recommendation
              </Link>
              <Link
                to="/meal-plan"
                className={clsx(
                  'inline-flex items-center px-2 pt-1 text-sm font-medium text-black hover:text-primary',
                  pathname === '/meal-plan' && 'text-primary'
                )}
              >
                Meal Planner
              </Link>
              <Link
                to="/shopping-list"
                className={clsx(
                  'inline-flex items-center px-2 pt-1 text-sm font-medium text-black hover:text-primary',
                  pathname === '/shopping-list' && 'text-primary'
                )}
              >
                Shopping List
              </Link>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <button
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User profile"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <div className="flex flex-col md:hidden">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={'/'}>Recipe Recommendation</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={'/meal-plan'}>Meal Planner</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={'/shopping-list'}>Shopping List</Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
