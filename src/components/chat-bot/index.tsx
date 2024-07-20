import Chatbot from 'react-chatbot-kit'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import { config, loadMessages, saveMessages } from '@/utility/chat-bot'
import './index.css'
import 'react-chatbot-kit/build/main.css'

const ChatBot = () => {
  return (
    <div style={{ position: 'absolute', right: '0', bottom: '0px' }}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        saveMessages={saveMessages}
        messageHistory={loadMessages()}
        headerText="Topa"
      />
    </div>
  )
}

export default ChatBot
