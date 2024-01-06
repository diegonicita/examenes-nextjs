'use client'

import { useState, useEffect, useTransition } from 'react'
// import { Modal } from './modal'
//@ts-ignore
import { useFormState } from 'react-dom'
import { loginAction } from '../actions/login'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'

const notifyLoginSuccess = () => toast.success('Login Exitoso')
const notifyLoginFail = (message: string) => toast.error(message)

type Props = {
  initialEmail: string | undefined
  initialPassword: string | undefined
  disabled: boolean
}

const initialState = {
  email: '',
  password: '',
  response: '',
  message: '',
}

export default function Login({ initialEmail, initialPassword, disabled }: Props) {
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState(initialPassword)
  const [state, formAction] = useFormState(loginAction, initialState)
  const [, startTransition] = useTransition()

  useEffect(() => {
    let timeOut: any = undefined
    if (state.message != '' && state.message == 'Login exitoso') {
      notifyLoginSuccess()
      timeOut = setTimeout(() => {
        startTransition(() => {
          redirect('/')
        })
      }, 500)
    }
    else {
      if (state.message != '') notifyLoginFail(state.message)
    }
    return () => {
      clearTimeout(timeOut)
    }
  }, [state])

  return (
    <div className="relative">
      <form
        action={formAction}
        name="formLogin"
        className="card w-full bg-base-300 mb-2"        
      >
        <fieldset disabled={disabled}>
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
            {!disabled && <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                ¿Olvidaste tu contraseña?
              </a>
            </label>}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </div>
        </div>
      </fieldset>
      </form>
      {/* <Modal message={state.message} /> */}
    </div>
  )
}
