'use client'
import io from 'socket.io-client'
import { SetStateAction, useEffect, useState } from 'react'
import Message from './message'
import Avatar from './avatar'
import moment from 'moment'

const ENDPOINT = 'https://mercado.webapp.ar'
// const ENDPOINT = 'http://localhost:8126'

let socket: any = null

const Chat = ({
  email,
  username,
}: {
  email: string | null
  username: string | null
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      socket = io(ENDPOINT, {
        transports: ['websocket'],
      })
    }
  }, [])

  const [user, setUser] = useState(
    username ? username : email ? email : 'invitado',
  )
  const [usersList, setUsersList] = useState([])
  const [isRoomSelected, setIsRoomSelected] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])

  async function joinRoom() {
    if (socket?.connected === false)
      socket = io(ENDPOINT, {
        transports: ['websocket'],
      })
    if (user !== '') {
      const currentTime = moment().format('HH:mm:ss')
      const m = {
        room: 100,
        author: user,
        message: 'joined room',
        time: currentTime,
      }
      if (socket?.connected !== false) {
        socket.emit('join_room', m)
        setIsRoomSelected(true)
      }
    }
  }

  async function leftRoom() {
    const currentTime = moment().format('HH:mm:ss')
    const m = {
      room: 100,
      author: user,
      message: 'left room',
      time: currentTime,
    }
    socket.close()
    setIsRoomSelected(false)
    setChatMessages([])
    setUsersList([])
  }

  const sendNewMessage = async () => {
    const currentTime = moment().format('HH:mm:ss')
    const m = {
      room: 100,
      author: user,
      message: newMessage,
      time: currentTime,
    }
    socket.emit('send_message', m)
    //@ts-ignore
    setChatMessages((oldChatMessages) => [
      ...oldChatMessages,
      { author: user, message: newMessage },
    ])
    setNewMessage('')
  }

  useEffect(() => {
    const handleMessage = (data: { author: any; message: any }) => {
      console.log(data)
      //@ts-ignore
      setChatMessages((oldChatMessages) => [
        ...oldChatMessages,
        { author: data.author, message: data.message },
      ])
    }

    const handleRoomJoin = (data: { author: any; message: any }) => {
      //@ts-ignore
      setChatMessages((oldChatMessages) => [
        ...oldChatMessages,
        { author: data.author, message: data.message },
      ])
    }

    const handleError = (error: string) => {
      console.log('error: ' + error)
      setIsRoomSelected(false)
    }

    const handleUpdateUsersList = (data: SetStateAction<never[]>) => {
      setUsersList(data)
      if (isRoomSelected === false) setIsRoomSelected(true)
    }

    socket.on('receive_message', handleMessage)
    socket.on('have_joined_room', handleRoomJoin)
    socket.io.on('error', handleError)
    socket.on('update_users_list', handleUpdateUsersList)

    // Función de limpieza para desuscribirse cuando el componente se desmonte
    return () => {
      socket.off('receive_message', handleMessage)
      socket.off('have_joined_room', handleRoomJoin)
      socket.io.off('error', handleError)
      socket.off('update_users_list', handleUpdateUsersList)
    }
  }, [socket])

  console.log(chatMessages)

  return (
    <div className="flex bg-red-100 justify-center items-center ">
      <div className="bg-red-200">
        <Avatar status={socket?.connected} />
        <div className="flex flex-col w-60">
          Users connected:
          {
            <ul className="text-xs">
              {usersList.map((item: any, index) => (
                <li key={index + 100}> {item?.user} </li>
              ))}
            </ul>
          }
        </div>
      </div>
      <div className="bg-base-100 text-base p-2">
        <div>
          <br />
          <label htmlFor="user">
            <input
              className="pl-2"
              autoComplete="off"
              type="text"
              id="user"
              value={user?.toString()}
              placeholder="username"
              onChange={(event) => {
                setUser(event.target.value)
              }}
              disabled={isRoomSelected}
            ></input>
            {isRoomSelected ? (
              <button className="btn" onClick={leftRoom}>
                Desconectarse
              </button>
            ) : (
              <button className="btn m-2" onClick={joinRoom}>
                Join Room 100
              </button>
            )}
          </label>

          <br />
          <div className="flex flex-col">
            {chatMessages.map(
              (m: { author: string; message: string }, index) => {
                return (
                  <Message
                    key={index}
                    author={m?.author}
                    message={m?.message}
                  />
                )
              },
            )}
          </div>

          <div className="flex p-4 bg-base-200">
            <label htmlFor="mensaje" className="px-2">
              Mensaje
              <input
                className="px-2"
                type="text"
                autoComplete="off"
                id="mensaje"
                placeholder="Mensaje..."
                value={newMessage}
                onChange={(event) => {
                  setNewMessage(event.target.value)
                }}
              ></input>
              <button className="btn btn-accent" onClick={sendNewMessage}>
                Enviar
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
