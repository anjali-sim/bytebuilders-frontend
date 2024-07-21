import axios from 'axios'

const GenerateChatFromContext = async (messageHistory: any[]) => {
  try {
    console.log({ messageHistory })

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/chat`,
      {
        messageHistory
      }
    )
    return response.data
  } catch (error) {
    console.log('api chat error')
    return 'Please '
  }
}

export { GenerateChatFromContext }
