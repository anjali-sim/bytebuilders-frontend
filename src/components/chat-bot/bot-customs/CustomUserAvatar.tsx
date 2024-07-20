import botIcon from '@/assets/images/chat-bot.png'

const CustomUserAvatar = () => {
  return (
    <div className="react-chatbot-kit-user-avatar">
      <div className="react-chatbot-kit-user-avatar-container rounded-full">
        <img src={botIcon} alt="" className="rounded-full" />
      </div>
    </div>
  )
}

export default CustomUserAvatar
