import { Link } from 'react-router-dom'
import gifImage from '@/assets/images/page-not-found.gif'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Nothing to see here!</h2>
      <img src={gifImage} alt="Not Found" width={150}  height={150} className="w-48 h-48" />
      <p>
        <Link to="/">Go to the <span className='text-primary'>home</span> page</Link>
      </p>
    </div>
  )
}

export default NotFound
