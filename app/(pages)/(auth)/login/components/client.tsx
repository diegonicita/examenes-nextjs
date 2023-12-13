'use client'

import { useState } from 'react'
import { useLogin } from './useLogin'
import { Modal } from './modal'
import { useLogged } from '@/app/(pages)/(auth)/hooks/useLogged'

type Props = {
  url: string | undefined
  urlAPI: string | undefined
  initialEmail: string | undefined
  initialPassword: string | undefined
}

export default function Login({
  url,
  urlAPI,
  initialEmail,
  initialPassword,
}: Props) {
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState(initialPassword)
  const { handleSubmitLogin, loginResponse } = useLogin(url, urlAPI)
  const [showModal, setShowModal] = useState(false)

  useLogged('redirect')  

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    handleSubmitLogin(data)
    setShowModal(true)
  }

  return (
    <>
      <Modal
        showModal={showModal}
        handleShowModal={setShowModal}
        respObject={loginResponse}
      />
      {!showModal && (
        <form onSubmit={handleSubmit} className="card w-full bg-base-300">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Ingresa tu email"
                className="input input-bordered"
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
      )}
    </>
  )
}
