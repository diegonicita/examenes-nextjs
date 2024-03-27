'use client'
import io from 'socket.io-client'
import { type SetStateAction, useEffect, useState } from 'react'
import Message from './message'
import Avatar from './avatar'
import moment from 'moment'

//const ENDPOINT = 'https://mercado.webapp.ar'
// const ENDPOINT = 'http://localhost:8126'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let socket: any = null

const Chat = ({
  urlChatServer,
  email,
  username,
}: {
  urlChatServer: string
  email: string | null
  username: string | null
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      socket = io(urlChatServer, {
        transports: ['websocket'],
      })
    }
  }, [urlChatServer])

  const [user, setUser] = useState(
    username ? username : email ? email : 'invitado',
  )
  const [usersList, setUsersList] = useState([])
  const [isRoomSelected, setIsRoomSelected] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])

  async function joinRoom() {
    if (socket?.connected === false)
      socket = io(urlChatServer, {
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
        socket?.emit('join_room', m)
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
    socket?.close()
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
    socket?.emit('send_message', m)
    //@ts-ignore
    setChatMessages((oldChatMessages) => [
      ...oldChatMessages,
      { author: user, message: newMessage },
    ])
    setNewMessage('')
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleMessage = (data: { author: any; message: any }) => {
      console.log(data)
      //@ts-ignore
      setChatMessages((oldChatMessages) => [
        ...oldChatMessages,
        { author: data.author, message: data.message },
      ])
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleRoomJoin = (data: { author: any; message: any }) => {
      //@ts-ignore
      setChatMessages((oldChatMessages) => [
        ...oldChatMessages,
        { author: data.author, message: data.message },
      ])
    }

    const handleError = (error: string) => {
      console.log(`error: ${error}`)
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

  return (
    <div className="border fixed right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="border w-32 p-1 bg-blue-100 absolute -top-10 right-0">
        <Avatar status={socket?.connected} />
        <div className="flex flex-col w-full z-50 text-xs h-[60px] overflow-y-auto">
          <ul>
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            {usersList.map((item: any, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index + 100}> {item?.user} </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-base-100 text-base pt-2">
        <div className="">
          <div className="px-2 pb-2">Chat experimental (version 0.1) </div>
          <label htmlFor="user" className="px-2 text-xs">
            Tu usuario:
            <input
              className="pl-2 w-20"
              autoComplete="off"
              type="text"
              id="user"
              value={user?.toString()}
              placeholder="username"
              onChange={(event) => {
                setUser(event.target.value)
              }}
              disabled={isRoomSelected}
            />
            {isRoomSelected ? (
              <button type="button" className="btn btn-sm" onClick={leftRoom}>
                Desconectarse
              </button>
            ) : (
              <button type="button" className="btn btn-sm" onClick={joinRoom}>
                Unirse al Chat
              </button>
            )}
          </label>

          <br />
          <div className="flex flex-col h-[400px] overflow-y-auto">
            {chatMessages.map(
              (m: { author: string; message: string }, index) => {
                return (
                  <Message
                    user={user}
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
                className="p-2 rounded mx-2"
                type="text"
                autoComplete="off"
                id="mensaje"
                placeholder="Mensaje..."
                value={newMessage}
                onChange={(event) => {
                  setNewMessage(event.target.value)
                }}
              />
              {socket?.connected && (
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={sendNewMessage}
                >
                  Enviar
                </button>
              )}
              {!socket?.connected && (
                <button
                  type="button"
                  className="btn btn-disabled"
                  onClick={sendNewMessage}
                >
                  Enviar
                </button>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
