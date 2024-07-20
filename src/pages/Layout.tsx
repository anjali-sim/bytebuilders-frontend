import ChatBot from '@/components/chat-bot'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div>
      <h1>Protected Area</h1>
      <ChatBot />
      <Outlet />
    </div>
  )
}

export default Layout
