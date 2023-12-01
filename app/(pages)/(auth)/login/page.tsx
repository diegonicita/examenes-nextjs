'use client'

import { useState } from 'react'
import { useLogin } from './useLogin'
import { Modal } from './modal'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSubmitLogin, loginResponse } = useLogin()
  const [showModal, setShowModal] = useState(false)

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
    <div className="mt-8 hero-content mx-auto max-w-sm">
      <Modal
        showModal={showModal}
        handleShowModal={setShowModal}
        respObject={loginResponse}
      />
      {!showModal && (
        <div className="flex flex-col justify-stretch items-stretch gap-4">
          <form
            onSubmit={handleSubmit}
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
          <button type="submit" className="btn btn-neutral self-baseline mx-auto">
            Ingresar con Google
          </button>
          <button type="submit" className="btn btn-neutral self-baseline mx-auto">
            Ingresar con Google LH
          </button>
        </div>
      )}
    </div>
  )
}
