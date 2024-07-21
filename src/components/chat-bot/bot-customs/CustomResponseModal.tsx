import RecipeCard from '@/components/RecipeCard'
import { recipes } from '@/data'
import React from 'react'
import { JSX } from 'react/jsx-runtime'

const parseResponse = (response: any) => {
  // Split the response by lines
  const lines = response.split('\n')

  // Define regular expressions to identify different sections
  const headerRegex = /^###?\s*(.+)/
  const listItemRegex = /^-\s*(.+)/
  const instructionStepRegex = /^\d+\.\s*\*\*(.+?)\*\*(.*)/
  const paragraphRegex = /^(.+)/

  const parsedContent: JSX.Element[] = []
  let currentList: any = null
  let currentInstructions: any = null

  lines.forEach((line: any) => {
    let match

    // Match headers
    if ((match = line.match(headerRegex))) {
      parsedContent.push(<h2>{match[1]}</h2>)
      currentList = null
      currentInstructions = null
    }
    // Match list items
    else if ((match = line.match(listItemRegex))) {
      if (!currentList) {
        currentList = []
        parsedContent.push(<ul>{currentList}</ul>)
      }
      currentList.push(<li>{match[1]}</li>)
    }
    // Match instruction steps
    else if ((match = line.match(instructionStepRegex))) {
      if (!currentInstructions) {
        currentInstructions = []
        parsedContent.push(<ol>{currentInstructions}</ol>)
      }
      currentInstructions.push(
        <li>
          <strong>{match[1]}</strong>
          {match[2]}
        </li>
      )
    }
    // Match paragraphs
    else if ((match = line.match(paragraphRegex))) {
      parsedContent.push(<p>{match[1]}</p>)
      currentList = null
      currentInstructions = null
    }
  })

  return parsedContent
}

const RenderedBotContent = ({ content }: { content: any }) => {
  const isRecipe = content.includes('recipeId')
  const recipeId = isRecipe ? content.slice('_')[1] : undefined

  return isRecipe && recipeId ? (
    <RecipeCard recipe={recipes[recipeId]} />
  ) : (
    <div className="react-chatbot-kit-chat-bot-message bg-[#F97316] ">
      <span className="flex flex-col gap-2">
        {parseResponse(content).map((element, index) => {
          const { type, props } = element
          return React.createElement(type, { key: index, ...props })
        })}
      </span>
      <div className="react-chatbot-kit-chat-bot-message-arrow border-r-[#F97316] border-r-8 border-solid border-b-4 border-t-4"></div>
    </div>
  )
}

const RenderedClientContent = ({ content }: { content: any }) => {
  const isRecipe = content.includes('recipeId')
  const recipeId = isRecipe ? content.split('_')[1] : undefined

  console.log({ isRecipe, recipeId, content })

  return isRecipe && recipeId ? (
    <RecipeCard recipe={recipes[recipeId]} />
  ) : (
    <div className="react-chatbot-kit-user-chat-message">
      {content}
      <div className="react-chatbot-kit-user-chat-message-arrow"></div>
    </div>
  )
}

export { parseResponse, RenderedBotContent, RenderedClientContent }
