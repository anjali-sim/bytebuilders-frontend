// in ActionProvider.jsx
import { CreateMessageType, saveMessages } from '@/utility/chat-bot'
import axios from 'axios'
import React from 'react'

const createMessageHistory = (state: any[]) => {
  return state.map((messageObj) => ({
    role: messageObj.type === 'bot' ? 'system' : 'user',
    content: messageObj.message
  }))
}

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
  state
}: any) => {
  const createBotMsg = async (customMessage: CreateMessageType) => {
    const messageHistory = createMessageHistory([
      ...state.messages,
      customMessage
    ])

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/chat`,
      {
        messageHistory: messageHistory
      }
    )

    const botMessage = createChatBotMessage(response.data)
    saveMessages(botMessage)
    setState((prev: any) => {
      return {
        ...prev,
        messages: [...prev.messages, botMessage]
      }
    })
  }

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            createBotMsg
          }
        })
      })}
    </div>
  )
}

export default ActionProvider
