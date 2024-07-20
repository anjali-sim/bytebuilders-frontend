import { createChatBotMessage } from 'react-chatbot-kit'
import IConfig from 'react-chatbot-kit/build/src/interfaces/IConfig'

const config: IConfig = {
  initialMessages: [],
  customStyles: {
    botMessageBox: { backgroundColor: 'orange' },
    chatButton: { backgroundColor: 'orange' }
  },
  botName: 'Topa',
  state: {
    currentRecipe: [{ id: 0, recipe: '' }]
  }
}

const InitialMessages = [
  createChatBotMessage(`Welcome to Recipe Remix! 🍲✨`, {}),
  createChatBotMessage(
    "Hi there! I'm your culinary assistant, ready to help you discover and customize delicious recipes. What kind of recipe are you in the mood for today? 🥗🍕🍰",
    {}
  )
]

const saveMessages = (message: any): any => {
  let messagesHistory: any = localStorage.getItem('chat_messages')
  const newHistory = [...(messagesHistory ? messagesHistory : []), message]
  console.log(newHistory)

  // localStorage.setItem('chat_messages', JSON.stringify())
}

const loadMessages = () => {
  let messages: any = localStorage.getItem('chat_messages')
  if (messages) {
    messages = JSON.parse(messages)
  } else messages = InitialMessages
  return messages
}

export { config, loadMessages, saveMessages, InitialMessages }
