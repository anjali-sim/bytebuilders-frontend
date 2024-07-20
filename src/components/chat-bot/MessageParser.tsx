// in MessageParser.jsx

import React from 'react'

const MessageParser = ({ children, actions }: any) => {
  const parse = async (message: any) => {
    return actions.createBotMsg(message)
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
