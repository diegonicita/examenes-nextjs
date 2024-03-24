import React from 'react'
import moment from 'moment'

const Message = ({
  user,
  message,
  author,
}: {
  user: string
  message: string
  author: string
}) => {
  const currentTime = moment().format('HH:mm')

  return (
    <>
      {user === author && (
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
            {author} <time className="text-xs opacity-50">{currentTime}</time>
          </div>
          <div className="chat-bubble">{message}</div>
          <div className="chat-footer opacity-50">Enviado</div>
        </div>
      )}
      {user !== author && (
        <div className="chat chat-end">
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
      )}
    </>
  )
}

export default Message
