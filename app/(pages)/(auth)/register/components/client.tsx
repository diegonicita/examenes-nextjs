'use client'

import { useState, useEffect } from 'react'
//@ts-ignore
import { useFormState } from 'react-dom'
import { registerAction } from '../actions/register'
// import { Modal } from './modal'
import toast from 'react-hot-toast'

const notifyRegisterSuccess = () => toast.success('Login Exitoso')
const notifyRegisterFail = (message: string) => toast.error(message)

type Props = {
  disabled: boolean
}

const initialState = {
  usarname: '',
  email: '',
  password: '',
  response: '',
  message: '',
}

export default function Register({ disabled }: Props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [state, formRegister] = useFormState(registerAction, initialState)

  return (
    <div className="relative">
      <form
        action={formRegister}
        name="formRegister"
        className="card w-full sm:w-96 bg-base-300"
      >
        <fieldset disabled={disabled}>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Usuario</span>
              </label>
              <input
                type="text"
                placeholder="Crea tu nombre de usuario"
                className="input input-bordered"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Ingresa tu email"
                className="input input-bordered"
                name="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Repite tu Password</span>
              </label>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                className="input input-bordered"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      {/* <Modal message={state.message} /> */}
    </div>
  )
}
