import React from 'react'

const Message = ({ message, author }: { message: string; author: string }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-header">
        {author}
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  )
}

export default Message
