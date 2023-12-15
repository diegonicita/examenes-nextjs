'use client'

import { useState, useEffect } from 'react'
// import { useLogin } from './useLogin'
import { Modal } from './modal'
import { useLogged } from '@/app/(pages)/(auth)/hooks/useLogged'
//@ts-ignore
import { useFormState } from 'react-dom'
import { loginAction } from '../actions/login'

type Props = {
  url: string | undefined
  urlAPI: string | undefined
  initialEmail: string | undefined
  initialPassword: string | undefined
  showLoginErrors: boolean
}

const initialState = {
  email: '',
  password: '',
  response: '',
  message: '',
}

export default function Login({
  url,
  urlAPI,
  initialEmail,
  initialPassword,
  showLoginErrors,
}: Props) {
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState(initialPassword)
  const [showModal, setShowModal] = useState(false)
  const [state, formAction] = useFormState(loginAction, initialState)
  
  // const { handleSubmitLogin, loginResponse } = useLogin(url, urlAPI)

  useLogged('redirect')

  // useEffect(() => {}, [state.response])

  // console.log(state.message)
  // console.log(state.response)

  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault()
  //   const data = {
  //     email,
  //     password,
  //   }
  //   handleSubmitLogin(data)
  //   setShowModal(true)

  // }

  return (
    <div className="relative">
      <form
        action={formAction}
        name="formLogin"
        className="card w-full bg-base-300"
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Ingresa tu email"
              className="input input-bordered"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="input input-bordered"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                ¿Olvidaste tu contraseña?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </div>
        </div>
      </form>
      <Modal message={state.message} />
    </div>
  )
}
