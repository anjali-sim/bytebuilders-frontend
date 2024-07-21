import Chatbot from 'react-chatbot-kit'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import { config, isValidMessage, loadMessages } from '@/utility/chat-bot'
import './index.css'
import 'react-chatbot-kit/build/main.css'
import ChatBotImage from '../../assets/images/chat-bot.png'
import { useAppDispatch, useAppSelector } from '@/store'
import { setIsModalOpen } from '@/store/botSlice'

const ChatBot = () => {
  const { messages, isModalOpen } = useAppSelector((state) => ({
    messages: state.bot.messages,
    isModalOpen: state.bot.isModalOpen
  }))
  const dispatch = useAppDispatch()

  return (
    <div className="fixed right-4 bottom-4">
      {isModalOpen && (
        <div className="shadow-2xl">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={loadMessages()}
            headerText="DeliCook Remix"
            validator={isValidMessage}
            placeholderText="Search you favourable tests"
          />
        </div>
      )}
      <div className="flex w-full justify-end mt-3 bg-transparent">
        <img
          src={ChatBotImage}
          alt="F"
          width="60px"
          height="60px"
          className="rounded-full hover:cursor-pointer shadow-2xl shadow-primary"
          onClick={async () => await dispatch(setIsModalOpen(!isModalOpen))}
        />
      </div>
    </div>
  )
}

export default ChatBot
