import botIcon from '@/assets/images/chat-bot.png'

const CustomBotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div className="react-chatbot-kit-chat-bot-avatar-container rounded-full">
        <img src={botIcon} alt="" className="rounded-full" />
      </div>
    </div>
  )
}

export default CustomBotAvatar
