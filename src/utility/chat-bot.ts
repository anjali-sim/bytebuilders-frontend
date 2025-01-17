import CustomBotAvatar from '@/components/chat-bot/bot-customs/CustomBotAvatar'
import {
  RenderedBotContent,
  RenderedClientContent
  // RenderedClientContent
} from '@/components/chat-bot/bot-customs/CustomResponseModal'
import CustomUserAvatar from '@/components/chat-bot/bot-customs/CustomUserAvatar'
import Overview from '@/components/chat-bot/bot-customs/Overview'
import { createChatBotMessage } from 'react-chatbot-kit'
import IConfig from 'react-chatbot-kit/build/src/interfaces/IConfig'

const config: IConfig = {
  initialMessages: [],
  customStyles: {
    botMessageBox: { backgroundColor: '#F97316' },
    chatButton: { backgroundColor: '#F97316' }
  },
  botName: 'DeliCook Remix',
  state: {
    currentRecipe: [{ id: 0 }]
  },
  customComponents: {
    botChatMessage(props) {
      return RenderedBotContent({
        content: props.message
      })
    },
    userAvatar: CustomUserAvatar,
    botAvatar: CustomBotAvatar,
    userChatMessage(props) {
      return RenderedClientContent({
        content: props.message
      })
    }
  },
  widgets: [
    {
      widgetName: 'overview',
      widgetFunc: Overview,
      mapStateToProps: ['messages']
    }
  ]
}

const isValidMessage = (message: string) => message !== ''

const InitialMessages = [
  createChatBotMessage(`Welcome to DeliCook Remix! 🍲✨`, {}),
  createChatBotMessage(
    "Hi there! I'm your culinary assistant, ready to help you discover and customize delicious recipes. What kind of recipe are you in the mood for today? 🥗🍕🍰",
    {}
  )
]

type CreateMessageType = {
  loading?: boolean
  widget?: string
  delay?: number
  payload?: any
  message: string
  type: string
  id: number
}

const saveMessages = (message: CreateMessageType): any => {
  let messagesHistory: any = localStorage.getItem('chat_messages')
  const newHistory = [
    ...(messagesHistory ? JSON.parse(messagesHistory) : InitialMessages),
    message
  ]

  localStorage.setItem('chat_messages', JSON.stringify(newHistory))
}

const loadMessages = () => {
  let messages: any = localStorage.getItem('chat_messages')
  if (messages) {
    messages = JSON.parse(messages)
  } else messages = InitialMessages
  return messages
}

export { config, loadMessages, saveMessages, InitialMessages, isValidMessage }
export type { CreateMessageType }
