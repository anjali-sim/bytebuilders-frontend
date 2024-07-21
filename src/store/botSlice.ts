import { CreateMessageType, InitialMessages } from '@/utility/chat-bot'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BotState {
  isModalOpen: boolean
  messages: any
  currentRecipe: { id: number; recipe: string }
}

const localStateMessages = localStorage.getItem('chat_messages')

const initialState: BotState = {
  isModalOpen: false,
  messages: localStateMessages
    ? JSON.parse(localStateMessages)
    : InitialMessages,
  currentRecipe: { id: 0, recipe: '' }
}

const botSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<any>) => {
      state.messages = [...state.messages, action.payload]
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    createNewChat: (state, action: PayloadAction<CreateMessageType>) => {
      localStorage.setItem('chat_messages', JSON.stringify([action.payload]))
      if (action.payload.message.includes('recipeId')) {
        const recipeId = action.payload.message.split('_')[1]
        state.currentRecipe = { id: Number(recipeId), recipe: '' }
      }
      state.messages = [action.payload]
      state.isModalOpen = true
    },
    setCurrentRecipe: (
      state,
      action: PayloadAction<{ id: number; recipe: '' }>
    ) => {
      const { id, recipe } = action.payload
      state.currentRecipe = { id, recipe }
    }
  }
})

export const { setIsModalOpen, setMessage, createNewChat } = botSlice.actions
export default botSlice.reducer
