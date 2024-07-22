// in MessageParser.jsx

import { saveMessages } from '@/utility/chat-bot'
import React, { useEffect, useState } from 'react'
import { createClientMessage, createCustomMessage } from 'react-chatbot-kit'

const MessageParser = ({ children, actions, ...extraData }: any) => {
  const parse = async (message: any) => {
    if (message.includes('give me recipe')) {
      return actions.HandleRecipeSuggestions()
    }
    const customUserMessage = createClientMessage(message, {
      widget: 'dogPicture'
    })
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
