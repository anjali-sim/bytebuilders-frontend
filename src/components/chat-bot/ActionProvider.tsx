// in ActionProvider.jsx
import { recipes } from '@/data'
import { useAppDispatch, useAppSelector } from '@/store'
import { CreateMessageType, saveMessages } from '@/utility/chat-bot'
import { GenerateChatFromContext } from '@/utility/chat-bot-helper'
import React from 'react'
import { createClientMessage } from 'react-chatbot-kit'

const createMessageHistory = (state: any[]) => {
  const promptState = [
    {
      role: 'user',
      content:
        'You are a recipe recommendation assistant. Your goal is to provide users with the best recipe suggestions based on their input. Please ensure that all user queries are related to food, recipes, ingredients, meal planning, and dietary preferences. display this message if user not enter proper message regarding category, Please enter a query related to food, recipes, ingredients.'
    }
  ]
  state.map((messageObj) => {
    promptState.push({
      role: messageObj.type === 'bot' ? 'system' : 'user',
      content: messageObj.message
    })
  })
  return promptState
}

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
  state
}: any) => {
  const { messages, isModalOpen, currentRecipe } = useAppSelector((state) => ({
    messages: state.bot.messages,
    isModalOpen: state.bot.isModalOpen,
    currentRecipe: state.bot.currentRecipe
  }))
  const dispatch = useAppDispatch()

  const createBotMsg = async (customMessage: CreateMessageType) => {
    const messageHistory = createMessageHistory([
      ...state.messages,
      customMessage
    ])

    const chatRespone = await GenerateChatFromContext(messageHistory)

    const botMessage = createChatBotMessage(chatRespone)
    saveMessages(botMessage)
    setState((prev: any) => {
      return {
        ...prev,
        messages: [...prev.messages, botMessage]
      }
    })
  }

  // const GetIngridients = async (message: any) => {}

  const GetIngrediantsSubstitudes = async () => {
    const messageHistory = createMessageHistory([
      ...state.messages,
      createClientMessage(
        `give me ingredients substitudes of these recipe ${
          recipes[currentRecipe.id].meta.extendedIngredients // for single api use direct
        }`,
        {}
      )
    ])
    const ingredientsSubstitudes = await GenerateChatFromContext(messageHistory)
    const botMessage = createChatBotMessage(ingredientsSubstitudes)
    saveMessages(botMessage)
    setState((prev: any) => {
      return {
        ...prev,
        messages: [...prev.messages, botMessage]
      }
    })
  }

  const HandleRecipeSuggestions = (customMessage: CreateMessageType) => {
    setState((prev: any) => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          createChatBotMessage(
            "As of now, our chatbot doesn't support new recipes. You can search for any recipe from our available options and ask questions about that particular recipe."
          )
        ]
      }
    })
  }

  const handleGetIngridients = (customMessage: CreateMessageType) => {
    setState((prev: any) => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          createChatBotMessage(
            "As of now, our chatbot doesn't support new recipes. You can search for any recipe from our available options and ask questions about that particular recipe."
          )
        ]
      }
    })
  }

  const handleNutristionalInformation = (customMessage: CreateMessageType) => {
    setState((prev: any) => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          createChatBotMessage(
            "As of now, our chatbot doesn't support new recipes. You can search for any recipe from our available options and ask questions about that particular recipe."
          )
        ]
      }
    })
  }

  const handleCookingTips = (customMessage: CreateMessageType) => {
    setState((prev: any) => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          createChatBotMessage(
            "As of now, our chatbot doesn't support new recipes. You can search for any recipe from our available options and ask questions about that particular recipe."
          )
        ]
      }
    })
  }

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            createBotMsg,
            GetIngrediantsSubstitudes,
            HandleRecipeSuggestions,
            handleCookingTips
          }
        })
      })}
    </div>
  )
}

export default ActionProvider
