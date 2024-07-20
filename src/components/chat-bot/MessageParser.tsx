// in MessageParser.jsx

import { saveMessages } from '@/utility/chat-bot'
import React from 'react'
import { createCustomMessage } from 'react-chatbot-kit'

const MessageParser = ({ children, actions }: any) => {
  const parse = async (message: any) => {
    const customUserMessage = createCustomMessage(message, 'user', {})
    saveMessages(customUserMessage)
    return actions.createBotMsg(customUserMessage)
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions
        })
      })}
    </div>
  )
}

export default MessageParser
