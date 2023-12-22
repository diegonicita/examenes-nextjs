'use client'

import { useState } from 'react'
import { Modal } from './modal'
import { useLogged } from '@/app/(pages)/(auth)/hooks/useLogged'
//@ts-ignore
import { useFormState } from 'react-dom'
import { loginAction } from '../actions/login'
import { refreshAction } from '@/app/(pages)/consults/actions/refresh'
import { redirect } from 'next/navigation'

type Props = {
  initialEmail: string | undefined
  initialPassword: string | undefined
}

const initialState = {
  email: '',
  password: '',
  response: '',
  message: '',
}

export default function Login({ initialEmail, initialPassword }: Props) {
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState(initialPassword)
  const [state, formAction] = useFormState(loginAction, initialState)
  const [state2, formAction2] = useFormState(refreshAction, initialState)

  // const handleSubmit = () => {
  //   formAction()
  //   // formAction2()
  //   // redirect('/')
  // }

  // useLogged('redirect')

  return (
    <div className="relative">
      <form
        action={formAction}
        name="formLogin"
        className="card w-full bg-base-300 mb-2"
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
