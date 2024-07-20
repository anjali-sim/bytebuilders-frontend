import Chatbot from 'react-chatbot-kit'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import { config, isValidMessage, loadMessages } from '@/utility/chat-bot'
import './index.css'
import 'react-chatbot-kit/build/main.css'
import { useState } from 'react'
import ChatBotImage from '../../assets/images/chat-bot.png'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4">
      {isOpen && (
        <div className="shadow-2xl">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={loadMessages()}
            headerText="Recipe Remix"
            validator={isValidMessage}
          />
        </div>
      )}
      <div className="flex w-full justify-end mt-3">
        <img
          src={ChatBotImage}
          alt="F"
          width="60px"
          height="60px"
          className="rounded-full hover:cursor-pointer shadow-2xl shadow-primary"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </div>
  )
}

export default ChatBot
