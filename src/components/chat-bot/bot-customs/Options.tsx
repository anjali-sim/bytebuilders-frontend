const Options = (props: any) => {
  console.log({ props })

  return (
    <div className="options left-auto react-chatbot-kit-user-chat-message-container">
      <div className="options-container flex flex-wrap max-w-[50%] gap-3 ml-2">
        {props.options.map((option: any) => {
          return (
            <div
              className="option-item p-3 border-primary border rounded-2xl cursor-pointer hover:bg-primary bg-opacity-35 text-sm"
              onClick={option.handler}
              key={option.id}
            >
              {option.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Options
