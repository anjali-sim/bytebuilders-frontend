import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
