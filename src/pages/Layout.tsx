import Navbar from '@/components/Navbar'
import ChatBot from '@/components/chat-bot'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ChatBot />
    </div>
  )
}

export default Layout
