// in ActionProvider.jsx
import React from 'react'

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const createBotMsg = (message: string) => {
    const botMessage = createChatBotMessage(message)

    setState((prev: any) => {
      console.log(prev)

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
